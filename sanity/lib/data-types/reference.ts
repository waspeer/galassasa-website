import type { DataType, Validator, ValidatorFunction } from './common';

export type ReferenceValidator = Validator<ReferenceValidator>;

export interface ReferenceType extends DataType {
  type: 'reference';

  /**
   * Must contain an array naming all the types which may be referenced
   */
  to: { type: string }[];

  /**
   * Default false. If set to true the reference will be made weak. This
   * means you can discard the object being referred to without first
   * deleting the reference, thereby leaving a dangling pointer.
   */
  weak?: boolean;

  options?: {
    /**
     * Additional GROQ-filter to use when searching for target documents.
     * The filter will be added to the already existing type name clause.
     */
    filter?:
      | string
      | {
          (context: {
            document: Record<string, any>;
            parent: Record<string, any>;
            parentPath: any;
          }): {
            filter: string;
            params: Record<string, any>;
          };
        };

    /**
     * Object of parameters for the GROQ-filter specified in filter.
     */
    filterParams?: Record<string, any>;
  };

  validator?: ValidatorFunction<ReferenceValidator>;
}
