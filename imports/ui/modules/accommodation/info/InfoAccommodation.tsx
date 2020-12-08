import { useMediaQuery, useTheme } from '@material-ui/core';
import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Route, Switch, useLocation, useRouteMatch } from 'react-router';
import { HOTEL_INFO_TABS } from '../../../configs/routes';
import { flatRoutes, getListRoutesActivate } from '../../../layout/utils';
import { AppState } from '../../../redux/reducers';
import { Col } from '../../common/components/elements';
import LoadingIcon from '../../common/components/LoadingIcon';
import DefaultAside from './DefaultAside';
import { actionsGetHotelGeneralInfo } from '../../accommodation/accommodationService';
import CalendarInfo from './CalendarInfo';

const mapStateToProps = (state: AppState) => {
  return {
    userData: state.account.userData,
    isCalendar: state.accommodation.isCalendar,
  };
};

interface Props extends ReturnType<typeof mapStateToProps> {
  // dispatch: ThunkDispatch<AppState, null, Action<string>>;
}

const InfoAccommodation: React.FunctionComponent<Props> = props => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { userData, isCalendar } = props;
  const location = useLocation();
  const [openSideBar, setOpenSideBar] = React.useState(true);
  const [isApproved, setApproved] = React.useState<boolean>(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const match: any = useRouteMatch();
  React.useEffect(() => {
    setOpenSideBar(matches);
  }, [matches]);

  const fetchData = async () => {
    try {
      const res = await dispatch(actionsGetHotelGeneralInfo(match?.params?.hotelId));
      setApproved(res?.data?.approveStatus !== 'unapproved');
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchData(); // eslint-disable-next-line
  }, []);

  const getPathName = (path: string) => {
    return path.replace(':hotelId', match?.params?.hotelId);
  };
  const listRoutes = React.useMemo(
    () =>
      HOTEL_INFO_TABS.map(v => {
        return { ...v, directPath: v.path && getPathName(v.path) };
      }),
    // eslint-disable-next-line
    [HOTEL_INFO_TABS],
  );

  const listRoutesFlat = React.useMemo(() => {
    return getListRoutesActivate(flatRoutes(listRoutes), userData?.roleGroup?.role);
  }, [listRoutes, userData]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flex: 1,
          position: 'relative',
          margin: '-16px -24px -16px -30px',
        }}
      >
        {isApproved && (
          <DefaultAside
            listRoute={listRoutes}
            open={openSideBar}
            onClose={() => {
              setOpenSideBar(!openSideBar);
            }}
          />
        )}
        <Col style={{ flex: 1 }}>
          {/* <DefaultBreadcrumbs /> */}
          <Col style={{ padding: 16, flex: 1 }}>
            <React.Suspense fallback={<LoadingIcon />}>
              <Switch location={location}>
                {listRoutesFlat.map(
                  (route, index) =>
                    route.component && (
                      <Route
                        key={index}
                        exact={route.exact}
                        path={route.path || route.directPath}
                        component={route.component}
                      />
                    ),
                )}
              </Switch>
            </React.Suspense>
          </Col>
        </Col>
        {isCalendar && <CalendarInfo />}
      </div>
    </>
  );
};

export default connect(mapStateToProps)(InfoAccommodation);
