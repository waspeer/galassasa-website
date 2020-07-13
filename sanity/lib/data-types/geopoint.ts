import type { DataType, Validator, ValidatorFunction } from './common';

export type GeoPointValidator = Validator<GeoPointValidator>;

export interface GeoPointType extends DataType {
  type: 'geopoint';

  validation?: ValidatorFunction<GeoPointValidator>;
}
