import sanityClient from '@sanity/client';
import sanityImage from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

import type { Person, Persons, StudioInfo } from '../types';

const NODE_ENV = process.env.NODE_ENV || 'development';

const sanityOptions = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  useCdn: NODE_ENV === 'production',
};

const client = sanityClient(sanityOptions);

const imageUrlBuilder = sanityImage(sanityOptions);

export function imageUrlFor(source: SanityImageSource) {
  return imageUrlBuilder.image(source);
}

export async function getPersons(): Promise<Persons> {
  const result = await client.fetch<Person[]>(/* groq */ `
    *[_type == "person"] {
      'id': _id,
      firstName,
      lastName,
      bio,
      photo,
      portfolioLink,
      projectLinks,
      socialLinks,
    }
  `);
  const personIds = ['joost', 'ruben', 'silvan', 'wannes'] as const;

  return personIds.reduce((acc, personId) => {
    const data = result.find((p) => p.id === personId);

    if (!data) {
      throw new Error(`Unable to retrieve person data for ${personId}`);
    }

    acc[personId] = data;

    return acc;
  }, {} as Persons);
}

export async function getStudioInfo(): Promise<StudioInfo> {
  return client.fetch(/* groq */ `
    *[_type == "studio" && _id == "galassasa"] {
      description,
      email,
      instagram,
      name,
      shortDescription
    }[0]
  `);
}
