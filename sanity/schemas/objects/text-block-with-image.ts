import { defineType } from 'sanity';

export const TextBlockWithImage = defineType({
  name: 'textBlockWithImage',
  title: 'Tekstblok',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required().error('Vul een titel in'),
    },
    {
      name: 'image',
      title: 'Afbeelding',
      type: 'figure',
    },
    {
      name: 'text',
      title: 'Tekst',
      type: 'array',
      validation: (Rule) => Rule.required().error('Vul een tekst in'),
      of: [
        {
          marks: {
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [{ name: 'url', type: 'url' }],
              },
            ],
            decorators: [
              { title: 'Vetgedrukt', value: 'strong' },
              { title: 'Cursief', value: 'em' },
              { title: 'Onderstreept', value: 'underline' },
            ],
          },
          styles: [],
          type: 'block',
        },
      ],
    },
  ],
  preview: {
    select: {
      media: 'image',
      subtitle: 'text',
      title: 'title',
    },
  },
});
