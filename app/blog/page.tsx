"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchPosts, WPPost } from "@/lib/wp-client";

export default function BlogPage() {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (e: any) {
        setError(e?.message || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "").trim();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Blog</h1>
      <p className="mt-2 text-slate-600">
        Posts are loaded live from WordPress (no rebuild required).
      </p>

      {loading && <p className="mt-8">Loading…</p>}

      {!loading && error && (
        <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-6">
          No posts yet.
        </div>
      )}

      <ul className="mt-8 space-y-4">
        {posts.map((p) => (
          <li key={p.id} className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold">
              <Link className="hover:underline" href={`/blog/post?slug=${p.slug}`}>
                {stripHtml(p.title?.rendered || p.slug)}
              </Link>
            </h2>
            {p.excerpt?.rendered ? (
              <p className="mt-2 text-slate-600 text-sm">{stripHtml(p.excerpt.rendered)}</p>
            ) : null}
            {p.date ? (
              <p className="mt-2 text-xs text-slate-400">
                {new Date(p.date).toLocaleDateString()}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </main>
  );
}
