import { Metadata } from 'next'
import { headers } from 'next/headers'
import { getServerApolloClient } from '@/lib/apollo-client'
import { GET_CHANGELOGS } from '@/lib/queries'
import { ChangelogsData } from '@/lib/types'
import Header from '../components/Header'
import ChangelogCard from '../components/ChangelogCard'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Changelog | OpenDocs',
  description: 'Latest updates and release notes.',
}

async function getChangelogs() {
  try {
    const requestHeaders = await headers()
    const apolloClient = getServerApolloClient(requestHeaders)
    const { data } = await apolloClient.query<ChangelogsData>({
      query: GET_CHANGELOGS,
      variables: { first: 50 },
      fetchPolicy: 'cache-first',
    })
    return data?.nodeChangelogs?.nodes || []
  } catch (error) {
    console.error('Error fetching changelogs:', error)
    return []
  }
}

export default async function ChangelogsPage() {
  const items = await getChangelogs()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-32 pb-16 md:pt-48 md:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-mono text-5xl md:text-7xl font-bold tracking-tight text-primary-950 leading-[0.9]">
            Changelog
          </h1>
          <p className="text-lg text-primary-400 mt-6 max-w-xl">
            Latest updates, fixes, and improvements.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-primary-400">Changelog entries will appear here once content is imported.</p>
            </div>
          ) : (
            <div className="border-t border-primary-200">
              {items.map((item) => (
                <ChangelogCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
