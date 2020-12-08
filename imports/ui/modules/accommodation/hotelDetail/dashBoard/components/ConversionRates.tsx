import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import animated from '@amcharts/amcharts4/themes/animated';
import material from '@amcharts/amcharts4/themes/material';
import { Paper, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { BLUE_500, GREEN, GREY, YELLOW } from '../../../../../configs/colors';
import { some } from '../../../../../constants';
import DateField from '../../../../common/components/DateField';
import { Col, Row } from '../../../../common/components/elements';
import LoadingIcon from '../../../../common/components/LoadingIcon';
import { HEIGHT_CHART } from '../../../../dashboard/constant';

am4core.useTheme(material);
am4core.useTheme(animated);

function ConversionRates(props: any) {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [data, setData] = React.useState<some[]>([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const dataFake = [
      { bookingDate: '28-07-2020', amount: 896000, commition: 1345000 },
      { bookingDate: '27-07-2020', amount: 1345000, commition: 896000 },
      { bookingDate: '23-07-2020', amount: 32405000, commition: 896000 },
      { bookingDate: '21-07-2020', amount: 140000, commition: 2068000 },
      { bookingDate: '20-07-2020', amount: 2068000, commition: 32405000 },
    ];
    // const json = await dispatch();
    // fetchThunk(
    //   API_PATHS.dashboard,
    //   'post',
    //   JSON.stringify({
    //     startDate: dateRange.startDate.format(DATE_FORMAT_BACK_END),
    //     endDate: dateRange.endDate.format(DATE_FORMAT_BACK_END),
    //   }),
    // ),
    // if (json?.code === SUCCESS_CODE) {
    setData(dataFake);
    // }
    setLoading(false);
  }, []);

  const chart = React.useRef<am4charts.XYChart | null>(null);
  const element = React.useRef<any>();
  const createAxisAndSeries = React.useCallback((field, name, color) => {
    if (chart.current) {
      const valueAxis = chart.current.yAxes.push(new am4charts.ValueAxis());
      if (chart.current.yAxes.indexOf(valueAxis) !== 0 && chart.current.yAxes.getIndex(0)) {
        valueAxis.syncWithAxis = chart.current.yAxes.getIndex(0) as am4charts.ValueAxis<
          am4charts.AxisRenderer
        >;
      }

      valueAxis.renderer.grid.template.disabled = true;

      const series = chart.current.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = field;
      series.dataFields.dateX = 'bookingDate';
      series.name = name;
      series.tooltipText = '{name}: [bold]{valueY}[/bold]';
      series.tensionX = 0.8;
      series.strokeWidth = 1;
      series.sequencedInterpolation = true;
      if (series.tooltip) {
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color(color);
      }
    }
  }, []);

  const buildChart = React.useCallback(() => {
    if (element.current) {
      const chartTemp = am4core.create('graphDashBoard', am4charts.SlicedChart);
      // Add data
      chartTemp.data = [
        {
          name: 'Lượt xem',
          value: 600,
        },
        {
          name: 'Lượt đặt đơn',
          value: 300,
        },
        {
          name: 'Đơn hàng thành công',
          value: 200,
        },
      ];

      const series = chartTemp.series.push(new am4charts.FunnelSeries());
      series.colors.list = [am4core.color(BLUE_500), am4core.color(GREEN), am4core.color(YELLOW)];
      series.colors.step = 2;
      series.dataFields.value = 'value';
      series.dataFields.category = 'name';
      series.alignLabels = true;

      series.labelsContainer.paddingLeft = 15;
      series.labelsContainer.width = 200;

      // series.orientation = "horizontal";
      // series.bottomRatio = 1;

      chartTemp.legend = new am4charts.Legend();
      chartTemp.legend.position = 'left';
      chartTemp.legend.valign = 'bottom';
      chartTemp.legend.margin(5, 5, 20, 5);

      createAxisAndSeries('amount', intl.formatMessage({ id: 'IDS_HMS_DASHBOARD' }), GREEN);
      createAxisAndSeries('commition', intl.formatMessage({ id: 'helloWorld' }), '#FFB822');
    }
  }, [createAxisAndSeries, intl]);

  useEffect(() => {
    buildChart();
    return () => {
      chart?.current?.dispose();
    };
  }, [buildChart]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Paper style={{ margin: '48px 0px', paddingLeft: 12 }}>
      <Row style={{ justifyContent: 'space-between', paddingRight: 100 }}>
        <Typography gutterBottom variant="h6">
          Tỉ lệ chuyển đổi
        </Typography>
        <DateField
          placeholder={intl.formatMessage({ id: 'IDS_HMS_START_DATE' })}
          inputStyle={{ height: 32, width: '100%' }}
          style={{ marginRight: 0, marginTop: 12 }}
          optional
          onChange={() => {}}
        />
      </Row>
      <Row>
        <Typography gutterBottom variant="h5">
          0.02%
        </Typography>
        <Typography gutterBottom variant="body2" style={{ color: GREEN }}>
          &nbsp;&nbsp;+0.01%
        </Typography>
      </Row>
      <Col
        style={{
          position: 'relative',
          height: HEIGHT_CHART,
          width: '100%',
        }}
      >
        <div
          ref={element}
          id="graphDashBoard"
          style={{
            height: HEIGHT_CHART,
            opacity: loading ? 0.5 : 1,
            transition: 'opacity 0.3s',
            display: data.length > 0 ? 'flex' : 'none',
            top: 0,
            left: 0,
            right: 0,
          }}
        />
        {loading ? (
          <LoadingIcon
            style={{
              position: 'absolute',
              display: 'flex',
              justifyContent: 'center',
              top: 0,
              bottom: 80,
              left: 55,
              width: '100%',
            }}
          />
        ) : (
          !(data.length > 0) && (
            <Row
              style={{
                width: '100%',
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <Col style={{ justifyContent: 'center' }}>
                <Typography variant="body2" style={{ color: GREY }}>
                  <FormattedMessage id="noData" />
                </Typography>
              </Col>
            </Row>
          )
        )}
      </Col>
    </Paper>
  );
}
// this version only for demo
export default ConversionRates;
