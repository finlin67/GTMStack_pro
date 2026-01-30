import { Metadata } from 'next'
import Link from 'next/link'
import { getPosts } from '@/lib/blog'
import { SectionDark } from '@/components/layout/SectionDark'
import { SectionLight } from '@/components/layout/SectionLight'
import { SectionHeader } from '@/components/layout/Section'
import { FadeIn } from '@/components/motion/FadeIn'
import { SignalField } from '@/components/motifs'
import { FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'GTM strategy, demand gen, and go-to-market insights from GTMstack.pro.',
}

export default function BlogPage() {
  const posts = getPosts()

  return (
    <>
      <SectionDark variant="hero" motif="signal" padding="lg" className="overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <SignalField intensity="subtle" pattern="constellation" density="sparse" />
        </div>
        <div className="container-width relative z-10">
          <FadeIn>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Blog
            </h1>
            <p className="text-lg text-slate-200 max-w-2xl">
              GTM strategy, demand gen, and go-to-market insights.
            </p>
          </FadeIn>
        </div>
      </SectionDark>

      <SectionLight variant="white" className="overflow-hidden">
        <div className="container-width">
          {posts.length === 0 ? (
            <FadeIn>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-12 text-center">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-slate-800 mb-2">No posts yet</h2>
                <p className="text-slate-600 max-w-md mx-auto">
                  We haven’t published any posts yet. Check back soon for GTM insights and updates.
                </p>
              </div>
            </FadeIn>
          ) : (
            <>
              <SectionHeader
                label="Posts"
                title="Latest"
                description={`${posts.length} post${posts.length === 1 ? '' : 's'}`}
                className="mb-8"
              />
              <ul className="space-y-4">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block rounded-xl border border-slate-200 bg-white p-6 shadow-soft hover:shadow-strong hover:border-brand-500/30 transition-all"
                    >
                      <h2 className="font-semibold text-lg text-slate-900 mb-2 group-hover:text-brand-600">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-slate-600 text-sm leading-relaxed">{post.excerpt}</p>
                      )}
                      {post.date && (
                        <p className="text-slate-400 text-xs mt-2">{post.date}</p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </SectionLight>
    </>
  )
}
