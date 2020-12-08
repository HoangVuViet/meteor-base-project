import { Button, IconButton, SwipeableDrawer, Toolbar, Typography } from '@material-ui/core';
import IconClose from '@material-ui/icons/Close';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import querystring from 'query-string';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as yup from 'yup';
import { BLACK, WHITE } from '../../../../../configs/colors';
import { ROUTES } from '../../../../../configs/routes';
import { some, SUCCESS_CODE } from '../../../../../constants';
import { ROLES } from '../../../../../layout/constants';
import { AppState } from '../../../../../redux/reducers';
import ConfirmDialog from '../../../../common/components/ConfirmDialog';
import { Row, snackbarSetting } from '../../../../common/components/elements';
import LoadingButton from '../../../../common/components/LoadingButton';
import LoadingIcon from '../../../../common/components/LoadingIcon';
import { goToAction } from '../../../../common/redux/reducer';
import {
  actionCreateRatePlan,
  actionsGetRateTypes,
  getRatePlanAmenitiesList,
  getRatePlanList,
  getRatePlanListRooms,
} from '../../../accommodationService';
import { MAX_AGE } from '../../../constant';
import { checkRole, ICheckBox, isEmpty } from '../../../utils';
import NewRateDialogContent from './NewRateDialogContent/NewRateDialogContent';
import { getSchemaValidate } from './NewRateDialogContent/RateValidate';

interface Props {
  ratePlanID?: number;
  setRatePlanID: (value: number | undefined) => void;
  handleFetchData: () => void;
}

