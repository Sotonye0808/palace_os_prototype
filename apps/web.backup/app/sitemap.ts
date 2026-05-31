// Sitemap generator for Palace OS
// Generated dynamically based on CMS data and static routes

import { MetadataRoute } from 'next'
import { createCMSService } from '@/lib/services/cms'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cmsService = createCMSService()
  
  try {
    const appConfig = await cmsService.getAppConfig()
    
    // Base URLs for both brands
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://palaceos.com'
    
    // Static routes that are always available
    const staticRoutes: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}/`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/bukka/menu`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/palace/events`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/cart`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/account`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/referral`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      },
    ]
    
    // Dynamic routes from CMS data
    const dynamicRoutes: MetadataRoute.Sitemap = []
    
    // Add menu items if available
    if (appConfig.menuConfig?.categories) {
      appConfig.menuConfig.categories.forEach((category) => {
        category.items.forEach((item) => {
          dynamicRoutes.push({
            url: `${baseUrl}/bukka/menu/${item.id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
          })
        })
      })
    }
    
    // Add events if available (for Palace brand)
    // This would come from events CMS or database in a real implementation
    const eventRoutes = [
      {
        url: `${baseUrl}/palace/events/lagos-jazz-night`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/palace/events/afrobeat-fusion`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/palace/events/comedy-night-live`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
    ]
    
    return [...staticRoutes, ...dynamicRoutes, ...eventRoutes]
  } catch (error) {
    console.error('Failed to generate sitemap:', error)
    // Return basic sitemap on error
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://palaceos.com'
    return [
      {
        url: `${baseUrl}/`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/bukka/menu`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/palace/events`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
    ]
  }
}