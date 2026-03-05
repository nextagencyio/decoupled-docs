'use client'

import Header from './Header'
import HeroSection from './HeroSection'
import StatsSection from './StatsSection'
import CTASection from './CTASection'
import ErrorBoundary from './ErrorBoundary'
import Link from 'next/link'
import { FileText, Code, Terminal, BookOpen, Search, Layers } from 'lucide-react'
import { DrupalHomepage } from '@/lib/types'

interface HomepageRendererProps {
  homepageContent: DrupalHomepage | null | undefined
}

const docSections = [
  { title: 'Getting Started', description: 'Quick setup guide and first steps', href: '/guides' },
  { title: 'API Reference', description: 'Complete endpoint documentation', href: '/guides' },
  { title: 'Authentication', description: 'OAuth, tokens, and security', href: '/guides' },
  { title: 'Changelog', description: 'Latest updates and releases', href: '/changelog' },
]

const icons = [
  { icon: FileText, label: 'Rich Docs' },
  { icon: Code, label: 'Code Samples' },
  { icon: Terminal, label: 'CLI Tools' },
  { icon: BookOpen, label: 'Tutorials' },
  { icon: Search, label: 'Search' },
  { icon: Layers, label: 'SDK Support' },
]

const features = [
  {
    title: 'Interactive Examples',
    code: 'const client = new OpenDocs({\n  apiKey: process.env.API_KEY\n})',
  },
  {
    title: 'Webhook Events',
    code: 'app.post("/webhook", (req) => {\n  const event = req.body\n  // handle event\n})',
  },
  {
    title: 'Type-Safe SDK',
    code: 'interface Response<T> {\n  data: T\n  meta: Pagination\n}',
  },
  {
    title: 'Error Handling',
    code: 'try {\n  await client.query(params)\n} catch (e: ApiError) {\n  console.log(e.code)\n}',
  },
]

export default function HomepageRenderer({ homepageContent }: HomepageRendererProps) {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Header />

      <ErrorBoundary>
        <HeroSection homepageContent={homepageContent} />
      </ErrorBoundary>

      <ErrorBoundary>
        <StatsSection homepageContent={homepageContent} />
      </ErrorBoundary>

      {/* Documentation Sections - List View */}
      <section className="bg-[#f8fafc] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-mono text-2xl font-semibold text-primary-900 mb-8">Documentation</h2>
          <div className="border-t border-primary-200 bg-white rounded-xl overflow-hidden shadow-sm">
            {docSections.map((section, i) => (
              <Link
                key={i}
                href={section.href}
                className="group flex items-center justify-between py-6 border-b border-primary-200 transition-all duration-200 hover:pl-1"
              >
                <div className="flex items-baseline gap-4">
                  <h3 className="text-lg font-medium text-primary-900 group-hover:text-accent-500 transition-colors duration-200">
                    {section.title}
                  </h3>
                  <span className="text-sm text-primary-400 hidden sm:inline">{section.description}</span>
                </div>
                <span className="text-sm text-primary-400 shrink-0 ml-4">
                  View
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Icon Showcase */}
      <section className="bg-white py-16 border-y border-primary-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-mono text-sm font-medium tracking-widest text-primary-400 uppercase mb-12">Capabilities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
            {icons.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <item.icon className="w-6 h-6 text-accent-500 mb-3" strokeWidth={1.5} />
                <span className="text-xs text-primary-500 tracking-wide">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features / Code Snippets (replacing photo gallery for docs) */}
      <section className="bg-primary-950 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-mono text-2xl font-semibold text-white mb-8">Code Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <div key={i} className="bg-primary-900 rounded-lg p-6 border border-primary-700">
                <h3 className="font-mono text-sm font-medium text-primary-100 mb-3">{feature.title}</h3>
                <pre className="font-mono text-xs text-primary-300 leading-relaxed whitespace-pre-wrap">{feature.code}</pre>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ErrorBoundary>
        <CTASection homepageContent={homepageContent} />
      </ErrorBoundary>

      <footer className="bg-white border-t border-primary-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-400">
              &copy; {new Date().getFullYear()} OpenDocs
            </p>
            <div className="flex items-center space-x-6">
              <Link href="/guides" className="text-sm text-primary-400 hover:text-primary-900 transition-colors">Guides</Link>
              <Link href="/changelog" className="text-sm text-primary-400 hover:text-primary-900 transition-colors">Changelog</Link>
              <Link href="/contact" className="text-sm text-primary-400 hover:text-primary-900 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
