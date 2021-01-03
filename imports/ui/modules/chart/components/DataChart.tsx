import { Datum, ResponsiveScatterPlot } from '@nivo/scatterplot';
import { csv } from 'd3';
import { useFormikContext } from 'formik';
import React from 'react';
import { isEmpty, some, URL_BASE } from '/imports/ui/constants';
interface Props {
  body: some;
}
const DataChart: React.FC<Props> = (props) => {
  const { body } = props;
  const [chartData, setData] = React.useState<some[]>([]);
  const [url, setURL] = React.useState<string>();

  const { values } = useFormikContext();

  const fetchData = React.useCallback((url) => {
    csv(`${URL_BASE}/data/${url}.csv`).then((data) => {
      setData(data);
    });
  }, []);

  React.useEffect(() => {
    if (body.dataType === 'Landsat') {
      setURL(`${body?.dataType}_${body?.time}${body?.timeEndor}_${body?.radius}km_NghiaDo`);
    } else {
      setURL(`${body?.dataType}_Aqua_${body?.time}${body?.timeEndor}_0${body?.radius}km_NghiaDo`);
    }
  }, [body.dataType, body.time, body.radius, body.station]);

  React.useEffect(() => {
    fetchData(url);
  }, [url]);
  console.log(body);

  return (
    <React.Fragment>
      {!isEmpty(body.dataType) &&
      !isEmpty(body.time) &&
      !isEmpty(body.radius) &&
      !isEmpty(body.station) ? (
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
      ) : (
        <div style={{ marginLeft: 150, width: '570px' }}>
          <img src="../../../svg/notFound.svg" alt="" />
        </div>
      )}
    </React.Fragment>
  );
};
export default DataChart;
