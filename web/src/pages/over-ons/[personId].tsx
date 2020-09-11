import type { ParsedUrlQuery } from 'querystring';

import type { GetStaticProps, GetStaticPaths } from 'next';

import { portableToPlainText } from '../../lib/utils';
import { getPersons, getPersonOpenGraphImage } from '../../model/sanity/sanity-client';
import { OverOnsSection } from '../../view/sections/over-ons';
import type { Persons, WithSeo, PersonId } from '../../model/types';

interface Props extends WithSeo {
  persons: Persons;
}

interface Params extends ParsedUrlQuery {
  personId: string;
}

const OverOnsDetail = ({ persons }: Props) => {
  return <OverOnsSection persons={persons} />;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const persons = await getPersons();
  const paths = Object.keys(persons).map((personId) => ({ params: { personId } }));

  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const { personId } = params!;

  const persons = await getPersons();
  const openGraphImage = await getPersonOpenGraphImage(personId);

  const person = persons[personId as PersonId];
  const plainBio = portableToPlainText(person.bio);

  return {
    props: {
      persons,
      seo: {
        description: plainBio,
        openGraphInfo: {
          type: 'profile',
          title: `${person.firstName} ${person.lastName}`,
          description: plainBio,
          profile: {
            firstName: person.firstName,
            lastName: person.lastName,
            gender: 'male',
          },
        },
        openGraphImage,
        title: `Over ${person.firstName}`,
      },
    },
  };
};

export default OverOnsDetail;
