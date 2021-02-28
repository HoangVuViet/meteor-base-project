import { Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Rating } from '@material-ui/lab';
import * as React from 'react';
import { Col, Row } from '../../common/components/elements';
import DashBoardChart from './DashBoardChart';
interface IDashboardProps {}

const Dashboard: React.FunctionComponent<IDashboardProps> = (_props) => {
  return (
    <Col>
      <Typography variant="h5"> Trung tâm Live & Learn</Typography>
      <Rating value={5} readOnly size="small" />

      <Row style={{ display: 'flex', marginBottom: 30 }}>
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
