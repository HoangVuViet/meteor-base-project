import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
} from '@material-ui/core';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import { Field, Form, Formik } from 'formik';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import queryString from 'query-string';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as yup from 'yup';
import { GREY_600, PRIMARY, TEAL } from '../../../../../configs/colors';
import { some, SUCCESS_CODE } from '../../../../../constants';
import { DATE_FORMAT_BACK_END } from '../../../../../models/moment';
import { normalCharacter } from '../../../../../models/regex';
import { AppState } from '../../../../../redux/reducers';
import { ReactComponent as AddIconCircle } from '../../../../../svg/ic_add_circle.svg';
import CustomSwitch from '../../../../common/components/CustomSwitch';
import DateRangeFormControl from '../../../../common/components/DateRangeFormControl';
import { Col, Row, snackbarSetting } from '../../../../common/components/elements';
import { NumberFormatCustom } from '../../../../common/components/Form';
import FormControlAutoComplete from '../../../../common/components/FormControlAutoComplete';
import LoadingButton from '../../../../common/components/LoadingButton';
import SelectTimeCheck from '../../../../common/components/SelectTimeCheck';
import TextFieldWithSelect from '../../../../common/components/TextFieldWithSelect';
import {
  getAllRatePlanList,
  getListPromotions,
  previewPromotions,
} from '../../../accommodationService';
import {
  FieldCheckboxContent,
  FieldSelectContent,
  FieldTextContent,
} from '../../../common/FieldContent';
import { WhiteBackgroundCheckbox } from '../../../common/WhiteBackgroundCheckbox';
import {
  CHECK_OPTION,
  dayInWeek,
  DECREASE_OPTION,
  DISCOUNTS_OPTION,
  TYPE_PRICE,
} from '../../../constant';
import HeaderPromotion from '../components/HeaderPromotion';

