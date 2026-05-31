import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import fs from 'fs';
import path from 'path';

export const GET: APIRoute = async () => {
  const today = new Date().toISOString().split('T')[0];
  
  // Collect all images from the guides collection
  const guides = await getCollection('guides');
  const guideImages: Set<string> = new Set();
  
  guides.forEach(g => {
    if (g.data.image) {
      guideImages.add(g.data.image);
    }
  });

  // Static images from public/images directory
  const staticImages = [
    '/images/farming-banner.jpg',
    '/images/fishing-banner.jpg',
    '/images/mining-banner.jpg',
    '/images/social-banner.jpg',
    '/images/foraging-banner.jpg',
    '/images/combat-banner.jpg',
    '/images/seasons-banner.jpg',
    '/images/spring-banner.jpg',
    '/images/summer-banner.jpg',
    '/images/fall-banner.jpg',
    '/images/winter-banner.jpg',
    '/images/getting-started-illustration.jpg',
    '/images/year-one-illustration.jpg',
    '/images/community-center-illustration.jpg',
    '/images/skull-cavern-illustration.jpg',
    '/images/greenhouse-illustration.jpg',
    '/images/fishing-illustration.jpg',
    '/images/money-guide-illustration.jpg',
    '/images/mastery-cave.jpg',
    '/images/ginger-island-south.jpg',
    '/images/ginger-island-west.jpg',
    '/images/ginger-island-north.jpg',
    '/images/ginger-island-east.jpg',
    '/images/ginger-island-pirate-cove.jpg',
    '/favicon.svg',
  ];

  // Combine all images
  const allImages = [...new Set([...staticImages, ...guideImages])];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allImages.map(img => {
  const imageName = img.split('/').pop()?.replace(/\.[^/.]+$/, '') || 'image';
  return `  <url>
    <loc>https://stardewguide.xyz${img}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
    <image:image>
      <image:loc>https://stardewguide.xyz${img}</image:loc>
      <image:title>${imageName}</image:title>
      <image:caption>Stardew Valley guide image: ${imageName}</image:caption>
    </image:image>
  </url>`;
}).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
};