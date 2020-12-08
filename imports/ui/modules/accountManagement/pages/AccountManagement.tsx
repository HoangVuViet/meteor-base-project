import { Divider, Tab, Tabs, Typography } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Route, RouteComponentProps, useHistory, useLocation } from 'react-router';
import SwipeableViews from 'react-swipeable-views';
import { ROUTES } from '../../../configs/routes';
import GeneralInfo from '../components/generalInfo/pages/GeneralInfo';

interface Props extends RouteComponentProps<{ tabIndex: string }> {}

const AccountManagement = (props: Props) => {
  // const { tabIndex } = match.path;

  const history = useHistory();
  const location = useLocation();
  const listRoutes = [
    ROUTES.accountInfo.generalInfo,
    // ROUTES.accountInfo.hotelInfo,
    // ROUTES.accountInfo.memberManagement,
    // ROUTES.accountInfo.groupUsers.result,
  ];

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
              <FormattedMessage id="accManagement.generalInfo" />
            </Typography>
          }
        />
        {/* <Tab
          label={
            <Typography variant="body2">
              <FormattedMessage id="accManagement.hotelInfo" />
            </Typography>
          }
        />
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
        /> */}
      </Tabs>
      <Divider />
      <SwipeableViews index={getTabIndex} style={{ marginTop: 16, overflow: 'hidden' }}>
        <Route path={ROUTES.accountInfo.generalInfo} component={GeneralInfo} />
        {/* <Route path={ROUTES.accountInfo.hotelInfo} component={HotelInfo} />
        <Route path={ROUTES.accountInfo.memberManagement} component={MembersManagement} />
        <Route path={ROUTES.accountInfo.groupUsers.result} component={GroupUser} /> */}
      </SwipeableViews>
    </>
  );
};

export default AccountManagement;
