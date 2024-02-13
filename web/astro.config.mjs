import netlify from '@astrojs/netlify';
import solidJs from '@astrojs/solid-js';
import { imageService } from '@unpic/astro/service';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify(),
  integrations: [solidJs(), icon()],
  image: {
    service: imageService(),
  },
});
