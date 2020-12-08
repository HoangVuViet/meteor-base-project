import { useSnackbar } from 'notistack';
import queryString from 'query-string';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../../../../configs/API';
import { AppState } from '../../../../../../redux/reducers';
import { snackbarSetting } from '../../../../../common/components/elements';
import { fetchThunk } from '../../../../../common/redux/thunk';
import { goToReplace } from '../../../../../common/redux/reducer';
import GroupUserDesktop from '../components/GroupUserDesktop';
import { defaultGroupUserFilter, IGroupUserFilter } from '../../../constants';

const GroupUser = () => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(undefined);
  const [filter, setFilter] = React.useState<IGroupUserFilter>(defaultGroupUserFilter);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const location = useLocation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const updateQueryParams = React.useCallback(() => {
    if (location.search) {
      const filterParams = (queryString.parse(location.search) as unknown) as IGroupUserFilter;
      setFilter({
        ...filterParams,
        pageOffset: parseInt(`${filterParams.pageOffset}`, 10),
        pageSize: parseInt(`${filterParams.pageSize}`, 10),
      });
    } else {
      dispatch(goToReplace({ search: queryString.stringify(defaultGroupUserFilter) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const fetchData = React.useCallback(
    async (params: IGroupUserFilter) => {
      setLoading(true);
      const json = await dispatch(
        fetchThunk(
          `${API_PATHS.getAllGroupUser}?${queryString.stringify({
            pageOffset: params.pageOffset,
            pageSize: params.pageSize,
          })}`,
          'post',
          JSON.stringify(params),
        ),
      );
      if (json?.data) {
        setData(json?.data);
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

  React.useEffect(() => {
    updateQueryParams();
  }, [updateQueryParams]);

  React.useEffect(() => {
    fetchData(filter);
  }, [fetchData, filter]);

  return (
    <GroupUserDesktop
      loading={loading}
      data={data}
      filter={filter}
      onUpdateFilter={values => {
        dispatch(
          goToReplace({
            search: queryString.stringify(values),
          }),
        );
      }}
    />
  );
};

export default GroupUser;
