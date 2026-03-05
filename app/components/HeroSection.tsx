'use client'

import { DrupalHomepage } from '@/lib/types'

interface HeroSectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

export default function HeroSection({ homepageContent }: HeroSectionProps) {
  const title = (homepageContent as any)?.heroTitle || (homepageContent as any)?.title || 'Documentation for developers'
  const subtitle = (homepageContent as any)?.heroSubtitle || ''
  const description = (homepageContent as any)?.heroDescription?.processed || ''

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=2000&q=80&fit=crop"
          alt="Code editor"
          className="h-full w-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-accent-950" />
      </div>
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 bg-accent-500/10 border border-accent-500/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
          <span className="text-sm font-medium text-accent-300">v2.0 now available</span>
        </div>
        <h1 className="font-mono text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.9]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-primary-200 mt-8 max-w-xl leading-relaxed">{subtitle}</p>
        )}
        {description && !subtitle && (
          <div className="text-lg text-primary-200 mt-8 max-w-xl leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />
        )}
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <div className="font-mono text-sm text-primary-100 bg-primary-950/80 border border-primary-700/50 rounded-lg px-6 py-4 max-w-md backdrop-blur-sm">
            <span className="text-accent-400">$</span> npm install opendocs-sdk
          </div>
          <a
            href="/guides"
            className="inline-flex items-center justify-center bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-4 rounded-lg text-sm transition-colors duration-200"
          >
            Read the Docs
          </a>
        </div>
      </div>
    </section>
  )
}
