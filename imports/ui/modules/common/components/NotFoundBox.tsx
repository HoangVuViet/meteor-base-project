import { Typography } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import logo from '../../../../../public/svg/notFound.svg';
interface INotFoundBoxProps {}

const NotFoundBox: React.FunctionComponent<INotFoundBoxProps> = () => {
  return (
    <div style={{ margin: '20px auto', width: '570px' }}>
      <Typography variant="h4">404</Typography>
      <Typography color="textSecondary">
        <FormattedMessage id="notFound" />
      </Typography>
      <br />
      {/* <NotFoundSvg style={{ width: '500px', height: '300px', objectFit: 'contain' }} /> */}
      <img src="../../../svg/notFound.svg" alt="" />
    </div>
  );
};

export default NotFoundBox;
