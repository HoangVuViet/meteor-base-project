import { Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Rating } from '@material-ui/lab';
import React from 'react';
import { Col, Row } from '../../common/components/elements';
import ConcentrationNavigation from './ConcentrationNavigation';

export default function SimpleBottomNavigation() {
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
      <ConcentrationNavigation></ConcentrationNavigation>
    </Col>
  );
}
