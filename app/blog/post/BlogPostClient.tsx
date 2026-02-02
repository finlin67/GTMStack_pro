"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { fetchPostBySlug, WPPost } from "@/lib/wp-client";

export default function BlogPostClient() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") || "";

  const [post, setPost] = useState<WPPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        if (!slug) {
          setError("Missing ?slug=");
          return;
        }
        const data = await fetchPostBySlug(slug);
        setPost(data);
        if (!data) setError("Post not found");
      } catch (e: any) {
        setError(e?.message || "Failed to load post");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  const featured = post?._embedded?.["wp:featuredmedia"]?.[0];

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link className="text-sm text-slate-600 hover:underline" href="/blog">
        ← Back to Blog
      </Link>

      {loading && <p className="mt-8">Loading…</p>}

      {!loading && error && (
        <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {!loading && post && (
        <>
          <h1
            className="mt-6 text-3xl font-semibold"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          {featured?.source_url && (
            <Image
              src={featured.source_url}
              alt={featured.alt_text || ""}
              className="mt-6 w-full rounded-lg"
              width={800}
              height={450}
              unoptimized
            />
          )}

          <article
            className="prose mt-8 max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </>
      )}
    </main>
  );
}
