import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const today = new Date().toISOString().split('T')[0];

  // Static pages sitemap
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/guides/', priority: '0.9', changefreq: 'weekly' },
    { url: '/farming/', priority: '0.8', changefreq: 'weekly' },
    { url: '/fishing/', priority: '0.8', changefreq: 'weekly' },
    { url: '/mining/', priority: '0.8', changefreq: 'weekly' },
    { url: '/social/', priority: '0.8', changefreq: 'weekly' },
    { url: '/seasons/', priority: '0.7', changefreq: 'monthly' },
    { url: '/skills/', priority: '0.7', changefreq: 'monthly' },
    { url: '/quests/', priority: '0.7', changefreq: 'monthly' },
    { url: '/items/', priority: '0.7', changefreq: 'monthly' },
    { url: '/locations/', priority: '0.7', changefreq: 'monthly' },
    { url: '/basics/', priority: '0.8', changefreq: 'weekly' },
    { url: '/foraging/', priority: '0.7', changefreq: 'monthly' },
    { url: '/combat/', priority: '0.7', changefreq: 'monthly' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>https://stardewguide.xyz${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
};