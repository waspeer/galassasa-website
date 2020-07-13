import type { DataType, Validator, ValidatorFunction } from './common';

export interface NumberValidator extends Validator<NumberValidator> {
  /**
   * Value must be greater than the given limit.
   */
  greaterThan(limit: number): NumberValidator;

  /**
   * Value must be an integer (no decimals).
   */
  integer(): NumberValidator;

  /**
   * Value must be less than the given limit.
   */
  lessThan(limit: number): NumberValidator;

  /**
   * Requires the number to be negative (< 0).
   */
  negative(): NumberValidator;

  /**
   * Maximum value (inclusive).
   */
  max(maxNumber: number): NumberValidator;

  /**
   * Minimum value (inclusive).
   */
  min(minNumber: number): NumberValidator;

  /**
   * Requires the number to be positive (>= 0).
   */
  positive(): NumberValidator;

  /**
   * Specifies the maximum number of decimal places allowed.
   */
  precision(limit: number): NumberValidator;
}

export interface NumberType extends DataType {
  type: 'number';

  options?: {
    /**
     * A list of predefined values that the user may pick from.
     */
    list?: (number | { value: number; title: string })[];
  };

  validation: ValidatorFunction<NumberValidator>;
}
