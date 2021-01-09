import { Paper, Typography } from '@material-ui/core';
import { csv, text } from 'd3';
import React from 'react';
import { Col, Row } from '../../common/components/elements';
import ChartRender from './ChartRender';
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
    setTimeout(() => {
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
    }, 400);
  }, []);

  React.useEffect(() => {
    let radius = body?.radius < 10 ? `0${body?.radius}` : body?.radius;
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
      setTimeout(() => {
        fetchData(url);
      }, 300);
    }
  }, [url, body.dataType, body.time, body.radius, body.station]);

  return (
    <React.Fragment>
      {!isEmpty(body.dataType) &&
      !isEmpty(body.time) &&
      !isEmpty(body.radius) &&
      !isEmpty(body.station) &&
      !isEmpty(chartData) ? (
        <Row style={{ marginTop: 15 }}>
          <Col style={{ marginRight: 20, width: '72%' }}>
            <ChartRender chartData={chartData}></ChartRender>
          </Col>
          <Paper
            variant="outlined"
            style={{
              marginTop: -300,
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
