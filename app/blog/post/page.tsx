import { Suspense } from "react";
import BlogPostClient from "./BlogPostClient";

export default function BlogPostPage() {
  return (
    <Suspense fallback={<main className="mx-auto max-w-3xl px-6 py-12">Loading…</main>}>
      <BlogPostClient />
    </Suspense>
  );
}
