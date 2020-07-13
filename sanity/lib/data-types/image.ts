import type { DataType, Validator, ValidatorFunction } from './common';
import type { Field } from './field';

export type ImageValidator = Validator<ImageValidator>;

export interface ImageType<T extends string = ''> extends DataType {
  type: 'image';

  /**
   * An array of optional fields to add to the image record. The fields
   * added here follow the same pattern as fields defined on objects.
   * This is useful for adding custom properties like caption, attribution,
   * etc. to the image record itself (see example below). In addition to
   * the common field attributes, each field may also have an isHighlighted
   * option which dictates whether it should be prominent in the edit UI or
   * hidden in a dialog modal behind an edit button.
   */
  fields?: (Field<T> & {
    options?: {
      /**
       * Dictates whether the field should be prominent in the edit UI or hidden
       * in a dialog modal behind an edit button
       */
      isHighlighted?: boolean;
    };
  })[];

  options?: {
    /**
     * This specifies which mime types the image input can accept. Just like
     * the accept attribute on native DOM file inputs and you can specify any
     * valid file type specifier:
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers
     */
    accept?: string;

    /**
     * Enables the user interface for selecting what areas of an image should
     * always be cropped, what areas should never be cropped and the center
     * of the area to crop around when resizing. The hotspot data is stored in
     * the image field itself, not in the image asset, so images can have
     * different crop and center for each place they are used.
     *
     * Hotspot makes it possible to responsively adapt the images to different
     * aspect ratios at display time. The default is value for hotspot is false.
     */
    hotspot?: boolean;

    /**
     * This option defines what metadata the server attempts to extract from
     * the image. The extracted data is written into the image asset. This
     * field must be an array of strings where accepted values are `exif,
     * location, lqip, palette`. Check out the usage example in this help note:
     * https://www.sanity.io/help/asset-metadata-field-invalid
     */
    metadata?: ('exif' | 'location' | 'lqip' | 'palette')[];

    /**
     * This will store the original filename in the asset document. Please be
     * aware that the name of uploaded files could reveal potentially sensitive
     * information (e.g. `top_secret_planned_featureX.pdf`). Default is `true`.
     */
    storeOriginalFilename?: boolean;

    /**
     * Lock the asset sources available to this type to a spesific subset. Import
     * the plugins by their part name, and use the import variable name as array
     * entries. The built in default asset source has the part name
     * `part:@sanity/form-builder/input/image/asset-source-default`
     */
    sources?: string[];
  };

  validation?: ValidatorFunction<ImageValidator>;
}
