import { Divider, IconButton, InputAdornment, Paper, Typography } from '@material-ui/core';
import IconClose from '@material-ui/icons/CloseOutlined';
import { useFormik } from 'formik';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import * as yup from 'yup';
// import { ReactComponent as EyeCloseIcon } from '../../../../../../public/svg/ic_eye_close.svg';
import { PRIMARY } from '../../../../configs/colors';
// import { ReactComponent as EyeOpenIcon } from '../../../../svg/ic_eye_open.svg';
import { Col, Row } from '../../../common/components/elements';
import FormControlTextField from '../../../common/components/FormControlTextField';
import LoadingButton from '../../../common/components/LoadingButton';
import { defaultChangePass, IChangePasswordForm } from '../../redux/authThunks';

interface Props {
  onChangePassword(values: IChangePasswordForm): void;
  setOpen(data: boolean): void;
  loading: boolean;
}
const ChangePasswordForm: React.FC<Props> = (props) => {
  const { onChangePassword, setOpen, loading } = props;
  const intl = useIntl();

  const [hidePassword, setHidePassword] = React.useState({
    currentPassword: false,
    password: false,
  });
  const storeSchema = yup.object().shape({
    currentPassword: yup
      .string()
      .trim()
      .required(intl.formatMessage({ id: 'required' }))
      .min(6, intl.formatMessage({ id: 'auth.passwordLengthValidate' }))
      .max(50, intl.formatMessage({ id: 'auth.passwordLengthValidate' })),
    newPassword: yup
      .string()
      .trim()
      .required(intl.formatMessage({ id: 'required' }))
      .min(6, intl.formatMessage({ id: 'auth.passwordLengthValidate' }))
      .max(50, intl.formatMessage({ id: 'auth.passwordLengthValidate' })),
    confirmPassword: yup
      .string()
      .trim()
      .required(intl.formatMessage({ id: 'required' }))
      .oneOf(
        [yup.ref('newPassword'), null],
        intl.formatMessage({ id: 'auth.passwordConfirmNotMatch' }),
      )
      .min(6, intl.formatMessage({ id: 'auth.passwordLengthValidate' }))
      .max(50, intl.formatMessage({ id: 'auth.passwordLengthValidate' })),
  });
  const formik = useFormik({
    initialValues: defaultChangePass,
    onSubmit: (values) => {
      onChangePassword(values);
    },
    validationSchema: storeSchema,
  });
  return (
    <Paper
      style={{
        minWidth: 400,
      }}
      elevation={4}
    >
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Row style={{ justifyContent: 'space-between', padding: '12px 16px' }}>
          <Typography variant="subtitle1" style={{ textAlign: 'left' }}>
            <FormattedMessage id="auth.changePassword" />
          </Typography>
          <IconButton size="small" onClick={() => setOpen(false)}>
            <IconClose />
          </IconButton>
        </Row>
        <Divider />
        <Col style={{ margin: '24px 32px 0px 32px' }}>
          <FormControlTextField
            id="currentPassword"
            formControlStyle={{ width: '100%' }}
            label={<FormattedMessage id="auth.currentPassword" />}
            value={formik.values.currentPassword}
            placeholder={intl.formatMessage({ id: 'enterPassword' })}
            onChange={formik.handleChange}
            inputProps={{
              maxLength: 50,
              style: {
                width: '100%',
              },
              autoComplete: 'off',
            }}
            type={hidePassword.currentPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="start">
                <IconButton
                  tabIndex={-1}
                  onClick={() =>
                    setHidePassword({
                      ...hidePassword,
                      currentPassword: !hidePassword.currentPassword,
                    })
                  }
                  size="small"
                >
                  {hidePassword.currentPassword ? (
                    <img
                      src="../../../../../../public/svg/ic_eye_open.svg"
                      className="svgFillAll"
                      style={{ stroke: PRIMARY, fill: PRIMARY }}
                    ></img>
                  ) : (
                    <img src="../../../../../../public/svg/ic_eye_close.svg"></img>
                  )}
                </IconButton>
              </InputAdornment>
            }
            errorMessage={
              formik.errors.currentPassword && formik.submitCount > 0
                ? formik.errors.currentPassword
                : undefined
            }
          />
          <FormControlTextField
            id="newPassword"
            formControlStyle={{ width: '100%' }}
            label={<FormattedMessage id="auth.newPassword" />}
            placeholder={intl.formatMessage({ id: 'enterPassword' })}
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            inputProps={{
              maxLength: 50,
              style: {
                width: '100%',
              },
              autoComplete: 'off',
            }}
            type={hidePassword.password ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="start">
                <IconButton
                  tabIndex={-1}
                  onClick={() =>
                    setHidePassword({ ...hidePassword, password: !hidePassword.password })
                  }
                  size="small"
                >
                  {hidePassword.password ? (
                    <img
                      src="../../../../../../public/svg/ic_eye_open.svg"
                      className="svgFillAll"
                      style={{ stroke: PRIMARY, fill: PRIMARY }}
                    ></img>
                  ) : (
                    <img src="../../../../../../public/svg/ic_eye_close.svg"></img>
                  )}
                </IconButton>
              </InputAdornment>
            }
            errorMessage={
              formik.errors.newPassword && formik.touched.newPassword
                ? formik.errors.newPassword
                : undefined
            }
          />
          <FormControlTextField
            id="confirmPassword"
            formControlStyle={{ width: '100%', marginBottom: 14 }}
            label={<FormattedMessage id="auth.enterConfirmPassword" />}
            placeholder={intl.formatMessage({ id: 'enterPassword' })}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            inputProps={{
              maxLength: 50,
              style: {
                width: '100%',
              },
              autoComplete: 'off',
            }}
            type="password"
            errorMessage={
              formik.errors.confirmPassword && formik.touched.confirmPassword
                ? formik.errors.confirmPassword
                : undefined
            }
          />
        </Col>
        <Divider />
        <Row style={{ margin: 12, display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton
            type="submit"
            color="secondary"
            variant="contained"
            disableElevation
            style={{ marginRight: 16 }}
            loading={loading}
          >
            <FormattedMessage id="confirm" />
          </LoadingButton>
          <LoadingButton
            loading={loading}
            variant="outlined"
            disableElevation
            onClick={() => setOpen(false)}
          >
            <FormattedMessage id="reject" />
          </LoadingButton>
        </Row>
      </form>
    </Paper>
  );
};

export default ChangePasswordForm;
