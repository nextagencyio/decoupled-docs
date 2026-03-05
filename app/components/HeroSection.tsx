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
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-48 md:pb-24">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=2000&q=80&fit=crop"
          alt="Code editor"
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/90 via-primary-900/80 to-primary-800/65" />
      </div>
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-mono text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.9]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-primary-100 mt-8 max-w-xl">{subtitle}</p>
        )}
        {description && !subtitle && (
          <div className="text-lg text-primary-100 mt-8 max-w-xl" dangerouslySetInnerHTML={{ __html: description }} />
        )}
        <div className="mt-12 font-mono text-sm text-primary-100 bg-primary-950/70 border border-primary-700/60 rounded-sm px-6 py-4 max-w-md">
          <span className="text-accent-500">$</span> npm install opendocs-sdk
        </div>
      </div>
    </section>
  )
}
