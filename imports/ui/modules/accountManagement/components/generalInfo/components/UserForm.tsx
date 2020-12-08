import { Button, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import moment from 'moment';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import * as yup from 'yup';
import { GREY_600 } from '../../../../../configs/colors';
import { DATE_FORMAT_BACK_END, DATE_TIME_FORMAT, MAX_YEARS } from '../../../../../models/moment';
import { validNumberRegex } from '../../../../../models/regex';
import BirthDayField from '../../../../common/components/BirthDayField';
import { Col, GenderField, Row } from '../../../../common/components/elements';
import FormControlTextField from '../../../../common/components/FormControlTextField';
import LoadingButton from '../../../../common/components/LoadingButton';
import { UserManagementInfo } from '../../../ultis';

interface Props {
  info: UserManagementInfo;
  loading: boolean;
  setInfo(info: UserManagementInfo): void;
}

const UserForm: React.FC<Props> = props => {
  const { info, setInfo, loading } = props;
  const intl = useIntl();

  const userManagementSchema = React.useMemo(() => {
    return yup.object().shape({
      //   name: yup
      //     .string()
      //     .trim()
      //     .required(intl.formatMessage({ id: 'required' }))
      //     .max(10, intl.formatMessage({ id: 'auth.passwordLengthValidate' })),
      // email: yup
      //   .string()
      //   .trim()
      //   .email(intl.formatMessage({ id: 'emailInvalid' }))
      //   .required(intl.formatMessage({ id: 'required' })),
      // phone: yup.string(),
      // required(intl.formatMessage({ id: 'required' })),
      dateOfBirth: yup
        .string()
        .trim()
        .required(intl.formatMessage({ id: 'required' }))
        .nullable()
        .test('dateOfBirth', intl.formatMessage({ id: 'birthdayValid' }), value => {
          const birthday = moment(value);
          return birthday.isValid() && moment().diff(birthday) > 0 && birthday.year() >= MAX_YEARS;
        }),
      // gender: yup.mixed().nullable(),
      // .required(intl.formatMessage({ id: 'required' })),
    });
  }, [intl]);

  const formik = useFormik({
    initialValues: info,
    onSubmit: values => {
      setInfo({ ...values, dateOfBirth: moment(values.dateOfBirth).format(DATE_TIME_FORMAT) });
    },
    validationSchema: userManagementSchema,
  });

  React.useEffect(() => {
    formik.setValues(info, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);

  return (
    <form autoComplete="off" onSubmit={formik.handleSubmit}>
      <Row style={{ paddingBottom: 24 }}>
        <GenderField
          gender={formik.values.gender}
          update={value => formik.setFieldValue('gender', value)}
          oneLine
        />
      </Row>
      <Row style={{}}>
        <Col style={{}}>
          <Row style={{ alignItems: 'baseline', minWidth: 260, paddingBottom: 24 }}>
            <Typography variant="body2" style={{ paddingRight: 12, minWidth: 100 }}>
              <FormattedMessage id="fullName" />
            </Typography>
            <FormControlTextField
              id="name"
              formControlStyle={{ width: 300 }}
              value={formik.values.name}
              placeholder={intl.formatMessage({ id: 'auth.enterName' })}
              onChange={formik.handleChange}
              inputProps={{
                maxLength: 100,
              }}
              errorMessage={
                formik.errors.name && formik.submitCount > 0 ? formik.errors.name : undefined
              }
            />
          </Row>
          <Row style={{ alignItems: 'baseline', paddingBottom: 24 }}>
            <Typography variant="body2" style={{ paddingRight: 12, minWidth: 100 }}>
              <FormattedMessage id="phoneNumber" />
            </Typography>
            <FormControlTextField
              id="phone"
              formControlStyle={{ width: 300 }}
              placeholder={intl.formatMessage({ id: 'enterPhoneNumber' })}
              value={formik.values.phone}
              onChange={e =>
                (validNumberRegex.test(e.target.value) || e.target.value === '') &&
                formik.setFieldValue('phone', e.target.value)
              }
              inputProps={{
                maxLength: 15,
              }}
              errorMessage={
                formik.errors.phone && formik.submitCount > 0 ? formik.errors.phone : undefined
              }
            />
          </Row>
        </Col>
        <Col style={{}}>
          <Row style={{ paddingBottom: 24 }}>
            <Typography variant="body2" style={{ minWidth: 80, marginBottom: 20 }}>
              <FormattedMessage id="birthday" />
              &nbsp;
            </Typography>
            <BirthDayField
              id="dateOfBirth"
              disableFuture
              date={
                formik.values.dateOfBirth
                  ? moment(formik.values.dateOfBirth, DATE_FORMAT_BACK_END)
                  : undefined
              }
              update={value => {
                formik.setFieldValue('dateOfBirth', value);
              }}
              inputStyle={{ width: 300 }}
              errorMessage={
                formik.errors.dateOfBirth && formik.submitCount > 0
                  ? formik.errors.dateOfBirth
                  : undefined
              }
            />
          </Row>
          <Row style={{ paddingBottom: 24 }}>
            <Typography variant="body2" style={{ minWidth: 80, marginBottom: 20 }}>
              <FormattedMessage id="email" />
            </Typography>
            <FormControlTextField
              disabled
              id="email"
              formControlStyle={{ width: 300 }}
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder={intl.formatMessage({ id: 'enterEmail' })}
              inputProps={{
                maxLength: 50,
              }}
              errorMessage={
                formik.errors.email && formik.submitCount > 0 ? formik.errors.email : undefined
              }
            />
          </Row>
        </Col>
      </Row>
      <Row>
        <LoadingButton
          style={{ minHeight: 36, marginRight: 24, minWidth: 150 }}
          type="submit"
          variant="contained"
          color="secondary"
          disableElevation
          loading={loading}
        >
          <Typography variant="body2">
            <FormattedMessage id="IDS_HMS_SAVE" />
          </Typography>
        </LoadingButton>
        <Button
          style={{ minHeight: 36, color: GREY_600, minWidth: 150 }}
          variant="outlined"
          onClick={() => formik.resetForm()}
          disableElevation
        >
          <Typography variant="body2">
            <FormattedMessage id="IDS_HMS_REJECT" />
          </Typography>
        </Button>
      </Row>
    </form>
  );
};

export default UserForm;
