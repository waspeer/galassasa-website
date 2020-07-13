import schemaTypes from 'all:part:@sanity/base/schema-type';
import createSchema from 'part:@sanity/base/schema-creator';

import { Person } from './documents/person';
import { Studio } from './documents/studio';
import { ProjectLink } from './objects/project-link';
import { SocialLink } from './objects/social-link';
import { StudioPhoto } from './objects/studio-photo';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    // OBJECTS
    ProjectLink,
    SocialLink,
    StudioPhoto,

    // DOCUMENTS
    Person,
    Studio,
  ]),
});
