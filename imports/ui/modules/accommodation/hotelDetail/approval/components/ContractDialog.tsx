import React, { useState, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import moment, { Moment } from 'moment';
import { useRouteMatch } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Typography, Button, SwipeableDrawer, IconButton, Toolbar } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { Form, Formik } from 'formik';
import IconClose from '@material-ui/icons/Close';
import {
  actionContractHotel,
  actionsGetRateTypes,
  actionsGetContractTypes,
} from '../../../accommodationService';
import { AppState } from '../../../../../redux/reducers';
import { Row, snackbarSetting } from '../../../../common/components/elements';
import { some, SUCCESS_CODE } from '../../../../../constants';
import { ReactComponent as AddIconCircle } from '../../../../../svg/ic_add_circle.svg';
import { BLACK, WHITE } from '../../../../../configs/colors';
import LoadingButton from '../../../../common/components/LoadingButton';
import { DATE_FORMAT_BACK_END } from '../../../../../models/moment';
import { isEmpty } from '../../../utils';
import ListContract from './ListContract';

interface contractProps {
  isDelete: boolean;
}

const ContractDialog = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const match: any = useRouteMatch();
  const intl = useIntl();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [contract, setContract] = useState<Array<contractProps>>([{ isDelete: false }]);
  const [rateTypes, setRateTypes] = useState<some>({});
  const [contractTypes, setContractTypes] = useState<some>({});
  const [contractHotel, setContractHotel] = useState<some>({});

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);
  const fetchContact = async () => {
    try {
      const resContractHotel = await dispatch(actionContractHotel(match?.params?.hotelId, 'get'));
      setContractHotel(resContractHotel?.data);
      if (!isEmpty(resContractHotel?.data?.items)) {
        const fieldResult: Array<contractProps> = [];
        resContractHotel?.data?.items.forEach((el: some, i: number) => {
          fieldResult.push(contract[i] || { isDelete: false });
        });
        setContract(fieldResult);
      }
    } catch (error) {}
  };
  const fetchData = async () => {
    try {
      const [resRateTypes, resContractTypes] = await Promise.all([
        dispatch(actionsGetRateTypes()),
        dispatch(actionsGetContractTypes(match?.params?.hotelId)),
      ]);
      setRateTypes(resRateTypes?.data);
      setContractTypes(resContractTypes?.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
    fetchContact(); // eslint-disable-next-line
  }, []);
  const getValueSubmit = (type: string, val: any) => {
    if (type === 'BOOKING') return null;
    if (type === 'TWICE_MONTHLY') return val;
    return [val];
  };
  const handleDataSubmit = (values: any) => {
    const result: Array<any> = [];
    contract.forEach((el: contractProps, i: number) => {
      if (!el.isDelete) {
        result.push({
          id: values[`id_${i}`],
          rateTypeId: values[`rateTypeId_${i}`],
          contractTypeId: values[`contractTypeId_${i}`],
          contractCode: values[`contractCode_${i}`],
          commission: values[`commission_${i}`],
          files: values[`files_${i}`],
          startDate: values[`startDate_${i}`]
            ? values[`startDate_${i}`].format(DATE_FORMAT_BACK_END)
            : null,
          endDate: values[`endDate_${i}`]
            ? values[`endDate_${i}`].format(DATE_FORMAT_BACK_END)
            : null,
          hotelInvoiceTypeId: values[`hotelInvoiceTypeId_${i}`],
          paymentTime: {
            timeType: values[`paymentTime_${i}`],
            values: getValueSubmit(values[`paymentTime_${i}`], values[`paymentTimeValue_${i}`]),
          },
          crossCheckingTime: {
            timeType: values[`crossCheckingTime_${i}`],
            values: getValueSubmit(
              values[`crossCheckingTime_${i}`],
              values[`crossCheckingTimeValue_${i}`],
            ),
          },
        });
      }
    });
    return result;
  };

  const getSchema = React.useMemo(() => {
    let result: any = {};
    contract.forEach((el: contractProps, i: number) => {
      if (!el.isDelete) {
        result = {
          ...result,
          [`rateTypeId_${i}`]: yup
            .number()
            .transform(value => value || undefined)
            .required(intl.formatMessage({ id: 'required' })),
          [`contractTypeId_${i}`]: yup
            .number()
            .transform(value => value || undefined)
            .required(intl.formatMessage({ id: 'required' })),
          [`contractCode_${i}`]: yup
            .string()
            .trim()
            .required(intl.formatMessage({ id: 'required' })),
          [`rateTypeId_${i}`]: yup
            .number()
            .transform(value => value || undefined)
            .required(intl.formatMessage({ id: 'required' })),
          [`commission_${i}`]: yup
            .number()
            .transform(value => value || undefined)
            .min(15, intl.formatMessage({ id: 'IDS_HMS_VALIDATE_NUMBER_MIN_15' }))
            .max(100, intl.formatMessage({ id: 'IDS_HMS_VALIDATE_NUMBER_MAX_100' }))
            .required(intl.formatMessage({ id: 'required' })),
          [`files_${i}`]: yup
            .array()
            .required(intl.formatMessage({ id: 'IDS_HMS_UPLOAD_FILE_MESSAGE' })),
          [`endDate_${i}`]: yup
            .date()
            .nullable()
            .when(`startDate_${i}`, (startDate: Moment, schema: any) => {
              return schema.test({
                name: `endDate_${i}`,
                test: (endDate: Moment) => {
                  return !(
                    startDate &&
                    endDate &&
                    moment(endDate).isSameOrBefore(moment(startDate), 'days')
                  );
                },
                message: intl.formatMessage({ id: 'IDS_HMS_VALIDATE_END_DATE' }),
              });
            }),
          [`hotelInvoiceTypeId_${i}`]: yup
            .number()
            .transform(value => value || undefined)
            .required(intl.formatMessage({ id: 'required' })),
          [`paymentTime_${i}`]: yup
            .string()
            .transform(value => value || undefined)
            .required(intl.formatMessage({ id: 'required' })),
          [`crossCheckingTime_${i}`]: yup
            .string()
            .transform(value => value || undefined)
            .required(intl.formatMessage({ id: 'required' })),
        };
      }
    });
    return result;
  }, [contract, intl]);
  const contractSchema = React.useMemo(() => {
    return yup.object().shape(getSchema);
  }, [getSchema]);
  return (
    <>
      <Button
        color="secondary"
        variant="contained"
        disableElevation
        fullWidth
        style={{ width: 290 }}
        onClick={openDialog}
      >
        <FormattedMessage id="IDS_HMS_CONTRACT_AND_PRICE" />
      </Button>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={closeDialog}
        onOpen={openDialog}
        className="contract-drawer"
        style={{ borderRadius: 0, height: '100%' }}
      >
        <Formik
          initialValues={{ startDate_0: moment(), rateTypeId_0: 1 }}
          validationSchema={contractSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            const dataPost = handleDataSubmit(values);
            const json = await dispatch(
              actionContractHotel(match?.params?.hotelId, 'post', dataPost),
            );
            setSubmitting(false);
            if (json?.code === SUCCESS_CODE) {
              enqueueSnackbar(
                json?.message,
                snackbarSetting(key => closeSnackbar(key), { color: 'success' }),
              );
              fetchContact();
              closeDialog();
            } else {
              enqueueSnackbar(
                json?.message,
                snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
              );
            }
          }}
        >
          {({ values, isSubmitting, setFieldValue }) => {
            const addContract = () => {
              setFieldValue(`startDate_${contract.length}`, moment());
              setContract([...contract, { isDelete: false }]);
            };
            return (
              <Form>
                <Toolbar style={{ background: BLACK, opacity: 0.8, justifyContent: 'flex-end' }}>
                  <IconButton edge="end" size="medium" onClick={closeDialog}>
                    <IconClose
                      className="svgFilAll"
                      style={{ height: 40, width: 40, fill: WHITE }}
                    />
                  </IconButton>
                </Toolbar>
                <div className="dialog-content" style={{ padding: '16px 30px' }}>
                  <Typography variant="h5" component="p" className="contract-header">
                    <FormattedMessage id="IDS_HMS_CONTRACT_RATE_PACKAGE" />
                  </Typography>
                  <ListContract
                    contract={contract}
                    rateTypes={rateTypes}
                    contractTypes={contractTypes}
                    contractHotel={contractHotel}
                  />
                  <Row className="add-container" onClick={addContract}>
                    <AddIconCircle />
                    <Typography gutterBottom variant="body2" component="p">
                      <FormattedMessage id="IDS_HMS_ADD_CONTRACT" />
                    </Typography>
                  </Row>
                  <Row style={{ marginTop: 24, marginBottom: 20 }}>
                    <LoadingButton
                      type="submit"
                      color="secondary"
                      variant="contained"
                      disableElevation
                      style={{ marginRight: 24 }}
                      loading={isSubmitting}
                    >
                      <FormattedMessage id="IDS_HMS_SAVE" />
                    </LoadingButton>
                    <Button
                      variant="outlined"
                      disableElevation
                      onClick={() => {
                        closeDialog();
                      }}
                    >
                      <FormattedMessage id="IDS_HMS_REJECT" />
                    </Button>
                  </Row>
                </div>
              </Form>
            );
          }}
        </Formik>
      </SwipeableDrawer>
    </>
  );
};
export default React.memo(ContractDialog);
