import {
  Button,
  FormControlLabel,
  FormGroup,
  Paper,
  Popper,
  PopperProps,
  Typography
} from '@material-ui/core';
import moment, { Moment } from 'moment';
import { useSnackbar } from 'notistack';
import querystring from 'query-string';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { GREY_600, WHITE } from '../../../../../../configs/colors';
import { some, SUCCESS_CODE } from '../../../../../../constants';
import { DATE_FORMAT_BACK_END } from '../../../../../../models/moment';
import { AppState } from '../../../../../../redux/reducers';
import CustomSwitch from '../../../../../common/components/CustomSwitch';
import DateRangeFormControl from '../../../../../common/components/DateRangeFormControl';
import { Col, Row, snackbarSetting } from '../../../../../common/components/elements';
import { NumberFormatCustom } from '../../../../../common/components/Form';
import FormControlTextField from '../../../../../common/components/FormControlTextField';
import LoadingButton from '../../../../../common/components/LoadingButton';
import { actionUpdateAllotment, actionUpdateRateAllotment } from '../../../../accommodationService';
import { WhiteBackgroundCheckbox } from '../../../../common/WhiteBackgroundCheckbox';
import { dayInWeek } from '../../../../constant';
import { isEmpty } from '../../../../utils';
import { convertDateToRange } from '../../utils';

interface Props {
  anchorEl: any;
  placement: PopperProps['placement'];
  rowType: 'status' | 'room' | 'rate' | null;
  startDate?: Moment;
  endDate?: Moment;
  rateTypeId: number;
  rateDragId: number;
  roomInfo: some;
  roomData: some;
  onClose: () => void;
  fetchData: () => void;
  updateStartDate: (date: Moment) => void;
  updateEndDate: (date: Moment) => void;
}