const NewRateDialog: React.FC<Props> = props => {
  const { setRatePlanID, ratePlanID } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const intl = useIntl();
  const match: any = useRouteMatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { roleUser } = useSelector((state: AppState) => state.auth, shallowEqual);

  const [rateTypes, setRateTypes] = React.useState<some>({});
  const [isButtonSubmitClicked, checkButtonSubmitClicked] = React.useState<boolean>(false);
  const [rateTypesList, setRateTypesList] = React.useState<some>({});
  const [listRooms, setListRooms] = React.useState<some>({});
  const [listAmenities, setListAmenities] = React.useState<some>({});
  const [refundFields, setRefundFields] = React.useState<some[]>([{ isDelete: false }]);
  const [childrenFields, setChildrenFields] = React.useState<some[]>([{ isDelete: false }]);
  const [rushHourFields, setRushHourFields] = React.useState<some[]>([]);
  const [ratePlanDetail, setRatePlanDetail] = React.useState<some | undefined>(undefined);
  const [checkBoxList, setCheckBoxList] = React.useState<ICheckBox>({
    platformTypes: [],
    customerTypes: [],
    roomsTypes: [],
    amenitiesTypes: [],
  });

  const getPathName = (path: string) => {
    return path.replace(':hotelId', match?.params?.hotelId);
  };

  const fetchData = async () => {
    try {
      const params: some = {
        hotelId: match?.params?.hotelId,
      };
      const searchStr = querystring.stringify(params);
      const [resRateTypes, rateList, listRoomsInfo, amenities] = await Promise.all([
        dispatch(actionsGetRateTypes()),
        dispatch(getRatePlanList(searchStr)),
        dispatch(getRatePlanListRooms(match?.params?.hotelId)),
        dispatch(getRatePlanAmenitiesList()),
      ]);
      setRateTypes(resRateTypes?.data);
      setRateTypesList(rateList?.data);
      setListRooms(listRoomsInfo?.data);
      setListAmenities(amenities?.data);
      if (ratePlanID && ratePlanID === -1) {
        setCheckBoxList({
          ...checkBoxList,
          roomsTypes: !isEmpty(listRoomsInfo?.data?.items) ? listRoomsInfo?.data?.items : [],
        });
      }
    } catch (error) {}
  };

  const fetchDataDetail = async (id: number) => {
    const searchStr = querystring.stringify({
      hotelId: match?.params?.hotelId,
      id,
    });
    try {
      const json = await dispatch(actionCreateRatePlan(searchStr, 'get'));
      if (json.code === SUCCESS_CODE) {
        if (json?.data) {
          setRatePlanDetail(json?.data);
          setChildrenFields(
            !isEmpty(json.data?.policyChildren?.childrenFees)
              ? json.data?.policyChildren?.childrenFees.map((el: any) => {
                  return { ...el, isDelete: false };
                })
              : [{ isDelete: false }],
          );
          setRefundFields(
            !isEmpty(json.data?.policyCancel?.cancelFees)
              ? json.data?.policyCancel?.cancelFees?.map((el: any) => {
                  return { ...el, isDelete: false };
                })
              : [{ isDelete: false }],
          );
          if (!isEmpty(json.data?.policyHighSeasons)) {
            setRushHourFields(
              json.data?.policyHighSeasons?.map((elm: some) => {
                return {
                  rushHourRefundFields: !isEmpty(elm?.policyCancel?.cancelFees)
                    ? [...elm?.policyCancel?.cancelFees]
                    : [{ isDelete: false }],
                  rushHourChildrenFields: !isEmpty(elm?.policyChildren?.childrenFees)
                    ? [...elm?.policyChildren?.childrenFees]
                    : [{ isDelete: false }],
                };
              }),
            );
          } else setRushHourFields([]);
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
    const highSeasonPolicies: Array<some> = [];
    const rushChildrenFees: Array<some> = [];
    const rushCancellationFees: Array<some> = [];
    const result: Array<any> = [];
    childrenFields.forEach((el: some, idx: number) => {
      childrenFees.push({
        ageFrom: values[`ageFrom_${idx}`],
        ageTo: values[`ageTo_${idx}`],
        price: values[`price_${idx}`] ? values[`price_${idx}`] : 0,
        currencyId: 1,
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
    rushHourFields.forEach((elm: some, idx: number) => {
      elm.rushHourRefundFields.forEach((el: some, i: number) => {
        rushCancellationFees.push({
          hourBeforeCheckin:
            values[`rush_${idx}_time_${i}`] !== 1
              ? values[`rush_${idx}_hourBeforeCheckin_${i}`] * 24
              : values[`rush_${idx}_hourBeforeCheckin_${i}`],
          value: values[`rush_${idx}_percentage_${idx}`]
            ? values[`rush_${idx}_percentage_${i}`]
            : 0,
          type: values[`rush_${idx}_basePriceType_${i}`] === 1 ? 'PERCENT' : 'DAY_NUMBER',
        });
      });
      elm.rushHourChildrenFields.forEach((el: some, i: number) => {
        rushChildrenFees.push({
          ageFrom: values[`rush_${idx}_ageFrom_${i}`],
          ageTo: values[`rush_${idx}_ageTo_${i}`],
          price: values[`rush_${idx}_price_${i}`] ? values[`rush_${idx}_price_${i}`] : 0,
          currencyId: 1,
        });
      });
      highSeasonPolicies.push({
        id: elm?.id,
        fromDate: values[`fromDate_${idx}`],
        toDate: values[`toDate_${idx}`],
        minStaying:
          values[`rushHourNightStaying_${idx}`] === 'yes' ? values[`rush_${idx}_minStaying`] : null,
        maxStaying:
          values[`rushHourNightStaying_${idx}`] === 'yes' ? values[`rush_${idx}_maxStaying`] : null,
        policyCancel:
          values[`rushHourCancellationPolicy_${idx}`] === 'yes'
            ? {
                allowCancel: values[`rush_${idx}_allowCancel`],
                cancelFees: [...rushCancellationFees],
              }
            : null,
        policySurcharge:
          values[`rushHourSurchargePolicy_${idx}`] === 'yes'
            ? {
                extraBedPrice: values[`rush_${idx}_extraBedPrice`],
              }
            : null,
        policyChildren:
          values[`rushHourSurchargePolicy_${idx}`] === 'yes'
            ? {
                maxAge: MAX_AGE,
                childrenFees:
                  values[`rushHourSurchargePolicy_${idx}`] === 'yes' ? [...rushChildrenFees] : null,
              }
            : null,
      });
    });
    return {
      ...result,
      hotelId: match?.params?.hotelId,
      active: true,
      name: values.rateName,
      customerTypes: [...checkBoxList.customerTypes].map(el => el.id),
      platforms: [...checkBoxList.platformTypes].map(el => el.id),
      rateType: checkRole(ROLES.HMS_PRE_ADMIN, roleUser)
        ? { id: values.rateType }
        : rateTypes?.items?.find((elm: some) => elm.name === 'OTA'),
      rooms: [...checkBoxList.roomsTypes].map(el => el.id),
      amenityIds: [...checkBoxList.amenitiesTypes].map(el => el.id),
      vatIncluded: values.vatIncluded === 'yes',
      minStaying: values.minNightStaying === 'no' ? values.minStaying : null,
      maxStaying: values.maxNightStaying === 'no' ? values.maxStaying : null,
      minRoom: values.checkMinRoom === 'no' ? values.minRoom : null,
      cutoffDay: values.checkCutOffDay === 'no' ? values.cutOffDay : null,
      basedCancellationPolicy: values.basedCancellationPolicy === 'yes',
      basedChildrenPolicy: values.basedChildrenPolicy === 'yes',
      basedAnotherRate: values.basedAnotherRate === 'yes',
      basedRatePlan:
        values.basedAnotherRate === 'yes'
          ? {
              basedRatePlanId: values.basedRatePlanId,
              basedRatePlanName: rateTypesList?.items?.find(
                (el: some) => el.id === values.basedRatePlanId,
              )?.name,
              changeBasedAmount: !values.checkUpDown
                ? values.changeBasedAmount
                : -values.changeBasedAmount,
              changeBasedType: values.changeBasedType ? 'PERCENTAGE' : 'VND',
            }
          : null,
      policySurcharge:
        values.checkExtraBed !== 'no'
          ? {
              id: ratePlanDetail?.policySurcharge?.id,
              extraBedPrice: values.extraBedPrice,
            }
          : null,
      policyChildren:
        values.basedChildrenPolicy !== 'yes'
          ? { maxAge: MAX_AGE, childrenFees: [...childrenFees] }
          : null,
      policyCancel:
        values.basedCancellationPolicy !== 'yes'
          ? {
              id: ratePlanDetail?.policyCancel?.id,
              allowCancel: values.allowCancel,
              cancelFees: values.allowCancel ? [...cancellationFees] : null,
            }
          : null,
      policyHighSeasons: [...highSeasonPolicies],
    };
  };

  const getSchema = React.useMemo(() => {
    return getSchemaValidate(intl, childrenFields, refundFields, rushHourFields, roleUser);
  }, [childrenFields, intl, refundFields, roleUser, rushHourFields]);

  const DisplayingErrorMessagesSchema = React.useMemo(() => {
    return yup.object().shape(getSchema);
  }, [getSchema]);

  const validateCustom = (values: some) => {
    const errors: some = {};
    const temp: some = {};
    const rushTemp: some = {};
    if (isEmpty(checkBoxList.roomsTypes)) {
      errors.rooms = intl.formatMessage({
        id: 'IDS_HMS_RATE_PLAN_ROOM_SELECTED_ERROR',
      });
    }
    if (isEmpty(checkBoxList.customerTypes)) {
      errors.customers = intl.formatMessage({
        id: 'IDS_HMS_RATE_PLAN_CUSTOMER_SELECTED_ERROR',
      });
    }
    if (errors.rooms && isButtonSubmitClicked) {
      enqueueSnackbar(
        intl.formatMessage({ id: 'IDS_HMS_RATE_PLAN_ROOM_SELECTED_ERROR' }),
        snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
      );
    }
    if (errors.customers && isButtonSubmitClicked) {
      enqueueSnackbar(
        intl.formatMessage({ id: 'IDS_HMS_RATE_PLAN_CUSTOMER_SELECTED_ERROR' }),
        snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
      );
    }
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
          id: key ? 'IDS_HMS_POLICY_FIELD_ERROR_OPTION_4' : 'IDS_HMS_POLICY_FIELD_ERROR_OPTION_5',
        });
      else temp[key] = val;
    });

    rushHourFields.forEach((elm: some, index: number) => {
      elm?.rushHourRefundFields.forEach((el: some, idx: number) => {
        const key = Number(values[`rush_${index}_basePriceType_${idx}`]);
        const val = Number(values[`rush_${index}_percentage_${idx}`]);
        const hourBeforeChange =
          values[`rush_${index}_time_${idx - 1}`] === 0
            ? Number(values[`rush_${index}_hourBeforeCheckin_${idx - 1}`] * 24)
            : Number(values[`rush_${index}_hourBeforeCheckin_${idx - 1}`]);
        const hourAfterChange =
          values[`rush_${index}_time_${idx}`] === 0
            ? Number(values[`rush_${index}_hourBeforeCheckin_${idx}`] * 24)
            : Number(values[`rush_${index}_hourBeforeCheckin_${idx}`]);
        if (hourBeforeChange >= hourAfterChange) {
          errors[`rush_${index}_hourBeforeCheckin_${idx}`] = intl.formatMessage({
            id: 'IDS_HMS_POLICY_FIELD_ERROR_OPTION_1',
          });
        }
        if (!Object.prototype.hasOwnProperty.call(rushTemp, key)) {
          rushTemp[key] = val;
        } else if (val >= rushTemp[key])
          errors[`rush_${index}_percentage_${idx}`] = intl.formatMessage({
            id: key ? 'IDS_HMS_POLICY_FIELD_ERROR_OPTION_4' : 'IDS_HMS_POLICY_FIELD_ERROR_OPTION_5',
          });
        else rushTemp[key] = val;
      });
    });

    return errors;
  };

  React.useEffect(() => {
    fetchData();
    if (ratePlanID && ratePlanID > 0) fetchDataDetail(ratePlanID);
    else {
      setRatePlanDetail(undefined);
      setCheckBoxList({
        platformTypes: [],
        customerTypes: [],
        roomsTypes: [],
        amenitiesTypes: [],
      });
      setRefundFields([{ isDelete: false }]);
      setChildrenFields([{ isDelete: false }]);
      setRushHourFields([]);
    }
    // eslint-disable-next-line
  }, [ratePlanID]);
  return (
    <>
      {!isEmpty(listRooms?.items) ? (
        <SwipeableDrawer
          anchor="bottom"
          open={!!ratePlanID}
          onClose={() => {
            setRatePlanID(undefined);
          }}
          onOpen={() => setRatePlanID(undefined)}
          className="contract-drawer"
          style={{ borderRadius: 0, height: '100%' }}
        >
          <Formik
            initialValues={{
              basedCancellationPolicy: 'yes',
              basedChildrenPolicy: 'yes',
              vatIncluded: 'yes',
              time_0: 0,
              basePriceType_0: 1,
              allowCancel: true,
              rush_allowCancel: true,
              ageFrom_0: 0,
              currencyId_0: 0,
              feeId_0: 0,
              basedAnotherRate: 'no',
              checkExtraBed: 'no',
              checkUpDown: 0,
              changeBasedType: 0,
              rush_ageFrom_0: 0,
              rush_currencyId_0: 0,
            }}
            validationSchema={DisplayingErrorMessagesSchema}
            validate={values => validateCustom(values)}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const searchStr = querystring.stringify({
                  hotelId: match?.params?.hotelId,
                  id: ratePlanID && ratePlanID > 0 ? ratePlanID : undefined,
                });
                setSubmitting(true);
                handleDataSubmit(values);
                const dataPost = handleDataSubmit(values);
                const json = await dispatch(
                  actionCreateRatePlan(
                    searchStr,
                    ratePlanID && ratePlanID > 0 ? 'put' : 'post',
                    JSON.stringify(dataPost),
                  ),
                );
                if (json?.code === SUCCESS_CODE) {
                  enqueueSnackbar(
                    json?.message,
                    snackbarSetting(key => closeSnackbar(key), { color: 'success' }),
                  );
                  setRatePlanID(undefined);
                  props.handleFetchData();
                } else {
                  enqueueSnackbar(
                    json?.message,
                    snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
                  );
                }
              } catch (error) {
              } finally {
                checkButtonSubmitClicked(false);
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, resetForm, values, validateForm }) => {
              return (
                <Form>
                  <Toolbar style={{ background: BLACK, opacity: 0.8, justifyContent: 'flex-end' }}>
                    <IconButton
                      edge="end"
                      size="medium"
                      onClick={() => {
                        setRatePlanID(undefined);
                        setRushHourFields([]);
                        checkButtonSubmitClicked(false);
                      }}
                    >
                      <IconClose
                        className="svgFilAll"
                        style={{ height: 40, width: 40, fill: WHITE }}
                      />
                    </IconButton>
                  </Toolbar>
                  {!ratePlanDetail && ratePlanID && ratePlanID > 0 ? (
                    <LoadingIcon color="secondary" />
                  ) : (
                    <div className="dialog-content" style={{ padding: '16px 30px' }}>
                      <NewRateDialogContent
                        values={values}
                        rateTypes={rateTypes}
                        refundFields={refundFields}
                        setRefundFields={setRefundFields}
                        childrenFields={childrenFields}
                        setChildrenFields={setChildrenFields}
                        rateTypesList={rateTypesList}
                        listRooms={listRooms?.items}
                        rushHourFields={rushHourFields}
                        setRushHourFields={setRushHourFields}
                        checkBoxList={checkBoxList}
                        setCheckBoxList={setCheckBoxList}
                        ratePlanDetail={ratePlanDetail}
                        ratePlanID={ratePlanID}
                        listAmenities={listAmenities}
                      />
                      <Row style={{ marginTop: 24, marginBottom: 20 }}>
                        <LoadingButton
                          type="submit"
                          color="secondary"
                          variant="contained"
                          disableElevation
                          style={{ marginRight: 24, width: 150 }}
                          loading={isSubmitting}
                          onClick={() => {
                            checkButtonSubmitClicked(true);
                            validateForm().then(errors => {
                              if (
                                Object.keys(errors).length > 0 &&
                                !Object.keys(errors).includes('rooms') &&
                                !Object.keys(errors).includes('customers')
                              ) {
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
                          style={{ width: 150 }}
                          onClick={() => {
                            resetForm({});
                            setRushHourFields([]);
                            setRatePlanID(undefined);
                            checkButtonSubmitClicked(false);
                          }}
                        >
                          <FormattedMessage id="IDS_HMS_REJECT" />
                        </Button>
                      </Row>
                    </div>
                  )}
                </Form>
              );
            }}
          </Formik>
        </SwipeableDrawer>
      ) : (
        <ConfirmDialog
          style={{ width: 500 }}
          open={!!ratePlanID}
          onClose={() => setRatePlanID(undefined)}
          onAccept={() => {
            dispatch(
              goToAction({
                pathname: getPathName(ROUTES.managerHotels.hotelInfo.approvalHotel.contactInfo),
              }),
            );
          }}
          onReject={() => {
            setRatePlanID(undefined);
            checkButtonSubmitClicked(false);
          }}
          titleLabel={
            <Typography gutterBottom variant="body2" component="span">
              <FormattedMessage id="IDS_HMS_NEW_RATE_TYPE_NOTE" />
            </Typography>
          }
          acceptLabel="managerHotels.hotelInfo.roomSetting"
          rejectLabel="IDS_HMS_REJECT"
        >
          <Typography gutterBottom variant="body2" component="span">
            <FormattedMessage id="IDS_HMS_NEW_RATE_TYPE_EMPTY_ROOMS" />
          </Typography>
        </ConfirmDialog>
      )}
    </>
  );
};
export default React.memo(NewRateDialog);
