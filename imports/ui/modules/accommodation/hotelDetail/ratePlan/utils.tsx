import moment, { Moment } from 'moment';
import { some } from '../../../../constants';
import { DATE_FORMAT_BACK_END } from '../../../../models/moment';
import { isEmpty } from '../../utils';

export const daysBetween = (start: Moment | undefined, end: Moment | undefined) => {
  const duration = moment.duration(end?.diff(start)).asDays();
  const days: Moment[] = [];
  for (let i = 0; i <= duration; i += 1) {
    days.push(
      moment(start)
        .add(i, 'day')
        .startOf('day'),
    );
  }
  return days;
};
export const convertRoomData = (ranges: some[], fieldValue: string) => {
  const result: some = {};
  if (!isEmpty(ranges)) {
    ranges.forEach(el => {
      const dateArr = daysBetween(
        moment(el.timeFrom, DATE_FORMAT_BACK_END),
        moment(el.timeTo, DATE_FORMAT_BACK_END),
      );
      dateArr.forEach(day => {
        result[day.format(DATE_FORMAT_BACK_END)] = el[fieldValue];
      });
    });
  }
  return result;
};
export const convertRoomRate = (ranges: some[], fieldValue: string) => {
  const result: some = {};
  if (!isEmpty(ranges)) {
    ranges.forEach(el => {
      const dateArr = daysBetween(
        moment(el.fromDate, DATE_FORMAT_BACK_END),
        moment(el.toDate, DATE_FORMAT_BACK_END),
      );
      dateArr.forEach(day => {
        result[day.format(DATE_FORMAT_BACK_END)] = el[fieldValue];
      });
    });
  }
  return result;
};
export const checkEdge = (day: Moment, ranges: some[], type: string) => {
  let result: string = '';
  if (!isEmpty(ranges)) {
    ranges.forEach((el: some) => {
      if (
        day.isSame(
          moment(type === 'first' ? el?.timeFrom : el?.timeTo, DATE_FORMAT_BACK_END),
          'days',
        )
      )
        result = type;
    });
  }
  return result;
};
export const convertDateToRange = (
  start: Moment | undefined,
  end: Moment | undefined,
  daysActive: number[],
  isTime?: boolean,
) => {
  const dateRanges: Moment[] = start && end ? daysBetween(start, end) : [];
  const result: some[] = [];
  let temp: Moment[] = [];
  if (!isEmpty(dateRanges)) {
    dateRanges.forEach((d: Moment, i: number) => {
      if (daysActive.includes(d.day())) {
        temp.push(d);
      } else if (!isEmpty(temp)) {
        result.push(
          isTime
            ? {
                timeFrom: temp[0].format(DATE_FORMAT_BACK_END),
                timeTo: temp[temp.length - 1].format(DATE_FORMAT_BACK_END),
              }
            : {
                fromDate: temp[0].format(DATE_FORMAT_BACK_END),
                toDate: temp[temp.length - 1].format(DATE_FORMAT_BACK_END),
              },
        );
        temp = [];
      }
    });
    if (!isEmpty(temp)) {
      result.push(
        isTime
          ? {
              timeFrom: temp[0].format(DATE_FORMAT_BACK_END),
              timeTo: temp[temp.length - 1].format(DATE_FORMAT_BACK_END),
            }
          : {
              fromDate: temp[0].format(DATE_FORMAT_BACK_END),
              toDate: temp[temp.length - 1].format(DATE_FORMAT_BACK_END),
            },
      );
      temp = [];
    }
  }
  return result;
};
export const getPriceValue = (price: any, reduce: number, type: string) => {
  if (isEmpty(price)) return 0;
  if (isEmpty(reduce)) return Number(price);
  if (type === 'VND')
    return Number(price) - Number(reduce) > 0 ? Number(price) - Number(reduce) : 0;
  return Number(price) * (1 - Number(reduce) / 100);
};
export const customViewRanges = (startTime: Moment, endTime: Moment) => {
  const viewWidth = window.innerWidth - 474;
  const viewAmount = (viewWidth - (viewWidth % 72)) / 72;
  const daysAmount = daysBetween(startTime, endTime).length;
  let result: Moment = endTime;
  if (daysAmount <= viewAmount) {
    result = moment(endTime)
      .add(viewAmount - daysAmount, 'day')
      .startOf('day');
  }
  return daysBetween(startTime, result);
};
export const getReduceValue = (standardAdult: number, reduce: some) => {
  const result: some = { ...reduce };
  let temp: some = { type: 'VND', reduce: 0 };
  if (standardAdult > 0) {
    Array(standardAdult)
      .fill(0)
      .forEach((el, idx: number) => {
        if (reduce[standardAdult - idx]) {
          temp = { ...reduce[standardAdult - idx] };
        } else {
          result[standardAdult - idx] = temp;
        }
      });
  }
  return result;
};
