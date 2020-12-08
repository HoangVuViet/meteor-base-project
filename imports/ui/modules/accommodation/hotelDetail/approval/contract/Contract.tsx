import { Button, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';
import moment, { Moment } from 'moment';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as yup from 'yup';
import { ORANGE, ORANGE_100 } from '../../../../../configs/colors';
import { some, SUCCESS_CODE } from '../../../../../constants';
import { DATE_FORMAT_BACK_END } from '../../../../../models/moment';
import { AppState } from '../../../../../redux/reducers';
import { ReactComponent as AddIconCircle } from '../../../../../svg/ic_add_circle.svg';
import { Col, Row, snackbarSetting } from '../../../../common/components/elements';
import LoadingButton from '../../../../common/components/LoadingButton';
import LoadingIcon from '../../../../common/components/LoadingIcon';
import {
  actionContractHotel,
  actionsGetContractTypes,
  actionsGetRateTypes,
} from '../../../accommodationService';
import { checkRole, isEmpty } from '../../../utils';
import ListContract from '../components/ListContract';
import { ROLES } from '../../../../../layout/constants';
import ContractProvider from './ContractProvider';

interface Props {}
interface contractProps {
  isDelete: boolean;
}

const Contract: React.FC<Props> = props => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { roleUser } = useSelector((state: AppState) => state.auth, shallowEqual);
  const match: any = useRouteMatch();
  const intl = useIntl();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);
  const [contract, setContract] = useState<Array<contractProps>>([]);
  const [rateTypes, setRateTypes] = useState<some>({});
  const [contractTypes, setContractTypes] = useState<some>({});
  const [contractHotel, setContractHotel] = useState<some>({});

  const fetchContract = async () => {
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
      setLoading(true);
      const [resRateTypes, resContractTypes] = await Promise.all([
        dispatch(actionsGetRateTypes()),
        dispatch(actionsGetContractTypes(match?.params?.hotelId)),
      ]);
      setRateTypes(resRateTypes?.data);
      setContractTypes(resContractTypes?.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchContract(); // eslint-disable-next-line
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
            .of(
              yup.object().shape({
                id: yup.number().nullable(),
                name: yup
                  .string()
                  .trim()
                  .nullable(),
                thumbnail: yup
                  .string()
                  .trim()
                  .nullable(),
                type: yup
                  .string()
                  .trim()
                  .nullable(),
                url: yup.string().trim(),
              }),
            )
            .required(intl.formatMessage({ id: 'required' })),
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
      {loading ? (
        <LoadingIcon />
      ) : (
        <div className="contract-page">
          {checkRole(ROLES.HMS_PRE_ADMIN, roleUser) ? (
            <>
              <Formik
                initialValues={{ startDate_0: moment() }}
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
                    fetchContract();
                  } else {
                    enqueueSnackbar(
                      json?.message,
                      snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
                    );
                  }
                }}
              >
                {({ isSubmitting, setFieldValue, resetForm }) => {
                  const addContract = () => {
                    setFieldValue(`startDate_${contract.length}`, moment());
                    setContract([...contract, { isDelete: false }]);
                  };
                  const removeContract = (idx: number) => {
                    const temp = [...contract].map((el: contractProps, i: number) => {
                      if (i === idx) return { ...el, isDelete: true };
                      return el;
                    });
                    setContract(temp);
                  };
                  return (
                    <Form>
                      <Row className="header-approval-wrapper">
                        <Col style={{ width: '100%' }}>
                          <Typography variant="h6" component="p" className="contract-header-text">
                            <FormattedMessage id="IDS_HMS_CONTRACT_LIST" />
                          </Typography>
                        </Col>
                        <Col style={{ display: 'flex', flexDirection: 'row' }}>
                          {checkRole(ROLES.HMS_PRE_ADMIN, roleUser) && (
                            <Button
                              color="secondary"
                              variant="contained"
                              disableElevation
                              fullWidth
                              onClick={addContract}
                              style={{ width: 200, background: ORANGE_100, color: ORANGE }}
                            >
                              <AddIconCircle
                                className="svgFillAll"
                                style={{ marginRight: 10, stroke: ORANGE }}
                              />
                              <FormattedMessage id="IDS_HMS_CREATE_CONTRACT" />
                            </Button>
                          )}
                          <Button
                            color="secondary"
                            variant="contained"
                            disableElevation
                            fullWidth
                            style={{
                              width: 110,
                              marginLeft: 16,
                              background: ORANGE_100,
                              color: ORANGE,
                            }}
                          >
                            <FormattedMessage id="IDS_HMS_HISTORY" />
                          </Button>
                        </Col>
                      </Row>
                      <ListContract
                        contract={contract}
                        rateTypes={rateTypes}
                        contractTypes={contractTypes}
                        contractHotel={contractHotel}
                        isApproval
                        removeContract={removeContract}
                        fetchContract={fetchContract}
                      />
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
                            if (!isEmpty(contractHotel?.items)) {
                              const fieldResult: Array<contractProps> = [];
                              contractHotel?.items.forEach((el: some, i: number) => {
                                fieldResult.push(contract[i] || { isDelete: false });
                              });
                              setContract(fieldResult);
                            }
                            resetForm();
                          }}
                        >
                          <FormattedMessage id="IDS_HMS_REJECT" />
                        </Button>
                      </Row>
                    </Form>
                  );
                }}
              </Formik>
            </>
          ) : (
            <ContractProvider
              contractHotel={contractHotel}
              contractTypes={contractTypes}
              fetchContract={fetchContract}
            />
          )}
        </div>
      )}
    </>
  );
};

export default React.memo(Contract);
