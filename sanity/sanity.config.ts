import { visionTool } from '@sanity/vision';
import { BsBuilding, BsFillPeopleFill } from 'react-icons/bs';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'Galassasa',

  projectId: 'pm6rpp91',
  dataset: 'production',

  document: {
    newDocumentOptions: (S) => S.filter((item) => item.templateId !== 'person'),
  },

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Over Ons')
              .icon(BsFillPeopleFill)
              .child(
                S.list()
                  .title('Over Ons')
                  .items(
                    ['joost', 'ruben', 'silvan', 'wannes'].map((name) =>
                      S.documentListItem().id(name).schemaType('person'),
                    ),
                  ),
              ),
            S.documentListItem()
              .icon(BsBuilding)
              .id('galassasa')
              .schemaType('studio')
              .title('Over de Studio'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
