import type { SanityImageObject } from '@sanity/image-url/lib/types/types';

export type PersonId = 'joost' | 'ruben' | 'silvan' | 'wannes';

interface PersonProjectLink {
  name: string;
  url: string;
}

export interface PersonSocialLink {
  type: 'instagram' | 'facebook' | 'other';
  url: string;
}

export interface Person {
  id: PersonId;
  firstName: string;
  lastName: string;
  bio: any[];
  photo: SanityImageObject;
  portfolioLink?: string;
  projectLinks?: PersonProjectLink[];
  socialLinks?: PersonSocialLink[];
  imageUrl?: string;
}

export type Persons = Record<PersonId, Person>;

interface TextBlockWithImage {
  image: SanityImageObject;
  text: any[];
  title: string;
}

export interface StudioInfo {
  description: TextBlockWithImage[];
  email: string;
  instagram: string;
  name: string;
  shortDescription: string;
}

export interface OpenGraphImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}
