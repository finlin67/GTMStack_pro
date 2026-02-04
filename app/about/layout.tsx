import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Michael | GTM Strategist & Revenue Architect',
  description:
    '20+ years building scalable B2B growth engines. From Wall Street to Silicon Valley. $45M+ pipelines, 340% engagement lifts, 2.5x velocity. Learn about Michael and GTMStack.pro.',
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
