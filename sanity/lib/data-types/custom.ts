import { DataType, Validator, ValidatorFunction } from './common';

export type CustomTypeValidator = Validator<CustomTypeValidator>;

export interface CustomType<T extends string = string> extends DataType {
  type: T;
  options?: Record<string, any>;
  validation?: ValidatorFunction<CustomTypeValidator>;
}
