import React from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { URL_PATH } from './configs/routes';
import DefaultLayout from './layout/defaultLayout/DefaultLayout';
import { validateAccessToken } from './modules/auth/redux/authThunks';
import AuthProblemDialog from './modules/common/components/AuthProblemDialog';
import NetworkProblemDialog from './modules/common/components/NetworkProblemDialog';
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
      {/* <React.Suspense fallback={<LoadingIcon />}>
        <Switch location={router.location}>
          <RedirectRoute auth={auth.auth} path={ROUTES.forgotPass} component={ForgotPassword} />
          <RedirectRoute auth={auth.auth} path={ROUTES.register} component={Register} />
          <RedirectRoute auth={auth.auth} path={ROUTES.resetPassword} component={ResetPassword} />
          <RedirectRoute auth={auth.auth} path={ROUTES.login} component={Login} />
          <RedirectRoute auth={auth.auth} path={ROUTES.setPassword} component={SetPassword} />
          <RedirectRoute auth={auth.auth} path={ROUTES.landingPage} component={LandingPage} />
          <ProtectedRoute auth={auth.auth} path={URL_PATH} component={DefaultLayout} />
        </Switch>
        <ProtectedRoute auth={auth.auth} path={URL_PATH} component={DefaultLayout} />
      </React.Suspense> */}
      <Route path={URL_PATH} component={DefaultLayout} />
    </React.Fragment>
  );
};
export default App;
