define(["require", "exports", "./../services/utilities", "./filterUtilities", "moment"], function (require, exports, utilities_1, filterUtilities_1, moment) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.dateUtcFilterCondition = function (options) {
        if (!options.filterSearchType) {
            throw new Error('Date UTC filter is a special case and requires a filterSearchType to be provided in the column option, for example: { filterable: true, type: FieldType.dateUtc, filterSearchType: FieldType.dateIso }');
        }
        var searchDateFormat = utilities_1.mapMomentDateFormatWithFieldType(options.filterSearchType);
        if (!moment(options.cellValue, moment.ISO_8601).isValid() || !moment(options.searchTerm, searchDateFormat, true).isValid()) {
            return true;
        }
        var dateCell = moment(options.cellValue, moment.ISO_8601, true);
        var dateSearch = moment(options.searchTerm, searchDateFormat, true);
        // run the filter condition with date in Unix Timestamp format
        return filterUtilities_1.testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
    };
});
//# sourceMappingURL=dateUtcFilterCondition.js.map