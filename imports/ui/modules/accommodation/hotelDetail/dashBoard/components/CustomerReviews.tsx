/* eslint-disable no-nested-ternary */
import { Avatar, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { GREY_400, ORANGE, WHITE } from '../../../../../configs/colors';
import avatarNotFound from '../../../../../images/avatar_not_found.jpg';
import { ReactComponent as StarActiveIcon } from '../../../../../svg/star_active.svg';
import { CardCustom, Col, Row } from '../../../../common/components/elements';

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
interface Props {
  dataFake: any;
}
function CustomerReviews(props: Props) {
  const { dataFake } = props;
  const { hotelName, star, address, status, hotelUrl, date } = dataFake;
  return (
    <CardCustom onClick={() => {}} variant="outlined" style={{ marginBottom: 8 }}>
      <Avatar style={{ width: 100, height: 100 }} alt="" src={hotelUrl || avatarNotFound} />
      <Col
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          flex: 1,
          paddingLeft: 10,
          marginTop: 12,
        }}
      >
        <Row style={{ width: '100%' }}>
          <Typography variant="h6">{hotelName}</Typography>
        </Row>
        <Row>
          <RateStar style={{ marginTop: 20 }} star={star} />
          <Typography variant="body2" style={{ color: GREY_400, marginTop: 4, marginLeft: 4 }}>
            {date}
          </Typography>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <Typography
            variant="body2"
            style={{ color: status ? 'textPrimary' : GREY_400, marginBottom: 4 }}
          >
            {address}
          </Typography>
        </Row>
      </Col>
    </CardCustom>
  );
}
// this version only for demo
export default CustomerReviews;
