import { useSnackbar } from 'notistack';
import React from 'react';
import Helmet from 'react-helmet';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../../configs/API';
import { ROUTES } from '../../../../configs/routes';
import { SUCCESS_CODE } from '../../../../constants';
import { AppState } from '../../../../redux/reducers';
import { snackbarSetting } from '../../../common/components/elements';
import { goToAction } from '../../../common/redux/reducer';
import { fetchThunk } from '../../../common/redux/thunk';
import { IChangePasswordData } from '../../redux/authThunks';
import ResetPasswordDesktop from '../components/ResetPasswordDesktop';
import ResetPasswordSuccess from '../components/ResetPasswordSuccess';

interface Props {}
const ChangePassword: React.FC<Props> = props => {
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const history = useHistory();
  const intl = useIntl();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const getToken = React.useMemo(() => {
    const search = new URLSearchParams(history.location.search);
    const token = search.get('token');
    return token;
  }, [history.location.search]);

  const onChangePassword = React.useCallback(
    async (data: IChangePasswordData) => {
      setLoading(true);
      const json = await dispatch(
        fetchThunk(
          `${API_PATHS.setPassword}`,
          'post',
          JSON.stringify({
            token: getToken,
            password: data.password,
          }),
          false,
        ),
      );
      if (json?.code === SUCCESS_CODE) {
        setSuccess(true);
      } else {
        json?.message &&
          enqueueSnackbar(
            json?.message,
            snackbarSetting(key => closeSnackbar(key), {
              color: 'error',
            }),
          );
      }
      setLoading(false);
    },
    [closeSnackbar, dispatch, enqueueSnackbar, getToken],
  );

  const verifyToken = React.useCallback(
    async (token: string) => {
      setLoading(true);
      const json = await dispatch(
        fetchThunk(`${API_PATHS.verifyEmailToken(token)}`, 'get', undefined, false),
      );
      if (json?.code === SUCCESS_CODE) {
        setLoading(false);
      } else {
        dispatch(goToAction({ pathname: ROUTES.login }));
      }
    },
    [dispatch],
  );

  React.useEffect(() => {
    if (getToken) {
      verifyToken(getToken);
    } else dispatch(goToAction({ pathname: ROUTES.login }));
  }, [getToken, verifyToken, dispatch]);

  return (
    <>
      <Helmet>
        <title>
          {intl.formatMessage({ id: !success ? 'changePassword' : 'changePasswordSuccess' })}
        </title>
      </Helmet>
      {!success ? (
        <ResetPasswordDesktop onChangePassword={onChangePassword} loading={loading} />
      ) : (
        <ResetPasswordSuccess />
      )}
    </>
  );
};

export default ChangePassword;
