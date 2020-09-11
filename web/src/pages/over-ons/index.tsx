import type { GetStaticProps } from 'next';

import {
  getPersons,
  getStudioOpenGraphImage,
  getStudioInfo,
} from '../../model/sanity/sanity-client';
import type { Persons, WithSeo } from '../../model/types';
import { OverOnsSection } from '../../view/sections/over-ons';

interface Props extends WithSeo {
  persons: Persons;
}

const OverOns = ({ persons }: Props) => {
  return <OverOnsSection persons={persons} />;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const openGraphImage = await getStudioOpenGraphImage();
  const persons = await getPersons();
  const studioInfo = await getStudioInfo();

  return {
    props: {
      persons,
      seo: {
        description: studioInfo.shortDescription,
        openGraphImage,
        title: 'Over Ons',
      },
    },
  };
};

export default OverOns;
