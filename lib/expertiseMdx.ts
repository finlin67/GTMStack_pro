import fs from 'fs'
import path from 'path'

/** Pillar slugs that correspond to content/expertise subfolders */
const EXPERTISE_PILLARS = [
  'content-engagement',
  'demand-growth',
  'strategy-insights',
  'systems-operations',
] as const

/**
 * Returns the raw MDX file content for an expertise slug, or null if not found.
 * Path: content/expertise/{pillar}/{slug}.mdx
 */
export function getExpertiseMdxContent(
  slug: string,
  pillar: string | undefined
): string | null {
  if (!pillar || !EXPERTISE_PILLARS.includes(pillar as (typeof EXPERTISE_PILLARS)[number])) {
    return null
  }

  const filePath = path.join(process.cwd(), 'content', 'expertise', pillar, `${slug}.mdx`)

  try {
    let content = fs.readFileSync(filePath, 'utf-8')
    // MDX doesn't support HTML comments (<!-- -->); strip them to avoid parse errors
    content = content.replace(/<!--[\s\S]*?-->/g, '')
    return content
  } catch {
    return null
  }
}
