/* eslint-disable react/jsx-props-no-spreading */
import '../view/styles/globals.css';
import type { AppProps } from 'next/app';

import { Layout } from '../view/layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
