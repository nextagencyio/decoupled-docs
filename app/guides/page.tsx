import { Metadata } from 'next'
import { headers } from 'next/headers'
import { getServerApolloClient } from '@/lib/apollo-client'
import { GET_GUIDES } from '@/lib/queries'
import { GuidesData } from '@/lib/types'
import Header from '../components/Header'
import GuideCard from '../components/GuideCard'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Guides | OpenDocs',
  description: 'Developer guides and tutorials.',
}

async function getGuides() {
  try {
    const requestHeaders = await headers()
    const apolloClient = getServerApolloClient(requestHeaders)
    const { data } = await apolloClient.query<GuidesData>({
      query: GET_GUIDES,
      variables: { first: 50 },
      fetchPolicy: 'cache-first',
    })
    return data?.nodeGuides?.nodes || []
  } catch (error) {
    console.error('Error fetching guides:', error)
    return []
  }
}

export default async function GuidesPage() {
  const items = await getGuides()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-32 pb-16 md:pt-48 md:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-mono text-5xl md:text-7xl font-bold tracking-tight text-primary-950 leading-[0.9]">
            Guides
          </h1>
          <p className="text-lg text-primary-400 mt-6 max-w-xl">
            Step-by-step tutorials and how-to articles.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-primary-400">Guides will appear here once content is imported.</p>
            </div>
          ) : (
            <div className="border-t border-primary-200">
              {items.map((item) => (
                <GuideCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
