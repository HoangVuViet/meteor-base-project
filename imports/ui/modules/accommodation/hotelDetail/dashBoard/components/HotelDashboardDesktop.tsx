import { Grid, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { BLUE, GREEN, GREY_600, ORANGE, YELLOW, WHITE } from '../../../../../configs/colors';
import { some } from '../../../../../constants';
import { ReactComponent as ArrowRight } from '../../../../../svg/ic_arrow_right.svg';
import { ReactComponent as MessageIcon } from '../../../../../svg/ic_borderMessageIcon.svg';
import { ReactComponent as StarIcon } from '../../../../../svg/ic_borderStarIcon.svg';
import { ReactComponent as DoorIcon } from '../../../../../svg/ic_doorIcon.svg';
import { ReactComponent as LocationIcon } from '../../../../../svg/ic_location.svg';
import { ReactComponent as NewInvoiceIcon } from '../../../../../svg/new_Invoice_Icon.svg';
import { CardCustom, Col, Row } from '../../../../common/components/elements';
import SingleSelect from '../../../../common/components/SingleSelect';
// this version only for demo
import ConversionRates from './ConversionRates';
import CustomerReviews from './CustomerReviews';
import GrossSales from './GrossSales';

export const dataHotel: any = [
  {
    hotelName: 'Lò Văn Dũng',
    star: 5,
    address:
      '“Loved the location and our stay at this hotel for 1 night. We enjoyed a room with bath/shower combo and upstairs had a kitchen area and fridge, but never had time to use that being so close to the city center and enjoying local places to eat and drink.”',
    status: 1,
    hotelUrl:
      'https://media.istockphoto.com/vectors/customer-service-flat-doodle-icon-design-vector-id1191418298?b=1&k=6&m=1191418298&s=170667a&w=0&h=4jxNTO5hxgjfuBdf-V5VtdlrlAzjAwglXA3whpeFSYk=',
    date: '12/01/2019',
  },
  {
    hotelName: 'Johnathan Đại Vũ',
    star: 3,
    address:
      '“The breakfast was delicious. There were six of us and some had the eggs benedict and others some type of salmon dish and the homemade jam and bread was very yummy.”',
    status: 1,
    hotelUrl:
      'https://media.istockphoto.com/vectors/coronavirus-businesswoman-wearing-face-mask-vector-id1209671018',
    date: '12/01/2019',
  },
  {
    hotelName: 'Louis Khiêm',
    star: 4,
    address:
      '“Staff were excellent, friendly and very helpful. Breakfast was very good, all cooked to order. Our first full day at the hotel we had an early start for a tour and would not be there for breakfast. Lunch boxes were provided for us on that morning and we were on our way! Hotel is close to a large selection of restaurants and shops. The hotel arranged for transport from the airport to the hotel and back again. Both times the drivers were on time and loaded our bags.”',
    status: 1,
    hotelUrl:
      'https://media.istockphoto.com/vectors/coronavirus-businesswoman-wearing-face-mask-vector-id1209708093',
    date: '12/01/2019',
  },
  {
    hotelName: 'Cao Văn Hưng',
    star: 2,
    address: '“Great location, rooms very nice, free breakfast s great bonus”',
    status: 1,
    hotelUrl: 'https://storage.googleapis.com/hotelcdn/images/hotel-image-dev/35840/888570_l.jpg',
    date: '12/09/2019',
  },
  {
    hotelName: 'Nguyễn Ô Mai Hồng Mai',
    star: 5,
    address: '“The location was ideal. Close to square yet quiet. Walkable to several locations.”',
    status: 1,
    hotelUrl: 'https://pickaface.net/gallery/avatar/20151109_144853_2380_sample.png',
    date: '15/01/2019',
  },
  {
    hotelName: 'Mun Mẻo Mèo Meo',
    star: 3,
    address: '“Interesting style of the room, good kitchen, close to historic place”',
    status: 2,
    hotelUrl: '',
    date: '12/01/2020',
  },
];
// end

interface Props {
  generalInfo: some;
}

const HotelDashboardDesktop: React.FC<Props> = props => {
  const { generalInfo } = props;

  return (
    <>
      <Col style={{ width: '100%' }}>
        <Typography variant="h5">
          {generalInfo?.name ? generalInfo?.name : <FormattedMessage id="IDS_HMS_UPDATING" />}
        </Typography>
        {generalInfo?.starRating && (
          <Rating value={generalInfo?.starRating} readOnly size="small" />
        )}

        <Row style={{ display: 'flex', marginBottom: 30 }}>
          <LocationIcon />
          {generalInfo?.address ? (
            <Typography variant="body2" component="span" style={{ marginLeft: 4 }}>
              {generalInfo?.address}
            </Typography>
          ) : (
            <Typography variant="body2">
              <FormattedMessage id="IDS_HMS_UPDATING" />
            </Typography>
          )}
        </Row>
        <Grid container spacing={3} wrap="wrap">
          <Grid item xs={3}>
            <CardCustom
              onClick={() => {}}
              variant="outlined"
              style={{ alignItems: 'center', paddingLeft: 30 }}
            >
              <NewInvoiceIcon />
              <Col style={{ paddingLeft: 16 }}>
                <Typography variant="body1" style={{ color: GREY_600 }}>
                  <FormattedMessage id="IDS_HMS_DASHBOARD_BOOKING" />
                </Typography>
                <Row>
                  <Typography variant="h4" style={{ color: ORANGE }}>
                    12
                  </Typography>
                  <ArrowRight
                    className="svgFillAll"
                    style={{ stroke: ORANGE, width: 36, height: 24 }}
                  />
                </Row>
              </Col>
            </CardCustom>
          </Grid>
          <Grid item xs={3}>
            <CardCustom
              onClick={() => {}}
              variant="outlined"
              style={{ alignItems: 'center', paddingLeft: 30 }}
            >
              <DoorIcon />
              <Col style={{ paddingLeft: 16 }}>
                <Typography variant="body1" style={{ color: GREY_600 }}>
                  <FormattedMessage id="IDS_HMS_DASHBOARD_GUEST" />
                </Typography>
                <Row>
                  <Typography variant="h4" style={{ color: GREEN }}>
                    12
                  </Typography>
                  <ArrowRight
                    className="svgFillAll"
                    style={{ stroke: GREEN, width: 36, height: 24 }}
                  />
                </Row>
              </Col>
            </CardCustom>
          </Grid>
          <Grid item xs={3}>
            <CardCustom
              onClick={() => {}}
              variant="outlined"
              style={{ alignItems: 'center', paddingLeft: 30 }}
            >
              <MessageIcon />
              <Col style={{ paddingLeft: 16 }}>
                <Typography variant="body1" style={{ color: GREY_600 }}>
                  <FormattedMessage id="IDS_HMS_DASHBOARD_UNREAD_MESSAGE" />
                </Typography>
                <Row>
                  <Typography variant="h4" style={{ color: YELLOW }}>
                    12
                  </Typography>
                  <ArrowRight
                    className="svgFillAll"
                    style={{ stroke: YELLOW, width: 36, height: 24 }}
                  />
                </Row>
              </Col>
            </CardCustom>
          </Grid>
          <Grid item xs={3}>
            <CardCustom
              onClick={() => {}}
              variant="outlined"
              style={{ alignItems: 'center', paddingLeft: 30 }}
            >
              <StarIcon />
              <Col style={{ paddingLeft: 16 }}>
                <Typography variant="body1" style={{ color: GREY_600 }}>
                  <FormattedMessage id="IDS_HMS_DASHBOARD_RATING" />
                </Typography>
                <Row>
                  <Typography variant="h4" style={{ color: BLUE }}>
                    12
                  </Typography>
                  <ArrowRight
                    className="svgFillAll"
                    style={{ stroke: BLUE, width: 36, height: 24 }}
                  />
                </Row>
              </Col>
            </CardCustom>
          </Grid>
        </Grid>
        {/* this version only for demo */}
        <Grid container spacing={3} wrap="wrap">
          <Grid item xs={6}>
            <ConversionRates />
          </Grid>
          <Grid
            item
            xs={6}
            style={{ maxHeight: 415, overflowY: 'auto', marginTop: 60, backgroundColor: WHITE }}
          >
            <>
              <Row style={{ justifyContent: 'space-between' }}>
                <Typography gutterBottom variant="h6">
                  Đánh giá mới
                </Typography>
                <SingleSelect
                  value={1}
                  formControlStyle={{}}
                  onSelectOption={(value: any) => {}}
                  getOptionLabel={value => 'Mới nhất'}
                  options={[{ id: 1, value: 'Mới nhất' }]}
                  errorMessage=""
                />
              </Row>
              {dataHotel.map((v: some, index: number) => (
                <CustomerReviews dataFake={v} />
              ))}
            </>
          </Grid>
          <Grid item xs={12}>
            <GrossSales />
          </Grid>
        </Grid>
        {/* // end */}
      </Col>
    </>
  );
};
// this version only for demo
export default HotelDashboardDesktop;
