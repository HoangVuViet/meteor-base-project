import { Checkbox, Divider, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import { set } from 'js-cookie';
import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import voca from 'voca';
import * as yup from 'yup';
import { API_PATHS } from '../../../../configs/API';
import { BLUE_500 } from '../../../../configs/colors';
import { ROUTES } from '../../../../configs/routes';
import { SUCCESS_CODE } from '../../../../constants';
import { AppState } from '../../../../redux/reducers';
import { Col, Row, snackbarSetting } from '../../../common/components/elements';
import FormControlTextField from '../../../common/components/FormControlTextField';
import { RawLink } from '../../../common/components/Link';
import LoadingButton from '../../../common/components/LoadingButton';
import { fetchThunk } from '../../../common/redux/thunk';
import { ACCESS_TOKEN } from '../../constants';
// eslint-disable-next-line no-unused-vars
import { authIn, defaultLoginData, ILoginData } from '../../redux/authThunks';
import { goToAction } from '../../../common/redux/reducer';

interface Props {}

// eslint-disable-next-line no-unused-vars
const LoginForm: React.FunctionComponent<Props> = props => {
  const intl = useIntl();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // const accountInfo = {
  //   email: (localStorage.email as string) || 'dungtd.it@tripi.vn',
  //   password: (localStorage.password as string) || '123456',
  //   isChecked: localStorage.isChecked === 'true',
  // };

  const storeSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .required(intl.formatMessage({ id: 'requiredField' })),
    password: yup
      .string()
      .required(intl.formatMessage({ id: 'requiredField' }))
      .min(6, intl.formatMessage({ id: 'auth.passwordLengthValidate' }))
      .max(50, intl.formatMessage({ id: 'auth.passwordLengthValidate' })),
  });

  const onLogin = useCallback(
    async (values: ILoginData) => {
      setLoading(true);
      const json = await dispatch(
        fetchThunk(
          API_PATHS.login,
          'post',
          JSON.stringify({ email: values.email.trim(), password: values.password }),
        ),
      );
      if (json?.code === SUCCESS_CODE) {
        set(ACCESS_TOKEN, json.access_token);
        dispatch(authIn(json.data));
        dispatch(goToAction({ pathname: ROUTES.homeDashboard }));
        // dispatch(sendTokenToServer());
        if (values.isChecked === true) {
          localStorage.setItem('email', values.email);
          localStorage.setItem('password', values.password);
          localStorage.isChecked = values.isChecked;
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
          localStorage.removeItem('isChecked');
        }
      } else {
        enqueueSnackbar(
          json.message,
          snackbarSetting(key => closeSnackbar(key), {
            color: 'error',
          }),
        );
      }
      setLoading(false);
    },
    [closeSnackbar, dispatch, enqueueSnackbar],
  );

  const formik = useFormik({
    initialValues: defaultLoginData,
    onSubmit: values => {
      onLogin({ ...values, email: values.email.trim() });
    },
    validationSchema: storeSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: 500 }} autoComplete="none">
      <Col style={{ padding: '36px 30px' }}>
        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
          <FormattedMessage id="systemLogin" />
        </Typography>
        <FormControlTextField
          formControlStyle={{ width: 280, marginTop: 16 }}
          label={<FormattedMessage id="email" />}
          placeholder={intl.formatMessage({ id: 'enterEmail' })}
          value={formik.values.email}
          onChange={e => formik.setFieldValue('email', e.target.value)}
          inputProps={{
            maxLength: 50,
            autoComplete: 'none',
          }}
          errorMessage={
            formik.errors.email && formik.touched.email ? formik.errors.email : undefined
          }
          optional
        />

        <FormControlTextField
          id="password"
          formControlStyle={{ width: 280, marginTop: 12 }}
          label={<FormattedMessage id="password" />}
          placeholder={intl.formatMessage({ id: 'enterPassword' })}
          value={formik.values.password}
          onChange={e => formik.setFieldValue('password', voca.latinise(e.target.value))}
          inputProps={{
            maxLength: 20,
            autoComplete: 'none',
          }}
          type="password"
          errorMessage={
            formik.errors.password && formik.touched.password ? formik.errors.password : undefined
          }
          optional
        />
        <Row style={{ marginTop: 14 }}>
          <Checkbox
            checked={formik.values.isChecked}
            onClick={() => formik.setFieldValue('isChecked', !formik.values.isChecked)}
            color="primary"
            style={{ padding: 0, marginRight: 6 }}
          />
          <Typography variant="body2">
            <FormattedMessage id="saveInfo" />
          </Typography>
        </Row>
        <Row style={{ marginTop: '18px' }}>
          <LoadingButton
            style={{ minWidth: 120, marginRight: 32, height: 36 }}
            type="submit"
            variant="contained"
            color="secondary"
            disableElevation
            loading={loading}
          >
            <Typography variant="subtitle2">
              <FormattedMessage id="login" />
            </Typography>
          </LoadingButton>
          <RawLink to={ROUTES.forgotPass}>
            <Typography variant="body2" style={{ color: BLUE_500 }}>
              <FormattedMessage id="forgotPasswordNote" />
            </Typography>
          </RawLink>
        </Row>
        <Divider style={{ margin: '16px 0px 12px 0px', width: '280px' }} />
        <Row>
          <Typography variant="body2">
            <FormattedMessage id="auth.doNotHaveAccount" />
          </Typography>
          &nbsp;
          <RawLink to={ROUTES.register}>
            <Typography variant="body2" style={{ color: BLUE_500 }}>
              <FormattedMessage id="auth.signUpNow" />
            </Typography>
          </RawLink>
        </Row>
      </Col>
    </form>
  );
};

export default LoginForm;
