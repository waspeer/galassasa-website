import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import { Person } from './documents/person';
import { SocialLink } from './objects/social-link';
import { Studio } from './documents/studio';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    // OBJECTS
    SocialLink,

    // DOCUMENTS
    Person,
    Studio,
  ]),
});
