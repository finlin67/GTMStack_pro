import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Animation Gallery',
  description:
    '50+ marketing dashboard animations built with React, Framer Motion, and Tailwind. Browse, filter, and explore open-source GTM visualizations.',
  openGraph: {
    title: 'Animation Gallery | GTMstack.pro',
    description:
      '50+ marketing dashboard animations built with React, Framer Motion, and Tailwind.',
  },
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
