import S from '@sanity/desk-tool/structure-builder';
import { BsFillPeopleFill, BsBuilding } from 'react-icons/bs';

export default () =>
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
    ]);
