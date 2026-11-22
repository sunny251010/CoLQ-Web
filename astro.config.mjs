import { defineConfig } from 'astro/config';

const mode = process.env.COLQ_ENV ?? 'staging';
if (mode !== 'staging' && mode !== 'production') {
  throw new Error('COLQ_ENV phải là staging hoặc production.');
}

let site;
if (mode === 'production') {
  const origin = process.env.COLQ_SITE_URL;
  if (!origin) throw new Error('COLQ_SITE_URL là bắt buộc khi COLQ_ENV=production.');
  const url = new URL(origin);
  if (url.protocol !== 'https:' || (origin !== url.origin && origin !== url.origin + '/')) {
    throw new Error('COLQ_SITE_URL phải là một origin HTTPS hợp lệ.');
  }
  site = url.origin;
}

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
