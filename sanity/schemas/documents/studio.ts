import { DocumentType } from '../../lib/data-types';

export const Studio: DocumentType<'figure' | 'textBlockWithImage'> = {
  name: 'studio',
  title: 'Studio',
  type: 'document',
  fieldsets: [{ name: 'contact', title: 'Contact' }],
  fields: [
    {
      hidden: true,
      name: 'name',
      title: 'Naam',
      type: 'string',
    },
    {
      name: 'shortDescription',
      title: 'Korte Beschrijving',
      type: 'text',
      rows: 3,
    },
    {
      name: 'description',
      title: 'Beschrijving',
      type: 'array',
      of: [{ type: 'textBlockWithImage' }],
    },
    {
      fieldset: 'contact',
      name: 'email',
      title: 'Emailadres',
      type: 'string',
      validation: (Rule) => Rule.email().error('Vul een geldig emailadres in'),
    },
    {
      fieldset: 'contact',
      name: 'instagram',
      title: 'Instagram',
      type: 'string',
      validation: (Rule) => [
        Rule.uri().error('Vul een geldige URL in'),
        Rule.custom(
          (url) =>
            !url || /\/\/(?:www\.)?instagram/.test(url) || 'Vul een geldige instagram url in',
        ),
      ],
    },
    {
      name: 'photos',
      title: "Foto's",
      type: 'array',
      options: {
        layout: 'grid',
      },
      of: [{ type: 'figure' }],
    },
  ],
};
