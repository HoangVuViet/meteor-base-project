import React from 'react';
import { FormattedMessage } from 'react-intl';
import { WHITE_50 } from '../../../configs/colors';
import { some } from '../../../constants';
import { Col, Row } from '../../common/components/elements';
import { TypographyCustom } from './ProductsContent';

interface Props {
  style?: React.CSSProperties;
}

const ReasonContent: React.FC<Props> = props => {
  const { style } = props;
  const pictureContent = [
    {
      title: 'landingPage.checkInfo',
      content: 'app downloads on Android and IOS',
      imgUrl:
        'https://www.googleapis.com/download/storage/v1/b/hotelcdn/o/48478%2FNUS1FY9VTU_phone.png?generation=1600222043489515&alt=media',
    },
    {
      title: 'landingPage.cheatingPoint',
      content: '',
      imgUrl:
        'https://www.googleapis.com/download/storage/v1/b/hotelcdn/o/48478%2F0FVL2I5SM3_suplies.png?generation=1600222053427154&alt=media',
    },
    {
      title: 'landingPage.bookingRisks',
      content: '',
      imgUrl:
        'https://www.googleapis.com/download/storage/v1/b/hotelcdn/o/48478%2FZTV6QSATNV_product.png?generation=1600222073385802&alt=media',
    },
    {
      title: 'landingPage.guestBlock',
      content: '',
      imgUrl:
        'https://www.googleapis.com/download/storage/v1/b/hotelcdn/o/48478%2FE7XITVAV7C_suplies2.png?generation=1600222061898256&alt=media',
    },
  ];
  return (
    <Row style={{ ...style }}>
      <Col style={{ flex: 1, alignSelf: 'flex-start' }}>
        <TypographyCustom
          style={{
            fontSize: 28,
            lineHeight: 'normal',
            fontWeight: 'bold',
            width: 300,
          }}
        >
          <FormattedMessage id="landingPage.reasonTitle" />
        </TypographyCustom>
      </Col>
      <Row style={{ flexWrap: 'wrap', maxWidth: 768, justifyItems: 'flex-end' }}>
        {pictureContent.map((v: some, index: number) => (
          <div
            key={index}
            style={{
              backgroundSize: 'cover',
              backgroundImage: `url(${v.imgUrl})`,
              padding: 16,
              height: 221,
              width: 360,
              margin: '0px 0px 24px 24px',
            }}
          >
            <TypographyCustom variant="h5" style={{ color: WHITE_50 }}>
              <FormattedMessage id={v.title} />
            </TypographyCustom>
            {/* <TypographyCustom style={{ color: WHITE_50 }}>
              <FormattedMessage id={v.content} />
            </TypographyCustom> */}
          </div>
        ))}
      </Row>
    </Row>
  );
};

export default ReasonContent;
