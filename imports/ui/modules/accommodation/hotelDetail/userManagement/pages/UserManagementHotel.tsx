import { Tab, Tabs, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Route, useHistory, useLocation, useRouteMatch } from 'react-router';
import { ROUTES } from '../../../../../configs/routes';
import NotSupported from '../../../../../NotSupported';
import MembersManagement from '../../../../accountManagement/components/membersManagement/results/pages/MembersManagement';
import { Col, Row } from '../../../../common/components/elements';
import { GREY_400 } from '../../../../../configs/colors';

const UserManagementHotel = () => {
  const history = useHistory();
  const location = useLocation();
  const match: any = useRouteMatch();
  const listRoutes = [
    ROUTES.managerHotels.hotelInfo.memberManagement.listMember.result,
    ROUTES.managerHotels.hotelInfo.memberManagement.history,
  ];
  const hotelId = match.params?.hotelId;

  const getTabIndex = React.useMemo(() => {
    let tabIndex = 0;
    listRoutes.forEach((value: string, index: number) => {
      if (value.replace(':hotelId', hotelId) === location.pathname) {
        tabIndex = index;
      }
    });
    return tabIndex;
  }, [hotelId, listRoutes, location.pathname]);

  return (
    <Col>
      <Row style={{ borderBottom: `1px solid ${GREY_400}`, justifyContent: 'space-between' }}>
        <Typography variant="h5">
          <FormattedMessage id="IDS_HMS_HOTEL_USER_MANAGEMENT" />
        </Typography>
        <Tabs
          value={getTabIndex}
          onChange={(e, val) => {
            history.replace({ pathname: listRoutes[val].replace(':hotelId', hotelId) });
          }}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            label={
              <Typography variant="body2">
                <FormattedMessage id="IDS_HMS_MEMBER_LIST" />
              </Typography>
            }
          />
          <Tab
            label={
              <Typography variant="body2">
                <FormattedMessage id="IDS_HMS_MEMBER_HISTORY" />
              </Typography>
            }
          />
        </Tabs>
      </Row>

      <Col style={{ marginTop: 32 }}>
        <Route
          path={ROUTES.managerHotels.hotelInfo.memberManagement.listMember.result}
          component={MembersManagement}
        />
        <Route
          path={ROUTES.managerHotels.hotelInfo.memberManagement.history}
          component={NotSupported}
        />
      </Col>
    </Col>
  );
};

export default UserManagementHotel;
