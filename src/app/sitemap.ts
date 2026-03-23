import { MetadataRoute } from 'next';
import industries from '@/data/industries.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://roi-agent.vercel.app';
  
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/consultation`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  const industryRoutes = industries.map((ind) => ({
    url: `${baseUrl}/industry/${ind.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...routes, ...industryRoutes];
}
