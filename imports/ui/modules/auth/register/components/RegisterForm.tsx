/* eslint-disable no-unused-vars */
import { Divider, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import * as yup from 'yup';
import { BLUE_500 } from '../../../../configs/colors';
import { ROUTES } from '../../../../configs/routes';
import { validNumberRegex } from '../../../../models/regex';
import { Col, Row } from '../../../common/components/elements';
import FormControlTextField from '../../../common/components/FormControlTextField';
import Link from '../../../common/components/Link';
import LoadingButton from '../../../common/components/LoadingButton';
import { defaultRegisterData, IRegisterData } from '../../redux/authThunks';

export interface Props {
  loading: boolean;
  onRegister(data: IRegisterData): void;
}

const RegisterForm: React.FunctionComponent<Props> = props => {
  const { loading, onRegister } = props;
  const intl = useIntl();
  const storeSchema = yup.object().shape({
    email: yup
      .string()
      .email(intl.formatMessage({ id: 'emailInvalid' }))
      .required(intl.formatMessage({ id: 'required' }))
      .trim(),
  });

  const formik = useFormik({
    initialValues: defaultRegisterData,
    onSubmit: values => onRegister(values),
    validationSchema: storeSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: 500 }}>
      <Col style={{ padding: '24px 30px' }}>
        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
          <FormattedMessage id="registerNew" />
        </Typography>
        <FormControlTextField
          id="email"
          formControlStyle={{ width: 280, marginTop: 16 }}
          label={<FormattedMessage id="email" />}
          placeholder={intl.formatMessage({ id: 'enterEmail' })}
          value={formik.values.email}
          onChange={formik.handleChange}
          inputProps={{
            maxLength: 50,
            autoComplete: 'new',
          }}
          errorMessage={
            formik.errors.email && formik.submitCount > 0 ? formik.errors.email : undefined
          }
        />
        <FormControlTextField
          id="name"
          formControlStyle={{ width: 280, marginTop: 12 }}
          label={<FormattedMessage id="fullName" />}
          placeholder={intl.formatMessage({ id: 'enterFullName' })}
          value={formik.values.name}
          onChange={formik.handleChange}
          inputProps={{
            maxLength: 100,
            autoComplete: 'new',
          }}
          optional
        />
        <FormControlTextField
          id="phone"
          formControlStyle={{ width: 280, marginTop: 12, marginBottom: 12 }}
          label={<FormattedMessage id="phoneNumber" />}
          placeholder={intl.formatMessage({ id: 'enterPhoneNumber' })}
          value={formik.values.phone}
          onChange={(e: any) =>
            validNumberRegex.test(e.target.value) &&
            formik.setFieldValue('phone', e.target.value, false)
          }
          inputProps={{
            maxLength: 15,
            autoComplete: 'off',
          }}
          optional
        />

        <LoadingButton
          style={{ width: 160 }}
          type="submit"
          variant="contained"
          color="secondary"
          loading={loading}
          disableElevation
        >
          <Typography variant="body2" style={{ width: 140, whiteSpace: 'nowrap' }}>
            <FormattedMessage id="register" />
          </Typography>
        </LoadingButton>
        <Divider style={{ margin: '16px 0px 12px 0px', width: '280px' }} />
        <Row>
          <Typography variant="body2">
            <FormattedMessage id="auth.alreadyHadAccount" />
          </Typography>
          &nbsp;
          <Link to={ROUTES.login}>
            <Typography variant="body2" style={{ color: BLUE_500 }}>
              <FormattedMessage id="auth.signInNow" />
            </Typography>
          </Link>
        </Row>
      </Col>
    </form>
  );
};

export default RegisterForm;
