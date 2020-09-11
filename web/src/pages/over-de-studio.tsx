import type { GetStaticProps } from 'next';

import { getStudioInfo, getStudioOpenGraphImage } from '../model/sanity/sanity-client';
import type { StudioInfo, WithSeo } from '../model/types';
import { OverDeStudioSection } from '../view/sections/over-de-studio';

interface Props extends WithSeo {
  studioInfo: StudioInfo;
}

const OverDeStudio = ({ studioInfo }: Props) => {
  return <OverDeStudioSection studioInfo={studioInfo} />;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const studioInfo = await getStudioInfo();
  const openGraphImage = await getStudioOpenGraphImage();

  return {
    props: {
      seo: {
        description: studioInfo.shortDescription,
        openGraphImage,
        title: 'Over de Studio',
      },
      studioInfo,
    },
  };
};

export default OverDeStudio;
