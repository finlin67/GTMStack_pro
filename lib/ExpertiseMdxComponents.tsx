import Link from 'next/link'
import type { MDXComponents } from 'mdx/types'

/** MDX component overrides for expertise pages */
export const expertiseMdxComponents: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="font-display text-2xl font-bold text-slate-900 mt-12 mb-4 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-display text-xl font-semibold text-slate-900 mt-8 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-slate-600 leading-relaxed mb-4">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside space-y-2 text-slate-600 mb-6">
      {children}
    </ul>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ href, children }) => {
    const isExternal = href?.startsWith('http')
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-600 hover:text-brand-700 underline underline-offset-2"
        >
          {children}
        </a>
      )
    }
    return (
      <Link
        href={href || '#'}
        className="text-brand-600 hover:text-brand-700 underline underline-offset-2"
      >
        {children}
      </Link>
    )
  },
  strong: ({ children }) => (
    <strong className="font-semibold text-slate-800">{children}</strong>
  ),
}
