#!/usr/bin/env node
/**
 * Repo-wide internal link audit for Next.js App Router.
 * - Audits main nav links
 * - Crawls repo for internal hrefs and validates against routes
 * - Reports orphaned pages
 * Safety: denylist /api, /admin, /auth, /logout, /webhooks; ignore query params except page.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const APP_DIR = path.join(ROOT, 'app')
const REPORTS_DIR = path.join(ROOT, 'reports')

const DENYLIST_PREFIXES = ['/api', '/admin', '/auth', '/logout', '/webhooks']
const ALLOWLIST_QUERY_KEYS = ['page']
const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.mdx', '.md']
const NAV_FILES = [
  path.join(ROOT, 'components/layout/Navbar.tsx'),
  path.join(ROOT, 'components/layout/Footer.tsx'),
  path.join(ROOT, 'components/layout/MegaMenu.tsx'),
  path.join(ROOT, 'components/ui/MobileMegaMenu.tsx'),
]

// ----- Route discovery (Next.js App Router) -----
function discoverAppRoutes(dir, base = '') {
  const routes = []
  if (!fs.existsSync(dir)) return routes
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    const rel = base ? `${base}/${e.name}` : `/${e.name}`
    if (e.isDirectory()) {
      if (e.name.startsWith('_') || e.name === 'layout' || e.name === 'loading' || e.name === 'not-found') continue
      const full = path.join(dir, e.name)
      const hasPage = fs.existsSync(path.join(full, 'page.tsx')) || fs.existsSync(path.join(full, 'page.jsx')) || fs.existsSync(path.join(full, 'page.js'))
      if (hasPage) {
        const segment = e.name.startsWith('[') ? `[${e.name.slice(1, -1)}]` : e.name
        routes.push({ path: base ? `${base}/${segment}` : `/${segment}`, dynamic: e.name.startsWith('[') })
      }
      routes.push(...discoverAppRoutes(full, base ? `${base}/${e.name}` : `/${e.name}`))
    }
  }
  return routes
}

function getRouteList() {
  const flat = []
  function walk(dir, segments = []) {
    if (!fs.existsSync(dir)) return
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const e of entries) {
      if (e.name.startsWith('_') || e.name === 'layout' || e.name === 'loading' || e.name === 'not-found' || e.name === 'globals.css') continue
      if (e.isDirectory()) {
        const full = path.join(dir, e.name)
        const pagePath = path.join(full, 'page.tsx')
        const pagePathJs = path.join(full, 'page.jsx')
        const pagePathJs2 = path.join(full, 'page.js')
        if (fs.existsSync(pagePath) || fs.existsSync(pagePathJs) || fs.existsSync(pagePathJs2)) {
          const segment = e.name.startsWith('[') ? `[${e.name.slice(1, -1)}]` : e.name
          const routePath = '/' + [...segments, segment].join('/')
          flat.push({ path: routePath, dynamic: e.name.startsWith('[') })
        }
        walk(full, [...segments, e.name])
      }
    }
  }
  if (fs.existsSync(path.join(APP_DIR, 'page.tsx')) || fs.existsSync(path.join(APP_DIR, 'page.js'))) {
    flat.push({ path: '/', dynamic: false })
  }
  walk(APP_DIR)
  return flat
}

// ----- Normalize href: strip query (except page), denylist, no hash -----
function normalizeHref(href) {
  if (!href || typeof href !== 'string') return null
  href = href.trim()
  if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) return null
  if (!href.startsWith('/')) return null
  const [pathname, qs] = href.split('?')
  let pathOnly = pathname.replace(/#.*/, '').replace(/\/+$/, '') || '/'
  for (const p of DENYLIST_PREFIXES) {
    if (pathOnly === p || pathOnly.startsWith(p + '/')) return null
  }
  if (qs) {
    const allow = new URLSearchParams(qs)
    const kept = []
    for (const k of ALLOWLIST_QUERY_KEYS) if (allow.has(k)) kept.push(`${k}=${allow.get(k)}`)
    if (kept.length) pathOnly += '?' + kept.join('&')
  }
  return pathOnly
}

// ----- Match path against known routes (static or dynamic) -----
function routeMatches(route, hrefPath) {
  const rSegs = route.path.split('/').filter(Boolean)
  const hSegs = hrefPath.split('?')[0].split('/').filter(Boolean)
  if (rSegs.length !== hSegs.length) return false
  for (let i = 0; i < rSegs.length; i++) {
    if (rSegs[i].startsWith('[') && rSegs[i].endsWith(']')) continue
    if (rSegs[i] !== hSegs[i]) return false
  }
  return true
}

function findMatchingRoute(routes, hrefPath) {
  const pathOnly = hrefPath.split('?')[0].replace(/\/+$/, '') || '/'
  for (const r of routes) {
    if (r.dynamic && routeMatches(r, pathOnly)) return r
    if (!r.dynamic && (r.path === pathOnly || r.path + '/' === pathOnly + '/')) return r
  }
  return null
}

