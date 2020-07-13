import type { DataType, ValidatorFunction, Validator } from './common';

export interface UrlValidator extends Validator<UrlValidator> {
  /**
   * Provide options for validation of URL
   */
  uri(options?: {
    /**
     * Whether or not to allow relative URLs (default: false).
     */
    allowRelative?: boolean;

    /**
     * Whether to only allow relative URLs (default: false).
     */
    relativeOnly?: boolean;

    /**
     * String, RegExp or Array of schemes to allow (default: ['http', 'https']).
     */
    scheme?: string | RegExp | string[];
  }): UrlValidator;
}

export interface UrlType extends DataType {
  type: 'url';

  validation?: ValidatorFunction<UrlValidator>;
}
