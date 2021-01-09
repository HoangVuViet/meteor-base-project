import { Paper, Typography } from '@material-ui/core';
import { Datum, ResponsiveScatterPlot } from '@nivo/scatterplot';
import { csv, text } from 'd3';
import React from 'react';
import { Col, Row } from '../../common/components/elements';
import { isEmpty, some, URL_BASE } from '/imports/ui/constants';
interface Props {
  body: some;
}
const DataChart: React.FC<Props> = (props) => {
  const { body } = props;
  const [chartData, setData] = React.useState<some[]>([]);
  const [textData, setTextData] = React.useState<string[]>([]);

  const [url, setURL] = React.useState<string>();

  const fetchData = React.useCallback((url) => {
    csv(`${URL_BASE}/data/${url}.csv`).then((data) => {
      setData(
        data.map((el: some) => ({
          x: el?.Sate_AOD,
          y: el?.AERONET_AOD,
        })),
      );
    });
    text(`${URL_BASE}/data/${url}.txt`).then((data) => {
      setTextData(data.split('\n'));
    });
  }, []);

  React.useEffect(() => {
    let radius = body?.radius < 10 ? `0${body?.radius}` : body?.radius;
    console.log(radius);
    if (body.dataType === 'Landsat') {
      setURL(
        `${body?.dataType}_${body?.time}${body?.timeEndor}_${body?.radius}km_${body?.station}`,
      );
    } else if (body.dataType === 'VIIRS') {
      setURL(`${body?.dataType}_NPP_${body?.time}${body?.timeEndor}_${radius}km_${body?.station}`);
    } else if (body.dataType === 'MOD') {
      setURL(`MODIS_Aqua_${body?.time}${body?.timeEndor}_${radius}km_${body?.station}`);
    } else {
      setURL(`${body?.dataType}_Aqua_${body?.time}${body?.timeEndor}_${radius}km_${body?.station}`);
    }
  }, [body.dataType, body.time, body.radius, body.station]);

  React.useEffect(() => {
    if (body.dataType && body.time && body.radius && body.station) {
      console.log('Hello');
      setTimeout(() => {
        fetchData(url);
      }, 300);
    }
  }, [url, body.dataType, body.time, body.radius, body.station]);

  console.log(chartData);

  return (
    <React.Fragment>
      {!isEmpty(body.dataType) &&
      !isEmpty(body.time) &&
      !isEmpty(body.radius) &&
      !isEmpty(body.station) ? (
        <Row>
          <Col style={{ height: 600, width: '75%' }}>
            <ResponsiveScatterPlot
              data={[
                {
                  id: 'Biểu đồ đánh giá dữ liệu',
                  data: [...chartData] as Datum[],
                },
              ]}
              margin={{
                top: 20,
                right: 40,
                bottom: 70,
                left: 70,
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
                legend: 'Station AOD',
                legendPosition: 'middle',
                legendOffset: 46,
              }}
              axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Satellite AOD',
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
          </Col>
          <Paper
            variant="outlined"
            style={{
              marginTop: -380,
              padding: '12px 16px',
              borderRadius: 12,
              background: '#f5f5f5',
              boxShadow: 'none',
            }}
          >
            <Typography variant="body2" style={{ marginBottom: 16, whiteSpace: 'nowrap' }}>
              {textData[0]}
            </Typography>
            <Typography variant="body2" style={{ marginBottom: 16, whiteSpace: 'nowrap' }}>
              {textData[1]}
            </Typography>
            <Typography variant="body2" style={{ marginBottom: 16, whiteSpace: 'nowrap' }}>
              {textData[2]}
            </Typography>
            <Typography variant="body2" style={{ marginBottom: 16, whiteSpace: 'nowrap' }}>
              {textData[3]}
            </Typography>
            <Typography variant="body2" style={{ marginBottom: 16, whiteSpace: 'nowrap' }}>
              {textData[4]}
            </Typography>
          </Paper>
        </Row>
      ) : (
        <div style={{ marginLeft: 150, width: '570px' }}>
          <img src="../../../svg/notFound.svg" alt="" />
        </div>
      )}
    </React.Fragment>
  );
};
export default DataChart;
