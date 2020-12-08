import { Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Row } from '../../modules/common/components/elements';
import { ReactComponent as IconFacebook } from '../../svg/facebook.svg';
import { ReactComponent as IconGoogle } from '../../svg/google_plus.svg';

interface Props {}

const DefaultFooter: React.FC<Props> = () => {
  return (
    <Row
      style={{
        background: 'white',
        padding: '18px 30px',
        zIndex: 100,
      }}
    >
      <Typography variant="body2" color="textSecondary">
        <FormattedMessage id="footer.license" />
      </Typography>
      {/* <Divider
        orientation="vertical"
        style={{ minHeight: '16px', margin: '0 12px', backgroundColor: GREY_300 }}
      />
      <Typography variant="body2" color="textSecondary">
        <FormattedMessage id="footer.hotline" />
        :&nbsp;
        <FormattedMessage
          id={
            userData?.type === 'general_manager' &&
            (userData?.caInfo?.name === 'VuaNem' || userData?.caInfo?.name === 'HoangHa')
              ? 'footer.hotlineNumberCA'
              : 'footer.hotlineNumber'
          }
        />
      </Typography>
      <Divider
        orientation="vertical"
        style={{ minHeight: '16px', margin: '0 12px', backgroundColor: GREY_300 }}
      />
      <Typography variant="body2" color="textSecondary">
        <FormattedMessage id="footer.emailSupport" />
        :&nbsp;
        <a
          href={`mailto:${intl.formatMessage({
            id:
              userData?.type === 'general_manager' &&
              (userData?.caInfo?.name === 'VuaNem' || userData?.caInfo?.name === 'HoangHa')
                ? 'footer.emailCA'
                : 'footer.email',
          })}`}
          style={{ textDecoration: 'none', color: 'unset' }}
        >
          <FormattedMessage
            id={
              userData?.type === 'general_manager' &&
              (userData?.caInfo?.name === 'VuaNem' || userData?.caInfo?.name === 'HoangHa')
                ? 'footer.emailCA'
                : 'footer.email'
            }
          />
        </a>
      </Typography>

      <Divider
        orientation="vertical"
        style={{ minHeight: '16px', margin: '0 12px', backgroundColor: GREY_300 }}
      /> */}
      <IconFacebook style={{ margin: '0px 8px' }} />
      <IconGoogle style={{ margin: '0px 8px' }} />
    </Row>
  );
};

export default DefaultFooter;
