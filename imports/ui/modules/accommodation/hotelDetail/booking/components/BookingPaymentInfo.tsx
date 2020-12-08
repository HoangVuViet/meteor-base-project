import { Divider, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { GREY_100, TEAL } from '../../../../../configs/colors';
import { some } from '../../../../../constants';
import { Col, Row } from '../../../../common/components/elements';
import { contentResult, getPaymentStatus } from '../utils';

interface Props {
  bookingDetailData: some;
}
const BookingPaymentInfo: React.FC<Props> = props => {
  const { bookingDetailData } = props;

  return (
    <Paper
      style={{
        padding: '16px 30px',
        boxShadow: 'none',
        background: GREY_100,
        borderRadius: 12,
        width: 660,
      }}
    >
      <Row>
        <Typography
          variant="subtitle1"
          style={{
            color: TEAL,
            marginBottom: 16,
          }}
        >
          <FormattedMessage id="IDS_HMS_BOOKING_PAYMENT_STATUS" />
        </Typography>
      </Row>
      <Row style={{ marginBottom: 12, justifyContent: 'space-between' }}>
        <Typography style={{ whiteSpace: 'nowrap' }} color="textSecondary" variant="body2">
          <FormattedMessage id="IDS_HMS_BOOKING_PAYMENT_CUS_MYTOUR" />
          <span>:</span>
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          component="span"
          style={{
            color: getPaymentStatus(bookingDetailData?.payment?.paymentStatus?.cusMytour?.status)
              .color,
          }}
        >
          <FormattedMessage
            id={getPaymentStatus(bookingDetailData?.payment?.paymentStatus?.cusMytour?.status).id}
          />
        </Typography>
      </Row>
      <Row style={{ marginBottom: 12, justifyContent: 'space-between' }}>
        {contentResult(
          'IDS_HMS_AMOUNT_OF_MONEY',
          bookingDetailData?.payment?.paymentStatus?.cusMytour?.price,
          {
            whiteSpace: 'nowrap',
          },
          'IDS_HMS_MONEY_UNIT',
        )}
      </Row>
      <Row style={{ marginBottom: 12, justifyContent: 'space-between' }}>
        {contentResult(
          'IDS_HMS_BOOKING_PAYMENT_DAY',
          bookingDetailData?.payment?.paymentStatus?.cusMytour?.date,
          {
            whiteSpace: 'nowrap',
          },
        )}
      </Row>
      <Row style={{ marginBottom: 16, justifyContent: 'space-between' }}>
        {contentResult(
          'IDS_HMS_BOOKING_PAYMENT_METHOD',
          bookingDetailData?.payment?.paymentStatus?.cusMytour?.method,
          {
            whiteSpace: 'nowrap',
          },
        )}
      </Row>
      <Divider style={{ marginBottom: 16 }} />
      <Row style={{ marginBottom: 12, justifyContent: 'space-between' }}>
        <Typography style={{ whiteSpace: 'nowrap' }} color="textSecondary" variant="body2">
          <FormattedMessage id="IDS_HMS_BOOKING_PAYMENT_NCC_MYTOUR" />
          <span>:</span>
        </Typography>
        <Typography variant="body2">
          <Typography
            gutterBottom
            variant="body2"
            component="span"
            style={{
              color: getPaymentStatus(bookingDetailData?.payment?.paymentStatus?.nccMytour?.status)
                .color,
            }}
          >
            <FormattedMessage
              id={getPaymentStatus(bookingDetailData?.payment?.paymentStatus?.nccMytour?.status).id}
            />
          </Typography>
        </Typography>
      </Row>
      <Row style={{ marginBottom: 12, justifyContent: 'space-between' }}>
        {contentResult(
          'IDS_HMS_AMOUNT_OF_MONEY',
          bookingDetailData?.payment?.paymentStatus?.cusMytour?.price,
          {
            whiteSpace: 'nowrap',
          },
          'IDS_HMS_MONEY_UNIT',
        )}
      </Row>
      <Row style={{ marginBottom: 12, justifyContent: 'space-between' }}>
        {contentResult(
          'IDS_HMS_BOOKING_PAYMENT_DAY',
          bookingDetailData?.payment?.paymentStatus?.cusMytour?.date,
          {
            whiteSpace: 'nowrap',
          },
        )}
      </Row>
      <Row style={{ marginBottom: 32, justifyContent: 'space-between' }}>
        {contentResult(
          'IDS_HMS_BOOKING_PAYMENT_METHOD',
          bookingDetailData?.payment?.paymentStatus?.cusMytour?.method,
          {
            whiteSpace: 'nowrap',
          },
        )}
      </Row>
      <Col>
        <Typography
          variant="subtitle1"
          style={{
            color: TEAL,
            marginBottom: 16,
          }}
        >
          <FormattedMessage id="IDS_HMS_BOOKING_PAYMENT_DETAIL" />
        </Typography>
        <Row style={{ marginBottom: 12, justifyContent: 'space-between' }}>
          {contentResult(
            'IDS_HMS_BOOKING_ROOM_PRICE_TOTAL',
            bookingDetailData?.payment?.paymentStatus?.cusMytour?.price,
            {
              whiteSpace: 'nowrap',
            },
            'IDS_HMS_MONEY_UNIT',
          )}
        </Row>
        <Row style={{ marginBottom: 12, justifyContent: 'space-between' }}>
          {contentResult(
            'IDS_HMS_BOOKING_ROOM_CHILD_FEE',
            bookingDetailData?.payment?.paymentStatus?.cusMytour?.price,
            {
              whiteSpace: 'nowrap',
            },
            'IDS_HMS_MONEY_UNIT',
          )}
        </Row>
        <Row style={{ marginBottom: 12, justifyContent: 'space-between' }}>
          {contentResult(
            'IDS_HMS_BOOKING_ROOM_BED_FEE',
            bookingDetailData?.payment?.paymentStatus?.cusMytour?.price,
            {
              whiteSpace: 'nowrap',
            },
            'IDS_HMS_MONEY_UNIT',
          )}
        </Row>
        <Row style={{ marginBottom: 12, justifyContent: 'space-between' }}>
          {contentResult(
            'IDS_HMS_BOOKING_ROOM_PAYMENT_EXTRA_FEE',
            bookingDetailData?.payment?.paymentStatus?.cusMytour?.price,
            {
              whiteSpace: 'nowrap',
            },
            'IDS_HMS_MONEY_UNIT',
          )}
        </Row>
        <Row style={{ marginBottom: 12, justifyContent: 'space-between' }}>
          {contentResult(
            'IDS_HMS_BOOKING_DISCOUNT',
            bookingDetailData?.payment?.paymentStatus?.cusMytour?.price,
            {
              whiteSpace: 'nowrap',
            },
            'IDS_HMS_MONEY_UNIT',
          )}
        </Row>
        <Row style={{ marginBottom: 12, justifyContent: 'space-between' }}>
          {contentResult(
            'IDS_HMS_OTA_CHANNEL_DISCOUNT',
            bookingDetailData?.payment?.paymentStatus?.cusMytour?.price,
            {
              whiteSpace: 'nowrap',
            },
            'IDS_HMS_MONEY_UNIT',
          )}
        </Row>
        <Row style={{ marginBottom: 12, justifyContent: 'space-between' }}>
          {contentResult(
            'IDS_HMS_OTA_CHANNEL_COMMISSION',
            bookingDetailData?.payment?.paymentStatus?.cusMytour?.price,
            {
              whiteSpace: 'nowrap',
            },
            'IDS_HMS_PERCENT',
          )}
        </Row>
        <Row style={{ marginBottom: 12, justifyContent: 'space-between' }}>
          {contentResult(
            'IDS_HMS_NCC_REAL_EARNING',
            bookingDetailData?.payment?.paymentStatus?.cusMytour?.price,
            {
              whiteSpace: 'nowrap',
            },
            'IDS_HMS_MONEY_UNIT',
          )}
        </Row>
        <Row style={{ marginBottom: 12, justifyContent: 'space-between' }}>
          {contentResult(
            'IDS_HMS_TOTAL_EARNING',
            bookingDetailData?.payment?.paymentStatus?.cusMytour?.price,
            {
              whiteSpace: 'nowrap',
            },
            'IDS_HMS_MONEY_UNIT',
          )}
        </Row>
      </Col>
    </Paper>
  );
};

export default BookingPaymentInfo;
