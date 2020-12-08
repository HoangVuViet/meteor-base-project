import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../../../../redux/reducers';
import { snackbarSetting } from '../../../../../../common/components/elements';
import LoadingIcon from '../../../../../../common/components/LoadingIcon';
import { fetchThunk } from '../../../../../../common/redux/thunk';
import { UpdatePermissionDesktop } from '../components/UpdatePermissionDesktop';
import { API_PATHS } from '../../../../../../../configs/API';
import { SUCCESS_CODE, some } from '../../../../../../../constants';
import { ROLES } from '../../../../../../../layout/constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cover: {
      padding: 0,
    },
    paper: {
      boxShadow: 'none',
    },
    cellHeader: { padding: 0 },
  }),
);

interface Props {}

export const UpdatePermission = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [data, setData] = React.useState<some[] | undefined>(undefined);

  const fetchData = React.useCallback(
    async (code: string) => {
      const json = await dispatch(fetchThunk(API_PATHS.groupUserPermission(code), 'get'));
      if (json?.code === SUCCESS_CODE) {
        setData(json.data.permissions);
      } else {
        json?.message &&
          enqueueSnackbar(
            json?.message,
            snackbarSetting(key => closeSnackbar(key), {
              color: 'error',
            }),
          );
      }
    },
    [closeSnackbar, dispatch, enqueueSnackbar],
  );

  React.useEffect(() => {
    fetchData(ROLES.HMS_PRE_PROVIDER);
  }, [fetchData]);

  if (!data) {
    return <LoadingIcon />;
  }

  return <UpdatePermissionDesktop listRole={data} />;
};
