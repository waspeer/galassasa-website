import type { DataType, Validator, ValidatorFunction } from './common';
import type { Field } from './field';

export type BlockValidator = Validator<BlockValidator>;

interface BlockEditorProps {
  icon?: (() => React.ReactNode) | React.ReactNode;
  render?: React.ReactNode;
}

export interface BlockType<T extends string = ''> extends DataType {
  type: 'block';

  /**
   * This defines which styles that applies to blocks. A style is an object with a title
   * (will be displayed in the style dropdown) and a value, e.g.:
   * `styles: [{title: 'Quote', value: 'blockquote'}]`. If no styles are given, the default
   * styles are H1 up to H6 and blockquote. A style named normal is reserved, always
   * included and represents "unstyled" text. If you don't want any styles, set this to an
   * empty array e.g.: `styles: []`.
   */
  styles?: {
    title: string;
    value: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote' | string;
    blockEditor?: BlockEditorProps;
  }[];

  /**
   * What list types that can be applied to blocks. Like styles above, this also is an array
   * of "name", "title" pairs, e.g.: `{title: 'Bullet', value: 'bullet'}`. Default list types
   * are bullet and number.
   */
  lists?: {
    title: string;
    value: 'bullet' | 'number' | string;
  }[];

  /**
   * An object defining which .decorators (array) and .annotations (array) are allowed.
   */
  marks?: {
    decorators?: {
      title: string;
      value: 'strong' | 'em' | 'code' | 'underline' | 'strike-through' | string;
      blockEditor?: BlockEditorProps;
    }[];
    annotations?: (Field<T> & { blockEditor?: BlockEditorProps })[];
  };

  /**
   * An array of inline content types that you can place in running text from the Insert menu.
   */
  of?: Field<T>[];

  validation?: ValidatorFunction<BlockValidator>;
}
