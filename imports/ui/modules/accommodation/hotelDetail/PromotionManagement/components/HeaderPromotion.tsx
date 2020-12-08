import { Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import DividerWithText from '../../../../common/components/DividerWithText';
import { Col } from '../../../../common/components/elements';

function HeaderPromotion(props: any) {
  return (
    <Col style={{ marginBottom: 28 }}>
      <Typography variant="h5" component="p">
        <FormattedMessage id="IDS_HMS_CREATE_NEW_PROGRAM" />
      </Typography>
      <DividerWithText childrenText={['Loại khuyến mãi', 'Chi tiết chương trình', 'Hoàn thành']} />
    </Col>
  );
}

export default HeaderPromotion;
