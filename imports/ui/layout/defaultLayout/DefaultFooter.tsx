import { Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Row } from '../../modules/common/components/elements';

interface Props {}

const DefaultFooter: React.FC<Props> = () => {
  return (
    <Row
      style={{
        background: 'white',
        padding: '18px 30px',
        zIndex: 100,
      }}
    >
      <Typography variant="body2" color="textSecondary">
        <FormattedMessage id="footer.license" />
      </Typography>
      {/* <IconFacebook style={{ margin: '0px 8px' }} />
      <IconGoogle style={{ margin: '0px 8px' }} /> */}
      <img src="../../../../svg/facebook.svg"></img>
      <img src="../../../../svg/google_plus.svg"></img>
    </Row>
  );
};

export default DefaultFooter;
