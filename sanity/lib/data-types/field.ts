import type { ArrayType } from './array';
import type { BlockType } from './block';
import type { BooleanType } from './boolean';
import type { CustomType } from './custom';
import type { DateType } from './date';
import type { DatetimeType } from './datetime';
import type { FileType } from './file';
import type { GeoPointType } from './geopoint';
import type { ImageType } from './image';
import type { NumberType } from './number';
import type { ObjectType } from './object';
import type { ReferenceType } from './reference';
import type { SlugType } from './slug';
import type { StringType } from './string';
import type { TextType } from './text';
import type { UrlType } from './url';

export type Field<T extends string = string> =
  | ArrayType<T>
  | BlockType<T>
  | BooleanType
  | CustomType<T>
  | DateType
  | DatetimeType
  | FileType<T>
  | GeoPointType
  | ImageType<T>
  | NumberType
  | ObjectType<T>
  | ReferenceType
  | SlugType
  | StringType
  | TextType
  | UrlType;
