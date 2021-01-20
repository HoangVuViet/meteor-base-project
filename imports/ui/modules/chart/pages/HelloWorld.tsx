import { Button, Link, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { GREY_600 } from '../../../configs/colors';
import { Col } from '../../common/components/elements';

const NotSupported = () => {
  return (
    <Col style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <img src="../../svg/ic_developing.svg" style={{ marginRight: 20 }}></img>

      <Typography
        variant="body2"
        style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: GREY_600 }}
      >
        <FormattedMessage id="IDS_HMS_FEATURE_UN_SUPPORTED" />
      </Typography>
      <Link href="/admin/pm25Map">
        <Button variant="contained" color="secondary" style={{ height: 35}} disableElevation>
          <img src="../../svg/ic_arrow_circle_small.svg" style={{ marginRight: 8 }}></img>
          <FormattedMessage id="IDS_HMS_GO_TO_HOMEPAGE" />
        </Button>
      </Link>
    </Col>
  );
};

export default NotSupported;
