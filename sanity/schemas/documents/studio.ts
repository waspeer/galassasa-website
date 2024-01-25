import { defineField, defineType } from 'sanity';

export const Studio = defineType({
  name: 'studio',
  title: 'Studio',
  type: 'document',
  fieldsets: [{ name: 'contact', title: 'Contact' }],
  fields: [
    defineField({
      hidden: true,
      name: 'name',
      title: 'Naam',
      type: 'string',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Korte Beschrijving',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description',
      title: 'Beschrijving',
      type: 'array',
      of: [{ type: 'textBlockWithImage' }],
    }),
    defineField({
      fieldset: 'contact',
      name: 'email',
      title: 'Emailadres',
      type: 'string',
      validation: (Rule) => Rule.email().error('Vul een geldig emailadres in'),
    }),
    defineField({
      fieldset: 'contact',
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
      validation: (Rule) => [
        Rule.uri({}).error('Vul een geldige URL in'),
        Rule.custom(
          (url) =>
            !url || /\/\/(?:www\.)?instagram/.test(url) || 'Vul een geldige instagram url in',
        ),
      ],
    }),
    defineField({
      name: 'photos',
      title: "Foto's",
      type: 'array',
      options: {
        layout: 'grid',
      },
      of: [{ type: 'figure' }],
    }),
  ],
});
