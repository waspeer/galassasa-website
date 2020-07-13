import S from '@sanity/desk-tool/structure-builder';

export default [
  ...S.defaultInitialValueTemplateItems().filter(
    (listItem) => !['person'].includes(listItem.getId()),
  ),
];
