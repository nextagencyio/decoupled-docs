'use client'

import { DrupalHomepage } from '@/lib/types'

interface CTASectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

export default function CTASection({ homepageContent }: CTASectionProps) {
  const title = (homepageContent as any)?.ctaTitle || 'Start building today'
  const primaryLabel = (homepageContent as any)?.ctaPrimary || 'Read the Docs'

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-mono text-3xl md:text-4xl font-bold tracking-tight text-primary-950 mb-10">
          {title}
        </h2>
        <a
          href="/guides"
          className="inline-block border-2 border-primary-900 text-primary-900 px-8 py-3 text-sm font-medium tracking-wide uppercase hover:bg-primary-900 hover:text-white transition-colors duration-200"
        >
          {primaryLabel}
        </a>
      </div>
    </section>
  )
}