function CreateDetailPromotion(props: any) {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const intl = useIntl();
  const match: any = useRouteMatch();

  const initialValue = {
    id: null,
    status: 1,
    hotelId: match?.params?.hotelId,
    applyBeforeDayArrival: null,
    applyBeforeMonthArrival: null,
    applyBookingFrom: null,
    applyBookingTo: null,
    code: 'EARLYBIRD',
  };
  const promotionId = Number(match?.params?.promotionId);

  const [daySelected, setDaySelected] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);
  const [listPromotions, setListPromotions] = useState<any>();
  const [rateList, setRateList] = useState<any[]>([]);
  const [rateListRooms, setRateListRooms] = useState<any[]>([]);
  const [, setRefunPolicy] = React.useState('');

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleChangeRefunPolicy = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRefunPolicy((event.target as HTMLInputElement).value);
  };

  // Config ẩn hiện các components tương ứng tùy thuộc vào loại khuyến mãi
  // [Giờ chót, Đặt sớm, Gói giảm giá/Quà tặng, Miễn phí đêm nghỉ, Tùy chỉnh]
  // [1, 2, 3, 4, 5]
  const arrayAccessFromPromotion: number[] = [1];
  const arrayAccessBookingTimeFromTo: number[] = [3, 4, 5];
  const arrayAccessMinConditionApply: number[] = [2];
  const arrayAccessNumberNightsStay: number[] = [2, 3, 5];
  const arrayAccessNumberRoomsStay: number[] = [2, 3];
  const arrayAccessDiscountRate: number[] = [1, 2, 5];
  const arrayAccessCustomerMustStay: number[] = [4];
  const arrayAccessRequireNight: number[] = [4, 5];
  const arrayAccessServicesPromotion: number[] = [3];

  const roomSchema = useMemo(() => {
    return yup.object().shape({});
  }, []);

  const getDiscountOnWeekdays = () => {
    const tempDaySelected: string[] = [];
    daySelected.forEach(element => {
      switch (element) {
        case 0:
          tempDaySelected.push('MONDAY');
          break;
        case 1:
          tempDaySelected.push('TUESDAY');
          break;
        case 2:
          tempDaySelected.push('WEDNESDAY');
          break;
        case 3:
          tempDaySelected.push('THURSDAY');
          break;
        case 4:
          tempDaySelected.push('FRIDAY');
          break;
        case 5:
          tempDaySelected.push('SATURDAY');
          break;
        case 6:
          tempDaySelected.push('SUNDAY');
          break;
        default:
          break;
      }
    });
    return tempDaySelected;
  };

  const fetchData = useCallback(async () => {
    try {
      const data = await dispatch(getListPromotions());
      setListPromotions(data?.data?.items);

      const params: some = {
        hotelId: match?.params?.hotelId,
        pageOffset: 0,
        pageSize: 1000,
      };
      const searchStr = queryString.stringify(params);
      const json = await dispatch(getAllRatePlanList(searchStr));
      if (json.code === SUCCESS_CODE) setRateList(json?.data?.items);
    } catch (error) {}
  }, [dispatch, match]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <HeaderPromotion />
      <Formik
        initialValues={initialValue}
        validationSchema={roomSchema}
        onSubmit={async (values: any) => {
          const searchStr = queryString.stringify({
            hotelId: match?.params?.hotelId,
          });
          const tempData = {
            ...values,
            isCancellationRefundable: !values.isCancellationRefundable,
            discountOnWeekdays: getDiscountOnWeekdays(),
          };
          const json = await dispatch(previewPromotions(searchStr, JSON.stringify(tempData)));
          if (json?.code === SUCCESS_CODE) {
            enqueueSnackbar(
              json?.message,
              snackbarSetting(key => closeSnackbar(key), { color: 'success' }),
            );
            fetchData();
          } else {
            enqueueSnackbar(
              json?.message,
              snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
            );
          }
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => {
          return (
            <Form style={{ padding: '0px 16px' }}>
              <Col>
                <FieldTextContent
                  name="promotionTypeId"
                  label={<FormattedMessage id="IDS_HMS_TYPES_PROMOTION" />}
                  placeholder={intl.formatMessage({ id: 'IDS_HMS_TYPES_PROMOTION' })}
                  value={listPromotions?.find((ele: any) => ele.id === promotionId)?.name}
                  formControlStyle={{ maxWidth: 250 }}
                  onChange={e => {
                    if (normalCharacter.test(e.target.value)) {
                      setFieldValue('promotionTypeId', e.target.value);
                    }
                  }}
                  inputProps={{ maxLength: 250 }}
                  errorMessage=""
                />
                <Row style={{ width: '70%' }}>
                  <FormControlAutoComplete
                    label={<FormattedMessage id="IDS_HMS_RATE_PLAN" />}
                    placeholder={intl.formatMessage({ id: 'IDS_HMS_RATE_PLAN' })}
                    formControlStyle={{ flex: 1 }}
                    value={rateList.find(v => v.id === (values as any).ratePlanId || null)}
                    options={rateList}
                    onChange={(e: any, value: some | null) => {
                      setFieldValue('ratePlanId', e.target.value);
                      setRateListRooms(value?.rooms);
                    }}
                    getOptionLabel={value => value?.name}
                    errorMessage={undefined}
                  />
                  <FormControlAutoComplete
                    label={<FormattedMessage id="IDS_HMS_PROGRAM_FOR" />}
                    placeholder={intl.formatMessage({ id: 'choose' })}
                    formControlStyle={{ flex: 1 }}
                    disabled={false}
                    value={TYPE_PRICE.find(v => v.id === (values as any).programFor || null)}
                    options={TYPE_PRICE}
                    onChange={(e: any, value: some | null) => {
                      setFieldValue('programFor', e.target.value);
                    }}
                    getOptionLabel={value => value.name}
                    errorMessage={undefined}
                  />
                  <Col style={{ flex: 1 }}>
                    <FieldTextContent
                      name="markUpRate"
                      label={intl.formatMessage({ id: 'IDS_HMS_MARKUP_RATE' })}
                      placeholder={intl.formatMessage({ id: 'IDS_HMS_MARKUP_RATE' })}
                      endAdornment={<span className="end-adornment">%</span>}
                      inputComponent={NumberFormatCustom as any}
                    />
                    <Typography variant="body2" style={{ marginTop: -20, color: GREY_600 }}>
                      <FormattedMessage id="IDS_HMS_MARKUP_NOTE" />
                    </Typography>
                  </Col>
                </Row>
                <Row>
                  <FieldCheckboxContent
                    name="hasRestriction"
                    label={
                      <Typography variant="body2">
                        <FormattedMessage id="IDS_HMS_MARKUP_RULE" />
                      </Typography>
                    }
                  />
                </Row>

                <Divider style={{ margin: '28px 0px 16px 0px' }} />
                <Typography variant="subtitle1" style={{ color: TEAL }}>
                  <FormattedMessage id="accManagement.generalInfo" />
                </Typography>
                <Row style={{ marginTop: 16, width: '50%' }}>
                  <FieldTextContent
                    name="name"
                    label={<FormattedMessage id="IDS_HMS_PROGRAM_NAME" />}
                    placeholder={intl.formatMessage({ id: 'IDS_HMS_PROGRAM_NAME' })}
                    formControlStyle={{ flex: 2, marginRight: 0 }}
                    inputProps={{
                      maxLength: 100,
                    }}
                    optional
                  />
                  <Row style={{ flex: 1 }}>
                    <CustomSwitch checked onChange={() => {}} />
                    <Typography variant="subtitle2">
                      <FormattedMessage id="enable" />
                    </Typography>
                  </Row>
                </Row>
                <FieldSelectContent
                  label={intl.formatMessage({ id: 'IDS_HMS_ROOMRATE_APPLY' })}
                  name="roomIds"
                  multiple
                  getOptionLabel={(v: any) => v.name}
                  options={rateListRooms}
                  onSelectOption={(value: any) => {
                    setFieldValue('roomIds', value);
                  }}
                  formControlStyle={{ width: '45%' }}
                  disabled={!rateListRooms.length}
                />
                <FieldTextContent
                  name="description"
                  formControlStyle={{ width: '45%' }}
                  label={<FormattedMessage id="IDS_HMS_INTRODUCE_PROGRAM" />}
                  placeholder={intl.formatMessage({ id: 'IDS_HMS_MAX_CONTENT' })}
                  inputProps={{
                    maxLength: 5000,
                  }}
                  multiline
                  rows={15}
                  optional
                />

                <Divider style={{ margin: '8px 0px 16px' }} />
                <Typography variant="subtitle1" style={{ color: TEAL }}>
                  <FormattedMessage id="IDS_HMS_START_TIMES_PROGRAM" />
                </Typography>
                <Row style={{ marginTop: 16, width: '75%' }}>
                  <FormControlAutoComplete
                    label={<FormattedMessage id="IDS_HMS_TIMES" />}
                    placeholder={intl.formatMessage({ id: 'choose' })}
                    formControlStyle={{ width: '15%' }}
                    disabled={false}
                    options={CHECK_OPTION}
                    value={CHECK_OPTION.find(
                      v => v.id === (values as any).applyTimePromotionOption || null,
                    )}
                    onChange={(e: any, value: some | null) => {
                      setFieldValue('applyTimePromotionOption', e.target.value);
                    }}
                    getOptionLabel={value => value.name}
                    errorMessage=""
                  />
                  <Col>
                    <Typography variant="body2">
                      <FormattedMessage id="IDS_HMS_FROMDATE_TODATE" />
                    </Typography>
                    <Row style={{ marginTop: 4 }}>
                      <DateRangeFormControl
                        style={{ marginRight: 10, minWidth: 360 }}
                        numberOfMonths={2}
                        optional
                        startDate={
                          (values as any).applyCheckinFrom &&
                          moment(
                            (values as any).applyCheckinFrom,
                            DATE_FORMAT_BACK_END,
                            true,
                          ).isValid()
                            ? moment((values as any).applyCheckinFrom, DATE_FORMAT_BACK_END, true)
                            : undefined
                        }
                        endDate={
                          (values as any).applyCheckinTo &&
                          moment(
                            (values as any).applyCheckinTo,
                            DATE_FORMAT_BACK_END,
                            true,
                          ).isValid()
                            ? moment((values as any).applyCheckinTo, DATE_FORMAT_BACK_END, true)
                            : undefined
                        }
                        onChange={(startDate, endDate) => {
                          setFieldValue(
                            'applyCheckinFrom',
                            startDate?.format(DATE_FORMAT_BACK_END),
                          );
                          setFieldValue('applyCheckinTo', endDate?.format(DATE_FORMAT_BACK_END));
                        }}
                        isOutsideRange={(e: any) => false}
                      />
                      <Tooltip title={<FormattedMessage id="IDS_HMS_DATE_TIMES_NOTE" />}>
                        <ErrorOutline
                          style={{ fill: PRIMARY, marginBottom: 12 }}
                          className="svgFillAll"
                        />
                      </Tooltip>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Typography variant="body2" style={{ marginRight: 42 }}>
                    <FormattedMessage id="IDS_HMS_APPLY_DATE_PRICE" />
                  </Typography>
                  <FormGroup row>
                    {dayInWeek.map((elm, idx) => (
                      <Row key={idx} style={{}}>
                        <FormControlLabel
                          control={
                            <WhiteBackgroundCheckbox
                              checked={daySelected.includes(elm.value)}
                              onChange={e => {
                                if (e.target.checked) {
                                  setDaySelected([...daySelected, elm.value]);
                                } else {
                                  setDaySelected(daySelected.filter(v => v !== elm.value));
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
                      </Row>
                    ))}
                  </FormGroup>
                </Row>

                <Divider style={{ margin: '28px 0px 16px 0px' }} />
                <Typography variant="subtitle1" style={{ color: TEAL }}>
                  <FormattedMessage id="IDS_HMS_PROMOTION_CONDITON" />
                </Typography>
                {arrayAccessBookingTimeFromTo.includes(promotionId) && (
                  <Col style={{ marginTop: 16 }}>
                    <Typography variant="body2">
                      <FormattedMessage id="IDS_HMS_BOOKING_TIME_FROM_TO" />
                    </Typography>
                    <Row style={{ marginTop: 4 }}>
                      <DateRangeFormControl
                        style={{ marginRight: 10, width: '45%' }}
                        numberOfMonths={1}
                        optional
                        startDate={undefined}
                        endDate={undefined}
                        onChange={(startDate, endDate) => {}}
                        isOutsideRange={(e: any) => false}
                      />
                    </Row>
                  </Col>
                )}
                {arrayAccessCustomerMustStay.includes(promotionId) && (
                  <Row style={{ marginTop: 16, width: '100%', alignItems: 'center' }}>
                    <FieldSelectContent
                      name="abcd"
                      label={intl.formatMessage({ id: 'IDS_HMS_CUSTOMER_MUST_STAY' })}
                      options={[]}
                      formControlStyle={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginRight: 8,
                      }}
                      optional
                      getOptionLabel={(v: any) => v.name}
                      onSelectOption={(value: number) => {}}
                      horizontal
                    />
                    <FieldSelectContent
                      name="abcd"
                      label={intl.formatMessage({ id: 'IDS_HMS_PAY_FOR_NIGHT' })}
                      options={[]}
                      formControlStyle={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                      optional
                      getOptionLabel={(v: any) => v.name}
                      onSelectOption={(value: number) => {}}
                      horizontal
                    />
                    <Typography variant="body2">
                      <FormattedMessage id="IDS_HMS_FREE_NIGHT" />
                    </Typography>
                  </Row>
                )}
                {arrayAccessMinConditionApply.includes(promotionId) && (
                  <Row style={{ marginTop: 16, width: '75%', alignItems: 'center' }}>
                    <Typography variant="body2" style={{ marginBottom: 20, marginRight: 8 }}>
                      <FormattedMessage id="IDS_HMS_MIN_CONDITION_APPLY" />
                    </Typography>
                    <TextFieldWithSelect
                      options={[{ id: 1, name: 'Ngày' }]}
                      nameTextField=""
                      nameSelect=""
                    />
                    <Typography variant="body2" style={{ marginBottom: 20 }}>
                      <FormattedMessage id="IDS_HMS_BEFORE_CHECKIN" />
                    </Typography>
                  </Row>
                )}
                {arrayAccessNumberNightsStay.includes(promotionId) && (
                  <Row style={{ marginTop: 16, width: '75%', alignItems: 'center' }}>
                    <FieldSelectContent
                      name="abcd"
                      label={intl.formatMessage({ id: 'IDS_HMS_CUSTOMER_MUST_STAY' })}
                      options={[]}
                      formControlStyle={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                      optional
                      getOptionLabel={(v: any) => v.name}
                      onSelectOption={(value: number) => {}}
                      horizontal
                    />
                    <Typography variant="body2" style={{ marginRight: 4 }}>
                      <FormattedMessage id="IDS_HMS_NUMBER_NIGHTS_STAY" />
                    </Typography>
                  </Row>
                )}
                {arrayAccessNumberRoomsStay.includes(promotionId) && (
                  <Row style={{ marginTop: 16, width: '75%', alignItems: 'center' }}>
                    <FieldSelectContent
                      name="abcd"
                      label={intl.formatMessage({ id: 'IDS_HMS_CUSTOMER_MUST_STAY' })}
                      options={[]}
                      formControlStyle={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                      optional
                      getOptionLabel={(v: any) => v.name}
                      onSelectOption={(value: number) => {}}
                      horizontal
                    />
                    <Typography variant="body2" style={{ marginRight: 4 }}>
                      <FormattedMessage id="IDS_HMS_NUMBER_ROOMS_STAY" />
                    </Typography>
                  </Row>
                )}
                {arrayAccessRequireNight.includes(promotionId) && (
                  <Row style={{ marginTop: 16, width: '75%', alignItems: 'center' }}>
                    <FieldSelectContent
                      name="abcd"
                      label={intl.formatMessage({ id: 'IDS_HMS_REQUIRE_NIGHT' })}
                      options={[]}
                      formControlStyle={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                      optional
                      getOptionLabel={(v: any) => v.name}
                      onSelectOption={(value: number) => {}}
                      horizontal
                    />
                  </Row>
                )}
                {arrayAccessFromPromotion.includes(promotionId) && (
                  <FormControl component="fieldset" style={{ marginTop: 16, width: '75%' }}>
                    <RadioGroup aria-label="gender" name="gender1" value="" onChange={() => {}}>
                      <FormControlLabel
                        value="female"
                        control={<Radio style={{ marginBottom: 14 }} />}
                        label={
                          <Row style={{ alignItems: 'flex-start', flex: 1 }}>
                            <Typography variant="body2" style={{ margin: 12 }}>
                              <FormattedMessage id="IDS_HMS_FROM_PROMOTION" />
                            </Typography>
                            <SelectTimeCheck
                              time={(values as any).hourFromOnCheckInDay}
                              onChangeTime={data => setFieldValue('hourFromOnCheckInDay', data)}
                            />
                            <Typography variant="body2" style={{ margin: 12 }}>
                              <FormattedMessage id="to" />
                            </Typography>
                            <SelectTimeCheck
                              time={(values as any).hourToOnCheckInDay}
                              onChangeTime={data => setFieldValue('hourToOnCheckInDay', data)}
                            />
                            <Typography variant="body2" style={{ margin: 12 }}>
                              <FormattedMessage id="IDS_HMS_CHECKIN_DATE" />
                            </Typography>
                          </Row>
                        }
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label={
                          <Row style={{ alignItems: 'center', flex: 1, marginLeft: 8 }}>
                            <FieldTextContent
                              formControlStyle={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                              }}
                              name="company"
                              label={intl.formatMessage({ id: 'IDS_HMS_WITHIN_PROMOTION' })}
                              placeholder={intl.formatMessage({ id: 'choose' })}
                              endAdornment={<span className="end-adornment">Ngày</span>}
                              inputComponent={NumberFormatCustom as any}
                            />
                            <Typography variant="body2" style={{ minWidth: 160 }}>
                              <FormattedMessage id="IDS_HMS_CHECKIN_DATE" />
                            </Typography>
                          </Row>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                )}
                {arrayAccessDiscountRate.includes(promotionId) && (
                  <Row style={{ width: '70%', marginTop: 32 }}>
                    <Col style={{ flex: 1 }}>
                      <Typography variant="body2">
                        <FormattedMessage id="IDS_HMS_DISCOUNTS_RATE" />
                      </Typography>
                      <TextFieldWithSelect
                        options={DECREASE_OPTION}
                        nameTextField="amount"
                        nameSelect="discountType"
                      />
                    </Col>
                    <FormControlAutoComplete
                      label={<FormattedMessage id="IDS_HMS_APPLY_WITH" />}
                      placeholder={intl.formatMessage({ id: 'choose' })}
                      formControlStyle={{ flex: 1 }}
                      options={DISCOUNTS_OPTION}
                      value={DISCOUNTS_OPTION.find(
                        v => v.id === (values as any).applyPromotionUnit || null,
                      )}
                      onChange={(e: any, value: some | null) => {
                        setFieldValue('applyPromotionUnit', e.target.value);
                      }}
                      getOptionLabel={value => value?.name}
                      errorMessage={undefined}
                    />
                  </Row>
                )}
                <Row style={{ width: '70%', marginTop: 32 }}>
                  <FormControlAutoComplete
                    label={<FormattedMessage id="IDS_HMS_NUMBER_OF_PROMOTION" />}
                    placeholder={intl.formatMessage({ id: 'choose' })}
                    formControlStyle={{ flex: 1 }}
                    value={null}
                    options={[
                      { id: 1, name: 'Nhập giá trị' },
                      { id: 2, name: 'Không giới hạn' },
                    ]}
                    onChange={(e: any, value: some | null) => {
                      setFieldValue('optionsQuantity', e.target.value);
                    }}
                    getOptionLabel={value => value?.name}
                    errorMessage={undefined}
                  />
                  <FieldTextContent
                    formControlStyle={{ flex: 1, marginTop: 24 }}
                    name="quantity"
                    placeholder={intl.formatMessage({ id: 'IDS_HMS_NUMBER_OF_PROMOTION' })}
                    inputComponent={NumberFormatCustom as any}
                  />
                </Row>

                {arrayAccessServicesPromotion.includes(promotionId) && (
                  <Col>
                    <Divider style={{ margin: '28px 0px 16px 0px' }} />
                    <Typography variant="subtitle1" style={{ color: TEAL }}>
                      <FormattedMessage id="IDS_HMS_SERVICES_PROMOTION" />
                    </Typography>
                    <Col>
                      <Row style={{ width: '70%', marginTop: 16 }}>
                        <FormControlAutoComplete
                          label={<FormattedMessage id="IDS_HMS_SERVICES" />}
                          placeholder={intl.formatMessage({ id: 'IDS_HMS_SERVICES' })}
                          formControlStyle={{ flex: 1 }}
                          value={null}
                          options={[]}
                          onChange={(e: any, value: some | null) => {}}
                          getOptionLabel={value => ''}
                          errorMessage={undefined}
                        />
                        <Col style={{ flex: 1 }}>
                          <Typography variant="body2" style={{ marginBottom: 4 }}>
                            <FormattedMessage id="IDS_HMS_DISCOUNT_SERVICES" />
                          </Typography>
                          <TextFieldWithSelect options={[]} nameTextField="" nameSelect="" />
                        </Col>
                        <FieldTextContent
                          formControlStyle={{ flex: 1 }}
                          name="company"
                          label={intl.formatMessage({ id: 'IDS_HMS_APPLY_FOR' })}
                          placeholder={intl.formatMessage({ id: 'IDS_HMS_APPLY_FOR' })}
                          endAdornment={<span className="end-adornment">Khách/phòng</span>}
                          inputComponent={NumberFormatCustom as any}
                        />
                      </Row>
                      <Row style={{ width: '100%', marginTop: 16 }}>
                        <FormControlAutoComplete
                          label={<FormattedMessage id="IDS_HMS_SERVICES" />}
                          placeholder={intl.formatMessage({ id: 'IDS_HMS_SERVICES' })}
                          formControlStyle={{ flex: 1 }}
                          value={null}
                          options={[]}
                          onChange={(e: any, value: some | null) => {}}
                          getOptionLabel={value => ''}
                          errorMessage={undefined}
                        />
                        <FieldTextContent
                          formControlStyle={{ flex: 1 }}
                          name="company"
                          label={intl.formatMessage({ id: 'IDS_HMS_SERVICES_CONTENT' })}
                          placeholder={intl.formatMessage({ id: 'IDS_HMS_SERVICES_CONTENT' })}
                          inputComponent={NumberFormatCustom as any}
                        />
                        <Col style={{ flex: 1 }}>
                          <Typography variant="body2" style={{ marginBottom: 4 }}>
                            <FormattedMessage id="IDS_HMS_DISCOUNT_SERVICES" />
                          </Typography>
                          <TextFieldWithSelect options={[]} nameTextField="" nameSelect="" />
                        </Col>
                        <FieldTextContent
                          formControlStyle={{ flex: 1 }}
                          name="company"
                          label={intl.formatMessage({ id: 'IDS_HMS_APPLY_FOR' })}
                          placeholder={intl.formatMessage({ id: 'IDS_HMS_APPLY_FOR' })}
                          endAdornment={<span className="end-adornment">Khách/phòng</span>}
                          inputComponent={NumberFormatCustom as any}
                        />
                      </Row>
                    </Col>
                    <Button style={{ width: 130 }} onClick={() => {}}>
                      <AddIconCircle />
                      <FormattedMessage id="IDS_HMS_SERVICES_ADD" />
                    </Button>
                  </Col>
                )}

                <Divider style={{ margin: '28px 0px 16px 0px' }} />
                <Typography variant="subtitle1" style={{ color: TEAL }}>
                  <FormattedMessage id="IDS_HMS_REFUND_POLICY" />
                </Typography>
                <Field
                  name="isCancellationRefundable"
                  as={(propsField: any) => (
                    <RadioGroup onChange={handleChangeRefunPolicy} row {...propsField}>
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label={
                          <Typography variant="body2">
                            <FormattedMessage id="IDS_HMS_GENERAL_CANCEL" />
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        value=""
                        control={<Radio />}
                        label={
                          <Typography variant="body2">
                            <FormattedMessage id="IDS_HMS_GENERAL_NOT_REFUND" />
                          </Typography>
                        }
                      />
                    </RadioGroup>
                  )}
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
                  <Button variant="outlined" disableElevation onClick={() => {}}>
                    <FormattedMessage id="IDS_HMS_REJECT" />
                  </Button>
                </Row>
              </Col>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default CreateDetailPromotion;
