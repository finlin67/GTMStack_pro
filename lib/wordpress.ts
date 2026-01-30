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

const base = process.env.WORDPRESS_API_URL;

function requireBase() {
  if (!base) throw new Error("Missing WORDPRESS_API_URL env var");
  return base;
}

export async function getPosts() {
  const url = `${requireBase()}/posts?per_page=10&_embed=1`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
  return (await res.json()) as WPPost[];
}

export async function getPostBySlug(slug: string) {
  const url = `${requireBase()}/posts?slug=${encodeURIComponent(slug)}&_embed=1`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Failed to fetch post: ${res.status}`);
  const posts = (await res.json()) as WPPost[];
  return posts[0] ?? null;
}
