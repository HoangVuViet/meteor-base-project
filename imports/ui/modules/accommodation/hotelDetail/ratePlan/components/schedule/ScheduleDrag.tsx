import React, { useEffect } from 'react';
import { IconButton, Typography } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import moment, { Moment } from 'moment';
import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';
import { FormattedMessage } from 'react-intl';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import {
  GREY_400,
  RED_50,
  WHITE,
  ORANGE,
  BLUE_50,
  RED,
  BLUE_400,
  GREY_100,
} from '../../../../../../configs/colors';
import './Schedule.scss';
import SchedulePopper from './SchedulePopper';
import { checkEdge, convertRoomData } from '../../utils';
import { some } from '../../../../../../constants';
import { DATE_FORMAT_BACK_END } from '../../../../../../models/moment';
import { isEmpty } from '../../../../utils';
import ScheduleInput from './ScheduleInput';
import { updateDrag } from '../../../../redux/accommodationReducer';
import { AppState } from '../../../../../../redux/reducers';

interface CellProps {
  hover: boolean;
  isFocus?: boolean;
  isBetween?: boolean;
  isBefore?: boolean;
  disabled?: boolean;
}
const Cell = styled.td<CellProps>`
  height: 64px;
  border: 1px solid ${GREY_400};
  box-sizing: border-box;
  padding: 0px;
  user-select: none;
  pointer-events: ${props => (props?.disabled ? 'none' : undefined)};
  &:hover {
    background: ${props => (props.hover && !props.isFocus ? fade(`${RED_50}`, 0.2) : undefined)};
  }
  background: ${(props: any) => (props?.disabled ? GREY_100 : WHITE)};
  color: ${props => props.isFocus && 'white'};
`;
interface Props {
  endTime: Moment;
  roomItem: some;
  dayData: Moment[];
  rowType: 'status' | 'room' | 'rate';
  roomData: some;
  rateTypes: some;
  rateItem?: some;
  fetchData: () => void;
}
// let isEndDate: boolean = false;
const ScheduleDrag: React.FC<Props> = props => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const accommodation: any = useSelector((state: AppState) => state.accommodation, shallowEqual);
  const { dragInfo } = accommodation;

  const { endTime, roomItem, dayData, rowType, roomData, rateTypes, rateItem } = props;
  const [startDate, setStartDate] = React.useState<Moment | undefined>(undefined);
  const [endDate, setEndDate] = React.useState<Moment | undefined>(undefined);
  const [drag, setDrag] = React.useState<boolean>(false);
  const [positionDrag, setPosition] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const roomId = roomItem?.room?.id;

  const isOutsideRange = React.useCallback((date: Moment) => {
    return date.isBefore(moment(), 'days');
  }, []);
  useEffect(() => {
    return () => {
      setAnchorEl(null);
      // isEndDate = false;
    };
  }, []);

  const checkBottom = React.useCallback((day: Moment, start?: Moment, end?: Moment) => {
    return start && end && day.isSameOrBefore(end, 'days') && day.isSameOrAfter(start, 'days');
  }, []);
  const checkRight = React.useCallback(
    (day: Moment, start?: Moment, end?: Moment) => {
      return checkBottom(day, start, end) && day.isSame(end, 'days');
    },
    [checkBottom],
  );
  const checkLeft = React.useCallback(
    (day: Moment, start?: Moment, end?: Moment) => {
      return checkBottom(day, start, end) && day.isSame(start, 'days');
    },
    [checkBottom],
  );
  const getBorderStyles = React.useCallback(
    (type: string, day: Moment, rateId?: number) => {
      const temp = `${roomId}_${type}_${rateId || -1}`;
      const isSelected = temp === dragInfo && checkBottom(day, startDate, endDate);
      return {
        borderTop: isSelected ? `2px solid ${ORANGE}` : undefined,
        borderBottom: isSelected ? `2px solid ${ORANGE}` : undefined,
        borderRight:
          isSelected && checkRight(day, startDate, endDate) ? `2px solid ${ORANGE}` : undefined,
        borderLeft:
          isSelected && checkLeft(day, startDate, endDate) ? `2px solid ${ORANGE}` : undefined,
        background: isSelected ? BLUE_50 : WHITE,
      };
    },
    [checkBottom, checkLeft, checkRight, dragInfo, endDate, roomId, startDate],
  );
  const handleMouseDown = React.useCallback(
    (day: Moment, rateId?: number) => {
      if (!isOutsideRange(day)) {
        setAnchorEl(null);
        dispatch(updateDrag(`${roomId}_${rowType}_${rateId || -1}`));
        setDrag(true);
        setStartDate(day);
        setEndDate(day);
      }
    },
    [dispatch, isOutsideRange, roomId, rowType],
  );
  const handleMouseEnter = React.useCallback(
    (day: Moment) => {
      if (drag && !isOutsideRange(day)) {
        if (positionDrag) {
          // isEndDate = true;
          setEndDate(day);
        } else {
          // isEndDate = false;
          setStartDate(day);
        }
      }
    },
    [drag, isOutsideRange, positionDrag],
  );
  const handleMouseUp = React.useCallback((e: any) => {
    setDrag(false);
    setAnchorEl(e?.currentTarget);
  }, []);
  const handleMouseDownIcon = React.useCallback((position: boolean) => {
    setDrag(true);
    setPosition(position);
  }, []);

  const renderIconDrag = React.useCallback(
    (day: Moment, type: 'room' | 'status') => {
      return (
        <>
          {`${roomId}_${type}_${-1}` === dragInfo && startDate && day.isSame(startDate, 'days') && (
            <IconButton
              style={{ left: -10 }}
              className="drag-icon"
              onMouseDown={e => {
                e.stopPropagation();
                handleMouseDownIcon(false);
              }}
            >
              <MenuIcon style={{ height: 8, width: 8, color: 'white' }} />
            </IconButton>
          )}
          {`${roomId}_${type}_${-1}` === dragInfo && endDate && day.isSame(endDate, 'days') && (
            <IconButton
              style={{ right: -10 }}
              className="drag-icon"
              onMouseDown={e => {
                e.stopPropagation();
                handleMouseDownIcon(true);
              }}
            >
              <MenuIcon style={{ height: 8, width: 8, color: 'white' }} />
            </IconButton>
          )}
        </>
      );
    },
    [dragInfo, endDate, handleMouseDownIcon, roomId, startDate],
  );
  const renderCalendar = React.useCallback(() => {
    const rateCells: some = {};
    const roomRatePlans = roomItem?.ratePlans;
    if (!isEmpty(roomRatePlans)) {
      roomRatePlans.forEach((element: some) => (rateCells[element?.id] = []));
    }
    const roomRateType = roomData[roomId]?.rateTypes;
    const rateTypeSelect = (!isEmpty(roomRateType) && roomRateType[rateTypes[roomId]]) || {};
    const ranges: some[] = rateTypeSelect?.ranges || [];
    const availability: some[] = rateTypeSelect?.availability || [];
    let statusData: some = {};
    let roomNumberData: some = {};
    if (rowType === 'status') statusData = convertRoomData(availability, 'status');
    if (rowType === 'room') roomNumberData = convertRoomData(ranges, 'number');
    return (
      <>
        {dayData.map((day, d) => {
          const isCannotView = day.isAfter(endTime);
          if (rowType === 'status') {
            const dayStatus = statusData[day.format(DATE_FORMAT_BACK_END)];
            const isClosed = !isEmpty(dayStatus) && dayStatus === 0;
            return (
              <Cell
                draggable={false}
                hover
                key={`status_${roomId}_${day.format(DATE_FORMAT_BACK_END)}`}
                disabled={isOutsideRange(day) || isCannotView}
                style={
                  isCannotView ? { height: 32 } : { height: 32, ...getBorderStyles(rowType, day) }
                }
                onMouseDown={() => handleMouseDown(day)}
                onMouseEnter={() => handleMouseEnter(day)}
                onMouseUp={e => handleMouseUp(e)}
              >
                {!isCannotView ? (
                  <div style={{ height: '100%', position: 'relative', minWidth: 72, maxWidth: 72 }}>
                    {!isEmpty(dayStatus) && (
                      <div
                        style={{
                          background: isClosed ? RED : BLUE_400,
                          borderTopLeftRadius:
                            checkEdge(day, availability, 'first') === 'first' ? 8 : 0,
                          borderBottomLeftRadius:
                            checkEdge(day, availability, 'first') === 'first' ? 8 : 0,
                          marginTop: 8,
                          width: '102%',
                          height: 22,
                        }}
                      >
                        {checkEdge(day, availability, 'first') === 'first' && (
                          <Typography
                            variant="subtitle2"
                            component="p"
                            style={{ color: WHITE, paddingLeft: 4 }}
                          >
                            <FormattedMessage id={isClosed ? 'IDS_HMS_CLOSED' : 'IDS_HMS_OPENED'} />
                          </Typography>
                        )}
                      </div>
                    )}
                    {renderIconDrag(day, 'status')}
                  </div>
                ) : (
                  <div
                    style={{ height: '100%', position: 'relative', minWidth: 72, maxWidth: 72 }}
                  />
                )}
              </Cell>
            );
          }
          if (rowType === 'room') {
            const room = roomNumberData[day.format(DATE_FORMAT_BACK_END)] || '';
            return (
              <Cell
                draggable={false}
                hover
                key={`room_${roomId}_${day.format(DATE_FORMAT_BACK_END)}`}
                disabled={isOutsideRange(day) || isEmpty(roomItem?.rateTypes) || isCannotView}
                style={isCannotView ? {} : { ...getBorderStyles(rowType, day) }}
                onMouseDown={() => handleMouseDown(day)}
                onMouseEnter={() => handleMouseEnter(day)}
                onMouseUp={e => handleMouseUp(e)}
              >
                {!isCannotView ? (
                  <div style={{ height: '100%', position: 'relative', minWidth: 72, maxWidth: 72 }}>
                    {renderIconDrag(day, 'room')}
                    <ScheduleInput
                      defaultVal={room}
                      rowType="room"
                      day={day}
                      roomInfo={roomItem}
                      rateTypeId={rateTypes[roomId]}
                      fetchData={props?.fetchData}
                    />
                  </div>
                ) : (
                  <div
                    style={{ height: '100%', position: 'relative', minWidth: 72, maxWidth: 72 }}
                  />
                )}
              </Cell>
            );
          }
          const priceStandard = rateItem?.prices[roomItem?.room?.standardAdult];
          const priceStand = priceStandard[day.format(DATE_FORMAT_BACK_END)];
          const price = priceStand?.price || null;
          const disabledRate =
            isOutsideRange(day) ||
            isEmpty(roomItem?.rateTypes) ||
            isCannotView ||
            rateItem?.basedAnotherRatePlan;
          return (
            <Cell
              draggable={false}
              hover
              key={`rate_${roomId}_${rateItem?.id}_${day.format(DATE_FORMAT_BACK_END)}`}
              disabled={disabledRate}
              style={disabledRate ? {} : { ...getBorderStyles('rate', day, rateItem?.id) }}
              onMouseDown={() => handleMouseDown(day, rateItem?.id)}
              onMouseEnter={() => handleMouseEnter(day)}
              onMouseUp={e => handleMouseUp(e)}
            >
              {!isCannotView ? (
                <div style={{ height: '100%', position: 'relative', minWidth: 72, maxWidth: 72 }}>
                  {`${roomId}_rate_${rateItem?.id}` === dragInfo && day.isSame(startDate, 'days') && (
                    <IconButton
                      style={{ left: -10 }}
                      className="drag-icon"
                      onMouseDown={e => {
                        e.stopPropagation();
                        handleMouseDownIcon(false);
                      }}
                    >
                      <MenuIcon style={{ height: 8, width: 8, color: 'white' }} />
                    </IconButton>
                  )}
                  {`${roomId}_rate_${rateItem?.id}` === dragInfo && day.isSame(endDate, 'days') && (
                    <IconButton
                      style={{ right: -10 }}
                      className="drag-icon"
                      onMouseDown={e => {
                        e.stopPropagation();
                        handleMouseDownIcon(true);
                      }}
                    >
                      <MenuIcon style={{ height: 8, width: 8, color: 'white' }} />
                    </IconButton>
                  )}
                  <ScheduleInput
                    defaultVal={price}
                    rowType="rate"
                    day={day}
                    roomInfo={roomItem}
                    rateTypeId={rateTypes[roomId]}
                    ratePlanRoomCode={rateItem?.ratePlanRoomCode}
                    fetchData={props?.fetchData}
                  />
                  {price && (
                    <Typography
                      style={{
                        whiteSpace: 'nowrap',
                        fontSize: 12,
                        textAlign: 'right',
                        marginRight: 8,
                      }}
                    >
                      VND
                    </Typography>
                  )}
                </div>
              ) : (
                <div style={{ height: '100%', position: 'relative', minWidth: 72, maxWidth: 72 }} />
              )}
            </Cell>
          );
        })}
      </>
    );
  }, [
    dayData,
    dragInfo,
    endDate,
    endTime,
    getBorderStyles,
    handleMouseDown,
    handleMouseDownIcon,
    handleMouseEnter,
    handleMouseUp,
    isOutsideRange,
    props,
    rateItem,
    rateTypes,
    renderIconDrag,
    roomData,
    roomId,
    roomItem,
    rowType,
    startDate,
  ]);

  const onMouseUp = React.useCallback(() => {
    setDrag(false);
    setPosition(false);
  }, []);
  React.useEffect(() => {
    document?.addEventListener('mouseup', onMouseUp);
    return () => {
      document?.removeEventListener('mouseup', onMouseUp);
    }; // eslint-disable-next-line
  }, []);
  React.useEffect(() => {
    if (drag) {
      document.body.classList.add('cursor-drag');
    } else {
      document.body.classList.remove('cursor-drag');
    }
  });
  React.useEffect(() => {
    if (startDate?.isAfter(endDate, 'days')) {
      setStartDate(endDate);
      setEndDate(startDate);
      setPosition(!positionDrag);
    }
  }, [endDate, positionDrag, startDate]);
  const isOpenPopper =
    Boolean(anchorEl) &&
    !drag &&
    !positionDrag &&
    (!startDate?.isSame(endDate, 'days') ||
      (startDate?.isSame(endDate, 'days') && rowType === 'status')) &&
    `${roomId}_${rowType}_${rateItem?.id || -1}` === dragInfo;
  return (
    <>
      <>{renderCalendar()}</>
      {isOpenPopper && (
        <SchedulePopper
          // handle popper
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          rowType={rowType}
          // position
          placement="bottom-start"
          // placement={isEndDate ? 'bottom-end' : 'bottom-start'}
          // fetch data after submit
          fetchData={props?.fetchData}
          // data
          roomInfo={roomItem}
          rateTypeId={Number(rateTypes[dragInfo.split('_').shift()])}
          rateDragId={Number(dragInfo.split('_').pop())}
          roomData={roomData}
          // handle date
          startDate={startDate}
          endDate={endDate}
          updateStartDate={dValue => setStartDate(dValue)}
          updateEndDate={dValue => setEndDate(dValue)}
        />
      )}
    </>
  );
};

export default ScheduleDrag;
