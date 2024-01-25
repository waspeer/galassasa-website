import { defineType } from 'sanity';

export const Person = defineType({
  name: 'person',
  title: 'Persoon',
  type: 'document',
  fieldsets: [
    { name: 'name', title: 'Naam', options: { columns: 2 } },
    { name: 'links', title: 'Links' },
  ],
  fields: [
    {
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('Kies een foto'),
    },
    {
      fieldset: 'name',
      name: 'firstName',
      title: 'Voornaam',
      type: 'string',
      validation: (Rule) => Rule.required().error('Vul een voornaam in'),
    },
    {
      fieldset: 'name',
      name: 'lastName',
      title: 'Achternaam',
      type: 'string',
      validation: (Rule) => Rule.required().error('Vul een achternaam in'),
    },
    {
      description: "Kort verhaaltje over jezelf, max twee alinea's",
      name: 'bio',
      title: 'Bio',
      type: 'array',
      validation: (Rule) => Rule.required().error('Vul een bio in'),
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
          lists: [],
          styles: [],
          type: 'block',
        },
      ],
    },
    {
      description: 'Link naar een luisterbaar portfolio',
      fieldset: 'links',
      name: 'portfolioLink',
      title: 'Portfolio',
      type: 'url',
    },
    {
      description: 'Voeg hier links toe naar projecten waar je aan mee werkt.',
      fieldset: 'links',
      name: 'projectLinks',
      title: 'Projecten',
      type: 'array',
      of: [{ type: 'projectLink' }],
    },
    {
      fieldset: 'links',
      name: 'socialLinks',
      title: 'Socials',
      type: 'array',
      of: [{ type: 'socialLink' }],
    },
  ],
});
