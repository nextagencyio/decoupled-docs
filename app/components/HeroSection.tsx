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
    <section className="bg-white pt-32 pb-16 md:pt-48 md:pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-mono text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-primary-950 leading-[0.9]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-primary-400 mt-8 max-w-xl">{subtitle}</p>
        )}
        {description && !subtitle && (
          <div className="text-lg text-primary-400 mt-8 max-w-xl" dangerouslySetInnerHTML={{ __html: description }} />
        )}
        <div className="mt-12 font-mono text-sm text-primary-400 bg-primary-50 rounded-sm px-6 py-4 max-w-md">
          <span className="text-accent-500">$</span> npm install opendocs-sdk
        </div>
      </div>
    </section>
  )
}
