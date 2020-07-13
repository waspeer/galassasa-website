import type { DataType, ValidatorFunction, Validator } from './common';

export interface DateValidator extends Validator<DateValidator> {
  /**
   * Maximum date (inclusive). maxDate should be in ISO 8601 format.
   */
  max(minDate: string | number | Date): DateValidator;

  /**
   * Minimum date (inclusive). minDate should be in ISO 8601 format.
   */
  min(minDate: string | number | Date): DateValidator;
}

export interface DateType extends DataType {
  type: 'date';

  options?: {
    /**
     * Controls how the date input field formats the displayed date. Use any valid Moment
     * format option. Default is YYYY-MM-DD.
     */
    dateFormat?: string;

    /**
     * Label for the "jump to today" button on the date input widget. Default is Today.
     */
    calendarTodayLabel?: string;
  };

  validation?: ValidatorFunction<DateValidator>;
}
