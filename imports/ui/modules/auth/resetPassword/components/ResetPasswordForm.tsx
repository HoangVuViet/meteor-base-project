/* eslint-disable no-unused-vars */
import { Divider, IconButton, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import voca from 'voca';
import * as yup from 'yup';
import { BLUE_500 } from '../../../../configs/colors';
import { ROUTES } from '../../../../configs/routes';
import { Col, Row } from '../../../common/components/elements';
import FormControlTextField from '../../../common/components/FormControlTextField';
import Link from '../../../common/components/Link';
import LoadingButton from '../../../common/components/LoadingButton';
import { defaultChangePasswordData, IChangePasswordData } from '../../redux/authThunks';

export interface Props {
  onChangePassword(data: IChangePasswordData): void;
  loading: boolean;
  isSetPassword?: boolean;
}

const ResetPasswordForm: React.FunctionComponent<Props> = (props) => {
  const { onChangePassword, loading, isSetPassword } = props;
  const [showPassword, setShowPassword] = React.useState(false);
  const intl = useIntl();

  const storeSchema = yup.object().shape({
    password: yup
      .string()
      .required(intl.formatMessage({ id: 'required' }))
      .min(6, intl.formatMessage({ id: 'auth.passwordLengthValidate' })),
    confirmPassword: yup
      .string()
      .required(intl.formatMessage({ id: 'required' }))
      .oneOf(
        [yup.ref('password'), null],
        intl.formatMessage({ id: 'auth.passwordConfirmNotMatch' }),
      )
      .min(6, intl.formatMessage({ id: 'auth.passwordLengthValidate' })),
  });

  const formik = useFormik({
    initialValues: defaultChangePasswordData,
    onSubmit: (values) => onChangePassword(values),
    validationSchema: storeSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: 500 }}>
      <Col style={{ padding: '36px 30px' }}>
        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
          <FormattedMessage id={isSetPassword ? 'setPassword' : 'resetPassword'} />
        </Typography>
        <FormControlTextField
          id="password"
          formControlStyle={{ width: 280, marginTop: 16 }}
          label={<FormattedMessage id={isSetPassword ? 'password' : 'newPassword'} />}
          placeholder={intl.formatMessage({ id: 'enterPassword' })}
          value={formik.values.password}
          onChange={(e) => formik.setFieldValue('password', voca.latinise(e.target.value))}
          type={showPassword ? 'text' : 'password'}
          inputProps={{
            maxLength: 20,
            autoComplete: 'new-password',
          }}
          errorMessage={
            formik.errors.password && formik.submitCount > 0 ? formik.errors.password : undefined
          }
          endAdornment={
            <IconButton size="small" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <img src="../../../../../../public/svg/ic_eye_open.svg"></img>
              ) : (
                <img src="../../../../../../public/svg/ic_eye_close.svg"></img>
              )}
            </IconButton>
          }
        />
        <FormControlTextField
          id="confirmPassword"
          style={{ width: 280 }}
          formControlStyle={{ width: 380, marginTop: 12, marginBottom: 12 }}
          label={<FormattedMessage id={isSetPassword ? 'confirmPassword' : 'confirmNewPassword'} />}
          placeholder={intl.formatMessage({ id: 'enterPassword' })}
          value={formik.values.confirmPassword}
          onChange={(e: any) =>
            formik.setFieldValue('confirmPassword', voca.latinise(e.target.value))
          }
          type={showPassword ? 'text' : 'password'}
          inputProps={{
            maxLength: 20,
            autoComplete: 'off',
          }}
          errorMessage={
            formik.errors.confirmPassword && formik.submitCount > 0
              ? formik.errors.confirmPassword
              : undefined
          }
        />

        <LoadingButton
          style={{ width: 120 }}
          type="submit"
          variant="contained"
          color="secondary"
          loading={loading}
          disableElevation
        >
          <Typography variant="body2" style={{ minWidth: 100 }}>
            <FormattedMessage id="complete" />
          </Typography>
        </LoadingButton>
        {!isSetPassword && (
          <>
            <Divider style={{ margin: '16px 0px 12px 0px', width: '280px' }} />
            <Row>
              <Typography variant="body2">
                <FormattedMessage id="auth.doNotHaveAccount" />
              </Typography>
              &nbsp;
              <Link to={ROUTES.register}>
                <Typography variant="body2" style={{ color: BLUE_500 }}>
                  <FormattedMessage id="auth.signUpNow" />
                </Typography>
              </Link>
            </Row>
          </>
        )}
      </Col>
    </form>
  );
};

export default ResetPasswordForm;
