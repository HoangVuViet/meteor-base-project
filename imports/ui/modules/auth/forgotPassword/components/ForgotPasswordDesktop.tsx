import { Paper } from '@material-ui/core';
import React from 'react';
import { PageContainer } from '../../../common/components/elements';
import Banner from '../../common/Banner';
import Footer from '../../common/Footer';
import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPasswordDesktop = () => {
  return (
    <PageContainer>
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
        <ForgotPasswordForm />
      </Paper>
      <Footer />
    </PageContainer>
  );
};

export default ForgotPasswordDesktop;
