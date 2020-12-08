import React from 'react';
import Helmet from 'react-helmet';
import { useIntl } from 'react-intl';
import ForgotPasswordDesktop from '../components/ForgotPasswordDesktop';

export interface IForgotPass {
  email: string;
}

export interface IVerifyPassword {
  otp: string;
  password: string;
  confirmPassword: string;
}

export const defaultForgotPass: IForgotPass = {
  email: '',
};

export const defaultVerifyPass: IVerifyPassword = {
  otp: '',
  password: '',
  confirmPassword: '',
};

export type ForgotStep = 'otp' | 'changePass';
interface Props {}
const ForgotPassword = (props: Props) => {
  const intl = useIntl();
  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: 'forgotPassword' })}</title>
      </Helmet>
      <ForgotPasswordDesktop />
    </>
  );
};

export default ForgotPassword;
