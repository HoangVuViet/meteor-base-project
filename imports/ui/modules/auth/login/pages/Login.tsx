import React from 'react';
import Helmet from 'react-helmet';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducers';
import { validateAccessToken } from '../../redux/authThunks';
import LoginDesktop from '../components/LoginDesktop';

interface Props {}
const Login = (props: Props) => {
  const intl = useIntl();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  React.useEffect(() => {
    dispatch(validateAccessToken());
  }, [dispatch]);
  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: 'login' })}</title>
      </Helmet>
      <LoginDesktop />;
    </>
  );
};

export default Login;
