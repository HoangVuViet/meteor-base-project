import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import moment, { Moment } from 'moment';
import { useIntl } from 'react-intl';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import InfiniteScroll from 'react-infinite-scroller';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useRouteMatch } from 'react-router';
import MenuIcon from '@material-ui/icons/Menu';
import {
  GREEN,
  GREY_400,
  GREY_100,
  RED_50,
  WHITE,
  GREY_600,
  RED,
  BLUE_50,
} from '../../../../../../configs/colors';
// import { daysBetween } from '../../utils';
import { AppState } from '../../../../../../redux/reducers';
import {
  updateCalendarView,
  updateRangeTime,
  updateRoomAllotment,
  updateRoomRateList,
} from '../../../../redux/accommodationReducer';
import { Row } from '../../../../../common/components/elements';
import './Calendar.scss';
import LoadingIcon from '../../../../../common/components/LoadingIcon';
import { checkTop, checkBottom, checkLeft, checkRight, isOutsideRange } from './utils';
import { DATE_FORMAT_BACK_END } from '../../../../../../models/moment';
import { isEmpty } from '../../../../utils';
import { some, SUCCESS_CODE } from '../../../../../../constants';
import { actionGetAllotment, actionGetRoomAllotment } from '../../../../accommodationService';

interface CellProps {
  hover: boolean;
  isFocus?: boolean;
  isBetween?: boolean;
  isBefore?: boolean;
  disabled?: boolean;
}
const Cell = styled.td<CellProps>`
  height: 84px;
  width: calc(100% / 7);
  border: 1px solid ${GREY_400};
  box-sizing: border-box;
  padding: 0px;
  user-select: none;
  &:hover {
    background: ${props => (props.hover && !props.isFocus ? fade(`${RED_50}`, 0.2) : undefined)};
  }
  background: ${(props: any) => (props?.disabled ? GREY_100 : WHITE)};
  color: ${props => props.isFocus && WHITE};
`;
const Head = styled.td`
  height: 30px;
  text-align: center;
  width: 132px;
`;

interface Props {
  chooseDate?: Moment;
}

