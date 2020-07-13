import type { DataType, Validator, ValidatorFunction } from './common';

export type SlugValidator = Validator<SlugValidator>;

export interface SlugType extends DataType {
  type: 'slug';

  options?: {
    /**
     * The name of the field which the slug value is derived from.
     * You can supply a function, instead of a string. If so, the
     * source function is called with two parameters: doc (object -
     * the current document) and options (object - with parent and
     * parentPath keys for easy access to sibling fields).
     */
    source?:
      | string
      | {
          (
            document: Record<string, any>,
            options: { parent: Record<string, any>; parentPath: any },
          ): string;
        };

    /**
     * Maximum number of characters the slug may contain. Defaults to 200
     */
    maxLength?: number;

    /**
     * Supply a custom override function which handles string normalization.
     * slugify is called with two parameters: input (string) and type
     * (object - schema type). If slugify is set, the maxLength option is ignored.
     */
    slugify?: { (input: string, type: Record<string, any>): string };

    /**
     * Supply a custom function which checks whether or not the slug is unique.
     * Receives the proposed slug as the first argument and an options object.
     */
    isUnique?: {
      (
        input: string,
        options: {
          document: Record<string, any>;
          parent: Record<string, any>;
          parentPath: any;
        },
      ): boolean;
    };
  };

  validation?: ValidatorFunction<SlugValidator>;
}
