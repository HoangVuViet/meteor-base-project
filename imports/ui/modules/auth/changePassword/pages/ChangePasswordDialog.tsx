import { Dialog } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../../configs/API';
import { SUCCESS_CODE } from '../../../../constants';
import { AppState } from '../../../../redux/reducers';
import { snackbarSetting } from '../../../common/components/elements';
import { fetchThunk } from '../../../common/redux/thunk';
import { IChangePasswordForm } from '../../redux/authThunks';
import ChangePasswordForm from '../components/ChangePasswordForm';

interface Props {
  open: boolean;
  setOpen(data: boolean): void;
}
const ChangePasswordDialog = (props: Props) => {
  const { setOpen, open } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onChangePassword = React.useCallback(
    async (values: IChangePasswordForm) => {
      setLoading(true);
      const json = await dispatch(
        fetchThunk(
          API_PATHS.changePassword,
          'post',
          JSON.stringify({
            oldPassword: values.currentPassword,
            newPassword: values.newPassword,
          }),
        ),
      );
      if (json?.code === SUCCESS_CODE) {
        json?.message &&
          enqueueSnackbar(
            json?.message,
            snackbarSetting(key => closeSnackbar(key)),
          );
        setOpen(false);
      } else {
        json?.message &&
          enqueueSnackbar(
            json?.message,
            snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
          );
      }
      setLoading(false);
    },
    [closeSnackbar, dispatch, enqueueSnackbar, setOpen],
  );

  return (
    <Dialog open={open}>
      <ChangePasswordForm loading={loading} setOpen={setOpen} onChangePassword={onChangePassword} />
    </Dialog>
  );
};

export default ChangePasswordDialog;
