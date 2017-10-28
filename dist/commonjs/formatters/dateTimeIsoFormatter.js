"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("./../models");
var utilities_1 = require("./../services/utilities");
var moment = require("moment");
var FORMAT = utilities_1.mapMomentDateFormatWithFieldType(models_1.FieldType.dateTimeIso);
exports.dateTimeIsoFormatter = function (row, cell, value, columnDef, dataContext) {
    return value ? moment(value).format(FORMAT) : '';
};
//# sourceMappingURL=dateTimeIsoFormatter.js.map