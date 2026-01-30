import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog'
import { SectionDark } from '@/components/layout/SectionDark'
import { SectionLight } from '@/components/layout/SectionLight'
import { FadeIn } from '@/components/motion/FadeIn'
import { SignalField } from '@/components/motifs'
import { ArrowLeft } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export function generateStaticParams(): { slug: string }[] {
  const slugs = getAllPostSlugs()
  if (slugs.length === 0) {
    return [{ slug: '__no-posts__' }]
  }
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return { title: 'Not Found' }
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  }
}

export default function BlogPostPage({ params }: Props) {
  if (params.slug === '__no-posts__') {
    notFound()
  }
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <SectionDark variant="hero" motif="signal" padding="lg" className="overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <SignalField intensity="subtle" pattern="constellation" density="sparse" />
        </div>
        <div className="container-width relative z-10">
          <FadeIn>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blog</span>
            </Link>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
            {post.date && (
              <p className="text-slate-400 text-sm">{post.date}</p>
            )}
          </FadeIn>
        </div>
      </SectionDark>

      <SectionLight variant="white" className="overflow-hidden">
        <div className="container-width max-w-3xl">
          <FadeIn>
            {post.content ? (
              <div
                className="prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <p className="text-slate-600">{post.excerpt ?? 'No content yet.'}</p>
            )}
          </FadeIn>
        </div>
      </SectionLight>
    </>
  )
}
