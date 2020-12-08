import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch, connect, shallowEqual, useSelector } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { Typography, Divider } from '@material-ui/core';
import { ReactComponent as BackIcon } from '../../../svg/ic_back.svg';
import { AppState } from '../../../redux/reducers';
import { ROUTES } from '../../../configs/routes';
import { goToAction } from '../../common/redux/reducer';
import { ROLES } from '../../../layout/constants';
import { checkRole } from '../utils';

function mapStateToProps(state: AppState) {
  return {
    locale: state.intl.locale,
  };
}
interface Props extends ReturnType<typeof mapStateToProps> {
  dispatch: Dispatch;
}

const CreateHeader: React.FC<Props> = props => {
  const roleUser: any = useSelector((state: AppState) => state.auth.roleUser, shallowEqual);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const handleBack = () => {
    if (checkRole(ROLES.HMS_PRE_PROVIDER, roleUser)) {
      dispatch(goToAction({ pathname: '/' }));
    } else {
      dispatch(goToAction({ pathname: ROUTES.managerHotels.results.pending }));
    }
  };
  return (
    <div className="hotel-wrapper">
      <div className="back-header-container">
        <BackIcon onClick={handleBack} />
        <Typography variant="body2" component="p" className="home-text">
          <FormattedMessage id="IDS_HMS_HOME" />
        </Typography>
      </div>
      <Typography variant="h5" component="p" className="create-hotel-header header-divider">
        <FormattedMessage id="IDS_HMS_CREATE_NEW" />
      </Typography>
      <Divider />
    </div>
  );
};

export default connect(mapStateToProps)(CreateHeader);
