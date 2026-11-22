import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const out = process.argv[2] ?? 'dist';
const knownOrigin = process.env.COLQ_ENV === 'production' ? process.env.COLQ_SITE_URL : undefined;
const origin = 'https://local.invalid';
const catalog = JSON.parse(readFileSync('data/legacy/library.json', 'utf8'));
const manifest = JSON.parse(readFileSync('data/legacy/manifest.json', 'utf8'));
const pages = new Map(readdirSync(out, { recursive: true })
  .filter((file) => file.endsWith('.html'))
  .map((file) => [String(file).replaceAll('\\', '/'), readFileSync(join(out, file), 'utf8')]));
const expectedAssetUrls = new Set(manifest.objects.map(({ key }) => `${catalog.publicAssetOrigin}/${key}`));

function fileFor(pathname) {
  if (pathname.endsWith('/')) return pathname.slice(1) + 'index.html';
  return pathname.slice(1);
}

function htmlAt(route) {
  const content = pages.get(fileFor(route));
  assert.ok(content, route);
  return content;
}

const previousPaths = readFileSync('docs/architecture/url-inventory.csv', 'utf8').trim().split(/\r?\n/).slice(1)
  .map((line) => line.split(',')[0])
  .filter(Boolean);
assert.equal(previousPaths.length, 223);
for (const route of previousPaths) assert.ok(existsSync(join(out, fileFor(route))), route);
for (const file of ['library.json', 'provenance.json']) {
  assert.deepEqual(readFileSync(join(out, 'data', file)), readFileSync(`data/legacy/${file}`));
}
assert.equal(pages.size, 226);

let links = 0;
for (const [file, html] of pages) {
  assert.match(html, /<html\b[^>]*\blang="vi"/);
  assert.match(html, /<h1\b/);
  const pathname = '/' + file.replace(/index\.html$/, '');
  const context = new URL(pathname, origin);
  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const target = new URL(href, context);
    if (target.origin !== origin) continue;
    const file = fileFor(target.pathname);
    assert.ok(existsSync(join(out, file)), `${pathname} → ${href}`);
    if (target.hash) {
      assert.ok(pages.get(file)?.includes(`id="${decodeURIComponent(target.hash.slice(1))}"`), `${pathname} → ${href}`);
    }
    links++;
  }
  for (const [, src] of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) {
    assert.ok(expectedAssetUrls.has(src), src);
  }
  if (!knownOrigin) assert.match(html, /content="noindex, follow"/);
}

const records = [...catalog.records, ...catalog.auxiliary];
for (const record of records) {
  const html = htmlAt(record.href);
  assert.match(html, /<nav[^>]*aria-label="Đường dẫn trang"/);
  assert.ok(html.includes(record.name.replaceAll('&', '&amp;')), record.href);
}
const equipment = htmlAt('/trang-bi/');
assert.equal((equipment.match(/class="equipment-card-link"/g) ?? []).length, 22);
assert.equal(records.filter(({ category }) => category === 'quests').reduce((count, record) =>
  count + (htmlAt(record.href).match(/<span class="gold-reward"/g) ?? []).length, 0), 15);
assert.equal(records.filter(({ category }) => category === 'quests').reduce((count, record) =>
  count + (htmlAt(record.href).match(/Số lượng mặc định theo quy ước thư viện/g) ?? []).length, 0), 4);

const sitemap = readFileSync(join(out, 'sitemap.xml'), 'utf8');
const robots = readFileSync(join(out, 'robots.txt'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]));
if (knownOrigin) {
  assert.equal(urls.length, 221);
  assert.equal(new Set(urls.map(({ pathname }) => pathname)).size, 221);
  for (const url of urls) {
    assert.equal(url.origin, new URL(knownOrigin).origin);
    const html = htmlAt(url.pathname);
    assert.ok(html.includes(`rel="canonical" href="${url.href}"`));
    assert.doesNotMatch(html, /content="noindex, follow"/);
  }
  assert.ok(robots.includes('Sitemap: ' + new URL('/sitemap.xml', knownOrigin).href));
  for (const route of ['/doi-hinh/', '/binh-chon/', '/cong-cu/', '/lien-he/', '/404.html']) {
    assert.match(htmlAt(route), /content="noindex, follow"/);
  }
} else {
  assert.equal(urls.length, 0);
  assert.doesNotMatch(robots, /Sitemap:/);
}

console.log(`${pages.size} HTML, ${previousPaths.length} URL cũ, ${links} liên kết nội bộ, 22 ô trang bị, 15 avatar vàng. SEO ${knownOrigin ? 'production' : 'staging'} đạt.`);
