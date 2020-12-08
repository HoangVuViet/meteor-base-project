import React from 'react';
import { Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from '../../../../../common/components/elements';
import { some } from '../../../../../../constants';
import EmailLink from '../../../../../common/components/EmailLink';

interface Props {
  memberInfo: some;
}
const MemberInfo: React.FC<Props> = props => {
  const { memberInfo } = props;

  return (
    <Row style={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <Col style={{ flex: 1 }}>
        <Row style={{ marginBottom: 12 }}>
          <Typography variant="body2" style={{ minWidth: 65 }}>
            <FormattedMessage id="fullName" />
            &#58;
          </Typography>
          &nbsp;&nbsp;&nbsp;
          <Typography variant="subtitle2">{memberInfo?.name}</Typography>
        </Row>
        <Row style={{ marginBottom: 12 }}>
          <Typography variant="body2" style={{ minWidth: 65 }}>
            <FormattedMessage id="gender" />
            &#58;
          </Typography>
          &nbsp;&nbsp;&nbsp;
          <Typography variant="body2">
            {memberInfo?.gender ? (
              <FormattedMessage id={memberInfo?.gender === 'M' ? 'male' : 'female'} />
            ) : (
              <FormattedMessage id="IDS_HMS_MEMBER_NULL" />
            )}
          </Typography>
        </Row>
        <Row style={{ marginBottom: 12 }}>
          <Typography variant="body2" style={{ minWidth: 65 }}>
            <FormattedMessage id="birthday" />
            &#58;
          </Typography>
          &nbsp;&nbsp;&nbsp;
          <Typography variant="body2">
            {memberInfo?.dateOfBirth || <FormattedMessage id="IDS_HMS_MEMBER_NULL" />}
          </Typography>
        </Row>
      </Col>
      <Col style={{ flex: 1 }}>
        <Row style={{ marginBottom: 12 }}>
          <Typography variant="body2" style={{ minWidth: 85 }}>
            <FormattedMessage id="phoneNumber" />
            &#58;
          </Typography>
          &nbsp;&nbsp;&nbsp;
          <Typography variant="body2">
            {memberInfo?.phone || <FormattedMessage id="IDS_HMS_MEMBER_NULL" />}
          </Typography>
        </Row>
        <Row style={{ marginBottom: 12 }}>
          <Typography variant="body2" style={{ minWidth: 85 }}>
            <FormattedMessage id="email" />
            &#58;
          </Typography>
          &nbsp;&nbsp;&nbsp;
          <Typography variant="body2">
            {memberInfo?.email ? (
              <EmailLink value={memberInfo?.email} />
            ) : (
              <FormattedMessage id="IDS_HMS_MEMBER_NULL" />
            )}
          </Typography>
        </Row>
      </Col>
    </Row>
  );
};

export default MemberInfo;
