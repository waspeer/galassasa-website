import { parseEnv, z } from 'znv';

export const env = parseEnv(import.meta.env, {
  SANITY_PROJECT_ID: z.string(),
  SANITY_DATASET: z.string(),
});
