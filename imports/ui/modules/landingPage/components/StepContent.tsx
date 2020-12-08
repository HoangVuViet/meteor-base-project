import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { some } from '../../../constants';
import ClockIcon from '../../../svg/landingPage/ic_clock.svg';
import FormIcon from '../../../svg/landingPage/ic_form.svg';
import MatchingIcon from '../../../svg/landingPage/ic_matching.svg';
import PresentIcon from '../../../svg/landingPage/ic_present.svg';
import { Col, Row } from '../../common/components/elements';
import { TypographyCustom } from './ProductsContent';

interface Props {
  style?: React.CSSProperties;
}

const StepContent: React.FC<Props> = props => {
  const step = [
    {
      icon: MatchingIcon,
      title: 'landingPage.signUpWithAnyHotel',
      content: 'landingPage.signUpWithAnyHotelContent',
    },
    {
      icon: FormIcon,
      title: 'landingPage.easyToUse',
      content: 'landingPage.easyToUseContent',
    },
    {
      icon: ClockIcon,
      title: 'landingPage.stepByStep',
      content: 'landingPage.stepByStepContent',
    },
    {
      icon: PresentIcon,
      title: 'landingPage.specialDiscount',
      content: 'landingPage.specialDiscountContent',
    },
  ];
  const { style } = props;
  return (
    <Col style={{ ...style }}>
      <TypographyCustom
        style={{
          fontSize: 28,
          lineHeight: 'normal',
          fontWeight: 'bold',
          marginBottom: 24,
        }}
      >
        <FormattedMessage id="landingPage.stepTitle" />
      </TypographyCustom>
      <Row style={{ flex: 1, alignItems: 'flex-start' }}>
        {step.map((v: some, index: number) => (
          <Row key={index} style={{ flex: 1, alignItems: 'flex-start' }}>
            <Col
              style={{
                maxWidth: 280,
                justifyItems: 'space-between',
                flex: 1,
              }}
            >
              <div
                style={{
                  height: 100,
                  minWidth: 100,
                  backgroundSize: 'cover',
                  alignSelf: 'flex-start',
                }}
              >
                <img src={v.icon} alt="" />
              </div>
              <TypographyCustom variant="h5">
                <FormattedMessage id={v.title} />
              </TypographyCustom>
              <TypographyCustom variant="body2">
                <FormattedMessage id={v.content} />
              </TypographyCustom>
            </Col>
            {index < step.length - 1 && (
              <TrendingFlatIcon fontSize="large" style={{ margin: '30px 30px 0px 0px' }} />
            )}
          </Row>
        ))}
      </Row>
    </Col>
  );
};

export default StepContent;
