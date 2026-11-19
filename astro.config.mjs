import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jeeveshverma.github.io',
  base: '/tu-parada-cuenca',
  trailingSlash: 'always',
  build: { format: 'directory', assets: '_tp', inlineStylesheets: 'always' },
  compressHTML: true,
  devToolbar: { enabled: false },
  image: { responsiveStyles: false },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
});
