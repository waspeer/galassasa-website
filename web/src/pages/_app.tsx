/* eslint-disable react/jsx-props-no-spreading */
import '../view/styles/globals.css';
import type { AppProps } from 'next/app';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import type { WithSeo } from '../model/types';
import { Layout } from '../view/layout';

const BASE_URL = process.env.NEXT_PUBLIC_DEPLOYMENT_URL;

function MyApp({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();
  const { description, openGraphInfo = {}, openGraphImage, title } = (pageProps as WithSeo).seo;

  return (
    <>
      <NextSeo
        description={description}
        title={title}
        titleTemplate="%s <> Galassasa"
        openGraph={{
          description,
          images: [openGraphImage],
          url: new URL(asPath, BASE_URL).toString(),
          site_name: 'Studio Galassasa',
          title,
          type: 'website',
          ...openGraphInfo,
        }}
      />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
