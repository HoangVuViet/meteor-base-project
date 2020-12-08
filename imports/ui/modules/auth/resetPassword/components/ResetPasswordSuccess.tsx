import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ROUTES } from '../../../../configs/routes';
import { ReactComponent as ChangePasswordSuccessIcon } from '../../../../svg/ic_changePasswordSuccess.svg';
import { ReactComponent as VNTravelColorLogo } from '../../../../svg/ic_VNTravelColorLogo.svg';
import { Col, PageContainer } from '../../../common/components/elements';
import Link from '../../../common/components/Link';
import LoadingButton from '../../../common/components/LoadingButton';

const ResetPasswordSuccess = () => {
  return (
    <PageContainer>
      <VNTravelColorLogo />
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
          <ChangePasswordSuccessIcon style={{ marginBottom: 32 }} />
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
