import { DocumentType } from '../../lib/data-types';

export const Studio: DocumentType<'studioPhoto'> = {
  name: 'studio',
  title: 'Studio',
  type: 'document',
  fields: [
    {
      hidden: true,
      name: 'name',
      title: 'Naam',
      type: 'string',
    },
    {
      name: 'photos',
      title: "Foto's",
      type: 'array',
      of: [{ type: 'studioPhoto' }],
    },
  ],
};
