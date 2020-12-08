import moment, { Moment } from 'moment';

export function getIndex(index: number, colMax: number) {
  let colOfElement;
  if ((index + 1) % colMax === 0) {
    colOfElement = colMax - 1;
  } else {
    colOfElement = (Math.ceil(index + 1) % colMax) - 1;
  }
  return { row: Math.ceil((index + 1) / colMax), col: colOfElement };
}
export function renderBorderRight(index: number, start: number, end: number, colMax: number) {
  const tmpIndex = getIndex(index, colMax);
  const tmpStart = getIndex(start, colMax);
  const tmpEnd = getIndex(end, colMax);
  if (index >= start && index <= end) {
    if (
      (tmpIndex.row >= tmpStart.row && tmpIndex.row < tmpEnd.row && tmpIndex.col === colMax - 1) ||
      index === end
    ) {
      return true;
    }
  }
  return false;
}
export function renderBorderLeft(index: number, start: number, end: number) {
  const tmpIndex = getIndex(index, 5);
  const tmpStart = getIndex(start, 5);
  const tmpEnd = getIndex(end, 5);
  if (index >= start && index <= end) {
    if (
      (tmpIndex.row > tmpStart.row && tmpIndex.row <= tmpEnd.row && tmpIndex.col === 0) ||
      index === start
    ) {
      return true;
    }
  }
  return false;
}
export function renderBorderTop(index: number, start: number, end: number, colMax: number) {
  const tmpIndex = getIndex(index, colMax);
  const tmpStart = getIndex(start, colMax);
  if (index >= start && index <= end) {
    if (
      tmpIndex.row === tmpStart.row ||
      (tmpIndex.row - tmpStart.row === 1 && tmpStart.col - tmpIndex.col > 0)
    ) {
      return true;
    }
  }
  return false;
}
export function renderBorderBottom(index: number, start: number, end: number, colMax: number) {
  const tmpIndex = getIndex(index, colMax);
  const tmpEnd = getIndex(end, colMax);
  if (index >= start && index <= end) {
    if (
      tmpIndex.row === tmpEnd.row ||
      (tmpEnd.row - tmpIndex.row === 1 && tmpIndex.col - tmpEnd.col >= 1)
    ) {
      return true;
    }
  }
  return false;
}
export const isOutsideRange = (date: Moment) => {
  return date.isBefore(moment(), 'days');
};
export const checkTop = (day: Moment, start?: Moment, end?: Moment) => {
  return (
    start &&
    end &&
    day.isSameOrBefore(end, 'days') &&
    day.isSameOrAfter(start, 'days') &&
    (Math.floor((day.date() - 1) / 7) === 0 ||
      !day
        .clone()
        .subtract(7, 'days')
        .isSameOrAfter(start, 'days'))
  );
};
export const checkBottom = (day: Moment, start?: Moment, end?: Moment) => {
  return (
    start &&
    end &&
    day.isSameOrBefore(end, 'days') &&
    day.isSameOrAfter(start, 'days') &&
    (day.isSameOrAfter(
      day
        .clone()
        .endOf('month')
        .subtract(7, 'days'),
    ) ||
      !day
        .clone()
        .add(7, 'days')
        .isSameOrBefore(end, 'days'))
  );
};
export const checkRight = (day: Moment, start?: Moment, end?: Moment) => {
  return (
    start &&
    end &&
    day.isSameOrBefore(end, 'days') &&
    day.isSameOrAfter(start, 'days') &&
    (day.isSame(end, 'days') || day.day() === 6 || day.date() === day.daysInMonth())
  );
};
export const checkLeft = (day: Moment, start?: Moment, end?: Moment) => {
  return (
    start &&
    end &&
    day.isSameOrBefore(end, 'days') &&
    day.isSameOrAfter(start, 'days') &&
    (day.isSame(start, 'days') || day.day() === 0 || day.date() === 1)
  );
};
