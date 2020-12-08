import { Typography } from '@material-ui/core';
import React from 'react';
import { GREEN, GREY_400, WHITE } from '../../../configs/colors';
import { PERCENTAGE } from '../../ratePackage/components/constants';
import { Col, Row } from './elements';

interface Props {
  percent: number;
  style?: React.CSSProperties;
  backgroundStyle?: React.CSSProperties;
  barStyle?: React.CSSProperties;
}
const CustomProgressBar: React.FC<Props> = props => {
  const { percent, backgroundStyle, barStyle, style } = props;
  return (
    <Col style={{ minWidth: 100, ...style }}>
      <Row
        style={{
          width: '100%',
          backgroundColor: GREY_400,
          height: 26,
          borderRadius: 100,
          zIndex: 1,
          padding: '3px 12px 3px 12px',
          ...backgroundStyle,
        }}
      >
        {percent === 0 && (
          <Typography variant="body2" style={{ color: WHITE }}>
            {percent}
            {PERCENTAGE}
          </Typography>
        )}
      </Row>
      {percent > 10 && (
        <Row
          style={{
            width: `${percent}%`,
            position: 'relative',
            backgroundColor: GREEN,
            bottom: 26,
            left: 0,
            height: 26,
            borderRadius: 100,
            zIndex: 2,
            justifyContent: 'flex-end',
            padding: '3px 12px 3px 12px',
            ...barStyle,
          }}
        >
          <Typography variant="body2" style={{ color: WHITE }}>
            {percent}
            {PERCENTAGE}
          </Typography>
        </Row>
      )}
    </Col>
  );
};
export default CustomProgressBar;
