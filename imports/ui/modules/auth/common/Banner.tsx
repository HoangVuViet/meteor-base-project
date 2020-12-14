/* eslint-disable react/require-default-props */
import * as React from 'react';
import { BLUE_400 } from '../../../configs/colors';
import { Col } from '../../common/components/elements';

// const Wrapper = styled.div`
//   /* position: absolute; */
//   top: 103px;
//   left: 0;
//   right: 0;
//   padding: 32px;
// `;

interface Props {
  isRegister?: boolean | false;
}

const Banner = (props: Props) => {
  const { isRegister } = props;
  return (
    <Col
      style={{
        position: 'relative',
        backgroundColor: BLUE_400,
        borderRadius: '12px 0px 0px 12px',
        width: 270,
        padding: 32,
      }}
    >
      <img src="../../../../../public/svg/ic_logoBanner.svg"></img>
      <Col style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {isRegister ? (
          <img src="../../../../../public/svg/ic_register.svg"></img>
        ) : (
          <img src="../../../../../public/svg/ic_blueKey.svg"></img>
        )}
      </Col>
    </Col>
  );
};

export default Banner;
