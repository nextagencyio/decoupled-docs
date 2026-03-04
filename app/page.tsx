import HomepageRenderer from './components/HomepageRenderer'
import SetupGuide from './components/SetupGuide'
import ContentSetupGuide from './components/ContentSetupGuide'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import { getServerApolloClient } from '../lib/apollo-client'
import { GET_HOMEPAGE_DATA } from '../lib/queries'
import { HomepageData } from '../lib/types'
import { checkConfiguration } from '../lib/config-check'

// Enable ISR with 1 hour revalidation
export const revalidate = 3600

async function getHomepageData(apolloClient: ReturnType<typeof getServerApolloClient>): Promise<HomepageData | null> {
  try {
    const { data } = await apolloClient.query<HomepageData>({
      query: GET_HOMEPAGE_DATA,
      fetchPolicy: 'cache-first',
    })
    return data
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'OpenDocs - Documentation for Developers'
  const description = 'Everything you need to build, deploy, and scale. From quickstart guides to full API reference, our documentation helps you ship with confidence.'

  return {
    title,
    description,
    keywords: ['API documentation', 'developer docs', 'REST API', 'SDK', 'developer platform', 'API reference', 'developer guides'],
    openGraph: {
      title: `${title} - Developer Documentation`,
      description,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} - Developer Documentation`,
      description,
    },
  }
}

export default async function Home() {
  const configStatus = checkConfiguration()

  if (!configStatus.isConfigured) {
    return <SetupGuide missingVars={configStatus.missingVars} />
  }

  const requestHeaders = await headers()
  const apolloClient = getServerApolloClient(requestHeaders)
  const data = await getHomepageData(apolloClient)
  const homepageContent = data?.nodeHomepages?.nodes?.[0]

  if (!homepageContent) {
    const drupalBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
    return <ContentSetupGuide drupalBaseUrl={drupalBaseUrl} />
  }

  return <HomepageRenderer homepageContent={homepageContent} />
}
