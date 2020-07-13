import { DataType, ValidatorFunction, Validator } from './common';

export type BooleanValidator = Validator<BooleanValidator>;

export interface BooleanType extends DataType {
  type: 'boolean';

  options?: {
    /**
     * This let's you control the visual appearance of the input. By default the input for
     * boolean fields will display as a switch, but you can also make it appear as a checkbox
     */
    layout?: 'switch' | 'checkbox';
  };

  validation?: ValidatorFunction<BooleanValidator>;
}
