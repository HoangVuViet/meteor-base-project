import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as yup from 'yup';
import { API_PATHS } from '../../../../../../configs/API';
import { GREY_400, WHITE } from '../../../../../../configs/colors';
import { some, SUCCESS_CODE } from '../../../../../../constants';
import { validNumberRegex } from '../../../../../../models/regex';
import { AppState } from '../../../../../../redux/reducers';
import { Row, snackbarSetting } from '../../../../../common/components/elements';
import FormControlTextField from '../../../../../common/components/FormControlTextField';
import LoadingButton from '../../../../../common/components/LoadingButton';
import SingleSelect from '../../../../../common/components/SingleSelect';
import { fetchThunk } from '../../../../../common/redux/thunk';
import { AddNewMember, defaultAddNewMember } from '../../../../ultis';

interface Props {
  hotelId?: string;
  open: boolean;
  onClose: () => void;
  listOperator: some[];
}
const AddNewMemberDialog: React.FC<Props> = props => {
  const { hotelId, open, onClose, listOperator } = props;
  const intl = useIntl();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState(false);

  const createOrInviteSubAccount = React.useCallback(
    async (val: AddNewMember) => {
      setLoading(true);
      const json = await dispatch(
        fetchThunk(
          hotelId ? API_PATHS.inviteUserToHotel : API_PATHS.createSubAccount,
          'post',
          JSON.stringify({ ...val, hotelId }),
        ),
      );
      if (json?.code === SUCCESS_CODE) {
        json?.message &&
          enqueueSnackbar(
            json.message,
            snackbarSetting(key => closeSnackbar(key), {}),
          );
        onClose();
      } else {
        json?.message &&
          enqueueSnackbar(
            json.message,
            snackbarSetting(key => closeSnackbar(key), {
              color: 'error',
            }),
          );
      }
      setLoading(false);
    },
    [closeSnackbar, dispatch, enqueueSnackbar, hotelId, onClose],
  );

  const storeSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .email(intl.formatMessage({ id: 'emailInvalid' }))
      .required(intl.formatMessage({ id: 'required' })),
    groupId: hotelId
      ? yup
          .number()
          .nullable()
          .required(intl.formatMessage({ id: 'required' }))
      : yup.number().nullable(),
  });

  const formik = useFormik({
    initialValues: defaultAddNewMember,
    onSubmit: values => {
      createOrInviteSubAccount({
        ...values,
        name: values.name?.trim(),
        email: values.email.trim(),
      });
    },
    validationSchema: storeSchema,
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" style={{ borderRadius: 8 }}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle style={{ padding: '12px 16px' }}>
          <Row style={{ justifyContent: 'space-between' }}>
            <Typography variant="subtitle1">
              <FormattedMessage id="accManagement.addNewMember" />
            </Typography>
            <IconButton style={{ padding: 2 }} onClick={() => onClose()}>
              <CloseIcon />
            </IconButton>
          </Row>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ padding: '24px 32px 36px 32px', maxWidth: hotelId ? 620 : 'none' }}>
          <Row style={{ flexWrap: 'wrap' }}>
            <FormControlTextField
              id="name"
              formControlStyle={{ width: 240 }}
              label={<FormattedMessage id="fullName" />}
              placeholder={intl.formatMessage({ id: 'enterFullName' })}
              value={formik.values.name}
              onChange={formik.handleChange}
              inputProps={{
                maxLength: 100,
                autoComplete: 'none',
              }}
              optional
              errorMessage={
                formik.errors.name && formik.touched.name ? formik.errors.name : undefined
              }
            />
            <FormControlTextField
              id="email"
              formControlStyle={{ width: 240 }}
              label={<FormattedMessage id="email" />}
              placeholder={intl.formatMessage({ id: 'exampleEmail' })}
              value={formik.values.email}
              onChange={formik.handleChange}
              inputProps={{
                maxLength: 50,
                autoComplete: 'none',
              }}
              errorMessage={
                formik.errors.email && formik.touched.email ? formik.errors.email : undefined
              }
            />
            <FormControlTextField
              id="phone"
              formControlStyle={{ width: 240 }}
              label={<FormattedMessage id="phoneNumber" />}
              placeholder={intl.formatMessage({ id: 'enterPhoneNumber' })}
              value={formik.values.phone}
              onChange={e =>
                validNumberRegex.test(e.target.value) &&
                formik.setFieldValue('phone', e.target.value)
              }
              inputProps={{
                maxLength: 12,
                autoComplete: 'none',
              }}
              optional
            />
            {hotelId && (
              <SingleSelect
                id="groupId"
                label={<FormattedMessage id="accManagement.groupUsers" />}
                placeholder={intl.formatMessage({ id: 'choose' })}
                onChange={formik.handleChange}
                value={formik.values.groupId}
                formControlStyle={{ width: 240 }}
                onSelectOption={(value: number) => {
                  formik.setFieldValue('groupId', value);
                }}
                optional
                getOptionLabel={(v: any) => v.name}
                options={listOperator}
                errorMessage={
                  formik.errors.groupId && formik.touched.name ? formik.errors.groupId : undefined
                }
              />
            )}
          </Row>
          <Typography variant="body2" color="textSecondary" style={{ marginTop: 24 }}>
            <FormattedMessage id="accManagement.addNewMemberContent" />
          </Typography>
        </DialogContent>
        <Divider />
        <DialogActions style={{ padding: '12px 16px' }}>
          <Row>
            <LoadingButton
              type="submit"
              loading={loading}
              variant="contained"
              color="secondary"
              style={{ minWidth: 128, marginRight: 16 }}
              disableElevation
            >
              <FormattedMessage id="sendInvitation" />
            </LoadingButton>
            <LoadingButton
              variant="contained"
              loading={loading}
              style={{ minWidth: 128, backgroundColor: WHITE, border: `1px solid ${GREY_400}` }}
              disableElevation
              onClick={() => onClose()}
            >
              <FormattedMessage id="ignore" />
            </LoadingButton>
          </Row>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddNewMemberDialog;
