import { AppBar, ButtonBase } from '@material-ui/core';
import * as React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { GREY_300, PRIMARY } from '../../configs/colors';
import { ROUTES } from '../../configs/routes';
import Badge from '../../modules/account/component/Badge';
import { Row } from '../../modules/common/components/elements';
import { goToAction } from '../../modules/common/redux/reducer';
import { AppState } from '../../redux/reducers';
import { HEADER_HEIGHT } from '../constants';

const mapStateToProps = (state: AppState) => {
  return { router: state.router };
};
interface Props extends ReturnType<typeof mapStateToProps> {
  dispatch: ThunkDispatch<AppState, null, Action<string>>;
  noSticky?: boolean;
}

const DefaultHeader: React.FunctionComponent<Props> = (props) => {
  const { noSticky, dispatch } = props;
  return (
    <AppBar
      position={noSticky ? 'relative' : 'sticky'}
      style={{
        height: HEADER_HEIGHT,
        backgroundColor: PRIMARY,
        boxShadow: 'none',
        borderRadius: 0,
        borderBottom: `1px solid ${GREY_300}`,
        zIndex: 1000,
      }}
    >
      <Row style={{ height: '100%', padding: '0px 16px 0px 30px' }}>
        <ButtonBase
          disableTouchRipple
          onClick={() => dispatch(goToAction({ pathname: ROUTES.homeDashboard }))}
        >
          <img src="../../../../public/svg/ic_myTourWhiteLogo.svg"></img>
        </ButtonBase>
        <Row
          style={{
            marginLeft: '24px',
            transition: 'width 0.3s',
            justifyContent: 'center',
          }}
        />
        <Row style={{ flex: 1, justifyContent: 'flex-end', marginRight: 24 }}>
          <Badge />
        </Row>
      </Row>
    </AppBar>
  );
};

export default connect(mapStateToProps)(DefaultHeader);
