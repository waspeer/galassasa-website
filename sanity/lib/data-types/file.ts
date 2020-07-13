import { DataType, ValidatorFunction, Validator } from './common';
import { Field } from './field';

export type FileValidator = Validator<FileValidator>;

export interface FileType<T extends string = ''> extends DataType {
  type: 'file';

  /**
   * An array of optional fields to add to the file field. The fields
   * added here follow the same pattern as fields defined on objects.
   * This is useful for allowing users to add custom metadata related
   * to the usage of this file (see example below).
   */
  fields?: Field<T>[];

  options?: {
    /**
     * This specifies which mime types the file input can accept. Just
     * like the accept attribute on native DOM file inputs and you can
     * specify any valid file type specifier:
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers
     */
    accept?: string;

    /**
     * This will store the original filename in the asset document.
     * Please be aware that the name of uploaded files could reveal potentially
     * sensitive information (e.g. `top_secret_planned_featureX.pdf`).
     * Default is true.
     */
    storeOriginalFilename?: boolean;
  };

  validation?: ValidatorFunction<FileValidator>;
}
