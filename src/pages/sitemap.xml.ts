import type { APIRoute } from 'astro';
import { categories, libraryCategories, records } from '../lib/library';

export const GET: APIRoute = ({ site }) => {
  const routes = ['/', '/thu-vien/', '/gioi-thieu/', '/huong-dan/', '/du-lieu/', ...libraryCategories.map((key) => categories[key].path), ...records.map(({ href }) => href)];
  const locations = site ? routes.map((route) => `  <url><loc>${new URL(route, site).href}</loc></url>`).join('\n') : '';
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locations}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
