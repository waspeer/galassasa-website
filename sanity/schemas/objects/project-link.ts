import { BsLink45Deg } from 'react-icons/bs';

import { ObjectType } from '../../lib/data-types';

export const ProjectLink: ObjectType = {
  icon: BsLink45Deg,
  name: 'projectLink',
  title: 'Project',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Naam Project',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'url',
      title: 'Link',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
  ],
};
