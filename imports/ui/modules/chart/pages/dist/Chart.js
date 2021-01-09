"use strict";
exports.__esModule = true;
var formik_1 = require("formik");
var react_1 = require("react");
var ChartDetail_1 = require("../components/ChartDetail");
var Chart = function () {
    return (react_1["default"].createElement(formik_1.Formik, { initialValues: { dataType: 1, radius: 12, station: 2, time: 15 }, onSubmit: function () { return console.log('Submitting'); } }, function () { return (react_1["default"].createElement(formik_1.Form, null,
        react_1["default"].createElement(ChartDetail_1["default"], null))); }));
};
exports["default"] = Chart;
