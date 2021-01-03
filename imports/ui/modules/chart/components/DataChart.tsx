import { Datum, ResponsiveScatterPlot } from '@nivo/scatterplot';
import React from 'react';
import { some, URL_BASE } from '/imports/ui/constants';
import { csv } from 'd3';
interface Props {}
const DataChart: React.FC<Props> = (props) => {
  const [chartData, setData] = React.useState<some[]>([]);
  const fetchData = React.useCallback(() => {
    csv(`${URL_BASE}/data/Landsat_15m_0.03km_NghiaDo.csv`).then((data) => {
      setData(data);
    });
  }, []);

  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <ResponsiveScatterPlot
      data={[
        {
          id: 'Biểu đồ đánh giá dữ liệu',
          data: [
            ...chartData.map((el: some) => ({
              x: el?.Sate_AOD,
              y: el?.AERONET_AOD,
            })),
          ] as Datum[],
        },
      ]}
      margin={{
        top: 60,
        right: 140,
        bottom: 70,
        left: 90,
      }}
      xScale={{ type: 'linear', min: 0, max: 'auto' }}
      xFormat={(e) => `${e}`}
      yScale={{ type: 'linear', min: 0, max: 'auto' }}
      yFormat={(e) => `${e}`}
      blendMode="multiply"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'obs',
        legendPosition: 'middle',
        legendOffset: 46,
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'sat',
        legendPosition: 'middle',
        legendOffset: -60,
      }}
      legends={[
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
      ]}
    />
  );
};
export default DataChart;
