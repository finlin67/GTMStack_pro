import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/lib/wordpress";

type Props = {
  params: { slug: string };
};

// Required for output: "export"
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  const featured = post._embedded?.["wp:featuredmedia"]?.[0];

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1
        className="text-3xl font-semibold"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      {featured?.source_url && (
        <img
          src={featured.source_url}
          alt={featured.alt_text || ""}
          className="mt-6 w-full rounded-lg"
        />
      )}

      <article
        className="prose mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </main>
  );
}
