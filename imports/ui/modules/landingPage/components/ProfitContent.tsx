import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Col, Row } from '../../common/components/elements';
import { TypographyCustom } from './ProductsContent';

interface Props {
  style?: React.CSSProperties;
}

const ProfitContent: React.FC<Props> = (props) => {
  const { style } = props;
  return (
    <Row style={{ ...style }}>
      <Col style={{ flex: 1, alignSelf:"flex-start" }}>
        <TypographyCustom
          style={{
            fontSize: 28,
            lineHeight: 'normal',
            fontWeight: 'bold',
            maxWidth: 300,
          }}
        >
          <FormattedMessage id="landingPage.profitTitle" />
        </TypographyCustom>
      </Col>
      <div>
        <img
          src="https://www.googleapis.com/download/storage/v1/b/hotelcdn/o/48478%2FZ9DLIAH2DP_profit.jpg?generation=1600165055039450&alt=media"
          alt=""
          style={{ height: '538px' }}
        />
      </div>
    </Row>
  );
};

export default ProfitContent;
