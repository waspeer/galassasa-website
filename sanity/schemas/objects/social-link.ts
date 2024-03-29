import { BsLink45Deg } from 'react-icons/bs';
import { defineField, defineType } from 'sanity';

export const SocialLink = defineType({
  name: 'socialLink',
  title: 'Link',
  type: 'object',
  icon: BsLink45Deg,
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Instagram', value: 'instagram' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Anders', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({}).custom<string>((url, context) => {
          const urlType = (context.parent as any).type as string | undefined;

          if (urlType === 'instagram') {
            return (
              /\/\/(?:www\.)?instagram/.test(url ?? '') ||
              'Enter a valid instagram URL, or change the URL type'
            );
          }

          if (urlType === 'facebook') {
            return (
              /\/\/(?:www\.)?(?:[^.]+\.)?facebook/.test(url) ||
              'Enter a valid facebook URL, or change the URL type'
            );
          }

          return true;
        }),
    }),
  ],
  preview: {
    select: {
      subtitle: 'url',
      title: 'type',
    },
    prepare: ({ subtitle, title }) => ({
      subtitle,
      title: title[0].toUpperCase() + title.substr(1),
    }),
  },
});
