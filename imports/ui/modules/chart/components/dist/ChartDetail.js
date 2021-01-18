'use strict';
exports.__esModule = true;
var core_1 = require('@material-ui/core');
var formik_1 = require('formik');
var react_1 = require('react');
var react_intl_1 = require('react-intl');
var voca_1 = require('voca');
var elements_1 = require('../../common/components/elements');
var FieldContent_1 = require('../../common/components/FieldContent');
var utils_1 = require('../utils');
var DataChart_1 = require('./DataChart');
var ChartDetail = function () {
  var _a;
  var intl = react_intl_1.useIntl();
  var _b = formik_1.useFormikContext(),
    values = _b.values,
    setFieldValue = _b.setFieldValue;
  var _c = react_1['default'].useState([]),
    body = _c[0],
    setBody = _c[1];
  var getRadiusOption = function (value) {
    if (value === 'MOD') return utils_1.radiusMODValues;
    if (value === 'MYD') return utils_1.radiusMYDValues;
    if (value === 'VIIRS') return utils_1.radiusVIRValues;
    if (value === 'Landsat') return utils_1.radiusLANDValues;
  };

  react_1['default'].useEffect(
    function () {
      var _a, _b, _c;
      setBody({
        dataType:
          (_a = utils_1.dataType.find(function (el) {
            return el.id === values.dataType;
          })) === null || _a === void 0
            ? void 0
            : _a.name,
        station:
          (_b = utils_1.stationList.find(function (el) {
            return el.id === values.station;
          })) === null || _b === void 0
            ? void 0
            : _b.endor,
        radius: values.radius,
        time: values.time,
        timeEndor:
          (_c = utils_1.timeEvaluation.find(function (el) {
            var _a;
            return (
              (el === null || el === void 0 ? void 0 : el.id) ===
              ((_a = values) === null || _a === void 0 ? void 0 : _a.time)
            );
          })) === null || _c === void 0
            ? void 0
            : _c.endor,
      });
    },
    [values],
  );
  return react_1['default'].createElement(
    react_1['default'].Fragment,
    null,
    react_1['default'].createElement(
      elements_1.Row,
      null,
      react_1['default'].createElement(
        core_1.Typography,
        { variant: 'body2', style: { marginBottom: 16, whiteSpace: 'nowrap' } },
        react_1['default'].createElement(react_intl_1.FormattedMessage, { id: 'dataChoosing' }),
      ),
    ),
    react_1['default'].createElement(
      elements_1.Row,
      null,
      react_1['default'].createElement(
        core_1.Typography,
        {
          style: { margin: '12px 10px 12px 16px', whiteSpace: 'nowrap' },
          variant: 'subtitle2',
          component: 'p',
        },
        react_1['default'].createElement(react_intl_1.FormattedMessage, { id: 'data' }),
      ),
      react_1['default'].createElement(FieldContent_1.FieldSelectContent, {
        name: 'dataType',
        label: null,
        style: {
          width: 300,
          margin: '20px 10px 12px 25px',
        },
        formControlStyle: {
          minWidth: 300,
          width: 'auto',
        },
        options: utils_1.dataType,
        getOptionLabel: function (value) {
          return value.name;
        },
        onSelectOption: function (value) {
          setFieldValue('dataType', value);
          if (values.radius) {
            setFieldValue('radius', undefined);
          }
          if (values.station) {
            setFieldValue('station', undefined);
          }
        },
        placeholder: intl.formatMessage({ id: 'choose' }),
        disableError: true,
      }),
      react_1['default'].createElement(
        core_1.Typography,
        {
          style: { margin: '8px 10px 8px 16px', whiteSpace: 'nowrap' },
          variant: 'subtitle2',
          component: 'p',
        },
        react_1['default'].createElement(react_intl_1.FormattedMessage, { id: 'radius' }),
      ),
      react_1['default'].createElement(FieldContent_1.FieldSelectContent, {
        name: 'radius',
        label: null,
        style: {
          width: 300,
          margin: '16px 10px 8px 40px',
        },
        formControlStyle: {
          minWidth: 300,
          width: 'auto',
        },
        options: !voca_1.isEmpty(values.dataType)
          ? getRadiusOption(
              (_a =
                utils_1.dataType === null || utils_1.dataType === void 0
                  ? void 0
                  : utils_1.dataType.find(function (el) {
                      var _a;
                      return (
                        (el === null || el === void 0 ? void 0 : el.id) ===
                        ((_a = values) === null || _a === void 0 ? void 0 : _a.dataType)
                      );
                    })) === null || _a === void 0
                ? void 0
                : _a.name,
            )
          : [],
        placeholder: intl.formatMessage({ id: 'choose' }),
        getOptionLabel: function (value) {
          return value.id + ' km';
        },
        onSelectOption: function (value) {
          setFieldValue('radius', value);
        },
        disableError: true,
        disabled: voca_1.isEmpty(values.dataType),
      }),
    ),
    react_1['default'].createElement(
      elements_1.Row,
      null,
      react_1['default'].createElement(
        core_1.Typography,
        {
          style: { margin: '8px 10px 0px 16px', whiteSpace: 'nowrap' },
          variant: 'subtitle2',
          component: 'p',
        },
        react_1['default'].createElement(react_intl_1.FormattedMessage, { id: 'time' }),
      ),
      react_1['default'].createElement(FieldContent_1.FieldSelectContent, {
        name: 'time',
        label: null,
        style: {
          width: 300,
          margin: '16px 10px 0px 12px',
        },
        formControlStyle: {
          minWidth: 300,
          width: 'auto',
        },
        options: utils_1.timeEvaluation,
        getOptionLabel: function (value) {
          return value.id + ' ' + value.endor;
        },
        onSelectOption: function (value) {
          setFieldValue('time', value);
        },
        placeholder: intl.formatMessage({ id: 'choose' }),
        disableError: true,
      }),
      react_1['default'].createElement(
        core_1.Typography,
        {
          style: { margin: '8px 10px 0px 12px', whiteSpace: 'nowrap' },
          variant: 'subtitle2',
          component: 'p',
        },
        react_1['default'].createElement(react_intl_1.FormattedMessage, { id: 'spaceStation' }),
      ),
      react_1['default'].createElement(FieldContent_1.FieldSelectContent, {
        name: 'station',
        label: null,
        style: {
          width: 300,
          margin: '16px 10px 0px 8px',
        },
        formControlStyle: {
          minWidth: 300,
          width: 'auto',
        },
        options: utils_1.stationList,
        getOptionLabel: function (value) {
          return value.name;
        },
        onSelectOption: function (value) {
          setFieldValue('station', value);
        },
        placeholder: intl.formatMessage({ id: 'choose' }),
        disableError: true,
      }),
    ),
    react_1['default'].createElement(DataChart_1['default'], { body: body }),
  );
};
exports['default'] = ChartDetail;
