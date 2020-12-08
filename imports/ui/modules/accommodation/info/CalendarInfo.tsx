import { Button, FormControlLabel, FormGroup, Paper, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';
import moment, { Moment } from 'moment';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as yup from 'yup';
import { GREY_100, GREY_300, GREY_600 } from '../../../configs/colors';
import { some, SUCCESS_CODE } from '../../../constants';
import { ASIDE_TOP_HEIGHT, HEADER_HEIGHT, ROLES } from '../../../layout/constants';
import { DATE_FORMAT_BACK_END } from '../../../models/moment';
import { AppState } from '../../../redux/reducers';
import CustomSwitch from '../../common/components/CustomSwitch';
import DateRangeFormControl from '../../common/components/DateRangeFormControl';
import { Row, snackbarSetting } from '../../common/components/elements';
import { NumberFormatCustom } from '../../common/components/Form';
import FormControlTextField from '../../common/components/FormControlTextField';
import LoadingButton from '../../common/components/LoadingButton';
import {
  actionGetAllotment,
  actionGetRoomAllotment,
  actionsGetRateTypes,
  actionUpdateRateAndAllotment,
} from '../accommodationService';
import { FieldSelectContent, FieldTextContent } from '../common/FieldContent';
import { WhiteBackgroundCheckbox } from '../common/WhiteBackgroundCheckbox';
import { dayInWeek } from '../constant';
import { convertDateToRange, convertRoomData, daysBetween } from '../hotelDetail/ratePlan/utils';
import {
  updateDayWeek,
  updateInfoSelected,
  updateRangeTime,
  updateRoomAllotment,
  updateRoomRateList,
} from '../redux/accommodationReducer';
import { checkRole, isEmpty } from '../utils';

const mapStateToProps = (state: AppState) => {
  return {
    roleUser: state.auth.roleUser,
    rangeTime: state.accommodation.rangeTime,
    roomAllotment: state.accommodation.roomAllotment,
    roomRateList: state.accommodation.roomRateList,
    infoSelected: state.accommodation.infoSelected,
    dayWeek: state.accommodation.dayWeek,
  };
};

interface Props extends ReturnType<typeof mapStateToProps> {}

const CalendarInfo: React.FunctionComponent<Props> = props => {
  const intl = useIntl();
  const match: any = useRouteMatch();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { roleUser, rangeTime, roomRateList, roomAllotment, infoSelected, dayWeek } = props;
  const startDate: Moment = rangeTime?.startDate || moment();
  const endDate: Moment = rangeTime?.endDate || moment();
  const [isAdvance, setAdvance] = useState<boolean>(false);
  const [roomSelected, setRoomSelected] = useState<some>({});
  const [rateTypeList, setRateTypeList] = useState<some>({});

  const isAdmin = checkRole(ROLES.HMS_PRE_ADMIN, roleUser);
  const headerHeight = isAdmin ? HEADER_HEIGHT + ASIDE_TOP_HEIGHT : HEADER_HEIGHT;

  const initStatusRoom = () => {
    const allotmentSelected: some = (roomAllotment as some)[roomSelected?.room?.id] || {};
    const allotment: some = !isEmpty(allotmentSelected?.rateTypes)
      ? allotmentSelected?.rateTypes[roomSelected?.rateTypes[0]?.id]
      : {};
    const availability: some[] = allotment?.availability || [];
    const availabilityOpened: some[] = availability.filter(v => v?.status === 1);
    let result: boolean = false;
    if (!isEmpty(availabilityOpened) && startDate && endDate) {
      availabilityOpened.forEach(statusItem => {
        if (
          moment(startDate).isSameOrAfter(moment(statusItem.timeFrom, DATE_FORMAT_BACK_END)) &&
          moment(endDate).isSameOrBefore(moment(statusItem.timeTo, DATE_FORMAT_BACK_END))
        ) {
          result = true;
        }
      });
    }
    return result;
  };
  const roomHotelList = !isEmpty(roomRateList?.items)
    ? roomRateList?.items
        .filter((el: some) => el?.rateTypes.find((element: some) => element.id === element?.id))
        .map((v: some) => ({ ...v?.room }))
    : [];
  const fetchRateTypes = async () => {
    try {
      const res = await dispatch(actionsGetRateTypes());
      if (res?.code === SUCCESS_CODE) {
        setRateTypeList(res?.data);
        if (!isEmpty(res?.data?.items)) {
          const tempRoomList: some[] = !isEmpty(roomRateList?.items)
            ? roomRateList?.items.filter((el: some) =>
                el?.rateTypes.find((element: some) => element.id === element?.id),
              )
            : [];
          setRoomSelected(tempRoomList[0]);
        }
      }
    } catch (error) {}
  };
  const clearTime = () => {
    dispatch(updateRangeTime({}));
    dispatch(updateDayWeek([0, 1, 2, 3, 4, 5, 6]));
  };
  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type === 1 && !isEmpty(rangeTime)) clearTime();
    }
    fetchRateTypes();
    return () => {
      clearTime();
    }; // eslint-disable-next-line
  }, []);
  const handleUpdateInfo = React.useCallback(() => {
    if (!isEmpty(roomSelected) && !isEmpty(roomAllotment)) {
      const allotmentSelected: some = (roomAllotment as some)[roomSelected?.room?.id] || {};
      const allotment: some = !isEmpty(allotmentSelected?.rateTypes)
        ? allotmentSelected?.rateTypes[roomSelected?.rateTypes[0]?.id]
        : {};
      const tempRateType: some = roomSelected?.rateTypes[0] || {};
      const ratePlanData = roomSelected?.ratePlans.find(
        (v: some) => v?.rateTypeId === tempRateType?.id,
      );
      dispatch(
        updateInfoSelected({
          rateTypes: tempRateType,
          room: roomSelected?.room || {},
          ratePlans: ratePlanData || {},
          availability: convertRoomData(allotment?.availability, 'status'),
          roomNumber: convertRoomData(allotment?.ranges, 'number'),
        }),
      );
    }
  }, [dispatch, roomAllotment, roomSelected]);
  useEffect(() => {
    handleUpdateInfo();
    // eslint-disable-next-line
  }, [roomAllotment, roomSelected]);

  const initForm = (rooms: some) => {
    const result: some = {};
    if (!isEmpty(rooms) && !isEmpty(infoSelected)) {
      result.roomId = infoSelected?.room?.id;
      result.rateTypeId = !isEmpty(infoSelected?.rateTypes)
        ? (infoSelected as some)?.rateTypes?.id
        : null;
      result.ratePlanId = !isEmpty(infoSelected?.ratePlans)
        ? (infoSelected as some)?.ratePlans?.id
        : null;
    }
    return result;
  };
  const [isOpened, setOpened] = useState<boolean>(initStatusRoom());
  useEffect(() => {
    if (!isEmpty(rangeTime)) {
      setOpened(initStatusRoom());
    }
    // eslint-disable-next-line
  }, [rangeTime]);

  const commission = infoSelected?.rateTypes?.commission;
  const rateTypeId = infoSelected?.rateTypes?.id;
  const fetchData = React.useCallback(async () => {
    try {
      const endMonthView: Moment = moment()
        .add(4, 'months')
        .endOf('month');
      const res = await dispatch(
        actionGetAllotment(match?.params?.hotelId, {
          timeFrom: moment()
            .startOf('month')
            .format(DATE_FORMAT_BACK_END),
          timeTo: endMonthView.format(DATE_FORMAT_BACK_END),
        }),
      );
      if (res?.code === SUCCESS_CODE) dispatch(updateRoomAllotment(res?.data?.roomAvailability));

      const json = await dispatch(
        actionGetRoomAllotment(match?.params?.hotelId, {
          fromDate: moment()
            .startOf('month')
            .format(DATE_FORMAT_BACK_END),
          toDate: endMonthView.format(DATE_FORMAT_BACK_END),
        }),
      );
      if (json?.code === SUCCESS_CODE) dispatch(updateRoomRateList(json?.data));
    } catch (error) {
    } finally {
    }
  }, [dispatch, match]);
  const calendarSchema = React.useMemo(() => {
    return yup.object().shape({
      roomEmpty: yup
        .number()
        .min(0, intl.formatMessage({ id: 'IDS_HMS_POLICY_PRICE_SETTING_ERROR' })),
      price: yup.number().min(1000, intl.formatMessage({ id: 'IDS_HMS_CALENDAR_PRICE_ERROR' })),
    });
  }, [intl]);
  return (
    <>
      <div style={{ minWidth: 352, transition: 'all 0.3s', zIndex: 12 }}>
        <div style={{ position: 'sticky', top: headerHeight, zIndex: 1 }}>
          <div
            style={{
              width: 352,
              overflow: 'auto',
              overflowX: 'hidden',
              transition: 'width 0.3s',
              position: 'absolute',
              left: 0,
              background: 'white',
              borderRight: `1px solid ${GREY_300}`,
              zIndex: 1,
              height: `calc(100vh - ${headerHeight}px)`,
              padding: '24px 16px',
            }}
          >
            <Row style={{ marginBottom: 24 }}>
              <Typography variant="subtitle2" component="p" style={{ width: '100%' }}>
                <FormattedMessage
                  id="IDS_HMS_DAY_SELECTED"
                  values={{
                    day:
                      startDate && endDate
                        ? daysBetween(moment(startDate), moment(endDate)).length
                        : 1,
                  }}
                />
              </Typography>
            </Row>
            {!isEmpty(initForm(roomHotelList)) && (
              <Formik
                initialValues={initForm(roomHotelList)}
                validationSchema={calendarSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(true);
                  const allotmentRanges = convertDateToRange(startDate, endDate, dayWeek, true);
                  allotmentRanges.map(v =>
                    Object.assign(v, { ...v, number: isOpened ? values?.roomEmpty || 0 : -1 }),
                  );
                  const temp: some = {
                    rate: {
                      ranges: convertDateToRange(startDate, endDate, dayWeek),
                      guests: { [roomSelected?.room?.standardAdult]: { price: values?.price } },
                    },
                    allotment: { ranges: [...allotmentRanges] },
                  };
                  const json = await dispatch(
                    actionUpdateRateAndAllotment(
                      values?.roomId,
                      infoSelected?.ratePlans?.ratePlanRoomCode,
                      { ...temp, rateTypeId },
                    ),
                  );
                  setSubmitting(false);
                  if (json?.code === SUCCESS_CODE) {
                    enqueueSnackbar(
                      json?.message,
                      snackbarSetting(key => closeSnackbar(key), { color: 'success' }),
                    );
                    fetchData();
                    handleUpdateInfo();
                  } else {
                    enqueueSnackbar(
                      json?.message,
                      snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
                    );
                  }
                }}
              >
                {({ isSubmitting, setFieldValue, values, resetForm }) => {
                  return (
                    <Form>
                      <Typography gutterBottom variant="subtitle2" component="span">
                        <FormattedMessage id="IDS_HMS_SELECT_RANGE_DATE" />
                      </Typography>
                      <DateRangeFormControl
                        style={{ marginRight: 10, minWidth: 278 }}
                        optional
                        startDate={startDate ? moment(startDate) : moment()}
                        endDate={endDate ? moment(endDate) : moment()}
                        onChange={(start, end) => {
                          dispatch(updateRangeTime({ startDate: start, endDate: end }));
                        }}
                        isOutsideRange={(e: any) =>
                          moment()
                            .startOf('day')
                            .isAfter(e)
                        }
                      />
                      <Paper className="popper-paper">
                        <FormControlLabel
                          control={
                            <WhiteBackgroundCheckbox
                              checked={isAdvance}
                              onChange={e => setAdvance(e.target.checked)}
                            />
                          }
                          label={
                            <Typography
                              variant="subtitle2"
                              component="p"
                              style={{ fontWeight: 600 }}
                            >
                              <FormattedMessage id="IDS_HMS_SELECT_ADVANCE" />
                            </Typography>
                          }
                        />
                        <Typography
                          style={{ color: GREY_600, marginBottom: 12 }}
                          variant="body2"
                          component="p"
                        >
                          <FormattedMessage id="IDS_HMS_SELECT_ADVANCE_DESCRIPTION" />
                        </Typography>
                        {isAdvance && (
                          <FormGroup row style={{ width: 330 }}>
                            {dayInWeek.map((elm, idx) => (
                              <div key={idx} style={{ width: '33%', marginTop: -12 }}>
                                <FormControlLabel
                                  control={
                                    <WhiteBackgroundCheckbox
                                      checked={dayWeek.includes(elm.value)}
                                      onChange={e => {
                                        if (e.target.checked) {
                                          dispatch(updateDayWeek([...dayWeek, elm.value]));
                                        } else {
                                          dispatch(
                                            updateDayWeek(dayWeek.filter(v => v !== elm.value)),
                                          );
                                        }
                                      }}
                                      name={elm.alias}
                                    />
                                  }
                                  label={
                                    <Typography variant="subtitle2" component="p">
                                      {elm.title}
                                    </Typography>
                                  }
                                />
                              </div>
                            ))}
                          </FormGroup>
                        )}
                      </Paper>
                      <FieldSelectContent
                        name="rateTypeId"
                        label={intl.formatMessage({ id: 'IDS_HMS_RATE_TYPE' })}
                        disableCloseIcon
                        // value={rateType?.id}
                        options={rateTypeList?.items || []}
                        getOptionLabel={(v: any) => v.name}
                        onSelectOption={(value: number) => {
                          const tempRateTypes = rateTypeList?.items.find(
                            (el: some) => el?.id === value,
                          );
                          // setRateType(tempRateTypes);
                          const tempRooms: some[] = roomRateList?.items.filter((el: some) =>
                            el?.rateTypes.find((element: some) => element.id === value),
                          );
                          const tempRoomSelect: some = !isEmpty(tempRooms) ? tempRooms[0] : {};
                          const tempRatePlans = (tempRoomSelect?.ratePlans || []).find(
                            (v: some) => v?.rateTypeId === value,
                          );
                          const allotmentSelected: some =
                            (roomAllotment as some)[roomSelected?.room?.id] || {};
                          const allotment: some = !isEmpty(allotmentSelected?.rateTypes)
                            ? allotmentSelected?.rateTypes[value]
                            : {};
                          setFieldValue(`rateTypeId`, value);
                          setFieldValue(`ratePlanId`, tempRatePlans?.id);
                          setFieldValue(`roomId`, tempRoomSelect?.room?.id);
                          setRoomSelected(tempRoomSelect);
                          dispatch(
                            updateInfoSelected({
                              ...infoSelected,
                              room: tempRoomSelect?.room || {},
                              rateTypes: tempRateTypes || {},
                              ratePlans: tempRatePlans || {},
                              availability: convertRoomData(allotment?.availability, 'status'),
                              roomNumber: convertRoomData(allotment?.ranges, 'number'),
                            }),
                          );
                        }}
                      />
                      <FieldSelectContent
                        name="roomId"
                        label={intl.formatMessage({ id: 'IDS_HMS_SELECT_ROOM' })}
                        disableCloseIcon
                        options={roomRateList?.items
                          .filter((el: some) =>
                            el?.rateTypes.find(
                              (element: some) => element.id === values?.rateTypeId,
                            ),
                          )
                          .map((v: some) => ({ ...v?.room }))}
                        getOptionLabel={(v: any) => v.name}
                        onSelectOption={(value: number) => {
                          const tempRoom: some = roomRateList?.items.find(
                            (el: some) => el?.room?.id === value,
                          );
                          const tempRatePlans = (tempRoom?.ratePlans || []).find(
                            (v: some) => v?.rateTypeId === values?.rateTypeId,
                          );
                          setFieldValue(`roomId`, value);
                          setFieldValue(`ratePlanId`, tempRatePlans?.id);
                          setRoomSelected(tempRoom);
                        }}
                        helpText={`${intl.formatMessage({ id: 'IDS_HMS_EMPTY_ROOM_MAX' })}: ${
                          infoSelected?.room?.totalRoom
                        }`}
                      />

                      <Row style={{ marginBottom: 24, marginTop: 12 }}>
                        <CustomSwitch
                          checked={isOpened}
                          onChange={e => {
                            setOpened(e.target.checked);
                            if (!e.target.checked) setFieldValue(`roomEmpty`, '0');
                          }}
                        />
                        <Typography variant="subtitle2">
                          <FormattedMessage id="IDS_HMS_CLOSE_OPEN_ROOM" />
                        </Typography>
                      </Row>
                      <FieldTextContent
                        name="roomEmpty"
                        value={!isOpened ? 0 : values?.roomEmpty}
                        optional
                        label={<FormattedMessage id="IDS_HMS_EMPTY_ROOM_NUMBER" />}
                        placeholder={intl.formatMessage({ id: 'IDS_HMS_INPUT_NUMBER' })}
                        inputComponent={NumberFormatCustom as any}
                        disabled={!isOpened}
                      />
                      <FieldSelectContent
                        name="ratePlanId"
                        label={intl.formatMessage({ id: 'IDS_HMS_RATE_PLAN' })}
                        disableCloseIcon
                        options={(roomSelected?.ratePlans || []).filter(
                          (v: some) => v?.rateTypeId === values?.rateTypeId,
                        )}
                        getOptionLabel={(v: any) => v.name}
                        onSelectOption={(value: number) => {
                          const tempRatePlans = roomSelected?.ratePlans.find(
                            (el: some) => el?.id === value,
                          );
                          setFieldValue(`ratePlanId`, value);
                          dispatch(
                            updateInfoSelected({
                              ...infoSelected,
                              ratePlans: tempRatePlans || {},
                            }),
                          );
                        }}
                      />
                      <FieldTextContent
                        name="price"
                        optional
                        label={intl.formatMessage({
                          id: rateTypeId === 1 ? 'IDS_HMS_PRICE_OF_NCC' : 'IDS_HMS_INPUT_PRICE',
                        })}
                        placeholder={intl.formatMessage({
                          id: rateTypeId === 1 ? 'IDS_HMS_PRICE_OF_NCC' : 'IDS_HMS_INPUT_PRICE',
                        })}
                        inputComponent={NumberFormatCustom as any}
                        endAdornment={<span className="end-adornment">VNĐ</span>}
                      />
                      <FormControlTextField
                        label={intl.formatMessage({
                          id: rateTypeId === 1 ? 'IDS_HMS_PRICE_FOR_NCC' : 'IDS_HMS_SELL_PRICE',
                        })}
                        placeholder={intl.formatMessage({
                          id: rateTypeId === 1 ? 'IDS_HMS_PRICE_FOR_NCC' : 'IDS_HMS_SELL_PRICE',
                        })}
                        helpText={`${intl.formatMessage({
                          id: 'IDS_HMS_MONEY_DISCOUNT',
                        })}: ${commission || (Number(values?.rateTypeId) === 1 ? 15 : 16)}%`}
                        optional
                        disabled
                        value={(
                          Number(values?.price) *
                          ((100 - (commission || (Number(values?.rateTypeId) === 1 ? 15 : 16))) /
                            100)
                        ).toFixed(0)}
                        endAdornment={<span className="end-adornment">VNĐ</span>}
                        inputComponent={NumberFormatCustom as any}
                      />
                      <Row style={{ marginTop: 24 }}>
                        <LoadingButton
                          type="submit"
                          color="secondary"
                          variant="contained"
                          disableElevation
                          style={{ marginRight: 24, width: '50%' }}
                          loading={isSubmitting}
                        >
                          <FormattedMessage id="IDS_HMS_SAVE" />
                        </LoadingButton>
                        <Button
                          variant="outlined"
                          disableElevation
                          onClick={() => {
                            setAdvance(false);
                            setOpened(initStatusRoom());
                            resetForm(initForm(roomHotelList));
                            clearTime();
                          }}
                          style={{ height: 40, width: '50%', background: GREY_100 }}
                        >
                          <Typography
                            gutterBottom
                            variant="subtitle2"
                            style={{ marginTop: 5, textAlign: 'center', color: GREY_600 }}
                          >
                            <FormattedMessage id="IDS_HMS_REJECT" />
                          </Typography>
                        </Button>
                      </Row>
                    </Form>
                  );
                }}
              </Formik>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(mapStateToProps)(CalendarInfo);
