import { Suspense } from 'react'
import { getAllAnimationIds } from '@/src/data/animationIds'
import { AnimationDetailClient } from './AnimationDetailClient'

interface Props {
  params: { id: string }
}

export function generateStaticParams() {
  return getAllAnimationIds().map((id) => ({ id }))
}

export default function AnimationDetailPage({ params }: Props) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0b1224]" />}>
      <AnimationDetailClient params={params} />
    </Suspense>
  )
}
