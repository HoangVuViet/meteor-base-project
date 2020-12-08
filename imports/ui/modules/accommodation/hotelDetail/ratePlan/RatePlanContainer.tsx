import React from 'react';
import { useRouteMatch, Route, Switch, useLocation } from 'react-router';
import { Typography, Paper } from '@material-ui/core';
import 'react-circular-progressbar/dist/styles.css';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { useIntl } from 'react-intl';
import { ThunkDispatch } from 'redux-thunk';
import { Link } from 'react-router-dom';
import { AppState } from '../../../../redux/reducers';
import { Col, Row } from '../../../common/components/elements';
import './RatePlan.scss';
import { some } from '../../../../constants';
import ApprovalHeaderCommon from '../../common/ApprovalHeaderCommon';
import { RATE_PLAN_TABS, ROUTES } from '../../../../configs/routes';
import { goToAction } from '../../../common/redux/reducer';

const mapStateToProps = (state: AppState) => {
  return {
    userData: state.account.userData,
  };
};

interface Props extends ReturnType<typeof mapStateToProps> {
  dispatch: ThunkDispatch<AppState, null, Action<string>>;
}

const RatePlanContainer: React.FunctionComponent<Props> = props => {
  const { dispatch } = props;
  const intl = useIntl();
  const match: any = useRouteMatch();
  const location = useLocation();
  const getPathName = (path: string) => {
    return path.replace(':hotelId', match?.params?.hotelId);
  };

  const getPathNameReplace = (path: string, hotelId: string) => {
    return path.replace(':hotelId', hotelId).replace(':tabValue', match?.params?.tabValue);
  };

  const handleChangeHotel = (hotelId: string) => {
    dispatch(goToAction({ pathname: getPathNameReplace(match.path, hotelId) }));
    window.location.reload();
  };

  const getTitle = () => {
    if (location?.pathname === getPathName(ROUTES.managerHotels.hotelInfo.rate.plan))
      return intl.formatMessage({ id: 'IDS_HMS_RATE_PLAN' });
    if (location?.pathname === getPathName(ROUTES.managerHotels.hotelInfo.rate.price))
      return intl.formatMessage({ id: 'IDS_HMS_PRICE_AND_ROOM_EMPTY' });
    return intl.formatMessage({ id: 'IDS_HMS_HISTORY_RATE_PLAN' });
  };
  return (
    <>
      <ApprovalHeaderCommon handleChangeHotel={values => handleChangeHotel(values)} />
      <Paper variant="outlined" square className="header-tab-container">
        <Row>
          <Row className="title-header">
            <Typography gutterBottom variant="h5" component="span">
              {getTitle()}
            </Typography>
          </Row>
          <Col>
            <Row>
              {RATE_PLAN_TABS.map((v: some, i: number) => {
                const isActive = location.pathname === getPathName(v.path);
                return (
                  <Link
                    replace
                    to={{ pathname: getPathName(v.path) }}
                    key={i}
                    style={{ width: 180, whiteSpace: 'nowrap' }}
                    className={`menu-tab-item ${isActive && 'active-item'}`}
                  >
                    <Typography gutterBottom variant="body2" component="span">
                      {intl.formatMessage({ id: v.name })}
                    </Typography>
                  </Link>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Paper>
      <Switch>
        {RATE_PLAN_TABS.filter(v => v.component).map((route, index) => (
          <Route key={index} path={route.path} component={route.component} />
        ))}
      </Switch>
    </>
  );
};

export default connect(mapStateToProps)(RatePlanContainer);
