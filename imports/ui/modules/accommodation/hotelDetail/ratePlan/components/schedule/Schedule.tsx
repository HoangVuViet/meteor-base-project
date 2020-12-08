import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Moment } from 'moment';
import './Schedule.scss';
import { customViewRanges } from '../../utils';
import { AppState } from '../../../../../../redux/reducers';
import { some, SUCCESS_CODE } from '../../../../../../constants';
import { actionGetAllotment, actionGetRoomAllotment } from '../../../../accommodationService';
import { DATE_FORMAT_BACK_END } from '../../../../../../models/moment';
import { isEmpty } from '../../../../utils';
import ScheduleTableContent from './ScheduleTableContent';
import LoadingIcon from '../../../../../common/components/LoadingIcon';
import { updateRoomAllotment, updateRoomRateList } from '../../../../redux/accommodationReducer';

interface Props {
  startTime: Moment;
  endTime: Moment;
}
const Schedule: React.FC<Props> = props => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const match: any = useRouteMatch();
  const { startTime, endTime } = props;
  const [roomData, setRoomData] = React.useState<some>({});
  const [roomAllotment, setRoomAllotment] = React.useState<some>({});
  const [rateTypes, setRateType] = React.useState<some>({});
  const [isLoading, setLoading] = React.useState<boolean>(true);

  const fetchData = React.useCallback(
    async (isFirst?: boolean) => {
      try {
        const res = await dispatch(
          actionGetAllotment(match?.params?.hotelId, {
            timeFrom: startTime.format(DATE_FORMAT_BACK_END),
            timeTo: endTime.format(DATE_FORMAT_BACK_END),
          }),
        );
        if (res?.code === SUCCESS_CODE) {
          setRoomData(res?.data?.roomAvailability);
          dispatch(updateRoomAllotment(res?.data?.roomAvailability));
        }
        const json = await dispatch(
          actionGetRoomAllotment(match?.params?.hotelId, {
            fromDate: startTime.format(DATE_FORMAT_BACK_END),
            toDate: endTime.format(DATE_FORMAT_BACK_END),
          }),
        );
        if (json?.code === SUCCESS_CODE) {
          setRoomAllotment(json?.data);
          dispatch(updateRoomRateList(json?.data));
          if (isFirst) {
            const temp: some = {};
            if (!isEmpty(json?.data?.items)) {
              json?.data?.items.forEach((el: some) => {
                temp[el?.room?.id] = el?.rateTypes[0]?.id;
              });
            }
            setRateType(temp);
          }
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
    [dispatch, endTime, match, startTime],
  );
  useEffect(() => {
    fetchData(true); // eslint-disable-next-line
  }, [startTime, endTime]);

  if (isLoading) return <LoadingIcon />;

  return (
    <>
      <div className="schedule-container">
        <>
          {!isEmpty(roomAllotment?.items) &&
            roomAllotment?.items.map((el: some, i: number) => (
              <div key={i}>
                <ScheduleTableContent
                  endTime={endTime}
                  roomIdx={i}
                  dayData={customViewRanges(startTime, endTime)}
                  roomItem={el}
                  rateTypes={rateTypes}
                  updateRateType={(val, id) => setRateType({ ...rateTypes, [id]: val })}
                  fetchData={fetchData}
                  roomData={roomData}
                />
              </div>
            ))}
        </>
      </div>
    </>
  );
};

export default Schedule;
