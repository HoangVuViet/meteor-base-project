import { Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Rating } from '@material-ui/lab';
import * as React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Col, Row } from '../../common/components/elements';
import DashBoardChart from './DashBoardChart';
import { some } from '/imports/ui/constants';
interface IDashboardProps {}

const Dashboard: React.FunctionComponent<IDashboardProps> = (_props) => {
  const { addressP } = useSelector((state: some) => state.accommodation, shallowEqual);
  console.log(addressP);
  return (
    <Col>
      <Typography variant="h5" style={{ marginTop: 15 }}>
        Trung tâm Live & Learn
      </Typography>
      <Rating value={5} readOnly size="small" />
      <Row style={{ display: 'flex', marginBottom: 15 }}>
        <LocationOnIcon />
        <Typography variant="body2" component="span" style={{ marginLeft: 4 }}>
          phường Bưởi, quận Tây Hồ
        </Typography>
      </Row>
      <DashBoardChart></DashBoardChart>
    </Col>
  );
};

export default Dashboard;
