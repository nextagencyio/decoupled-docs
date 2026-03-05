'use client'

import { DrupalHomepage } from '@/lib/types'

interface CTASectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

export default function CTASection({ homepageContent }: CTASectionProps) {
  const title = (homepageContent as any)?.ctaTitle || 'Start building today'
  const primaryLabel = (homepageContent as any)?.ctaPrimary || 'Read the Docs'

  return (
    <section className="bg-gradient-to-b from-primary-950 to-primary-900 py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-mono text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
          {title}
        </h2>
        <p className="text-primary-300 mb-10 max-w-lg mx-auto">
          Explore our guides, tutorials, and API reference to get up and running in minutes.
        </p>
        <a
          href="/guides"
          className="inline-block bg-accent-500 hover:bg-accent-600 text-white px-8 py-3.5 rounded-lg text-sm font-medium tracking-wide transition-colors duration-200"
        >
          {primaryLabel}
        </a>
      </div>
    </section>
  )
}
