import type { Validator, ValidatorFunction } from './common';
import type { ObjectType } from './object';

export interface DocumentValidator extends Validator<DocumentValidator> {
  /**
   * Ensures that all fields exist
   */
  required(): DocumentValidator;
}

export interface DocumentType<T extends string = ''>
  extends Omit<ObjectType<T>, 'options' | 'type'> {
  type: 'document';

  /**
   * Turns off drafts when set to true.
   */
  liveEdit?: boolean;

  /**
   * A declaration of possible ways to order documents of this type.
   */
  orderings?: {
    /**
     * An array of fields to order by
     */
    by: { field: string; direction: 'asc' | 'desc' }[];

    /**
     * Internal name of the ordering
     */
    name: string;

    /**
     * Displayed title of the ordering
     */
    title: string;
  }[];

  validation?: ValidatorFunction<DocumentValidator>;
}
