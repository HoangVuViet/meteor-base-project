import React, { useRef, useLayoutEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { getDirection } from '../utils';

am4core.useTheme(am4themes_animated);

function TempChartO(props) {
  const { chartName, data } = props;
  const chart = useRef(null);

  useLayoutEffect(() => {
    am4core.useTheme(am4themes_animated);

    let chart = am4core.create(chartName, am4charts.XYChart);

    chart.data = data?.map((el, idx) => {
      return {
        pressS: (el?.main?.temp - 273).toFixed(2),
        time: el.dtg,
        feelsLike: (el?.main?.feels_like - 273).toFixed(2),
        tempMin: (el?.main?.temp_min - 273).toFixed(2),
        tempMax: (el?.main?.temp_max - 273).toFixed(2),
      };
    });

    chart.padding(10, 0, 10, 10);

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = 'time';
    categoryAxis.renderer.minGridDistance = 60;
    // categoryAxis.title.text = 'Thời điểm trong ngày (h)';

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Nhiệt độ (°C)';

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.categoryX = 'time';
    series.dataFields.valueY = 'pressS';
    series.tooltipText =
      'Trung bình: {valueY.value} °C / Tối thiểu: {tempMin} °C / Tối đa: {tempMax} °C';

    let errorBullet = series.bullets.create(am4charts.ErrorBullet);
    errorBullet.isDynamic = true;
    errorBullet.strokeWidth = 2;

    // Set settings
    let circle = errorBullet.createChild(am4core.Circle);
    circle.radius = 3;
    circle.fill = am4core.color('#ffffff');

    // adapter adjusts height of a bullet
    errorBullet.adapter.add('pixelHeight', function (pixelHeight, target) {
      let dataItem = target.dataItem;

      if (dataItem) {
        let value = dataItem.valueY;
        let errorTopValue = value + dataItem.dataContext.error / 2;
        let errorTopY = valueAxis.valueToPoint(errorTopValue).y;

        let errorBottomValue = value - dataItem.dataContext.error / 2;
        let errorBottomY = valueAxis.valueToPoint(errorBottomValue).y;

        return Math.abs(errorTopY - errorBottomY);
      }
      return pixelHeight;
    });

    chart.cursor = new am4charts.XYCursor();

    return () => {
      chart.dispose();
    };
  }, []);

  return <div id={chartName} style={{ width: 680, height: 550 }}></div>;
}
export default TempChartO;
