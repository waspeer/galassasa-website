import type { DataType, Validator, ValidatorFunction } from './common';
import { Field } from './field';

export interface ArrayValidator extends Validator<ArrayValidator> {
  /**
   * Exact number of array elements to allow.
   */
  length(exactLength: number): ArrayValidator;

  /**
   * Maximum number of elements in array.
   */
  max(maxLength: number): ArrayValidator;

  /**
   * Minimum number of elements in array.
   */
  min(minLength: number): ArrayValidator;

  /**
   * Requires all values within the array to be unique. Does a deep comparison, only excluding the `_key` property when comparing objects.
   */
  unique(): ArrayValidator;
}

export interface ArrayType<T extends string = ''> extends DataType {
  type: 'array';

  /**
   * Defines which types are allowed as members of the array.
   */
  of?: Field<T>[];

  options?: {
    /**
     * Controls whether the user is allowed to reorder the items in the array. Defaults to true.
     */
    sortable?: boolean;

    /**
     * If set to `tags`, renders the array as a single, tokenized input field. This option only works if the array contains strings. If set to `grid` it will display in a grid
     */
    layout?: 'tags' | 'grid';

    /**
     * Renders check boxes for titles and populates a string array with selected values
     */
    list?: { title: string; value: string }[];

    /**
     * Controls how the modal (for array content editing) is rendered. You can choose between dialog, fullscreen or popover. Default is dialog.
     */
    editModal?: 'dialog' | 'fullscreen' | 'popover';
  };

  validation?: ValidatorFunction<ArrayValidator>;
}
