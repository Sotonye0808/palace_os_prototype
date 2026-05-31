import type { JsonObject } from '@/types/json-ld'

/**
 * Organization JSON-LD schema
 */
export function getOrganizationJsonLd(): JsonObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Palace OS',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://palaceos.com',
    logo: `${process.env.NEXT_PUBLIC_APP_URL || 'https://palaceos.com'}/logo.png`,
    description: 'Hospitality management system for Folixx Bukka and Secrets Palace',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-234-567-8900',
      contactType: 'Customer Service',
    },
  }
}

/**
 * Website JSON-LD schema
 */
export function getWebSiteJsonLd(): JsonObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Palace OS',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://palaceos.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_APP_URL || 'https://palaceos.com'}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * MenuItem JSON-LD schema
 */
export function getMenuItemJsonLd(menuItem: {
  id: string
  name: string
  description: string
  image: string
  price: number
  category: string
  brand: 'folixx-bukka' | 'secrets-palace'
}): JsonObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'MenuItem',
    name: menuItem.name,
    description: menuItem.description,
    image: menuItem.image,
    offers: {
      '@type': 'Offer',
      price: menuItem.price.toString(),
      priceCurrency: 'NGN',
      availability: 'https://schema.org/InStock',
    },
    menuSection: {
      '@type': 'MenuSection',
      name: menuItem.category,
    },
    brand: {
      '@type': 'Brand',
      name:
        menuItem.brand === 'folixx-bukka'
          ? 'Folixx Bukka'
          : 'Secrets Palace',
    },
  }
}

/**
 * Event JSON-LD schema
 */
export function getEventJsonLd(event: {
  id: string
  name: string
  description: string
  image: string
  startDate: string
  endDate: string
  location: string
  brand: 'secrets-palace'
}): JsonObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    image: event.image,
    startDate: event.startDate,
    endDate: event.endDate,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lagos',
        addressRegion: 'Lagos State',
        addressCountry: 'NG',
      },
    },
    brand: {
      '@type': 'Brand',
      name: 'Secrets Palace',
    },
  }
}

/**
 * BreadcrumbList JSON-LD schema
 */
export function getBreadcrumbJsonLd(
  breadcrumbs: { label: string; href: string }[]
): JsonObject {
  const items = breadcrumbs.map((breadcrumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: breadcrumb.label,
    item: breadcrumb.href,
  }))

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }
}