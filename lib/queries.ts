import { gql } from '@apollo/client'

// Homepage query with stats
export const GET_HOMEPAGE_DATA = gql`
  query GetHomepageData {
    nodeHomepages(first: 1) {
      nodes {
        id
        title
        path
        heroTitle
        heroSubtitle
        heroDescription {
          processed
        }
        statsItems {
          ... on ParagraphStatItem {
            id
            number
            label
          }
        }
        featuredGuidesTitle
        ctaTitle
        ctaDescription {
          processed
        }
        ctaPrimary
        ctaSecondary
      }
    }
  }
`

// Guides
export const GET_GUIDES = gql`
  query GetGuides($first: Int = 20) {
    nodeGuides(first: $first, sortKey: TITLE) {
      nodes {
        id
        title
        path
        ... on NodeGuide {
          body {
            processed
            summary
          }
          difficultyLevel {
            ... on TermInterface {
              id
              name
            }
          }
          readingTime
          topicArea {
            ... on TermInterface {
              id
              name
            }
          }
          prerequisites
          authorName
          lastUpdated {
            timestamp
          }
          image {
            url
            alt
            width
            height
            variations(styles: [LARGE, MEDIUM]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

export const GET_GUIDE_BY_PATH = gql`
  query GetGuideByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeGuide {
            id
            title
            path
            body {
              processed
            }
            difficultyLevel {
              ... on TermInterface {
                id
                name
              }
            }
            readingTime
            topicArea {
              ... on TermInterface {
                id
                name
              }
            }
            prerequisites
            authorName
            lastUpdated {
              timestamp
            }
            image {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM]) {
                name
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`

// API References
export const GET_API_REFERENCES = gql`
  query GetApiReferences($first: Int = 50) {
    nodeApiReferences(first: $first, sortKey: TITLE) {
      nodes {
        id
        title
        path
        ... on NodeApiReference {
          body {
            processed
            summary
          }
          httpMethod
          endpointPath
          apiVersion
          authRequired
          rateLimit
          parameters
          responseCodes
        }
      }
    }
  }
`

export const GET_API_REFERENCE_BY_PATH = gql`
  query GetApiReferenceByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeApiReference {
            id
            title
            path
            body {
              processed
            }
            httpMethod
            endpointPath
            apiVersion
            authRequired
            rateLimit
            parameters
            responseCodes
          }
        }
      }
    }
  }
`

// Changelogs
export const GET_CHANGELOGS = gql`
  query GetChangelogs($first: Int = 20) {
    nodeChangelogs(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        ... on NodeChangelog {
          body {
            processed
            summary
          }
          versionNumber
          releaseDate {
            timestamp
          }
          releaseType {
            ... on TermInterface {
              id
              name
            }
          }
          breakingChanges
          highlights
        }
      }
    }
  }
`

export const GET_CHANGELOG_BY_PATH = gql`
  query GetChangelogByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeChangelog {
            id
            title
            path
            body {
              processed
            }
            versionNumber
            releaseDate {
              timestamp
            }
            releaseType {
              ... on TermInterface {
                id
                name
              }
            }
            breakingChanges
            highlights
          }
        }
      }
    }
  }
`

// Generic route query for pages and other content
export const GET_NODE_BY_PATH = gql`
  query GetNodeByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodePage {
            id
            title
            body {
              processed
            }
          }
          ... on NodeGuide {
            id
            title
            path
            body {
              processed
            }
            difficultyLevel {
              ... on TermInterface {
                id
                name
              }
            }
            readingTime
            topicArea {
              ... on TermInterface {
                id
                name
              }
            }
            prerequisites
            authorName
            lastUpdated {
              timestamp
            }
            image {
              url
              alt
              width
              height
            }
          }
          ... on NodeApiReference {
            id
            title
            path
            body {
              processed
            }
            httpMethod
            endpointPath
            apiVersion
            authRequired
            rateLimit
            parameters
            responseCodes
          }
          ... on NodeChangelog {
            id
            title
            path
            body {
              processed
            }
            versionNumber
            releaseDate {
              timestamp
            }
            releaseType {
              ... on TermInterface {
                id
                name
              }
            }
            breakingChanges
            highlights
          }
          ... on NodeHomepage {
            id
            title
            heroTitle
            heroSubtitle
            heroDescription {
              processed
            }
            statsItems {
              ... on ParagraphStatItem {
                id
                number
                label
              }
            }
            featuredGuidesTitle
            ctaTitle
            ctaDescription {
              processed
            }
            ctaPrimary
            ctaSecondary
          }
        }
      }
    }
  }
`

// Featured guides for homepage (limit to 3)
export const GET_FEATURED_GUIDES = gql`
  query GetFeaturedGuides {
    nodeGuides(first: 3, sortKey: TITLE) {
      nodes {
        id
        title
        path
        ... on NodeGuide {
          difficultyLevel {
            ... on TermInterface {
              id
              name
            }
          }
          readingTime
          topicArea {
            ... on TermInterface {
              id
              name
            }
          }
          image {
            url
            alt
            variations(styles: [MEDIUM]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

// Latest changelogs for homepage
export const GET_LATEST_CHANGELOGS = gql`
  query GetLatestChangelogs {
    nodeChangelogs(first: 3, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        ... on NodeChangelog {
          versionNumber
          releaseDate {
            timestamp
          }
          releaseType {
            ... on TermInterface {
              id
              name
            }
          }
          breakingChanges
          highlights
        }
      }
    }
  }
`
