import type { DataType, ValidatorFunction, Validator } from './common';

export interface DatetimeValidator extends Validator<DatetimeValidator> {
  /**
   * Maximum date (inclusive). maxDate should be in ISO 8601 format.
   */
  max(minDate: string | number | Date): DatetimeValidator;

  /**
   * Minimum date (inclusive). minDate should be in ISO 8601 format.
   */
  min(minDate: string | number | Date): DatetimeValidator;
}

export interface DatetimeType extends DataType {
  type: 'datetime';

  options?: {
    /**
     * Controls how the date input field formats the displayed date. Use any valid Moment format option. Default is YYYY-MM-DD.
     */
    dateFormat?: string;

    /**
     * Controls how the time input field formats the displayed date. Use any valid Moment format option. Default is HH:mm.
     */
    timeFormat?: string;

    /**
     * Number of minutes between each entry in the time input. Default is 15 which lets the user choose between 09:00, 09:15, 09:30 and so on.
     */
    timeStep?: number;

    /**
     * Label for the "jump to today" button on the date input widget. Default is Today.
     */
    calendarTodayLabel?: string;
  };

  validation?: ValidatorFunction<DatetimeValidator>;
}
