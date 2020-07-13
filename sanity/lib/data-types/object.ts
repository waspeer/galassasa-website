import type { DataType, Validator, ValidatorFunction } from './common';
import type { Field } from './field';

export interface ObjectValidator extends Validator<ObjectValidator> {
  /**
   * Ensures that all fields exist
   */
  required(): ObjectValidator;
}

export interface ObjectType<T extends string = ''> extends DataType {
  type: 'object';

  /**
   * The fields of this object. At least one field is required.
   */
  fields: (Field<T> & {
    /**
     * Specifies the fieldset this field belongs to
     */
    fieldset?: string;
  })[];

  /**
   * A list of fieldsets that fields may belong to.
   */
  fieldsets?: {
    /**
     * Description of the fieldset
     */
    description?: string;

    /**
     * Internal name of the fieldset
     */
    name: string;

    /**
     * Displayed title of the fieldset
     */
    title: string;

    options?: {
      /**
       * Set to true to display fields as collapsed initially. This
       * requires the collapsible option to be set to true and determines
       * whether the fields should be collapsed to begin with.
       */
      collapsed?: boolean;

      /**
       * If set to true, the object will make the fields collapsible.
       * By default, objects will be collapsible when reaching a
       * depth/nesting level of 3. This can be overridden by setting
       * collapsible: false
       */
      collapsible?: boolean;

      /**
       * Defines a grid for the fields and how many columns it should have
       */
      columns?: number;
    };
  }[];

  /**
   * Use this to implement an override for the default preview for this type.
   */
  preview?: {
    /**
     * Custom preview component
     */
    component?: React.ReactNode;

    /**
     * The selected fields for the preview
     */
    select?: {
      /**
       * The field that should be used as the thumbnail
       */
      media?: React.ReactNode;

      /**
       * The field that should be used as the subtitle
       */
      subtitle?: string;

      /**
       * The field that should be used as the title
       */
      title?: string;

      /**
       * Reference other fields
       */
      [key: string]: any;
    };

    /**
     * Function to reformat the selected fields
     */
    prepare?(selection: {
      subtitle: any;
      title: any;
      [key: string]: any;
    }): {
      media?: React.ReactNode;
      subtitle?: string;
      title: string;
    };
  };

  options?: {
    /**
     * Set to true to display fields as collapsed initially. This
     * requires the collapsible option to be set to true and determines
     * whether the fields should be collapsed to begin with.
     */
    collapsed?: boolean;

    /**
     * If set to true, the object will make the fields collapsible.
     * By default, objects will be collapsible when reaching a
     * depth/nesting level of 3. This can be overridden by setting
     * collapsible: false
     */
    collapsible?: boolean;
  };

  validation?: ValidatorFunction<ObjectValidator>;
}
