import { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/contact';

const routes = ['', '/about', '/services', '/faq', '/contact'];
const locales = ['ar', 'en'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.7
      });
    }
  }

  return entries;
}
