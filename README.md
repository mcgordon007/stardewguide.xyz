# Stardew Valley Guide

A comprehensive Stardew Valley guide website built with [Astro](https://astro.build).

## Development

```bash
npm install
npm run dev
```

## Deployment (Cloudflare Pages)

1. Push this project to a GitHub repository.
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/) and click **Create a project**.
3. Connect your GitHub repository.
4. Configure the build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** `18` (or higher)
5. Click **Save and Deploy**. Cloudflare Pages will automatically build and deploy your site.

### Automatic Deployments

Once connected, Cloudflare Pages will automatically redeploy your site whenever you push changes to the connected branch (e.g., `main`).
