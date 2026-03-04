import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import Link from 'next/link'
import { getServerApolloClient } from '@/lib/apollo-client'
import { GET_GUIDE_BY_PATH } from '@/lib/queries'
import { DrupalGuide } from '@/lib/types'
import Header from '../../components/Header'
import ResponsiveImage from '../../components/ResponsiveImage'
import { ArrowLeft } from 'lucide-react'

export const revalidate = 300

interface PageProps {
  params: Promise<{ slug: string[] }>
}

interface GuideByPathData {
  route: {
    entity: DrupalGuide
  } | null
}

async function getGuide(path: string): Promise<DrupalGuide | null> {
  try {
    const requestHeaders = await headers()
    const apolloClient = getServerApolloClient(requestHeaders)
    const { data } = await apolloClient.query<GuideByPathData>({
      query: GET_GUIDE_BY_PATH,
      variables: { path },
      fetchPolicy: 'cache-first',
    })
    return data?.route?.entity || null
  } catch (error) {
    console.error('Error fetching guide:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const path = `/guides/${slug.join('/')}`
  const item = await getGuide(path)

  if (!item) {
    return { title: 'Guide Not Found | OpenDocs' }
  }

  return {
    title: `${item.title} | OpenDocs`,
    description: ((item as any).body?.processed ? (item as any).body.processed.replace(/<[^>]*>/g, '').substring(0, 160) : '') || `Learn more about ${item.title}.`,
  }
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params
  const path = `/guides/${slug.join('/')}`
  const item = await getGuide(path)

  if (!item) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 md:pt-48 md:pb-24">
        <Link
          href="/guides"
          className="inline-flex items-center text-primary-400 hover:text-primary-900 mb-8 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Guides
        </Link>
        <h1 className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary-950 leading-[0.95] mb-8">
          {item.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-primary-400 mb-12">
          {(item as any).readingTime && <span>{(item as any).readingTime}</span>}
          {(item as any).authorName && <span>{(item as any).authorName}</span>}
        </div>

        {(item as any).image?.url && (
          <div className="relative h-64 md:h-96 rounded-sm overflow-hidden mb-12">
            <ResponsiveImage
              src={(item as any).image.url}
              alt={(item as any).image.alt || item.title}
              fill
              className="object-cover"
              variations={(item as any).image.variations}
              targetWidth={800}
            />
          </div>
        )}

        {(item as any).body?.processed && (
          <div
            className="prose prose-lg max-w-none prose-headings:font-mono prose-headings:tracking-tight prose-a:text-accent-500"
            dangerouslySetInnerHTML={{ __html: (item as any).body.processed }}
          />
        )}
      </main>
    </div>
  )
}
