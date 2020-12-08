import { useSnackbar } from 'notistack';
import React, { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../../configs/API';
import { SUCCESS_CODE } from '../../../../constants';
import { AppState } from '../../../../redux/reducers';
import { snackbarSetting } from '../../../common/components/elements';
import { fetchThunk } from '../../../common/redux/thunk';
import { IRegisterData } from '../../redux/authThunks';
import RegisterDesktop from '../components/RegisterDesktop';
import RegisterSuccess from '../components/RegisterSuccess';

// eslint-disable-next-line react/require-default-props
const mapStateToProps = (state: AppState) => ({ validatingToken: state.auth.validatingToken });

interface Props extends ReturnType<typeof mapStateToProps> {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: ThunkDispatch<AppState, null, Action<string>>;
}

const Register: React.FC<Props> = props => {
  const { dispatch } = props;
  const intl = useIntl();
  const { validatingToken } = props;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onRegister = useCallback(
    async (data: IRegisterData) => {
      setLoading(true);
      const json = await dispatch(
        fetchThunk(`${API_PATHS.register}`, 'post', JSON.stringify(data), false),
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
    [closeSnackbar, dispatch, enqueueSnackbar],
  );

  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: !success ? 'register' : 'auth.registerSuccess' })}</title>
      </Helmet>
      {!success ? (
        <RegisterDesktop loading={loading || validatingToken} onRegister={onRegister} />
      ) : (
        <RegisterSuccess />
      )}
    </>
  );
};

export default connect(mapStateToProps)(Register);
