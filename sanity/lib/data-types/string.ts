import type { DataType, ValidatorFunction, Validator } from './common';

export interface StringValidator extends Validator<StringValidator> {
  /**
   * String must be an email
   */
  email(): StringValidator;

  /**
   * Exact length of string.
   */
  length(exactLength: number): StringValidator;

  /**
   * All characters must be lowercase.
   */
  lowercase(): StringValidator;

  /**
   * Maximum length of string.
   */
  max(maxLength: number): StringValidator;

  /**
   * Minimum length of string.
   */
  min(minLength: number): StringValidator;

  /**
   * All characters must be uppercase.
   */
  uppercase(): StringValidator;

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
  regex(pattern: RegExp | string, options?: { name?: string; invert?: boolean }): StringValidator;
}

export interface StringType extends DataType {
  type: 'string';

  options?: {
    /**
     * A list of predefined values that the user can choose from.
     */
    list?: (string | { title: string; value: string })[];

    /**
     * Controls how the items defined in the list option are presented.
     * If set to 'radio' the list will render radio buttons. If set to
     * 'dropdown' you'll get a dropdown menu instead. Default is dropdown.
     */
    layout?: 'radio' | 'dropdown';

    /**
     * Controls how radio buttons are lined up. Use direction:
     * 'horizontal|vertical' to render radio buttons in a row or a column.
     * Default is vertical. Will only take effect if the layout option is
     * set to radio.
     */
    direction?: 'horizontal' | 'vertical';
  };

  validation?: ValidatorFunction<StringValidator>;
}
