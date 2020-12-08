import React from 'react';
import { Typography } from '@material-ui/core';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { defaultPaginationFilter, PaginationFilter } from '../../../../models/pagination';
import {
  CRAYOLA,
  GREEN,
  RED,
  ORANGE,
  GREEN_100,
  RED_100,
  ORANGE_100,
  CRAYOLA_100,
} from '../../../../configs/colors';
import { some } from '../../../../constants';

export const ORDER_STATUS_TYPES = [
  { name: 'IDS_HMS_BOOKING_STATUS_SUCCESS', id: 1 },
  { name: 'IDS_HMS_BOOKING_STATUS_FAILURE', id: 2 },
  { name: 'IDS_HMS_BOOKING_STATUS_PENDING', id: 3 },
  { name: 'IDS_HMS_BOOKING_STATUS_REFUND', id: 4 },
];

export interface IBookingFilter extends PaginationFilter {
  term?: string;
  provinceIds?: number;
  starNumbers?: number[];
  status?: number[];
}

export const IBookingDefaultPagination = {
  status: [-2],
  ...defaultPaginationFilter,
};

export const getStatus = (ids: number) => {
  switch (ids) {
    case 1:
      return {
        id: 'IDS_HMS_BOOKING_STATUS_SUCCESS',
        color: GREEN,
        colorSecondary: GREEN_100,
      };
    case 2:
      return {
        id: 'IDS_HMS_BOOKING_STATUS_FAILURE',
        color: RED,
        colorSecondary: RED_100,
      };
    case 3:
      return {
        id: 'IDS_HMS_BOOKING_STATUS_PENDING',
        color: ORANGE,
        colorSecondary: ORANGE_100,
      };
    case 4:
      return {
        id: 'IDS_HMS_BOOKING_STATUS_REFUND',
        color: CRAYOLA,
        colorSecondary: CRAYOLA_100,
      };
    default:
      return {
        id: 'IDS_HMS_BOOKING_STATUS_REFUND',
        color: CRAYOLA,
      };
  }
};

export const getPaymentStatus = (ids: number) => {
  switch (ids) {
    case 1:
      return {
        id: 'IDS_HMS_MONEY_RECEIVED',
        color: GREEN,
      };
    case 2:
      return {
        id: 'IDS_HMS_BOOKING_STATUS_PENDING',
        color: ORANGE,
      };
    case 3:
      return {
        id: 'IDS_HMS_BOOKING_STATUS_REFUND_REQUEST',
        color: CRAYOLA,
      };
    default:
      return {
        id: 'IDS_HMS_BOOKING_STATUS_REFUND',
        color: CRAYOLA,
      };
  }
};

export const contentResult = (
  textTitle: string,
  value: some,
  style?: some,
  unit?: string,
  styleValue?: some,
) => {
  return (
    <>
      <Typography color="textSecondary" variant="body2" style={style}>
        <FormattedMessage id={textTitle} />
        <span>:</span>
      </Typography>
      <Typography variant="body2" style={styleValue}>
        {unit && typeof value === 'number' ? (
          <>
            <FormattedNumber value={value} />
            &nbsp;
            <FormattedMessage id={unit} />
          </>
        ) : (
          <span>{value}</span>
        )}
      </Typography>
    </>
  );
};
