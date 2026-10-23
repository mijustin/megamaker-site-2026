import { isPreview } from '../lib/indexing';

export function GET() {
  return new Response(isPreview
    ? 'User-agent: *\nDisallow: /\n'
    : 'User-agent: *\nAllow: /\n\nSitemap: https://megamaker.co/sitemap-index.xml\n',
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
