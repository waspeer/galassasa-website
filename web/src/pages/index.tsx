import type { GetStaticProps } from 'next';

import type { WithSeo } from '../model/types';
import { getStudioInfo, getStudioOpenGraphImage } from '../model/sanity/sanity-client';

type Props = WithSeo;

export default function Home() {
  return null;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
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
