import { Person } from './documents/person';
import { Studio } from './documents/studio';
import { Figure } from './objects/figure';
import { ProjectLink } from './objects/project-link';
import { SocialLink } from './objects/social-link';
import { TextBlockWithImage } from './objects/text-block-with-image';

export const schemaTypes = [
  // OBJECTS
  Figure,
  ProjectLink,
  SocialLink,
  TextBlockWithImage,

  // DOCUMENTS
  Person,
  Studio,
];
