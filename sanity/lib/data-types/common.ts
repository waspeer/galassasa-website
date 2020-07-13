type CustomRuleContext<
  P extends Record<string, any> = Record<string, any>,
  D extends Record<string, any> = Record<string, any>
> = {
  document: D;
  parent: P;
  path: any[];
};

export interface Validator<T> {
  /**
   * Flag that all given constraints must pass
   */
  all(children: T): T;

  /**
   * Creates a custom validation rule.
   */
  custom<T = any>(
    customRule: (field: T, context: CustomRuleContext) => true | string | Promise<true | string>,
  ): T;

  /**
   * Flag that at least one of given constraints must pass
   */
  either(children: T): T;

  /**
   * Set the rule to be a warning. The message can be customized.
   */
  error(message: string): T;

  length(constraint: number): T;
  max(constraint: number): T;
  min(constraint: number): T;

  /**
   * Explicitly allow undefined
   */
  optional(): T;

  /**
   * Ensures that this field exists.
   */
  required(): T;

  /**
   * Constraint type of field
   */
  type(targetType: string): T;

  /**
   * Allowed value(s)
   */
  valid(value?: any | any[]): T;

  /**
   * Reference the valu of a sibling field.
   */
  valueOfField(field: string): T;

  /**
   * Set the rule to be a warning. The message can be customized.
   */
  warning(message?: string): T;
}

export type ValidatorFunction<T extends Validator<any>> = (Rule: T) => T;

export interface DataType {
  /**
   * Short description to editors how the field is to be used.
   */
  description?: string;

  /**
   * If set to true, this field will be hidden in the studio.
   */
  hidden?: boolean;

  /**
   * To return icon showed in menus and toolbar
   */
  icon?: React.ReactNode;

  /**
   * The field name. This will be the key in the data record.
   */
  name?: string;

  /**
   * If set to true, this field will not be editable in the content studio.
   */
  readOnly?: boolean;

  /**
   * Human readable label for the field.
   */
  title?: string;
}
