import createSanityImageUrlBuilder from '@sanity/image-url';
import type { SanityImageObject, SanityImageSource } from '@sanity/image-url/lib/types/types';
import createSanityClient from 'picosanity';
import { env } from './env';
import type { Person, Persons, StudioInfo } from './types';

const OPENGRAPH_IMAGE_WIDTH = 1200;
const OPENGRAPH_IMAGE_HEIGHT = 630;

const sanityOptions = {
  dataset: env.SANITY_DATASET,
  projectId: env.SANITY_PROJECT_ID,
  useCdn: import.meta.env.PROD,
};

const client = createSanityClient(sanityOptions);
const imageUrlBuilder = createSanityImageUrlBuilder(sanityOptions);

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

export async function getPersonOpenGraphImage(personId: string): Promise<OpenGraphImage> {
  const { firstName, lastName, photo } = await client.fetch<Person>(
    /* groq */ `
    *[_type == "person" && _id == $personId] {
      firstName,
      lastName,
      photo
    }[0]
  `,
    { personId },
  );

  const url = imageUrlFor(photo).width(OPENGRAPH_IMAGE_WIDTH).height(OPENGRAPH_IMAGE_HEIGHT).url()!;

  return {
    url,
    width: OPENGRAPH_IMAGE_WIDTH,
    height: OPENGRAPH_IMAGE_HEIGHT,
    alt: `${firstName} ${lastName}`,
  };
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

export async function getStudioOpenGraphImage(): Promise<OpenGraphImage> {
  const { photos } = await client.fetch<{ photos: SanityImageObject[] }>(/* groq */ `
    *[_type == "studio" && _id == "galassasa"] {
      photos
    }[0]
  `);
  const url = imageUrlFor(photos[0])
    .width(OPENGRAPH_IMAGE_WIDTH)
    .height(OPENGRAPH_IMAGE_HEIGHT)
    .url()!;

  return {
    url,
    width: OPENGRAPH_IMAGE_WIDTH,
    height: OPENGRAPH_IMAGE_HEIGHT,
    alt: 'Studio Galassasa',
  };
}
