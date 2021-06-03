import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import React, { useLayoutEffect, useRef } from 'react';
import { DEFAULT_CHART_WIDTH, DEFAULT_CHAT_HEIGHT, getDirection } from '../../utils';

am4core.useTheme(am4themes_animated);

function WindSpeedChart(props) {
  const { chartName, data } = props;
  const chart = useRef(null);

  useLayoutEffect(() => {
    am4core.useTheme(am4themes_animated);

    let chart = am4core.create(chartName, am4charts.XYChart);

    chart.data = data?.map((el, idx) => {
      return {
        speed: el.wind.speed,
        time: `${idx * 3 + 1}h`,
        deg: `${getDirection(el.wind.deg)} (${el.wind.deg}°)`,
      };
    });

    chart.padding(10, 0, 10, 10);

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = 'time';
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.title.text = 'Thời điểm trong ngày (h)';

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Tốc độ gió (km/h)';

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.categoryX = 'time';
    series.dataFields.valueY = 'speed';
    series.tooltipText = 'Tốc độ: {valueY.value} km/h / Hướng: {deg}';

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

  return (
    <div id={chartName} style={{ width: DEFAULT_CHART_WIDTH, height: DEFAULT_CHAT_HEIGHT }}></div>
  );
}
export default WindSpeedChart;
