import type { DataType, Validator, ValidatorFunction } from './common';

export interface TextValidator extends Validator<TextValidator> {
  /**
   * String must be an email
   */
  email(): TextValidator;

  /**
   * Exact length of string.
   */
  length(exactLength: number): TextValidator;

  /**
   * All characters must be lowercase.
   */
  lowercase(): TextValidator;

  /**
   * Maximum length of string.
   */
  max(maxLength: number): TextValidator;

  /**
   * Minimum length of string.
   */
  min(minLength: number): TextValidator;

  /**
   * All characters must be uppercase.
   */
  uppercase(): TextValidator;

  /**
   * String must match the given pattern.
   *
   * `options` is an optional object, currently you can set `options.name`
   * and `options.invert`.
   *
   * Providing a name will make the message more understandable to the
   * user ("Does not match the <name>-pattern").
   *
   * Set invert to true in order to allow any value that does NOT match
   * the pattern.
   */
  regex(pattern: RegExp | string, options?: { name?: string; invert?: boolean }): TextValidator;
}

export interface TextType extends DataType {
  type: 'text';

  /**
   * Controls the number of rows/lines in the rendered textarea.
   * Default number of rows: 10.
   */
  rows?: number;

  validation?: ValidatorFunction<TextValidator>;
}
