import { Paper } from '@material-ui/core';
import React from 'react';
import { PageContainer, Row } from '../../../common/components/elements';
import Banner from '../../common/Banner';
import Footer from '../../common/Footer';
import { IChangePasswordData } from '../../redux/authThunks';
import ResetPasswordForm from './ResetPasswordForm';

interface Props {
  onChangePassword(data: IChangePasswordData): void;
  // eslint-disable-next-line react/require-default-props
  isSetPassword?: boolean;
  loading: boolean;
}
const ResetPasswordDesktop = (props: Props) => {
  const { onChangePassword, loading, isSetPassword } = props;
  return (
    <PageContainer>
      <Row
        style={{
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={6}
          style={{
            display: 'flex',
            borderRadius: '12px',
            flexDirection: 'row',
            height: 440,
          }}
        >
          <Banner />
          <ResetPasswordForm
            isSetPassword={isSetPassword}
            loading={loading}
            onChangePassword={onChangePassword}
          />
        </Paper>
      </Row>
      <Footer />
    </PageContainer>
  );
};

export default ResetPasswordDesktop;
