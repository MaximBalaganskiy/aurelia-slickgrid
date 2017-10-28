import { FieldType, FilterCondition, FilterConditionOption } from '../models';
import { testFilterCondition } from './filterUtilities';
import { mapMomentDateFormatWithFieldType } from './../services/utilities';
import * as moment from 'moment';
const FORMAT = mapMomentDateFormatWithFieldType(FieldType.dateUs);

export const dateUsFilterCondition: FilterCondition = (options: FilterConditionOption) => {
  if (!moment(options.cellValue, FORMAT, true).isValid() || !moment(options.searchTerm, FORMAT, true).isValid()) {
    return true;
  }
  const dateCell = moment(options.cellValue, FORMAT, true);
  const dateSearch = moment(options.searchTerm, FORMAT, true);

  // run the filter condition with date in Unix Timestamp format
  return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};
