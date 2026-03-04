// Shared types
export interface DrupalImage {
  url: string
  alt?: string
  width?: number
  height?: number
  variations?: ImageVariation[]
}

export interface ImageVariation {
  name: string
  url: string
  width: number
  height: number
}

export interface DrupalTerm {
  id: string
  name: string
  path?: string
}

// Base node type
export interface DrupalNode {
  __typename?: string
  id: string
  title: string
  path: string
  created?: {
    timestamp: number
  }
  changed?: {
    timestamp: number
  }
}

// Paragraph types
export interface DrupalStatItem {
  id: string
  number: string
  label: string
}

// Homepage
export interface DrupalHomepage extends DrupalNode {
  heroTitle?: string
  heroSubtitle?: string
  heroDescription?: {
    processed: string
  }
  statsItems?: DrupalStatItem[]
  featuredGuidesTitle?: string
  ctaTitle?: string
  ctaDescription?: {
    processed: string
  }
  ctaPrimary?: string
  ctaSecondary?: string
}

export interface HomepageData {
  nodeHomepages: {
    nodes: DrupalHomepage[]
  }
}

// Guide
export interface DrupalGuide extends DrupalNode {
  body?: {
    processed: string
    summary?: string
  }
  difficultyLevel?: DrupalTerm[]
  readingTime?: string
  topicArea?: DrupalTerm[]
  prerequisites?: string[]
  authorName?: string
  lastUpdated?: {
    timestamp: number
  }
  image?: DrupalImage
}

export interface GuidesData {
  nodeGuides: {
    nodes: DrupalGuide[]
  }
}

// API Reference
export interface DrupalApiReference extends DrupalNode {
  body?: {
    processed: string
    summary?: string
  }
  httpMethod?: string
  endpointPath?: string
  apiVersion?: string
  authRequired?: boolean
  rateLimit?: string
  parameters?: string[]
  responseCodes?: string[]
}

export interface ApiReferencesData {
  nodeApiReferences: {
    nodes: DrupalApiReference[]
  }
}

// Changelog
export interface DrupalChangelog extends DrupalNode {
  body?: {
    processed: string
    summary?: string
  }
  versionNumber?: string
  releaseDate?: {
    timestamp: number
  }
  releaseType?: DrupalTerm[]
  breakingChanges?: boolean
  highlights?: string[]
}

export interface ChangelogsData {
  nodeChangelogs: {
    nodes: DrupalChangelog[]
  }
}

// Basic Page
export interface DrupalPage extends DrupalNode {
  body?: {
    processed: string
  }
}

// Feature color type
export type FeatureColor = 'blue' | 'green' | 'purple' | 'yellow' | 'red' | 'indigo'