// ----- Extract links from file content (simple patterns to avoid backtracking) -----
function extractLinksFromContent(content, filePath) {
  const links = []
  const lines = content.split('\n')
  const simpleHrefRe = /href\s*=\s*["'](\/[^"'#\s]*)/g
  const hrefColonRe = /href\s*:\s*["'](\/[^"'#\s]*)/g
  const routerPushRe = /router\.push\s*\(\s*["'](\/[^"'#\s]*)/g
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    for (const re of [simpleHrefRe, hrefColonRe, routerPushRe]) {
      let m
      re.lastIndex = 0
      while ((m = re.exec(line)) !== null) {
        const raw = m[1]
        if (raw) {
          const normalized = normalizeHref(raw)
          if (normalized !== null) links.push({ href: normalized, line: i + 1, raw })
        }
      }
    }
  }
  return links
}

const SCAN_DIRS = ['app', 'components', 'content', 'lib', 'src', 'mdx-components.tsx']
const MAX_FILE_SIZE = 500 * 1024

// ----- Get all source files (only app, components, content, lib, src) -----
function getAllSourceFiles() {
  const out = []
  for (const d of SCAN_DIRS) {
    const full = path.join(ROOT, d)
    if (!fs.existsSync(full)) continue
    if (d.endsWith('.tsx')) {
      out.push(full)
      continue
    }
    function walk(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true })
      for (const e of entries) {
        const fullPath = path.join(dir, e.name)
        if (e.name === 'node_modules' || e.name === '.next' || e.name === 'out' || e.name.startsWith('.')) continue
        if (e.isDirectory()) walk(fullPath)
        else if (EXTENSIONS.some((ext) => e.name.endsWith(ext))) out.push(fullPath)
      }
    }
    walk(full)
  }
  return out
}

// ----- Main nav extraction (parse known nav components) -----
function getNavLinks() {
  const navEntries = []
  const add = (label, href, source) => {
    const normalized = normalizeHref(href)
    if (normalized) navEntries.push({ label, href: normalized, source })
  }
  for (const file of NAV_FILES) {
    if (!fs.existsSync(file)) continue
    const content = fs.readFileSync(file, 'utf8')
    const rel = path.relative(ROOT, file)
    const lines = content.split('\n')
    for (const line of lines) {
      const linkM = line.match(/<Link[^>]+href\s*=\s*["']([^"'#]+)/)
      if (linkM) add(path.basename(file) + ' link', linkM[1], rel)
      const objM = line.match(/href\s*:\s*["']([^"'#]+)/)
      if (objM) add(path.basename(file) + ' obj', objM[1], rel)
      if (line.includes('/industries/${')) add(path.basename(file) + ' industries', '/industries/[slug]', rel)
    }
  }
  const typesPath = path.join(ROOT, 'lib/types.ts')
  if (fs.existsSync(typesPath)) {
    const typesContent = fs.readFileSync(typesPath, 'utf8')
    for (const line of typesContent.split('\n')) {
      const m = line.match(/href:\s*["']([^"']+)["']/)
      if (m) add('PILLARS (types)', m[1], 'lib/types.ts')
    }
  }
  return navEntries
}

// ----- Run audit -----
function runAudit() {
  const routes = getRouteList()
  const navLinks = getNavLinks()
  const allFiles = getAllSourceFiles()
  const internalTargets = new Map()
  const linkRecords = []
  const navTable = []
  const broken = []
  const referencedRoutes = new Set()

  for (const { label, href, source } of navLinks) {
    const pathOnly = href.split('?')[0].replace(/\/+$/, '') || '/'
    const matched = findMatchingRoute(routes, pathOnly)
    const isDynamic = routes.some(r => r.dynamic && routeMatches(r, pathOnly))
    navTable.push({
      label,
      href,
      routeExists: !!matched,
      notes: matched ? (matched.dynamic ? 'dynamic' : 'ok') : (isDynamic ? 'dynamic (pattern)' : 'MISSING'),
    })
    if (matched) referencedRoutes.add(matched.path)
    else if (pathOnly.includes('[')) referencedRoutes.add(pathOnly)
  }

  for (const file of allFiles) {
    const stat = fs.statSync(file)
    if (stat.size > MAX_FILE_SIZE) continue
    const content = fs.readFileSync(file, 'utf8')
    const rel = path.relative(ROOT, file)
    const links = extractLinksFromContent(content, file)
    for (const { href, line, raw } of links) {
      const pathOnly = href.split('?')[0].replace(/\/+$/, '') || '/'
      const matched = findMatchingRoute(routes, pathOnly)
      const status = matched ? 'ok' : (pathOnly.match(/\/\[/) ? 'dynamic' : 'BROKEN')
      linkRecords.push({ sourceFile: rel, line, linkTarget: href, status, notes: matched ? (matched.dynamic ? 'dynamic' : '') : '' })
      if (!internalTargets.has(pathOnly)) internalTargets.set(pathOnly, [])
      internalTargets.get(pathOnly).push({ file: rel, line })
      if (matched) referencedRoutes.add(matched.path)
    }
  }

  for (const r of linkRecords) {
    const pathOnly = r.linkTarget.split('?')[0].replace(/\/+$/, '') || '/'
    const matched = findMatchingRoute(routes, pathOnly)
    if (!matched && !pathOnly.includes('[')) broken.push(r)
  }

  const orphanRoutes = routes.filter((r) => {
    if (r.path === '/_not-found' || r.path === '/404' || r.path.includes('layout')) return false
    const normalized = r.path.replace(/\[[^]]+\]/g, '*')
    return !referencedRoutes.has(r.path) && !referencedRoutes.has(normalized)
  })

  return { routes, navTable, linkRecords, broken, orphanRoutes }
}

// ----- Report -----
function writeReport(result) {
  const { routes, navTable, linkRecords, broken, orphanRoutes } = result
  if (!fs.existsSync(REPORTS_DIR)) fs.mkdirSync(REPORTS_DIR, { recursive: true })

  let md = `# Internal Link Audit Report\n\nGenerated: ${new Date().toISOString()}\n\n`
  md += `## 1. Main Navigation Audit\n\n| Nav Label | Href | Route Exists? | Notes |\n|-----------|------|---------------|-------|\n`
  for (const row of navTable) {
    md += `| ${row.label} | ${row.href} | ${row.routeExists ? 'Yes' : 'No'} | ${row.notes} |\n`
  }

  md += `\n## 2. All Internal Links (sample: first 200)\n\n| Source File | Line | Link Target | Status | Notes |\n|-------------|------|-------------|--------|-------|\n`
  const uniqueByTarget = new Map()
  for (const r of linkRecords) {
    const key = `${r.sourceFile}:${r.linkTarget}`
    if (!uniqueByTarget.has(key)) uniqueByTarget.set(key, r)
  }
  const sampled = [...uniqueByTarget.values()].slice(0, 200)
  for (const r of sampled) {
    md += `| ${r.sourceFile} | ${r.line || ''} | ${r.linkTarget} | ${r.status} | ${r.notes} |\n`
  }

  md += `\n## 3. Broken Internal Links\n\n`
  if (broken.length === 0) md += `None found.\n`
  else {
    md += `| Source File | Line | Link Target | Status | Notes |\n|-------------|------|-------------|--------|-------|\n`
    for (const r of broken) md += `| ${r.sourceFile} | ${r.line || ''} | ${r.linkTarget} | ${r.status} | ${r.notes} |\n`
  }

  md += `\n## 4. Orphaned Pages (never linked)\n\n`
  if (orphanRoutes.length === 0) md += `None (all routes are referenced).\n`
  else md += orphanRoutes.map((r) => `- ${r.path}${r.dynamic ? ' (dynamic)' : ''}`).join('\n') + '\n'

  md += `\n## Summary\n\n- **Routes discovered:** ${routes.length}\n`
  md += `- **Nav links checked:** ${navTable.length}\n`
  md += `- **Internal link refs (unique):** ${uniqueByTarget.size}\n`
  md += `- **Broken links:** ${broken.length}\n`
  md += `- **Orphan routes:** ${orphanRoutes.length}\n`

  fs.writeFileSync(path.join(REPORTS_DIR, 'link-audit.md'), md, 'utf8')

  const csvRows = [
    ['Section', 'Source File', 'Line', 'Label/Href', 'Link Target', 'Status', 'Notes'],
    ...navTable.map((r) => ['Nav', '', '', r.label, r.href, r.routeExists ? 'Yes' : 'No', r.notes]),
    ...sampled.map((r) => ['Link', r.sourceFile, String(r.line || ''), '', r.linkTarget, r.status, r.notes]),
    ...broken.map((r) => ['Broken', r.sourceFile, String(r.line || ''), '', r.linkTarget, r.status, r.notes]),
    ...orphanRoutes.map((r) => ['Orphan', '', '', '', r.path, 'unreferenced', r.dynamic ? 'dynamic' : '']),
  ]
  const escapeCsv = (v) => (/"|,|\n/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : v)
  const csv = csvRows.map((row) => row.map(escapeCsv).join(',')).join('\n')
  fs.writeFileSync(path.join(REPORTS_DIR, 'link-audit.csv'), csv, 'utf8')

  console.log('Link audit complete.')
  console.log('  reports/link-audit.md')
  console.log('  reports/link-audit.csv')
  console.log(`  Nav: ${navTable.length}, Links: ${[...uniqueByTarget.values()].length}, Broken: ${broken.length}, Orphans: ${orphanRoutes.length}`)
}

const result = runAudit()
writeReport(result)
