import { Button, IconButton, Paper, Typography, withStyles } from '@material-ui/core';
import icPrev from '@material-ui/icons/NavigateBefore';
import icNext from '@material-ui/icons/NavigateNext';
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { BLACK, GREY_900, RED, WHITE, WHITE_50 } from '../../../configs/colors';
import { ROUTES } from '../../../configs/routes';
import { some } from '../../../constants';
import { ReactComponent as FlightIcon } from '../../../svg/landingPage/ic_airPlaneIcon.svg';
import { ReactComponent as CorporateIcon } from '../../../svg/landingPage/ic_briefcaseIcon.svg';
import { ReactComponent as HotelIcon } from '../../../svg/landingPage/ic_buildingIcon.svg';
import { ReactComponent as TransportIcon } from '../../../svg/landingPage/ic_busIcon.svg';
import { ReactComponent as CoinIcon } from '../../../svg/landingPage/ic_moneyIcon.svg';
import { ReactComponent as WalkingIcon } from '../../../svg/landingPage/ic_walkingIcon.svg';
import { Col, Row } from '../../common/components/elements';
import Link from '../../common/components/Link';

interface Props {
  style?: React.CSSProperties;
}

const ArrowNext = ({ Icon, className, style, onClick }: some) => {
  const replaceClass = className.replace('slick-arrow', '');
  const isDisable = replaceClass.indexOf('slick-disabled') !== -1;
  return (
    <IconButton
      className={replaceClass}
      style={{
        ...style,
        zIndex: 100,
        position: 'absolute',
        padding: 0,
        backgroundColor: WHITE,
      }}
      onClick={onClick}
      disabled={isDisable}
    >
      <Icon style={{ color: !isDisable ? BLACK : undefined }} />
    </IconButton>
  );
};

const ArrowBack = ({ Icon, className, style, onClick }: some) => {
  const replaceClass = className.replace('slick-arrow', '');
  const isDisable = replaceClass.indexOf('slick-disabled') !== -1;
  return (
    <IconButton
      className={replaceClass}
      style={{ ...style, zIndex: 100, position: 'absolute', padding: 0, backgroundColor: WHITE }}
      disabled={isDisable}
      onClick={onClick}
    >
      <Icon style={{ color: !isDisable ? BLACK : undefined }} />
    </IconButton>
  );
};

export const TypographyCustom = withStyles(theme => ({
  root: {
    fontFamily: 'unset',
  },
}))(Typography);
const ProductsContent: React.FC<Props> = props => {
  const { style } = props;
  const [chooseButton, setChooseButton] = React.useState(0);
  const listButton = [
    {
      text: 'IDS_HMS_HOTEL',
      icon: <HotelIcon />,
    },
    {
      text: 'landingPage.flight',
      icon: <FlightIcon />,
    },
    {
      text: 'landingPage.myExperience',
      icon: <WalkingIcon fill={WHITE_50} stroke={WHITE_50} />,
    },
    {
      text: 'landingPage.transport',
      icon: <TransportIcon />,
    },
    {
      text: 'landingPage.loyaltyPoint',
      icon: <CoinIcon />,
    },
    {
      text: 'landingPage.corporate',
      icon: <CorporateIcon />,
    },
  ];
  const pictureStep = [
    {
      label: 'homeStay',
      imgPath:
        'https://www.googleapis.com/download/storage/v1/b/hotelcdn/o/48478%2F30YGRKP7RU_homeStay.png?generation=1600071390727577&alt=media',
    },
    {
      label: 'villas',
      imgPath:
        'https://www.googleapis.com/download/storage/v1/b/hotelcdn/o/48478%2FGDFYTO9VMM_villa.png?generation=1600071462418880&alt=media',
    },
    {
      label: 'hotel',
      imgPath:
        'https://www.googleapis.com/download/storage/v1/b/hotelcdn/o/48478%2FQ3JETY2CV7_hotel.png?generation=1600071431171276&alt=media',
    },
    {
      label: 'apartment',
      imgPath:
        'https://www.googleapis.com/download/storage/v1/b/hotelcdn/o/48478%2FWVQS9YTJQ2_apartment.png?generation=1600071453493532&alt=media',
    },
  ];
  return (
    <div style={{ ...style }}>
      <Paper
        style={{
          width: 932,
          height: 336,
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          padding: 24,
          boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.2)',
          border: 'solid 1px #eeeeee',
        }}
      >
        <Row style={{ justifyContent: 'space-between', marginBottom: '26px' }}>
          {listButton.map((v: some, index: number) => (
            <Button
              key={index}
              style={{
                width: '140px',
                height: '64px',
                borderRadius: '2px',
                color: chooseButton === index ? WHITE_50 : BLACK,
                backgroundColor: chooseButton === index ? GREY_900 : '#eeeeee',
              }}
              onClick={() => setChooseButton(index)}
              disableElevation
            >
              {v.icon}
              <TypographyCustom style={{ marginLeft: 8 }}>
                <FormattedMessage id={v.text} />
              </TypographyCustom>
            </Button>
          ))}
        </Row>

        <Row style={{ flex: 1 }}>
          <Col style={{ flex: 1 }}>
            <TypographyCustom variant="body1" style={{ fontWeight: 600, marginBottom: 16 }}>
              <FormattedMessage id="landingPage.hotelTitle" />
            </TypographyCustom>
            <TypographyCustom variant="body2" style={{ maxWidth: 374 }}>
              <FormattedMessage id="landingPage.hotelContent" />
            </TypographyCustom>
            <Link to={{ pathname: ROUTES.register }}>
              <Button
                style={{
                  width: '140px',
                  height: 48,
                  backgroundColor: RED,
                  color: WHITE,
                  marginTop: 16,
                }}
              >
                <TypographyCustom variant="subtitle1">
                  <FormattedMessage id="landingPage.getStarted" />
                </TypographyCustom>
              </Button>
            </Link>
          </Col>
          <div style={{ width: 386 }}>
            <Slider
              className="center"
              centerMode
              autoplay
              infinite
              speed={500}
              centerPadding="46px"
              draggable={false}
              pauseOnHover={false}
              nextArrow={<ArrowNext Icon={icNext} />}
              prevArrow={<ArrowBack Icon={icPrev} />}
              focusOnSelect
            >
              {pictureStep.map((pic: some, index: number) => (
                <div key={index}>
                  <img src={pic.imgPath} alt="" style={{ width: 286 }} />
                </div>
              ))}
            </Slider>
          </div>
        </Row>
      </Paper>
    </div>
  );
};

export default ProductsContent;
