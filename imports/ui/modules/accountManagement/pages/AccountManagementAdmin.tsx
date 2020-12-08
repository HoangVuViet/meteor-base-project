import { Divider, Tab, Tabs, Typography } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Route, RouteComponentProps, useHistory, useLocation } from 'react-router';
import { ROUTES } from '../../../configs/routes';
import { Row } from '../../common/components/elements';
import MembersManagement from '../components/membersManagement/results/pages/MembersManagement';
import GroupUser from '../components/userPermissions/result/pages/GroupUser';

interface Props extends RouteComponentProps<{ tabIndex: string }> {}

const AccountManagementAdmin = (props: Props) => {
  // const { tabIndex } = match.path;

  const history = useHistory();
  const location = useLocation();
  const listRoutes = [ROUTES.managerUsers.member.result, ROUTES.managerUsers.groupUsers.result];

  const getTabIndex = React.useMemo(() => {
    let temp = 0;
    listRoutes.forEach((v: string, index: number) => {
      if (location.pathname === v) {
        temp = index;
      }
    });
    return temp;
  }, [listRoutes, location.pathname]);

  return (
    <>
      <Tabs
        value={getTabIndex}
        onChange={(e, val) => {
          history.replace({
            pathname: listRoutes[val],
          });
        }}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab
          label={
            <Typography variant="body2">
              <FormattedMessage id="managerHotels.memberManagement" />
            </Typography>
          }
        />
        <Tab
          label={
            <Typography variant="body2">
              <FormattedMessage id="accManagement.membersGrant" />
            </Typography>
          }
        />
      </Tabs>
      <Divider />
      <Row style={{ marginTop: 10 }}>
        <Route path={ROUTES.managerUsers.member.result} component={MembersManagement} />
        <Route path={ROUTES.managerUsers.groupUsers.result} component={GroupUser} />
      </Row>
    </>
  );
};

export default AccountManagementAdmin;
