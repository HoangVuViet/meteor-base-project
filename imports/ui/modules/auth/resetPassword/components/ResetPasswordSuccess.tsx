import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ROUTES } from '../../../../configs/routes';
import { Col, PageContainer } from '../../../common/components/elements';
import Link from '../../../common/components/Link';
import LoadingButton from '../../../common/components/LoadingButton';

const ResetPasswordSuccess = () => {
  return (
    <PageContainer>
      <img src="../../../../../../public/svg/ic_VNTravelColorLogo.svg"></img>
      <Paper
        style={{
          border: '0.5px solid #BDBDBD',
          borderRadius: '12px',
          width: 570,
          height: 320,
          marginTop: 24,
          padding: '38px 40px',
          display: 'flex',
        }}
      >
        <Col style={{ alignItems: 'center', flex: 1 }}>
          <img
            src="../../../../../../public/svg/ic_changePasswordSuccess.svg"
            style={{ marginBottom: 32 }}
          ></img>
          <Typography
            variant="body2"
            style={{
              display: '',
              wordWrap: 'break-word',
              maxWidth: 350,
              textAlign: 'center',
              marginBottom: 32,
            }}
          >
            <FormattedMessage id="auth.changePasswordSuccessNote" />
          </Typography>
          <Link to={ROUTES.login}>
            <LoadingButton
              style={{ minWidth: 200, height: 36 }}
              type="submit"
              variant="contained"
              color="secondary"
              disableElevation
            >
              <Typography variant="body2">
                <FormattedMessage id="auth.signInAgain" />
              </Typography>
            </LoadingButton>
          </Link>
        </Col>
      </Paper>
    </PageContainer>
  );
};

export default ResetPasswordSuccess;
