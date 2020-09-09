import type { GetStaticProps, GetStaticPaths } from 'next';

import { getPersons } from '../../model/sanity/sanity-client';
import { OverOnsSection } from '../../view/sections/over-ons';
import type { Persons } from '../../model/types';

interface Props {
  persons: Persons;
}

const OverOnsDetail = ({ persons }: Props) => {
  return <OverOnsSection persons={persons} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const persons = await getPersons();
  const paths = Object.keys(persons).map((personId) => ({ params: { personId } }));

  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const persons = await getPersons();

  return {
    props: { persons },
  };
};

export default OverOnsDetail;
