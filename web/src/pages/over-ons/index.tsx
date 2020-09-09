import type { GetStaticProps } from 'next';

import { getPersons } from '../../model/sanity/sanity-client';
import type { Persons } from '../../model/types';
import { OverOnsSection } from '../../view/sections/over-ons';

interface Props {
  persons: Persons;
}

const OverOns = ({ persons }: Props) => {
  return <OverOnsSection persons={persons} />;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const persons = await getPersons();

  return {
    props: { persons },
  };
};

export default OverOns;
