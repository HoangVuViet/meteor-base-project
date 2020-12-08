import { Chip, Divider, IconButton, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { TEAL } from '../../../../../configs/colors';
import { some } from '../../../../../constants';
import { ReactComponent as InfoIconCircle } from '../../../../../svg/ic_info_circle.svg';
import { Col, Row } from '../../../../common/components/elements';
import BootstrapTooltip from '../../../common/BootstrapTooltip';
import { getStatus, contentResult } from '../utils';
import BookingDetailHistoryTable from './BookingDetailHistoryTable';
import BookingPaymentInfo from './BookingPaymentInfo';

interface Props {
  bookingDetailData: some;
  loading: boolean;
}
const BookingDetailContent: React.FC<Props> = props => {
  const { bookingDetailData, loading } = props;

  return (
    <>
      <Row style={{ alignItems: 'flex-start', marginBottom: 20 }}>
        <Typography variant="h5">
          <FormattedMessage id="IDS_HMS_BOOKING_ROOM_ORDER" />
          <span>:</span>
        </Typography>
        &nbsp;
        <Typography variant="h5" style={{ marginRight: 12 }}>
          {bookingDetailData?.name}
        </Typography>
        <Chip
          label={
            <Typography gutterBottom variant="body2" component="span">
              <FormattedMessage id={getStatus(bookingDetailData?.status).id} />
            </Typography>
          }
          style={{
            color: getStatus(bookingDetailData?.status).color,
            background: getStatus(bookingDetailData?.status).colorSecondary,
          }}
        />
      </Row>
      <Paper
        style={{ margin: '0 -16px', padding: '30px 32px', borderRadius: 0, boxShadow: 'none' }}
      >
        <Row style={{ alignItems: 'flex-start' }}>
          <Col style={{ width: 660, marginRight: 40 }}>
            <Row style={{ marginBottom: 12 }}>
              <Col style={{ marginRight: 64 }}>
                {contentResult('IDS_HMS_RATE_TYPE', bookingDetailData?.rateType?.name)}
              </Col>
              <Divider orientation="vertical" flexItem style={{ marginRight: 24 }} />
              <Col style={{ marginRight: 64 }}>
                {contentResult('IDS_HMS_CHANNEL', bookingDetailData?.saleChannel)}
              </Col>
              <Divider orientation="vertical" flexItem />
              <Col style={{ marginLeft: 24 }}>
                {contentResult('IDS_HMS_BOOKING_ORDER_CODE', bookingDetailData?.orderCode)}
              </Col>
            </Row>
            <Divider style={{ marginBottom: 16 }} />
            <Row style={{ alignItems: 'flex-start' }}>
              <Col style={{ marginRight: 100 }}>
                <Typography
                  variant="subtitle1"
                  style={{
                    color: TEAL,
                    marginBottom: 16,
                  }}
                >
                  <FormattedMessage id="IDS_HMS_BOOKING_CUSTOMER_INFO" />
                </Typography>
                <Col style={{ marginBottom: 12 }}>
                  <Row style={{ marginRight: 40 }}>
                    {contentResult('fullName', bookingDetailData?.userInfo?.name, {
                      marginRight: 40,
                    })}
                  </Row>
                </Col>
                <Col style={{ marginBottom: 12 }}>
                  <Row>
                    {contentResult('phone', bookingDetailData?.userInfo?.phoneNumber, {
                      marginRight: 16,
                    })}
                  </Row>
                </Col>
                <Col style={{ marginBottom: 12 }}>
                  <Row>
                    {contentResult('email', bookingDetailData?.userInfo?.email, {
                      marginRight: 64,
                    })}
                  </Row>
                </Col>
                <Col style={{ marginBottom: 50 }}>
                  <Row style={{ alignItems: 'flex-start' }}>
                    {contentResult(
                      'IDS_HMS_BOOKING_OTHER_DESCRIPTION',
                      bookingDetailData?.userInfo?.description,
                      {
                        marginRight: 12,
                        whiteSpace: 'nowrap',
                      },
                    )}
                  </Row>
                </Col>
              </Col>
              <Col>
                <Typography
                  variant="subtitle1"
                  style={{
                    color: TEAL,
                    marginBottom: 16,
                  }}
                >
                  <FormattedMessage id="IDS_HMS_BOOKING_ACCOMODATION_INFO" />
                </Typography>
                <Col style={{ marginBottom: 12 }}>
                  <Row>
                    {contentResult(
                      'IDS_HMS_BOOKING_ACCOMODATION_NIGHT_AMOUNT',
                      bookingDetailData?.accommodationInfo?.nightStaying,
                      {
                        marginRight: 12,
                        whiteSpace: 'nowrap',
                      },
                    )}
                  </Row>
                </Col>
                <Col style={{ marginBottom: 12 }}>
                  <Row>
                    {contentResult(
                      'IDS_HMS_BOOKING_CHECK_IN_DAY',
                      bookingDetailData?.accommodationInfo?.checkInDay,
                      {
                        marginRight: 16,
                        whiteSpace: 'nowrap',
                      },
                    )}
                  </Row>
                </Col>
                <Col style={{ marginBottom: 12 }}>
                  <Row>
                    {contentResult(
                      'IDS_HMS_BOOKING_CHECK_OUT_DAY',
                      bookingDetailData?.accommodationInfo?.checkOutDay,
                      {
                        marginRight: 8,
                        whiteSpace: 'nowrap',
                      },
                    )}
                  </Row>
                </Col>
                <Col style={{ marginBottom: 12 }}>
                  <Row>
                    {contentResult(
                      'IDS_HMS_BOOKING_TOURIST_AMOUNT',
                      bookingDetailData?.accommodationInfo?.nightStaying,
                      {
                        marginRight: 4,
                        whiteSpace: 'nowrap',
                      },
                    )}
                  </Row>
                </Col>
              </Col>
            </Row>
            <Row>
              <Typography
                variant="subtitle1"
                style={{
                  color: TEAL,
                  marginBottom: 12,
                }}
              >
                <FormattedMessage id="IDS_HMS_BOOKING_DETAIL" />
              </Typography>
            </Row>
            <Divider style={{ marginBottom: 16 }} />
            <Col>
              <Col style={{ marginBottom: 12 }}>
                <Row>
                  {contentResult('IDS_HMS_ROOM_NAME', bookingDetailData?.bookingDetail?.roomName, {
                    marginRight: 60,
                    whiteSpace: 'nowrap',
                  })}
                </Row>
              </Col>
              <Col style={{ marginBottom: 12 }}>
                <Row>
                  {contentResult(
                    'IDS_HMS_ROOM_CLASS_FIELD',
                    bookingDetailData?.bookingDetail?.roomQuality,
                    {
                      marginRight: 50,
                      whiteSpace: 'nowrap',
                    },
                  )}
                </Row>
              </Col>
              <Col style={{ marginBottom: 12 }}>
                <Row>
                  {contentResult(
                    'IDS_HMS_BOOKING_ORDER_DAY',
                    bookingDetailData?.bookingDetail?.orderDate,
                    {
                      marginRight: 70,
                      whiteSpace: 'nowrap',
                    },
                  )}
                </Row>
              </Col>
              <Col style={{ marginBottom: 12 }}>
                <Row>
                  {contentResult(
                    'IDS_HMS_HOTEL_NUMBER_OF_ROOM',
                    bookingDetailData?.bookingDetail?.roomAmount,
                    {
                      marginRight: 26,
                      whiteSpace: 'nowrap',
                    },
                  )}
                </Row>
              </Col>
              <Col style={{ marginBottom: 12 }}>
                <Row>
                  {contentResult(
                    'IDS_HMS_BOOKING_ACCOMODATION_ADULT_AMOUNT',
                    bookingDetailData?.bookingDetail?.extraBed,
                    {
                      marginRight: 46,
                      whiteSpace: 'nowrap',
                    },
                  )}
                </Row>
              </Col>
              <Col style={{ marginBottom: 12 }}>
                <Row>
                  {contentResult(
                    'IDS_HMS_BOOKING_ACCOMODATION_CHILD_AMOUNT',
                    bookingDetailData?.bookingDetail?.extraBed,
                    {
                      marginRight: 12,
                      whiteSpace: 'nowrap',
                    },
                  )}
                  <BootstrapTooltip
                    title={
                      <Typography variant="body2" style={{ padding: '12px 12px' }}>
                        <FormattedMessage id="À thế thì làm sao mà à" />
                      </Typography>
                    }
                    placement="top"
                  >
                    <IconButton style={{ padding: 0, marginLeft: 4 }}>
                      <InfoIconCircle style={{ padding: 1 }} />
                    </IconButton>
                  </BootstrapTooltip>
                </Row>
              </Col>
              <Col style={{ marginBottom: 12 }}>
                <Row>
                  {contentResult(
                    'IDS_HMS_BOOKING_EXTRA_BED',
                    bookingDetailData?.bookingDetail?.extraBed,
                    {
                      marginRight: 50,
                      whiteSpace: 'nowrap',
                    },
                  )}
                </Row>
              </Col>
            </Col>
          </Col>
          <Col>
            <BookingPaymentInfo bookingDetailData={bookingDetailData} />
          </Col>
        </Row>
        <Row style={{ marginTop: 30, marginBottom: 16 }}>
          <Typography
            variant="subtitle1"
            style={{
              color: TEAL,
            }}
          >
            <FormattedMessage id="IDS_HMS_ORDER_HISTORY" />
          </Typography>
        </Row>
        <BookingDetailHistoryTable data={bookingDetailData?.history} loading={loading} />
      </Paper>
    </>
  );
};

export default BookingDetailContent;
