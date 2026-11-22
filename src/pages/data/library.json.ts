import type { APIRoute } from 'astro';
import snapshot from '../../../data/legacy/library.json?raw';

export const GET: APIRoute = () => new Response(snapshot, {
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
});
