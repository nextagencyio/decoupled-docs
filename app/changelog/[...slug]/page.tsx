import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import Link from 'next/link'
import { getServerApolloClient } from '@/lib/apollo-client'
import { GET_CHANGELOG_BY_PATH } from '@/lib/queries'
import { DrupalChangelog } from '@/lib/types'
import Header from '../../components/Header'
import { ArrowLeft } from 'lucide-react'

export const revalidate = 300

interface PageProps {
  params: Promise<{ slug: string[] }>
}

interface ChangelogByPathData {
  route: {
    entity: DrupalChangelog
  } | null
}

async function getChangelog(path: string): Promise<DrupalChangelog | null> {
  try {
    const requestHeaders = await headers()
    const apolloClient = getServerApolloClient(requestHeaders)
    const { data } = await apolloClient.query<ChangelogByPathData>({
      query: GET_CHANGELOG_BY_PATH,
      variables: { path },
      fetchPolicy: 'cache-first',
    })
    return data?.route?.entity || null
  } catch (error) {
    console.error('Error fetching changelog:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const path = `/changelog/${slug.join('/')}`
  const item = await getChangelog(path)

  if (!item) {
    return { title: 'Changelog Not Found | OpenDocs' }
  }

  return {
    title: `${item.title} | OpenDocs`,
    description: ((item as any).body?.processed ? (item as any).body.processed.replace(/<[^>]*>/g, '').substring(0, 160) : '') || `Learn more about ${item.title}.`,
  }
}

export default async function ChangelogDetailPage({ params }: PageProps) {
  const { slug } = await params
  const path = `/changelog/${slug.join('/')}`
  const item = await getChangelog(path)

  if (!item) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 md:pt-48 md:pb-24">
        <Link
          href="/changelog"
          className="inline-flex items-center text-primary-400 hover:text-primary-900 mb-8 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Changelog
        </Link>
        <h1 className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary-950 leading-[0.95] mb-8">
          {item.title}
        </h1>

        {(item as any).versionNumber && (
          <div className="text-sm text-primary-400 mb-12">
            <span className="font-mono bg-primary-50 px-3 py-1 rounded">v{(item as any).versionNumber}</span>
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
