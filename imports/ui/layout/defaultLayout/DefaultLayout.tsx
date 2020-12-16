import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { GREY_100 } from '../../configs/colors';
import { ROUTES, ROUTES_TAB } from '../../configs/routes';
import { getRoleUser } from '../../modules/auth/redux/authThunks';
import { Col, PageWrapper } from '../../modules/common/components/elements';
import LoadingIcon from '../../modules/common/components/LoadingIcon';
import { AppState } from '../../redux/reducers';
import { flatRoutes, getListRoutesActivate } from '../utils';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import DefaultHelmet from './DefaultHelmet';

const mapStateToProps = (state: AppState) => {
  return {
    userData: state.account.userData,
    roleUser: state.auth.roleUser,
  };
};

interface Props extends ReturnType<typeof mapStateToProps> {
  dispatch: ThunkDispatch<AppState, null, Action<string>>;
}

const DefaultLayout: React.FunctionComponent<Props> = (props: Props) => {
  const { userData } = props;
  const location = useLocation();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const listRoutes = React.useMemo(() => {
    return getListRoutesActivate(flatRoutes(ROUTES_TAB), userData?.roleGroup?.role);
  }, [userData]);

  useEffect(() => {
    dispatch(getRoleUser());
  }, [dispatch]);

  return (
    <>
      <PageWrapper style={{ background: GREY_100 }}>
        <DefaultHelmet />
        <DefaultHeader />
        <Col
          style={{
            padding: '16px 24px',
            flex: 1,
            paddingLeft: 30,
          }}
        >
          <React.Suspense fallback={<LoadingIcon />}>
            <Switch location={location}>
              {listRoutes
                .filter((v: any) => v.component)
                .map((route: any, index: any) => (
                  <Route
                    key={index}
                    exact={route.exact}
                    path={route.path}
                    component={route.component}
                  />
                ))}
              <Redirect to={ROUTES.notFound} />
            </Switch>
          </React.Suspense>
        </Col>
        <DefaultFooter />
      </PageWrapper>
    </>
  );
};

export default connect(mapStateToProps)(DefaultLayout);