const SchedulePopper: React.FC<Props> = props => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const intl = useIntl();
  const match: any = useRouteMatch();
  const {
    anchorEl,
    placement,
    rowType,
    startDate,
    endDate,
    rateTypeId,
    roomInfo,
    roomData,
    rateDragId,
    onClose,
  } = props;
  const initStatusRoom = () => {
    const roomRateType = roomData[roomInfo?.room?.id]?.rateTypes;
    const rateTypeSelect = (!isEmpty(roomRateType) && roomRateType[rateTypeId]) || {};
    const availability: some[] = rateTypeSelect?.availability || [];
    const availabilityOpened: some[] = availability.filter(v => v?.status === 1);
    let result: boolean = false;
    if (!isEmpty(availabilityOpened) && startDate && endDate) {
      availabilityOpened.forEach(statusItem => {
        if (
          startDate.isSameOrAfter(moment(statusItem.timeFrom, DATE_FORMAT_BACK_END)) &&
          endDate.isSameOrBefore(moment(statusItem.timeTo, DATE_FORMAT_BACK_END))
        ) {
          result = true;
        }
      });
    }
    return result;
  };

  const [isAdvance, setAdvance] = useState<boolean>(false);
  const [isClosed, setClosed] = useState<boolean>(initStatusRoom());
  const [price, setPrice] = useState<string>();
  const [priceError, setPriceError] = useState<string | null>(null);
  const [roomEmpty, setRoomEmpty] = useState<string>();
  const [roomError, setRoomError] = useState<string | null>(null);

  const [daySelected, setDaySelected] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);
  const rateDrag: some =
    rateDragId !== -1 ? roomInfo?.ratePlans.find((v: some) => v?.id === rateDragId) : {};
  const standardAdult = roomInfo?.room?.standardAdult;
  const rateTypeRoom: some = roomInfo?.rateTypes.find((v: some) => v?.id === rateTypeId);
  const commission = isEmpty(rateTypeRoom?.commission) ? 0 : Number(rateTypeRoom?.commission);

  const handleResponse = (res: any) => {
    if (res?.code === SUCCESS_CODE) {
      enqueueSnackbar(
        res?.message,
        snackbarSetting(key => closeSnackbar(key), { color: 'success' }),
      );
      props.fetchData();
    } else {
      enqueueSnackbar(
        res?.message,
        snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
      );
    }
  };
  const handleSubmit = async () => {
    try {
      if (rowType === 'room' || rowType === 'status') {
        const searchStr = querystring.stringify({ roomId: roomInfo?.room?.id, rateTypeId });
        const res = await dispatch(
          actionUpdateAllotment(searchStr, {
            ranges: [
              {
                timeFrom: startDate && startDate.format(DATE_FORMAT_BACK_END),
                timeTo: endDate && endDate.format(DATE_FORMAT_BACK_END),
                // eslint-disable-next-line no-nested-ternary
                number: rowType === 'room' ? roomEmpty : !isClosed ? 0 : -1,
              },
            ],
          }),
        );
        handleResponse(res);
        if (rowType === 'room') onClose();
      } else if (rowType === 'rate') {
        const searchStr = querystring.stringify({
          hotelId: match?.params?.hotelId,
          ratePlanRoomCode: rateDrag?.ratePlanRoomCode,
        });
        const dataSubmit = {
          ranges: convertDateToRange(startDate, endDate, daySelected),
          guests: {
            [standardAdult]: { price },
          },
        };
        const res = await dispatch(actionUpdateRateAllotment(searchStr, dataSubmit));
        handleResponse(res);
        onClose();
      }
    } catch (error) {}
  };
  return (
    <>
      <Popper
        open
        anchorEl={anchorEl}
        placement={placement}
        transition
        style={{
          background: WHITE,
          boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2), 0px 3px 6px rgba(0, 0, 0, 0.2)',
          zIndex: 10,
        }}
      >
        <OutsideClickHandler onOutsideClick={onClose}>
          <Col style={{ padding: 12 }}>
            {rowType === 'status' && (
              <Row style={{ justifyContent: 'space-between' }}>
                <Typography variant="subtitle2">
                  <FormattedMessage id="IDS_HMS_CLOSE_OPEN_ROOM" />
                </Typography>
                <CustomSwitch
                  checked={isClosed}
                  onChange={e => {
                    setClosed(e.target.checked);
                    handleSubmit();
                  }}
                />
              </Row>
            )}
            {rowType === 'room' && (
              <FormControlTextField
                label={<FormattedMessage id="IDS_HMS_EMPTY_ROOM_NUMBER" />}
                placeholder={intl.formatMessage({ id: 'IDS_HMS_INPUT_NUMBER' })}
                optional
                inputComponent={NumberFormatCustom as any}
                value={roomEmpty}
                onChange={e => {
                  setRoomEmpty(e.target.value);
                  if (Number(e.target.value) < 0) {
                    setRoomError(intl.formatMessage({ id: 'IDS_HMS_POLICY_PRICE_SETTING_ERROR' }));
                  } else {
                    setRoomError(null);
                  }
                }}
                errorMessage={roomError || ''}
              />
            )}
            {rowType === 'rate' && (
              <>
                <Typography gutterBottom variant="subtitle2" component="span">
                  <FormattedMessage id="IDS_HMS_SELECT_RANGE_DATE" />
                </Typography>
                <DateRangeFormControl
                  style={{ marginRight: 10, minWidth: 278 }}
                  optional
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(start, end) => {
                    if (start) props.updateStartDate(start);
                    if (end) props.updateEndDate(end);
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
                      <Typography variant="subtitle2" component="p" style={{ fontWeight: 600 }}>
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
                        </div>
                      ))}
                    </FormGroup>
                  )}
                </Paper>
                {rateTypeId !== 1 && (
                  <>
                    <FormControlTextField
                      label={intl.formatMessage({ id: 'IDS_HMS_INPUT_PRICE' })}
                      placeholder={intl.formatMessage({ id: 'IDS_HMS_INPUT_PRICE' })}
                      optional
                      endAdornment={<span className="end-adornment">VNĐ</span>}
                      inputComponent={NumberFormatCustom as any}
                      value={price}
                      onChange={e => {
                        setPrice(e.target.value);
                        if (Number(e.target.value) < 0) {
                          setPriceError(
                            intl.formatMessage({ id: 'IDS_HMS_POLICY_PRICE_SETTING_ERROR' }),
                          );
                        } else if (Number(e.target.value) < 1000) {
                          setPriceError(intl.formatMessage({ id: 'IDS_HMS_PRICE_ERROR' }));
                        } else {
                          setPriceError(null);
                        }
                      }}
                      errorMessage={priceError || ''}
                    />
                    <FormControlTextField
                      label={intl.formatMessage({ id: 'IDS_HMS_SELL_PRICE' })}
                      placeholder={intl.formatMessage({ id: 'IDS_HMS_SELL_PRICE' })}
                      helpText={`${intl.formatMessage({
                        id: 'IDS_HMS_MONEY_DISCOUNT',
                      })}: ${commission}%`}
                      optional
                      disabled
                      value={(Number(price) * ((100 - commission) / 100)).toFixed(0)}
                      endAdornment={<span className="end-adornment">VNĐ</span>}
                      inputComponent={NumberFormatCustom as any}
                    />
                  </>
                )}
                {rateTypeId === 1 && (
                  <>
                    <FormControlTextField
                      label={intl.formatMessage({ id: 'IDS_HMS_PRICE_OF_NCC' })}
                      placeholder={intl.formatMessage({ id: 'IDS_HMS_PRICE_OF_NCC' })}
                      optional
                      endAdornment={<span className="end-adornment">VNĐ</span>}
                      inputComponent={NumberFormatCustom as any}
                      value={price}
                      onChange={e => {
                        setPrice(e.target.value);
                        if (Number(e.target.value) < 0) {
                          setPriceError(
                            intl.formatMessage({ id: 'IDS_HMS_POLICY_PRICE_SETTING_ERROR' }),
                          );
                        } else if (Number(e.target.value) < 1000) {
                          setPriceError(intl.formatMessage({ id: 'IDS_HMS_PRICE_ERROR' }));
                        } else {
                          setPriceError(null);
                        }
                      }}
                      errorMessage={priceError || ''}
                    />
                    <FormControlTextField
                      label={intl.formatMessage({ id: 'IDS_HMS_PRICE_FOR_NCC' })}
                      placeholder={intl.formatMessage({ id: 'IDS_HMS_PRICE_FOR_NCC' })}
                      helpText={`${intl.formatMessage({
                        id: 'IDS_HMS_MONEY_DISCOUNT',
                      })}: ${commission}%`}
                      optional
                      disabled
                      value={(Number(price) * ((100 - commission) / 100)).toFixed(0)}
                      endAdornment={<span className="end-adornment">VNĐ</span>}
                      inputComponent={NumberFormatCustom as any}
                    />
                  </>
                )}
              </>
            )}
            {rowType !== 'status' && (
              <Row style={{ marginTop: 12 }}>
                <LoadingButton
                  color="secondary"
                  variant="contained"
                  disableElevation
                  style={{ marginRight: 20, width: '50%' }}
                  onClick={() => {
                    if (isEmpty(priceError) && isEmpty(roomError)) handleSubmit();
                  }}
                >
                  <FormattedMessage id="IDS_HMS_SAVE" />
                </LoadingButton>
                <Button
                  variant="outlined"
                  disableElevation
                  onClick={onClose}
                  style={{ width: '50%' }}
                >
                  <FormattedMessage id="IDS_HMS_REJECT" />
                </Button>
              </Row>
            )}
          </Col>
        </OutsideClickHandler>
      </Popper>
    </>
  );
};

export default React.memo(SchedulePopper);
