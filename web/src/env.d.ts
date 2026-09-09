/// <reference types="astro/client" />

// micromorph's package.json "exports" map has no "types" condition, so the
// spa.d.ts it ships is unreachable under moduleResolution "bundler". The package
// has been unmaintained since 2023, so declare the entrypoint we use ourselves.
declare module 'micromorph/spa' {
  interface Options {
    beforeDiff?: (newDocument: Document) => void | Promise<void>;
    afterDiff?: () => void | Promise<void>;
    include?: string | ((element: HTMLAnchorElement) => boolean);
    scrollToTop?: boolean;
  }

  export default function listen(opts?: Options): void;
}
