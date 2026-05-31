import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const guides = await getCollection('guides');
  const today = new Date().toISOString().split('T')[0];

  // Guide pages sitemap with detailed metadata
  const guidePages = guides.map(g => {
    const slug = g.id.replace(/\.md$/, '');
    const dateModified = g.data.updated ? g.data.updated.toISOString().split('T')[0] : 
                         (g.data.date ? g.data.date.toISOString().split('T')[0] : today);
    const priority = g.data.featured ? '0.9' : '0.8';
    
    return {
      url: `/guides/${slug}/`,
      lastmod: dateModified,
      priority,
      changefreq: 'monthly',
      category: g.data.category || '',
      title: g.data.title || '',
      image: g.data.image || ''
    };
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${guidePages.map(page => `  <url>
    <loc>https://stardewguide.xyz${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${page.image ? `<image:image>
      <image:loc>https://stardewguide.xyz${page.image}</image:loc>
      <image:title>${page.title}</image:title>
    </image:image>` : ''}
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
};