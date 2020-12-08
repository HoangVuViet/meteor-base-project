import React from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ROUTES, URL_PATH } from './configs/routes';
import DefaultLayout from './layout/defaultLayout/DefaultLayout';
import ForgotPassword from './modules/auth/forgotPassword/pages/ForgotPassword';
import Login from './modules/auth/login/pages/Login';
import { validateAccessToken } from './modules/auth/redux/authThunks';
import Register from './modules/auth/register/pages/Register';
import ResetPassword from './modules/auth/resetPassword/pages/ResetPassword';
import SetPassword from './modules/auth/setPassword/pages/SetPassword';
import AuthProblemDialog from './modules/common/components/AuthProblemDialog';
import LoadingIcon from './modules/common/components/LoadingIcon';
import NetworkProblemDialog from './modules/common/components/NetworkProblemDialog';
import ProtectedRoute from './modules/common/components/ProtectedRoute';
import RedirectRoute from './modules/common/components/RedirectRoute';
import LandingPage from './modules/landingPage/pages/LandingPage';
import { AppState } from './redux/reducers';

function mapStateToProps(state: AppState) {
  return {
    router: state.router,
    auth: state.auth,
  };
}
interface Props extends ReturnType<typeof mapStateToProps> {}

const App: React.FC<Props> = (props) => {
  const { router, auth } = props;

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  React.useEffect(() => {
    dispatch(validateAccessToken());
  }, [dispatch]);

  return (
    <React.Fragment>
      <NetworkProblemDialog />
      <AuthProblemDialog />
      <React.Suspense fallback={<LoadingIcon />}>
        <Switch location={router.location}>
          <RedirectRoute auth={auth.auth} path={ROUTES.forgotPass} component={ForgotPassword} />
          <RedirectRoute auth={auth.auth} path={ROUTES.register} component={Register} />
          <RedirectRoute auth={auth.auth} path={ROUTES.resetPassword} component={ResetPassword} />
          <RedirectRoute auth={auth.auth} path={ROUTES.login} component={Login} />
          <RedirectRoute auth={auth.auth} path={ROUTES.setPassword} component={SetPassword} />
          <RedirectRoute auth={auth.auth} path={ROUTES.landingPage} component={LandingPage} />
          {/* <ProtectedRoute
            auth={auth.auth}
            path={ROUTES.managerHotels.result}
            component={HotelLayout}
          /> */}
          <ProtectedRoute auth={auth.auth} path={URL_PATH} component={DefaultLayout} />
        </Switch>
      </React.Suspense>
    </React.Fragment>
  );
};
export default App;
