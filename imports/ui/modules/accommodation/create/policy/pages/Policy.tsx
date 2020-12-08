import { Button, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as yup from 'yup';
import { GREY_100, GREY_600 } from '../../../../../configs/colors';
import { ROUTES } from '../../../../../configs/routes';
import { some, SUCCESS_CODE } from '../../../../../constants';
import { AppState } from '../../../../../redux/reducers';
import { Row, snackbarSetting } from '../../../../common/components/elements';
import LoadingButton from '../../../../common/components/LoadingButton';
import LoadingIcon from '../../../../common/components/LoadingIcon';
import { goToAction } from '../../../../common/redux/reducer';
import { actionCreateUpsertPolicy } from '../../../accommodationService';
import { MAX_AGE } from '../../../constant';
import { isEmpty } from '../../../utils';
import CreatePolicy from '../components/CreatePolicy';
import { IFields } from '../utils';

const Policy: React.FC = props => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [data, setData] = React.useState<some | undefined>();
  const [fields, setFields] = React.useState<IFields[]>([{ isDelete: false }]);
  const [refundFields, setRefundFields] = React.useState<IFields[]>([{ isDelete: false }]);

  const intl = useIntl();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const match: any = useRouteMatch();
  const isApproval = match?.path === ROUTES.managerHotels.hotelInfo.approvalHotel.policy;
  const getPathName = (path?: string) => {
    return path ? path.replace(':hotelId', match?.params?.hotelId) : undefined;
  };

  const fetchData = async () => {
    try {
      const json = await dispatch(actionCreateUpsertPolicy(match?.params?.hotelId, 'get'));
      if (json?.code === SUCCESS_CODE) {
        if (json?.data) {
          setData(json.data);
          setFields(
            !isEmpty(json.data?.policyChildren?.childrenFees)
              ? json.data?.policyChildren?.childrenFees?.map((el: any) => {
                  return { ...el, isDelete: false };
                })
              : [{ isDelete: false }],
          );
          setRefundFields(
            !isEmpty(json.data?.policyCancel?.cancelFees)
              ? json.data?.policyCancel?.cancelFees.map((el: any) => {
                  return { ...el, isDelete: false };
                })
              : [{ isDelete: false }],
          );
        }
      } else {
        json?.message &&
          enqueueSnackbar(
            json?.message,
            snackbarSetting(key => closeSnackbar(key), {
              color: 'error',
            }),
          );
      }
    } catch (error) {}
  };

  const handleDataSubmit = (values: any) => {
    const childrenFees: Array<some> = [];
    const cancellationFees: Array<some> = [];
    const result: some = {
      policyGeneral: {
        allowSmoking: values.allowSmoking ? values.allowSmoking === 'yes' : null,
        allowPet: values.allowPet ? values.allowPet === 'yes' : null,
        allowEvent: values.allowEvent ? values.allowEvent === 'yes' : null,
        hasRestriction: values.hasRestriction,
      },
    };
    fields.forEach((el: some, idx: number) => {
      childrenFees.push({
        ageFrom: values[`ageFrom_${idx}`],
        ageTo: values[`ageTo_${idx}`],
        currencyId: 1,
        price: values[`price_${idx}`] ? values[`price_${idx}`] : 0,
      });
    });
    refundFields.forEach((el: some, idx: number) => {
      cancellationFees.push({
        hourBeforeCheckin:
          values[`time_${idx}`] !== 1
            ? values[`hourBeforeCheckin_${idx}`] * 24
            : values[`hourBeforeCheckin_${idx}`],
        value: values[`percentage_${idx}`] ? values[`percentage_${idx}`] : 0,
        type: values[`basePriceType_${idx}`] === 1 ? 'PERCENT' : 'DAY_NUMBER',
      });
    });

    return {
      ...result,
      policyChildren: {
        maxAge: MAX_AGE,
        childrenFees: [...childrenFees],
      },
      policyCancel: {
        allowCancel: values.allowCancellation === 'yes',
        cancelFees: values.allowCancellation === 'yes' ? [...cancellationFees] : null,
      },
    };
  };

  const getSchema = React.useMemo(() => {
    let result: some = {};
    fields.forEach((el: some, idx: number) => {
      result = {
        ...result,
        [`ageFrom_${idx}`]: yup
          .number()
          .required(intl.formatMessage({ id: 'required' }))
          .when(`ageTo_${idx - 1}`, (ageToBefore: number, schema: any) => {
            return schema.test({
              name: 'compareAgeType',
              test: (ageFromAfter: number) => {
                return !(ageToBefore && ageFromAfter && ageToBefore >= ageFromAfter);
              },
              message: intl.formatMessage({
                id: 'IDS_HMS_POLICY_CHILDREN_SETTING_AGE_MATCH_ERROR',
              }),
            });
          })
          .when(`ageTo_${idx - 1}`, (ageToBefore: number, schema: any) => {
            return schema.test({
              name: 'compareAgeType',
              test: (ageFromAfter: number) => {
                return !(ageToBefore && ageFromAfter && ageToBefore !== ageFromAfter - 1);
              },
              message: intl.formatMessage({
                id: 'IDS_HMS_POLICY_CHILDREN_SETTING_ERROR',
              }),
            });
          }),
        [`ageTo_${idx}`]: yup
          .number()
          .required(intl.formatMessage({ id: 'required' }))
          .when(`ageTo_${idx - 1}`, (ageToBefore: number, schema: any) => {
            return schema.test({
              name: 'checkLastAgeTo',
              test: (ageToAfter: number) => {
                return !(idx === fields.length - 1 && ageToAfter && ageToAfter !== MAX_AGE);
              },
              message: intl.formatMessage({
                id: 'IDS_HMS_POLICY_CHILDREN_SETTING_ERROR',
              }),
            });
          }),
        [`price_${idx}`]: yup.number().when(`currencyId_${idx}`, {
          is: value => value === 1,
          then: yup
            .number()
            .nullable()
            .typeError(intl.formatMessage({ id: 'IDS_HMS_POLICY_FIELD_ERROR_OPTION_3' }))
            .min(1, intl.formatMessage({ id: 'IDS_HMS_POLICY_NUMBER_SETTING_ERROR' }))
            .required(intl.formatMessage({ id: 'IDS_HMS_POLICY_FIELD_PRICE_ERROR' })),
        }),
      };
    });
    refundFields.forEach((el: some, idx: number) => {
      result = {
        ...result,
        [`hourBeforeCheckin_${idx}`]: yup
          .number()
          .when('allowCancellation', {
            is: value => value === 'yes',
            then: yup.number().required(intl.formatMessage({ id: 'required' })),
          })
          .when(`time_${idx}`, {
            is: value => {
              return value !== 1;
            },
            then: yup
              .number()
              .nullable()
              .typeError(intl.formatMessage({ id: 'IDS_HMS_POLICY_FIELD_ERROR_OPTION_3' }))
              .min(1, intl.formatMessage({ id: 'IDS_HMS_POLICY_DAY_SETTING_ERROR' }))
              .max(100, intl.formatMessage({ id: 'IDS_HMS_POLICY_DAY_SETTING_ERROR' })),
            otherwise: yup
              .number()
              .nullable()
              .typeError(intl.formatMessage({ id: 'IDS_HMS_POLICY_FIELD_ERROR_OPTION_3' }))
              .min(0, intl.formatMessage({ id: 'IDS_HMS_POLICY_HOUR_SETTING_ERROR' }))
              .max(23, intl.formatMessage({ id: 'IDS_HMS_POLICY_HOUR_SETTING_ERROR' })),
          }),
        [`percentage_${idx}`]: yup.number().when(`feeId_${idx}`, {
          is: value => value === 1,
          then: yup
            .number()
            .required(intl.formatMessage({ id: 'IDS_HMS_POLICY_FIELD_PRICE_ERROR' }))
            .min(1, intl.formatMessage({ id: 'IDS_HMS_POLICY_PERCENTAGE_ERROR' }))
            .max(100, intl.formatMessage({ id: 'IDS_HMS_POLICY_PERCENTAGE_ERROR' }))
            .typeError(intl.formatMessage({ id: 'IDS_HMS_POLICY_FIELD_ERROR_OPTION_3' })),
        }),
      };
    });
    return result;
  }, [fields, intl, refundFields]);

  const DisplayingErrorMessagesSchema = React.useMemo(() => {
    return yup.object().shape(getSchema);
  }, [getSchema]);

  const validateCustom = (values: some) => {
    const errors: some = {};
    const temp: some = {};

    refundFields.forEach((el: some, idx: number) => {
      const key = Number(values[`basePriceType_${idx}`]);
      const val = Number(values[`percentage_${idx}`]);
      const hourBeforeChange =
        values[`time_${idx - 1}`] === 0
          ? Number(values[`hourBeforeCheckin_${idx - 1}`] * 24)
          : Number(values[`hourBeforeCheckin_${idx - 1}`]);
      const hourAfterChange =
        values[`time_${idx}`] === 0
          ? Number(values[`hourBeforeCheckin_${idx}`] * 24)
          : Number(values[`hourBeforeCheckin_${idx}`]);
      if (hourBeforeChange >= hourAfterChange) {
        errors[`hourBeforeCheckin_${idx}`] = intl.formatMessage({
          id: 'IDS_HMS_POLICY_FIELD_ERROR_OPTION_1',
        });
      }
      if (!Object.prototype.hasOwnProperty.call(temp, key)) {
        temp[key] = val;
      } else if (val >= temp[key])
        errors[`percentage_${idx}`] = intl.formatMessage({
          id:
            key === 1
              ? 'IDS_HMS_POLICY_FIELD_ERROR_OPTION_4'
              : 'IDS_HMS_POLICY_FIELD_ERROR_OPTION_5',
        });
      else temp[key] = val;
    });
    return errors;
  };

  const goNextAction = () => {
    dispatch(
      goToAction({
        pathname: getPathName(
          isApproval
            ? ROUTES.managerHotels.hotelInfo.approvalHotel.nearBy
            : ROUTES.managerHotels.createHotel.nearBy,
        ),
      }),
    );
  };

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          hasRestriction: false,
          ageFrom_0: 0,
          currencyId_0: 0,
          time_0: 0,
          basePriceType_0: 1,
          feeId_0: 0,
          allowCancellation: 'no',
        }}
        validationSchema={DisplayingErrorMessagesSchema}
        validate={values => validateCustom(values)}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setSubmitting(true);
            handleDataSubmit(values);
            const dataPost = handleDataSubmit(values);
            const json = await dispatch(
              actionCreateUpsertPolicy(match?.params?.hotelId, 'post', JSON.stringify(dataPost)),
            );
            if (json?.code === SUCCESS_CODE) {
              enqueueSnackbar(
                json?.message,
                snackbarSetting(key => closeSnackbar(key), { color: 'success' }),
              );
              goNextAction();
            } else {
              enqueueSnackbar(
                json?.message,
                snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
              );
            }
          } catch (error) {
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, isSubmitting, validateForm }) => {
          return (
            <Form style={{ padding: isApproval ? 30 : 0 }}>
              {fields && refundFields ? (
                <>
                  <CreatePolicy
                    values={values}
                    fields={fields}
                    setFields={setFields}
                    refundFields={refundFields}
                    setRefundFields={setRefundFields}
                    data={data}
                  />
                  <Row style={{ marginTop: 24 }}>
                    <LoadingButton
                      type="submit"
                      color="secondary"
                      variant="contained"
                      disableElevation
                      style={{ marginRight: 24, minWidth: 150, height: 40 }}
                      loading={isSubmitting}
                      onClick={() => {
                        validateForm().then(errors => {
                          if (Object.keys(errors).length > 0) {
                            enqueueSnackbar(
                              intl.formatMessage({
                                id: 'IDS_HMS_VALIDATE_FORM_ERROR',
                              }),
                              snackbarSetting(key => closeSnackbar(key), {
                                color: 'error',
                              }),
                            );
                          } else {
                            handleDataSubmit(values);
                          }
                        });
                      }}
                    >
                      <FormattedMessage id="IDS_HMS_SAVE" />
                    </LoadingButton>
                    <Button
                      variant="outlined"
                      disableElevation
                      style={{
                        height: 40,
                        minWidth: 150,
                        background: GREY_100,
                      }}
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
                </>
              ) : (
                <LoadingIcon />
              )}
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
export default Policy;
