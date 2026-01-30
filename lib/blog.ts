/**
 * Blog posts data layer.
 * Replace with WordPress/fetch when you have a CMS; for static export with 0 posts this returns [].
 */

export interface BlogPost {
  slug: string
  title: string
  excerpt?: string
  date?: string
  content?: string
}

/**
 * Returns all blog posts. For static export with no WordPress yet, returns [].
 * When you add WordPress: fetch from your API and return the list.
 */
export function getPosts(): BlogPost[] {
  return []
}

/**
 * Returns a single post by slug, or null if not found.
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getPosts()
  return posts.find((p) => p.slug === slug) ?? null
}

/**
 * Returns all slugs for generateStaticParams (empty when no posts).
 */
export function getAllPostSlugs(): string[] {
  return getPosts().map((p) => p.slug)
}
