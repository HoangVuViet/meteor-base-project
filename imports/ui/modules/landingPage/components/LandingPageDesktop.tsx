import { Button, Container, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { BLUE, GREY_100, RED, WHITE, WHITE_50 } from '../../../configs/colors';
import { ROUTES } from '../../../configs/routes';
import { ReactComponent as LogoMyTour } from '../../../svg/ic_VNTravelWhiteLogo.svg';
import { Col, Row } from '../../common/components/elements';
import Link, { RawLink } from '../../common/components/Link';
import ProductsContent, { TypographyCustom } from './ProductsContent';
import ProfitContent from './ProfitContent';
import ReasonContent from './ReasonContent';
import StepContent from './StepContent';

const LandingPageDesktop = () => {
  const defaultContentImage =
    'https://www.googleapis.com/download/storage/v1/b/hotelcdn/o/48478%2FHA2553MDHE_group-5@3x.png?generation=1600065634925979&alt=media';
  const adminMail = 'admin@tripi.vn';
  return (
    <Container>
      <Col style={{ justifyItems: 'start', paddingBottom: 160 }}>
        <div
          style={{
            height: 548,
            backgroundSize: 'cover',
            backgroundImage: `url(${defaultContentImage})`,
            padding: '28px 52px 0px 76px',
          }}
        >
          <Row style={{ width: '100%' }}>
            <div style={{ flex: 1 }}>
              <LogoMyTour />
            </div>
            <Typography variant="body1" style={{ color: GREY_100, marginRight: 20 }}>
              <FormattedMessage id="landingPage.whyPartnerWithMT" />
            </Typography>
            <RawLink to={{ pathname: ROUTES.login }}>
              <Typography variant="body1" style={{ color: GREY_100 }}>
                <FormattedMessage id="landingPage.howToPartner" />
              </Typography>
            </RawLink>
          </Row>
          <Typography
            style={{
              fontSize: 28,
              lineHeight: 'normal',
              fontWeight: 'bold',
              maxWidth: 278,
              marginTop: 112,
              color: WHITE,
            }}
          >
            <FormattedMessage id="landingPage.growthBusiness" />
          </Typography>
        </div>
        <ProductsContent style={{ alignSelf: 'center', marginTop: -120 }} />
        <ProfitContent style={{ marginTop: 48 }} />
        <ReasonContent style={{ marginTop: 164 }} />
        <StepContent style={{ marginTop: 132 }} />
        <Paper
          style={{
            marginTop: 80,
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.5)',
            border: 'solid 1px #eeeeee',
            backgroundColor: WHITE_50,
            borderRadius: '4px',
            width: 640,
            height: 136,
            alignSelf: 'center',
            padding: '40px 24px 40px 30px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Col>
            <TypographyCustom variant="h5" style={{ marginBottom: 8 }}>
              <FormattedMessage id="landingPage.readyToPartner" />
            </TypographyCustom>
            <TypographyCustom variant="body2">
              <FormattedMessage id="landingPage.chooseYourBusiness" />
            </TypographyCustom>
          </Col>
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
        </Paper>
        <Col style={{ alignSelf: 'center', maxWidth: '588px', marginTop: 48 }}>
          <TypographyCustom variant="body2" style={{ fontWeight: 'bold' }}>
            <FormattedMessage id="landingPage.gotAnyQuestion" />
          </TypographyCustom>
          <TypographyCustom variant="body2">
            <FormattedMessage id="landingPage.emailSend" />
            &nbsp;
            <a href={`mailto:${adminMail}`} style={{ textDecoration: 'none', color: BLUE }}>
              {adminMail}
            </a>
          </TypographyCustom>
        </Col>
      </Col>
    </Container>
  );
};

export default LandingPageDesktop;
