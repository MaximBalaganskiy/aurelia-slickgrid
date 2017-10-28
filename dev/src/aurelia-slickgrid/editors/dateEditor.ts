import { mapFlatpickrDateFormatWithFieldType } from './../services/utilities';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import * as $ from 'jquery';
import { Editor, FieldType, KeyCode } from './../models';

/*
 * An example of a date picker editor using Flatpickr
 * https://chmln.github.io/flatpickr
 */
export class DateEditor implements Editor {
  $input: any;
  flatInstance: any;
  defaultDate: string;

  constructor(private args: any) {
    this.init();
  }

  init(): void {
    const pickerOptions = {
      defaultDate: this.args.item[this.args.column.field] || null,
      altInput: true,
      altFormat: mapFlatpickrDateFormatWithFieldType(this.args.type || FieldType.dateIso)
    };
    this.$input = $(`<input type="text" value="${this.defaultDate}" class="editor-text" />`);
    this.$input.appendTo(this.args.container);
    this.$input.focus().val(this.defaultDate).select();
    this.flatInstance = flatpickr(this.$input[0], pickerOptions);
  }

  destroy() {
    this.flatInstance.destroy();
    this.$input.remove();
  }

  show() {
    this.flatInstance.open();
  }

  hide() {
    this.flatInstance.close();
  }

  focus() {
    this.$input.focus();
  }

  loadValue(item: any) {
    this.defaultDate = item[this.args.column.field];
    this.$input.val(this.defaultDate);
    this.$input.select();
  }

  serializeValue() {
    return this.$input.val();
  }

  applyValue(item: any, state: any) {
    item[this.args.column.field] = state;
  }

  isValueChanged() {
    return (!(this.$input.val() === '' && this.defaultDate == null)) && (this.$input.val() !== this.defaultDate);
  }

  validate() {
    if (this.args.column.validator) {
      const validationResults = this.args.column.validator(this.$input.val(), this.args);
      if (!validationResults.valid) {
        return validationResults;
      }
    }

    return {
      valid: true,
      msg: null
    };
  }
}
