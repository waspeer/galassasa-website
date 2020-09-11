import type { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';

import { getStudioInfo, getStudioOpenGraphImage } from '../model/sanity/sanity-client';
import type { WithSeo } from '../model/types';

const NotFound = () => {
  return (
    <div className="flex flex-col max-w-md mx-auto h-screen justify-center text-center">
      <h1 className="font-bold text-xl uppercase">Niet gevonden</h1>
      <p>De pagina waar je naar zoekt kon niet worden gevonden.</p>
      <p>
        <Link href="/">
          <a className="underline">Klik hier</a>
        </Link>{' '}
        om naar de homepagina te gaan.
      </p>
    </div>
  );
};

export const getStaticProps: GetStaticProps<WithSeo> = async () => {
  const openGraphImage = await getStudioOpenGraphImage();
  const studioInfo = await getStudioInfo();

  return {
    props: {
      seo: {
        description: studioInfo.shortDescription,
        openGraphImage,
        title: 'Studio',
      },
    },
  };
};

export default NotFound;
