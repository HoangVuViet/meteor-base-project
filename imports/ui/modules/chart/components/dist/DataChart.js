'use strict';
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
    return r;
  };
exports.__esModule = true;
var core_1 = require('@material-ui/core');
var scatterplot_1 = require('@nivo/scatterplot');
var d3_1 = require('d3');
var react_1 = require('react');
var elements_1 = require('../../common/components/elements');
var constants_1 = require('/imports/ui/constants');
var DataChart = function (props) {
  var body = props.body;
  var _a = react_1['default'].useState([]),
    chartData = _a[0],
    setData = _a[1];
  var _b = react_1['default'].useState([]),
    textData = _b[0],
    setTextData = _b[1];
  var _c = react_1['default'].useState(),
    url = _c[0],
    setURL = _c[1];
  var fetchData = react_1['default'].useCallback(function (url) {
    d3_1.csv(constants_1.URL_BASE + '/data/' + url + '.csv').then(function (data) {
      setData(
        data.map(function (el) {
          return {
            x: el === null || el === void 0 ? void 0 : el.Sate_AOD,
            y: el === null || el === void 0 ? void 0 : el.AERONET_AOD,
          };
        }),
      );
    });
    d3_1.text(constants_1.URL_BASE + '/data/' + url + '.txt').then(function (data) {
      setTextData(data.split('\n'));
    });
  }, []);
  react_1['default'].useEffect(
    function () {
      var radius =
        (body === null || body === void 0 ? void 0 : body.radius) < 10
          ? '0' + (body === null || body === void 0 ? void 0 : body.radius)
          : body === null || body === void 0
          ? void 0
          : body.radius;
      console.log(radius);
      if (body.dataType === 'Landsat') {
        setURL(
          (body === null || body === void 0 ? void 0 : body.dataType) +
            '_' +
            (body === null || body === void 0 ? void 0 : body.time) +
            (body === null || body === void 0 ? void 0 : body.timeEndor) +
            '_' +
            (body === null || body === void 0 ? void 0 : body.radius) +
            'km_' +
            (body === null || body === void 0 ? void 0 : body.station),
        );
      } else if (body.dataType === 'VIIRS') {
        setURL(
          (body === null || body === void 0 ? void 0 : body.dataType) +
            '_NPP_' +
            (body === null || body === void 0 ? void 0 : body.time) +
            (body === null || body === void 0 ? void 0 : body.timeEndor) +
            '_' +
            radius +
            'km_' +
            (body === null || body === void 0 ? void 0 : body.station),
        );
      } else if (body.dataType === 'MOD') {
        setURL(
          'MODIS_Aqua_' +
            (body === null || body === void 0 ? void 0 : body.time) +
            (body === null || body === void 0 ? void 0 : body.timeEndor) +
            '_' +
            radius +
            'km_' +
            (body === null || body === void 0 ? void 0 : body.station),
        );
      } else {
        setURL(
          (body === null || body === void 0 ? void 0 : body.dataType) +
            '_Aqua_' +
            (body === null || body === void 0 ? void 0 : body.time) +
            (body === null || body === void 0 ? void 0 : body.timeEndor) +
            '_' +
            radius +
            'km_' +
            (body === null || body === void 0 ? void 0 : body.station),
        );
      }
    },
    [body.dataType, body.time, body.radius, body.station],
  );
  react_1['default'].useEffect(
    function () {
      if (body.dataType && body.time && body.radius && body.station) {
        setTimeout(function () {
          fetchData(url);
        }, 300);
      }
    },
    [url, body.dataType, body.time, body.radius, body.station],
  );
  return react_1['default'].createElement(
    react_1['default'].Fragment,
    null,
    !constants_1.isEmpty(body.dataType) &&
      !constants_1.isEmpty(body.time) &&
      !constants_1.isEmpty(body.radius) &&
      !constants_1.isEmpty(body.station)
      ? react_1['default'].createElement(
          elements_1.Row,
          null,
          react_1['default'].createElement(
            elements_1.Col,
            { style: { height: 600, width: '75%' } },
            react_1['default'].createElement(scatterplot_1.ResponsiveScatterPlot, {
              data: [
                {
                  id: 'Biểu đồ đánh giá dữ liệu',
                  data: __spreadArrays(chartData),
                },
              ],
              margin: {
                top: 20,
                right: 40,
                bottom: 70,
                left: 70,
              },
              xScale: { type: 'linear', min: 0, max: 'auto' },
              xFormat: function (e) {
                return '' + e;
              },
              yScale: { type: 'linear', min: 0, max: 'auto' },
              yFormat: function (e) {
                return '' + e;
              },
              blendMode: 'multiply',
              axisTop: null,
              axisRight: null,
              axisBottom: {
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Station AOD',
                legendPosition: 'middle',
                legendOffset: 46,
              },
              axisLeft: {
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Satellite AOD',
                legendPosition: 'middle',
                legendOffset: -60,
              },
              legends: [
                {
                  anchor: 'bottom-right',
                  direction: 'row',
                  justify: false,
                  translateX: 50,
                  translateY: 120,
                  itemWidth: 100,
                  itemHeight: 12,
                  itemsSpacing: 5,
                  itemDirection: 'left-to-right',
                  symbolSize: 12,
                  symbolShape: 'circle',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ],
            }),
          ),
          react_1['default'].createElement(
            core_1.Paper,
            {
              variant: 'outlined',
              style: {
                marginTop: -380,
                padding: '12px 16px',
                borderRadius: 12,
                background: '#f5f5f5',
                boxShadow: 'none',
              },
            },
            react_1['default'].createElement(
              core_1.Typography,
              { variant: 'body2', style: { marginBottom: 16, whiteSpace: 'nowrap' } },
              textData[0],
            ),
            react_1['default'].createElement(
              core_1.Typography,
              { variant: 'body2', style: { marginBottom: 16, whiteSpace: 'nowrap' } },
              textData[1],
            ),
            react_1['default'].createElement(
              core_1.Typography,
              { variant: 'body2', style: { marginBottom: 16, whiteSpace: 'nowrap' } },
              textData[2],
            ),
            react_1['default'].createElement(
              core_1.Typography,
              { variant: 'body2', style: { marginBottom: 16, whiteSpace: 'nowrap' } },
              textData[3],
            ),
            react_1['default'].createElement(
              core_1.Typography,
              { variant: 'body2', style: { marginBottom: 16, whiteSpace: 'nowrap' } },
              textData[4],
            ),
          ),
        )
      : react_1['default'].createElement(
          'div',
          { style: { marginLeft: 150, width: '570px' } },
          react_1['default'].createElement('img', { src: '../../../svg/notFound.svg', alt: '' }),
        ),
  );
};
exports['default'] = DataChart;