const Calendar: React.FC<Props> = props => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const match: any = useRouteMatch();
  const { rangeTime, infoSelected, dayWeek } = useSelector(
    (state: AppState) => state.accommodation,
    shallowEqual,
  );
  const intl = useIntl();
  const startDate: Moment = rangeTime?.startDate || moment();
  const endDate: Moment = rangeTime?.endDate || moment();
  const { chooseDate } = props;
  const [drag, setDrag] = React.useState<boolean>(false);
  const [month, setMonth] = React.useState(5);
  const [positionDrag, setPosition] = React.useState(false);
  const fetchData = React.useCallback(
    async (m: number) => {
      const endMonthView: Moment = moment()
        .add(m - 1, 'months')
        .endOf('month');
      try {
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
    },
    [dispatch, match],
  );

  React.useEffect(() => {
    fetchData(month); // eslint-disable-next-line
  }, [month]);

  const updateTime = React.useCallback(
    (start: Moment | undefined, end: Moment | undefined) => {
      dispatch(updateRangeTime({ startDate: start, endDate: end }));
    },
    [dispatch],
  );
  const renderCalendar = React.useCallback(
    // eslint-disable-next-line no-shadow
    (month: Moment, idxMonth: number) => {
      const totalCells: JSX.Element[] = [];
      let week: JSX.Element[] = [];
      const allWeeks: JSX.Element[][] = [];
      const firstDayOfMonth = month.startOf('month');
      for (let d = 1; d <= firstDayOfMonth.day(); d += 1) {
        totalCells.push(<Cell isFocus={false} hover={false} key={`blank${d} `} />);
      }
      for (let d = 1; d <= month.daysInMonth(); d += 1) {
        const day = month.clone().add(d - 1, 'days');
        const isChosenDate = chooseDate ? day.isSame(chooseDate, 'days') : false;
        // room status information
        const dayStatus =
          !isEmpty(infoSelected?.availability) &&
          (infoSelected as some)?.availability[day.format(DATE_FORMAT_BACK_END)];
        const isClosed = !(dayStatus && dayStatus === 1);
        // room number information
        const roomNumber =
          !isEmpty(infoSelected?.roomNumber) &&
          (infoSelected as some)?.roomNumber[day.format(DATE_FORMAT_BACK_END)];
        // price standard information
        let price: number | null = null;
        if (!isEmpty(infoSelected?.ratePlans) && !isEmpty(infoSelected?.room)) {
          const priceStandard = !isEmpty(infoSelected?.ratePlans?.prices)
            ? infoSelected?.ratePlans?.prices[infoSelected?.room?.standardAdult]
            : {};
          const priceStand =
            !isEmpty(priceStandard) && priceStandard[day.format(DATE_FORMAT_BACK_END)];
          price = priceStand?.price || null;
        }
        const isSelected =
          startDate &&
          endDate &&
          day.isSameOrBefore(endDate, 'days') &&
          day.isSameOrAfter(startDate, 'days');
        const isDisabled: boolean = !!(
          startDate &&
          endDate &&
          day.isSameOrBefore(endDate, 'days') &&
          day.isSameOrAfter(startDate, 'days') &&
          !dayWeek.includes(day.day())
        );
        let cellBG = WHITE;
        if (isDisabled) cellBG = GREY_100;
        else if (isClosed) cellBG = RED_50;
        else if (isSelected) cellBG = BLUE_50;
        totalCells.push(
          <Cell
            draggable={false}
            isFocus={isChosenDate}
            hover
            key={`day${d}`}
            disabled={isDisabled}
            style={{
              borderTop: checkTop(day, startDate, endDate) ? '2px solid #FF6A39' : undefined,
              borderBottom: checkBottom(day, startDate, endDate) ? '2px solid #FF6A39' : undefined,
              borderRight: checkRight(day, startDate, endDate) ? '2px solid #FF6A39' : undefined,
              borderLeft: checkLeft(day, startDate, endDate) ? '2px solid #FF6A39' : undefined,
              backgroundColor: cellBG,
            }}
            onClick={() => {}}
            onMouseDown={e => {
              if (!isOutsideRange(day)) {
                setDrag(true);
                updateTime(day, day);
              }
            }}
            onMouseEnter={e => {
              if (drag && !isOutsideRange(day)) {
                if (positionDrag) updateTime(startDate, day);
                else updateTime(day, endDate);
              }
            }}
            onMouseUp={event => setDrag(false)}
          >
            <div style={{ height: '100%', position: 'relative' }}>
              {startDate && endDate && day.isSame(startDate, 'days') && (
                <IconButton
                  className="drag-calendar-icon left"
                  onMouseDown={e => {
                    e.stopPropagation();
                    setDrag(true);
                    setPosition(false);
                  }}
                >
                  <MenuIcon style={{ height: 20, width: 20, color: 'white' }} />
                </IconButton>
              )}
              {startDate && endDate && day.isSame(endDate, 'days') && (
                <IconButton
                  className="drag-calendar-icon right"
                  onMouseDown={e => {
                    e.stopPropagation();
                    setDrag(true);
                    setPosition(true);
                  }}
                >
                  <MenuIcon style={{ height: 20, width: 20, color: 'white' }} />
                </IconButton>
              )}
              <Row style={{ justifyContent: 'space-between', padding: 4 }}>
                <Typography
                  style={{
                    userSelect: 'none',
                    // eslint-disable-next-line no-nested-ternary
                    color: isOutsideRange(day)
                      ? GREY_400
                      : day.isSame(moment(), 'days')
                      ? GREEN
                      : undefined,
                  }}
                  variant="h6"
                >
                  {d}
                </Typography>
                <Typography
                  style={{ color: isClosed ? RED : GREY_600, lineHeight: '24px' }}
                  variant="body2"
                >
                  {isClosed ? intl.formatMessage({ id: 'IDS_HMS_CLOSED' }) : roomNumber}
                </Typography>
              </Row>
              {!isEmpty(price) && !isClosed && (
                <Row style={{ marginTop: 12, padding: 4 }}>
                  {!isEmpty(price) && (
                    <Typography
                      style={{ userSelect: 'none', color: GREEN, lineHeight: '24px' }}
                      variant="body2"
                    >
                      {new Intl.NumberFormat().format(price as number)} VND
                    </Typography>
                  )}
                </Row>
              )}
            </div>
          </Cell>,
        );
      }
      for (let d = 1; d <= (7 - ((month.daysInMonth() + firstDayOfMonth.day()) % 7)) % 7; d += 1) {
        totalCells.push(
          <Cell isFocus={false} hover={false} key={`blank${d + firstDayOfMonth.day()} `} />,
        );
      }

      totalCells.forEach((day, index) => {
        if (index % 7 !== 0) {
          week.push(day);
        } else {
          allWeeks.push(week);
          week = [];
          week.push(day);
        }
        if (index === totalCells.length - 1) {
          allWeeks.push(week);
        }
      });
      return (
        <table
          style={{
            borderCollapse: 'collapse',
            paddingTop: '10px',
            overflow: 'auto',
            width: '100%',
          }}
          draggable={false}
        >
          <thead>
            <tr>
              <td colSpan={7}>
                <div style={{ display: 'flex', padding: '12px 0', alignItems: 'center' }}>
                  <Typography variant="subtitle1" style={{ userSelect: 'none' }}>
                    Tháng {month.format('MM')}/ {month.format('YYYY')}
                  </Typography>
                </div>
              </td>
            </tr>
            {idxMonth === 0 && (
              <tr style={{ background: WHITE, maxWidth: 132, userSelect: 'none' }}>
                {Array(7)
                  .fill(0)
                  .map((v, index) => (
                    <Head key={index}>
                      <Typography variant="body2">
                        {moment()
                          .day(index)
                          .format('ddd')}
                      </Typography>
                    </Head>
                  ))}
              </tr>
            )}
          </thead>
          <tbody>
            {allWeeks.map((w, i) => {
              return <tr key={`week${i} `}>{w}</tr>;
            })}
          </tbody>
        </table>
      );
    },
    [chooseDate, dayWeek, drag, endDate, infoSelected, intl, positionDrag, startDate, updateTime],
  );

  const onMouseUp = React.useCallback(
    () =>
      document?.addEventListener('mouseup', () => {
        setDrag(false);
        setPosition(false);
      }),
    [],
  );

  React.useEffect(() => {
    onMouseUp();
    return () => {
      document?.removeEventListener('mouseup', onMouseUp);
      dispatch(updateCalendarView(false));
    };
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (drag) {
      document.body.classList.add('cursor-drag');
    } else {
      document.body.classList.remove('cursor-drag');
    }
  });

  React.useEffect(() => {
    if (startDate && endDate && moment(startDate).isAfter(moment(endDate))) {
      setPosition(!positionDrag);
      updateTime(endDate, startDate);
    }
  }, [dispatch, endDate, positionDrag, startDate, updateTime]);

  return (
    <>
      <InfiniteScroll
        pageStart={1}
        initialLoad={false}
        loadMore={(page: number) => setMonth(page)}
        hasMore
        loader={<LoadingIcon key="loader" />}
      >
        <div style={{ width: '100%' }}>
          {Array(month)
            .fill(0)
            .map((v, index) => (
              <div key={index}>
                {renderCalendar(
                  moment()
                    .add(index, 'months')
                    .startOf('month'),
                  index,
                )}
              </div>
            ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default React.memo(Calendar);
