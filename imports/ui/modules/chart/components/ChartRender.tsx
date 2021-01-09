import React, { useEffect } from 'react';
import Chart from 'chart.js';
import { some } from '/imports/ui/constants';

interface Props {
  chartData: some[];
}

const ChartRender: React.FC<Props> = (props) => {
  const { chartData } = props;
  useEffect(() => {
    const ctx = document.getElementById('myChart');
    new Chart(ctx as any, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Biểu đồ đánh giá dữ liệu',
            data: [...chartData],
            backgroundColor: 'rgb(255, 99, 132)',
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
          },
          y: {
            type: 'linear',
            position: 'bottom',
          },
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Satellite AOD',
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Station AOD',
              },
            },
          ],
        },
        plugins: {
          tooltip: {
            usePointStyle: true,
            callbacks: {
              labelPointStyle: () => {
                return {
                  pointStyle: 'triangle',
                  rotation: 0,
                };
              },
            },
          },
        },
      },
    });
  });

  return <canvas id="myChart" style={{ width: 750, height: 500 }} />;
};
export default ChartRender;
