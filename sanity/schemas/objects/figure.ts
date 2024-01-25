import { defineType } from 'sanity';

export const Figure = defineType({
  name: 'figure',
  title: 'Foto',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    {
      description: 'Deze tekst wordt gebruikt voor slechtzienden',
      name: 'alt',
      title: 'Alternatieve Tekst',
      type: 'string',
      options: {
        isHighlighted: true,
      },
      validation: (Rule) => Rule.required().error('Vul een alternatieve tekst in'),
    },
  ],
});
