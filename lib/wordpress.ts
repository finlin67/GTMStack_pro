export type WPPost = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
      alt_text?: string;
    }>;
  };
};

/**
 * Server-only helper:
 * Read WORDPRESS_API_URL at call-time (not module top-level),
 * and sanitize common copy/paste issues.
 */
function getBaseUrl(): string {
  const raw = process.env.WORDPRESS_API_URL;
  if (!raw) throw new Error("Missing WORDPRESS_API_URL env var");

  // Remove hidden CRLF, whitespace, and trailing slashes
  const base = raw.replace(/\r/g, "").trim().replace(/\/+$/, "");

  if (!base.startsWith("http")) {
    throw new Error("WORDPRESS_API_URL must start with http(s)");
  }

  return base;
}

export async function getPosts() {
  const url = `${getBaseUrl()}/posts?per_page=10&_embed=1`;
  const res = await fetch(url, { cache: "no-store" }); // during build, always fetch fresh

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to fetch posts: ${res.status} ${text.slice(0, 200)}`);
  }

  return (await res.json()) as WPPost[];
}

export async function getPostBySlug(slug: string) {
  const url = `${getBaseUrl()}/posts?slug=${encodeURIComponent(slug)}&_embed=1`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to fetch post: ${res.status} ${text.slice(0, 200)}`);
  }

  const posts = (await res.json()) as WPPost[];
  return posts[0] ?? null;
}
