/* eslint-disable no-nested-ternary */
import { Avatar, Typography } from '@material-ui/core';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import styled from 'styled-components';
import { GREEN, GREY_400, ORANGE, WHITE, BLACK } from '../../../configs/colors';
import { ROUTES } from '../../../configs/routes';
import iconNoPhoto from '../../../images/not-found-image.png';
import { ReactComponent as LocalSolidIcon } from '../../../svg/local_solid.svg';
import { ReactComponent as StarActiveIcon } from '../../../svg/star_active.svg';
import { CardCustom, Col, Row } from '../../common/components/elements';
import { goToAction } from '../redux/reducer';
import { AppState } from '../../../redux/reducers';

interface Props {
  dataHotel: any;
}
export const RateStar = (props: any) => {
  const { star } = props;
  const arrayStar = Array.from(Array(star).keys());
  return (
    <Row>
      {arrayStar.map((v: any, index: number) => (
        <StarActiveIcon key={index} />
      ))}
    </Row>
  );
};
export const RadiusDiv = styled.div<any>`
  background: ${props => (props.isActive ? ORANGE : GREY_400)};
  border-radius: 99px;
  width: 210px;
  height: 32px;
  display: flex;
  justify-content: center;
  color: ${WHITE};
  margin-top: 20px;
  margin-bottom: 12px;
`;
const HotelCard: React.FC<Props> = props => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { dataHotel } = props;
  const { name, starNumber, address, status, logo, dailyBooking } = dataHotel;
  const goToDetail = () => {
    dispatch(
      goToAction({
        pathname: ROUTES.managerHotels.hotelInfo.dashboard.replace(':hotelId', dataHotel?.id),
      }),
    );
  };
  return (
    <CardCustom onClick={goToDetail} variant="outlined">
      <Avatar style={{ width: 100, height: 100 }} alt="" src={logo || iconNoPhoto} />
      <Col
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          flex: 1,
          paddingLeft: 10,
          marginTop: 12,
        }}
      >
        <Row style={{ justifyContent: 'space-between', width: '100%' }}>
          <Typography variant="h6">{name}</Typography>
          <Typography
            variant="body2"
            style={{
              color: status === 1 ? GREEN : GREY_400,
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <FormattedMessage
              id={
                status === 1
                  ? 'IDS_HMS_OPEN_STATUS'
                  : status === 2
                  ? 'IDS_HMS_PAUSED_STATUS'
                  : 'IDS_HMS_CLOSED_STATUS'
              }
            />
            <FiberManualRecord />
          </Typography>
        </Row>
        <RateStar style={{ marginTop: 20 }} star={starNumber} />
        <Row style={{ marginTop: 10 }}>
          <LocalSolidIcon />
          <Typography
            variant="body2"
            style={{ color: status === 1 ? BLACK : GREY_400, marginBottom: 4 }}
          >
            {address}
          </Typography>
        </Row>
        <RadiusDiv isActive={status === 1}>
          <Typography style={{ marginTop: 6 }} variant="body2">
            <FormattedMessage id="IDS_HMS_DAILY_BOOKING" />: {dailyBooking || 0}
          </Typography>
        </RadiusDiv>
      </Col>
    </CardCustom>
  );
};

export default HotelCard;
