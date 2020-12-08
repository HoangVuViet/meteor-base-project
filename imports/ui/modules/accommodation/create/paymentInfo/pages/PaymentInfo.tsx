import { Button, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as yup from 'yup';
import { GREY_100, GREY_600 } from '../../../../../configs/colors';
import { ROUTES } from '../../../../../configs/routes';
import { SUCCESS_CODE } from '../../../../../constants';
import { AppState } from '../../../../../redux/reducers';
import { Row, snackbarSetting } from '../../../../common/components/elements';
import LoadingButton from '../../../../common/components/LoadingButton';
import LoadingIcon from '../../../../common/components/LoadingIcon';
import { goToAction } from '../../../../common/redux/reducer';
import {
  actionsPaymentInfo,
  getListBranchHotels,
  getListHotels,
} from '../../../accommodationService';
import { PaymentInfo as PaymentInfoInterface } from '../../../utils';
import BankAccount from '../components/BankAccount';
import InvoiceInfo from '../components/InvoiceInfo';

function PaymentInfo() {
  const initialValue = {};
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [banks, setBanks] = useState<any[]>([]);
  const [bankBranchs, setBankBranchs] = useState<any[]>([]);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfoInterface | undefined>();

  const match: any = useRouteMatch();

  const listHotels = async () => {
    try {
      const { data } = await dispatch(getListHotels());
      setBanks(data?.items);
    } catch (error) {}
  };

  const listBranchHotels = async (bankId: number) => {
    if (bankId) {
      try {
        const { data } = await dispatch(getListBranchHotels(bankId));
        setBankBranchs(data?.items);
      } catch (error) {}
    }
  };

  const getPaymentInfo = async () => {
    try {
      const { data } = await dispatch(actionsPaymentInfo(match?.params?.hotelId, 'get'));
      listBranchHotels(data?.bankId);
      setPaymentInfo(data);
    } catch (error) {}
  };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const intl = useIntl();
  const isApproval = match?.path === ROUTES.managerHotels.hotelInfo.approvalHotel.payment;
  const getPathName = (path?: string) => {
    return path ? path.replace(':hotelId', match?.params?.hotelId) : undefined;
  };

  const goNextAction = () => {
    dispatch(
      goToAction({
        pathname: getPathName(
          isApproval
            ? ROUTES.managerHotels.hotelInfo.approvalHotel.generalInfo
            : ROUTES.managerHotels.createHotel.generalInfo,
        ),
      }),
    );
  };

  const getSchema = React.useMemo(() => {
    let result: any = {};
    result = {
      ...result,
      [`bankId`]: yup.number().required(intl.formatMessage({ id: 'required' })),
      [`bankBranchId`]: bankBranchs.length
        ? yup.number().required(intl.formatMessage({ id: 'required' }))
        : undefined,
      [`accountNumber`]: yup
        .string()
        .trim()
        .required(intl.formatMessage({ id: 'required' })),
      [`accountName`]: yup
        .string()
        .trim()
        .required(intl.formatMessage({ id: 'required' })),
      [`company`]: yup
        .string()
        .trim()
        .required(intl.formatMessage({ id: 'required' })),
      [`delegate`]: yup
        .string()
        .trim()
        .required(intl.formatMessage({ id: 'required' })),
      [`taxCode`]: yup
        .string()
        .trim()
        .required(intl.formatMessage({ id: 'required' })),
      [`email`]: yup
        .string()
        .trim()
        .required(intl.formatMessage({ id: 'required' }))
        .email(intl.formatMessage({ id: 'emailInvalid' })),
    };
    return result;
  }, [bankBranchs.length, intl]);

  const roomSchema = useMemo(() => {
    return yup.object().shape(getSchema);
  }, [getSchema]);
  useEffect(() => {
    listHotels();
    getPaymentInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div style={{ margin: '0px 16px 16px' }}>
      <Formik
        initialValues={initialValue}
        validationSchema={roomSchema}
        onSubmit={async (values: any, { setSubmitting }) => {
          setSubmitting(true);
          const hotelId = match?.params?.hotelId;
          const params = Object.assign(values, {
            ...values,
            bankBranchId: values.bankBranchId === 0 ? null : values.bankBranchId,
          });
          const { code, message, data } = await dispatch(
            actionsPaymentInfo(hotelId, 'post', params),
          );
          if (code === SUCCESS_CODE) {
            setPaymentInfo(data);
            enqueueSnackbar(
              message,
              snackbarSetting(key => closeSnackbar(key), { color: 'success' }),
            );
            goNextAction();
          } else {
            enqueueSnackbar(
              message,
              snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
            );
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, values }) => {
          return (
            <Form style={{ padding: '30px 16px' }}>
              {banks ? (
                <BankAccount
                  banks={banks}
                  listBranchHotels={listBranchHotels}
                  bankBranchs={bankBranchs}
                  paymentInfo={paymentInfo}
                />
              ) : (
                <LoadingIcon />
              )}
              <InvoiceInfo paymentInfo={paymentInfo} />
              <Row style={{ marginTop: 24 }}>
                <LoadingButton
                  disabled={(values as any).isEditable}
                  type="submit"
                  color="secondary"
                  variant="contained"
                  disableElevation
                  style={{ marginRight: 24, minWidth: 150 }}
                  loading={isSubmitting}
                  onClick={() => {
                    if (Object.keys(errors).length > 0) {
                      enqueueSnackbar(
                        intl.formatMessage({ id: 'IDS_HMS_DATA_INPUT_ERROR' }),
                        snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
                      );
                    }
                  }}
                >
                  <FormattedMessage id="IDS_HMS_SAVE" />
                </LoadingButton>
                <Button
                  style={{
                    height: 40,
                    minWidth: 150,
                    background: GREY_100,
                  }}
                  variant="outlined"
                  disableElevation
                  onClick={() => goNextAction()}
                >
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    style={{
                      marginTop: 5,
                      textAlign: 'center',
                      color: GREY_600,
                    }}
                  >
                    <FormattedMessage id="IDS_HMS_REJECT" />
                  </Typography>
                </Button>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default PaymentInfo;
