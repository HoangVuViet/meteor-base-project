import { Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import querystring from 'query-string';
import * as React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Col, Row } from '../../common/components/elements';
import DashBoardChart from './DashBoardChart';
import { appToken, isEmpty, some, URL_CONFIG } from '/imports/ui/constants';
interface IDashboardProps {}

const Dashboard: React.FunctionComponent<IDashboardProps> = (_props) => {
  const { addressP } = useSelector((state: some) => state.accommodation, shallowEqual);

  const [data, setData] = React.useState<some>({});

  const result = addressP
    ? {
        ...addressP,
        position: {
          lat: addressP?.position[0],
          long: addressP?.position[1],
        },
      }
    : {};
  console.log(result);
  const fetchData = () => {
    const searchStr = querystring.stringify({
      // lat: 41.85,
      // long: -87.65,
      appid: appToken,
    });

    fetch(
      `${URL_CONFIG}/data/2.5/history/city?lat=35&lon=139&appid=093b90a9af239de17af3339289c83e69`,
      {
        method: 'GET',
      },
    )
      .then((response) => response.json())
      .then((dataR) => setData(dataR));
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  console.log('datas', data);
  return (
    <Col>
      <Row style={{ display: 'flex', marginBottom: 5, marginTop: 10 }}>
        <LocationOnIcon />
        <Typography variant="h5" component="span" style={{ marginLeft: 4 }}>
          {addressP?.address}
        </Typography>
      </Row>
      <Typography variant="body2" style={{ marginLeft: 12 }}>
        <span>
          Vĩ độ: {!isEmpty(result?.position) ? result.position.lat : '-'} / Kinh độ:
          {!isEmpty(result?.position) ? result.position.long : '-'}
        </span>
      </Typography>
      <DashBoardChart></DashBoardChart>
    </Col>
  );
};

export default Dashboard;
