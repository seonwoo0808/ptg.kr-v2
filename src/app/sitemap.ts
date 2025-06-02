import { getAllArticleMetas } from '@/lib/articles'
import type { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const metadatas = await getAllArticleMetas()
  const sitemap: MetadataRoute.Sitemap = [
    {
      url: 'https://ptg.kr',
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://ptg.kr/about',
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'yearly',
      priority: 0.9,
    },
    {
      url: 'https://ptg.kr/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://ptg.kr/portfolio',
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://ptg.kr/statistics',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://ptg.kr/uses',
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'yearly',
      priority: 0.9,
    },
  ]
  metadatas.forEach((metadata) => {
    sitemap.push({
      url: `https://ptg.kr/blog/${encodeURIComponent(metadata.key)}`,
      lastModified: metadata.modifiedDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  })
  return sitemap 
}