import createSanityImageUrlBuilder from '@sanity/image-url';
import type { SanityImageObject, SanityImageSource } from '@sanity/image-url/lib/types/types';
import createSanityClient, { type ClientConfig } from 'picosanity';
import { env } from './env';
import type { OpenGraphImage, Person, Persons, StudioInfo } from './types';

const OPENGRAPH_IMAGE_WIDTH = 1200;
const OPENGRAPH_IMAGE_HEIGHT = 630;

const sanityOptions: ClientConfig = {
  dataset: env.SANITY_DATASET,
  projectId: env.SANITY_PROJECT_ID,
  useCdn: import.meta.env.PROD,
  apiVersion: '2024-01-25',
};

const client = createSanityClient(sanityOptions);
const imageUrlBuilder = createSanityImageUrlBuilder(sanityOptions);

// Last modified date of the last fetched data
let lastModified: string | null = null;
let dataMap = new Map<string, any>();

export async function cache<TData>(key: string, dataFunction: () => Promise<TData>) {
  const newLastModified = await client.fetch<string | null>(
    lastModified
      ? /* groq */ `*[!(_type match 'system.*') && _updatedAt >= $lastModified] | order(_updatedAt desc)[0]._updatedAt`
      : /* groq */ `*[!(_type match 'system.*')] | order(_updatedAt desc)[0]._updatedAt`,
    { lastModified },
    { perspective: 'published' },
  );

  if (newLastModified !== lastModified) {
    dataMap = new Map();
  }

  if (!dataMap.has(key)) {
    console.log('DATA: cache miss');
    console.log('> lastModified', lastModified);
    console.log('> newLastModified', newLastModified);

    lastModified = newLastModified;

    const data = dataFunction();
    dataMap.set(key, data);

    return data;
  } else {
    console.log('DATA: cache hit');

    const data = dataMap.get(key) as TData;

    if (!data) {
      throw new Error('Data not found in cache');
    }

    return data;
  }
}

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

    acc[personId] = {
      ...data,
      imageUrl: imageUrlFor(data.photo).width(700).height(250).url(),
    };

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
