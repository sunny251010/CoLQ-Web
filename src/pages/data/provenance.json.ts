import type { APIRoute } from 'astro';
import snapshot from '../../../data/legacy/provenance.json?raw';

export const GET: APIRoute = () => new Response(snapshot, {
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
});
