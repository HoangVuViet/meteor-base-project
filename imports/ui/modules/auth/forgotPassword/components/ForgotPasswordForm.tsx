import { Divider, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as yup from 'yup';
import { API_PATHS } from '../../../../configs/API';
import { BLUE_500 } from '../../../../configs/colors';
import { ROUTES } from '../../../../configs/routes';
import { SUCCESS_CODE } from '../../../../constants';
import { AppState } from '../../../../redux/reducers';
import { Col, snackbarSetting } from '../../../common/components/elements';
import FormControlTextField from '../../../common/components/FormControlTextField';
import Link from '../../../common/components/Link';
import LoadingButton from '../../../common/components/LoadingButton';
import { fetchThunk } from '../../../common/redux/thunk';
import { defaultForgotPass, IForgotPass } from '../pages/ForgotPassword';

interface Props {}

const ForgotPasswordForm: React.FunctionComponent<Props> = () => {
  const intl = useIntl();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeSchema = yup.object().shape({
    email: yup
      .string()
      .email(intl.formatMessage({ id: 'emailInvalid' }))
      .required(intl.formatMessage({ id: 'required' }))
      .trim(),
  });

  const onLogin = useCallback(
    async (data: IForgotPass) => {
      // dispatch(authIn(fakeUserData));
      setLoading(true);
      const json = await dispatch(
        fetchThunk(`${API_PATHS.forgotPassword(data.email)}`, 'get', undefined, false),
      );
      if (json?.code === SUCCESS_CODE) {
        setSuccess(true);
      } else {
        json?.message &&
          enqueueSnackbar(
            json?.message,
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
    initialValues: defaultForgotPass,
    onSubmit: values => {
      onLogin({ ...values, email: values.email.trim() });
    },
    validationSchema: storeSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: 500 }}>
      <Col style={{ padding: '36px 30px' }}>
        <Typography variant="body1" style={{ fontWeight: 'bold', marginBottom: 32 }}>
          <FormattedMessage id="forgotPassword" />
        </Typography>
        {!success ? (
          <>
            <Typography variant="body2">
              <FormattedMessage id="forgotPasswordContext" />
            </Typography>
            <FormControlTextField
              id="email"
              formControlStyle={{ marginTop: 12, width: 280 }}
              label={<FormattedMessage id="email" />}
              placeholder={intl.formatMessage({ id: 'email' })}
              value={formik.values.email}
              onChange={formik.handleChange}
              inputProps={{
                maxLength: 50,
                autoComplete: 'off',
              }}
              errorMessage={
                formik.errors.email && formik.touched.email ? formik.errors.email : undefined
              }
            />
            <LoadingButton
              style={{ width: 120, height: 36, marginTop: 12 }}
              type="submit"
              variant="contained"
              color="secondary"
              disableElevation
              loading={loading}
            >
              <Typography variant="subtitle2">
                <FormattedMessage id="confirm" />
              </Typography>
            </LoadingButton>
          </>
        ) : (
          <>
            <Typography variant="body2">
              <FormattedMessage id="auth.updatePasswordSuccessNote" />
              &nbsp;
              <Typography variant="body2" component="span" style={{ fontWeight: 'bold' }}>
                {formik.values.email}
              </Typography>
              &nbsp;.
              <FormattedMessage id="auth.updatePasswordSuccessNote2" />
            </Typography>
          </>
        )}

        <Divider style={{ width: 280, margin: '16px 0px 12px' }} />
        <Typography variant="body2" style={{ color: BLUE_500 }}>
          <Link to={ROUTES.register} style={{ whiteSpace: 'nowrap' }}>
            <FormattedMessage id="register" />
          </Link>
          /&nbsp;
          <Link to={ROUTES.login}>
            <FormattedMessage id="login" />
          </Link>
        </Typography>
      </Col>
    </form>
  );
};

export default ForgotPasswordForm;
