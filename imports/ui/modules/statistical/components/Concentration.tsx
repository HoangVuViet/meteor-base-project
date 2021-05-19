import { Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Col, Row } from '../../common/components/elements';
import ConcentrationNavigation from './ConcentrationNavigation';
import { some } from '/imports/ui/constants';

export default function SimpleBottomNavigation() {
  const { addressP } = useSelector((state: some) => state.accommodation, shallowEqual);

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
          Kinh độ: {addressP?.position[0]} / Vĩ độ: {addressP?.position[1]}
        </span>
      </Typography>
      <ConcentrationNavigation></ConcentrationNavigation>
    </Col>
  );
}
