import React, { useState, useEffect } from 'react';
import { InputBase } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import querystring from 'query-string';
import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';
import { useRouteMatch } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import './Schedule.scss';
import { Moment } from 'moment';
import { AppState } from '../../../../../../redux/reducers';
import { some, SUCCESS_CODE } from '../../../../../../constants';
import { snackbarSetting } from '../../../../../common/components/elements';
import { actionUpdateAllotment, actionUpdateRateAllotment } from '../../../../accommodationService';
import { DATE_FORMAT_BACK_END } from '../../../../../../models/moment';
import { NumberFormatCustom } from '../../../../../common/components/Form';
// import { getPriceValue, getReduceValue } from '../../utils';
import { isEmpty } from '../../../../utils';

interface Props {
  defaultVal: any;
  rowType: 'room' | 'rate' | null;
  day: Moment;
  roomInfo: some;
  rateTypeId: number;
  ratePlanRoomCode?: number;
  rateItem?: some;
  fetchData: () => void;
}
const ScheduleInput: React.FC<Props> = props => {
  const intl = useIntl();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { defaultVal, rowType, day, roomInfo, rateTypeId, ratePlanRoomCode } = props;
  const match: any = useRouteMatch();
  const idInput = `input_${
    roomInfo?.room?.id
  }_${rateTypeId}_${ratePlanRoomCode}_${day.toDate().getTime()}`;
  const [value, setValue] = useState<any>();

  useEffect(() => {
    if (!isEmpty(defaultVal)) {
      setValue(Number(defaultVal) >= 0 ? defaultVal : null);
    } else setValue(null);
  }, [defaultVal]);
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
      setValue(defaultVal);
    }
  };
  const handleSubmit = async () => {
    if (isEmpty(value) && isEmpty(defaultVal)) return;
    if (rowType === 'rate' && isEmpty(value)) {
      const searchStr = querystring.stringify({
        hotelId: match?.params?.hotelId,
        ratePlanRoomCode,
      });
      const res = await dispatch(
        actionUpdateRateAllotment(searchStr, {
          ranges: [
            {
              fromDate: day && day.format(DATE_FORMAT_BACK_END),
              toDate: day && day.format(DATE_FORMAT_BACK_END),
            },
          ],
          guests: { [roomInfo?.room?.standardAdult]: { price: null } },
        }),
      );
      handleResponse(res);
    } else if (
      !(
        isEmpty(value) ||
        (!isEmpty(value) && !isEmpty(defaultVal) && Number(value) === Number(defaultVal))
      )
    ) {
      if (Number(value) < 0) {
        enqueueSnackbar(
          intl.formatMessage({ id: 'IDS_HMS_POLICY_PRICE_SETTING_ERROR' }),
          snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
        );
        setValue(defaultVal);
      } else if (rowType === 'rate' && Number(value) < 1000) {
        enqueueSnackbar(
          intl.formatMessage({ id: 'IDS_HMS_PRICE_ERROR' }),
          snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
        );
        setValue(defaultVal);
      } else {
        try {
          if (rowType === 'room') {
            const searchStr = querystring.stringify({ roomId: roomInfo?.room?.id, rateTypeId });
            const res = await dispatch(
              actionUpdateAllotment(searchStr, {
                ranges: [
                  {
                    timeFrom: day && day.format(DATE_FORMAT_BACK_END),
                    timeTo: day && day.format(DATE_FORMAT_BACK_END),
                    number: value,
                  },
                ],
              }),
            );
            handleResponse(res);
          } else if (rowType === 'rate') {
            const searchStr = querystring.stringify({
              hotelId: match?.params?.hotelId,
              ratePlanRoomCode,
            });
            const res = await dispatch(
              actionUpdateRateAllotment(searchStr, {
                ranges: [
                  {
                    fromDate: day && day.format(DATE_FORMAT_BACK_END),
                    toDate: day && day.format(DATE_FORMAT_BACK_END),
                  },
                ],
                guests: {
                  [roomInfo?.room?.standardAdult]: {
                    price: rateTypeId === 1 ? value || 0 : null,
                  },
                },
              }),
            );
            handleResponse(res);
          }
        } catch (error) {}
      }
    }
  };
  const keyPress = (e: any) => {
    if (e.keyCode === 13) {
      document.getElementById(idInput)?.blur();
    }
  };

  return (
    <>
      <InputBase
        id={idInput}
        className="schedule-input"
        value={value}
        title={`${new Intl.NumberFormat().format(Number(value))} VND`}
        onChange={(e: any) => {
          setValue(e?.target?.value);
        }}
        onBlur={handleSubmit}
        onKeyDown={keyPress}
        inputComponent={NumberFormatCustom as any}
      />
    </>
  );
};

export default ScheduleInput;
