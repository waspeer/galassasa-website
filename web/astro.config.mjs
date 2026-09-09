import netlify from '@astrojs/netlify';
import solidJs from '@astrojs/solid-js';
import { imageService } from '@unpic/astro/service';
import { defineConfig, envField } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify(),
  integrations: [solidJs(), icon()],

  // Astro 7 changed the default to 'jsx', which also strips whitespace *between*
  // inline elements the way JSX does — that silently glues words together in
  // prose. Keep the pre-7 behaviour.
  compressHTML: true,

  env: {
    schema: {
      SANITY_PROJECT_ID: envField.string({ context: 'server', access: 'public' }),
      SANITY_DATASET: envField.string({ context: 'server', access: 'public' }),
    },
  },

  image: {
    service: imageService(),
    domains: ['cdn.sanity.io'],
  },
});
