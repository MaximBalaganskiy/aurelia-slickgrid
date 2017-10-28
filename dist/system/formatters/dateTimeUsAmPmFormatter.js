System.register(["./../models", "./../services/utilities", "moment"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var models_1, utilities_1, moment, FORMAT, dateTimeUsAmPmFormatter;
    return {
        setters: [
            function (models_1_1) {
                models_1 = models_1_1;
            },
            function (utilities_1_1) {
                utilities_1 = utilities_1_1;
            },
            function (moment_1) {
                moment = moment_1;
            }
        ],
        execute: function () {
            FORMAT = utilities_1.mapMomentDateFormatWithFieldType(models_1.FieldType.dateTimeUsAmPm);
            exports_1("dateTimeUsAmPmFormatter", dateTimeUsAmPmFormatter = function (row, cell, value, columnDef, dataContext) {
                return value ? moment(value).format(FORMAT) : '';
            });
        }
    };
});
//# sourceMappingURL=dateTimeUsAmPmFormatter.js.map