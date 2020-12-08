import { debounce } from 'lodash';
import { useSnackbar } from 'notistack';
import queryString from 'query-string';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../../../../configs/API';
import { some, SUCCESS_CODE } from '../../../../../../constants';
import { AppState } from '../../../../../../redux/reducers';
import { actionGetApprovalHotel } from '../../../../../accommodation/accommodationService';
import { snackbarSetting } from '../../../../../common/components/elements';
import LoadingIcon from '../../../../../common/components/LoadingIcon';
import { goBackAction } from '../../../../../common/redux/reducer';
import { fetchThunk } from '../../../../../common/redux/thunk';
import {
  Decentralization,
  defaultDecentralization,
  defaultUserManagementInfo,
  UserManagementInfo,
} from '../../../../ultis';
import MemberDetailDesktop from '../components/MemberDetailDesktop';

interface Props {}
const MemberDetail: React.FC<Props> = props => {
  const match: any = useRouteMatch();
  const id = match.params?.userId;
  const hotelRootId: any = match.params?.hotelId;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [listProvince, setListProvince] = React.useState([]);
  const [listOperator, setListOperator] = React.useState([]);
  const [userHotelPermission, setUserHotelPermission] = React.useState<some | undefined>(undefined);
  const [listHotel, setListHotel] = React.useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [userManagementInfo, setUserManagementInfo] = React.useState<UserManagementInfo>(
    defaultUserManagementInfo,
  );
  const [userPermission, setUserPermission] = React.useState<Decentralization>(
    defaultDecentralization,
  );
  const [loading, setLoading] = React.useState(false);
  const [loadingFirst, setLoadingFirst] = React.useState(false);

  const getAccountDetail = React.useCallback(
    async (values: string) => {
      setLoadingFirst(true);
      const json = await dispatch(fetchThunk(`${API_PATHS.accountDetail}?id=${values}`, 'get'));

      if (json?.code === SUCCESS_CODE) {
        setUserManagementInfo(json.data);
      } else {
        json.message &&
          enqueueSnackbar(
            json.message,
            snackbarSetting(key => closeSnackbar(key), {
              color: 'error',
            }),
          );
      }
      setLoadingFirst(false);
    },
    [closeSnackbar, dispatch, enqueueSnackbar],
  );

  const getAccountOperatorHotel = React.useCallback(
    async (hotelIds: number, userId: number) => {
      setLoadingFirst(true);
      const json = await dispatch(
        fetchThunk(`${API_PATHS.getOperatorUserInHotel(hotelIds, userId)}`, 'get'),
      );

      if (json?.code === SUCCESS_CODE) {
        setUserHotelPermission(json.data);
      } else {
        json.message &&
          enqueueSnackbar(
            json.message,
            snackbarSetting(key => closeSnackbar(key), {
              color: 'error',
            }),
          );
      }
      setLoadingFirst(false);
    },
    [closeSnackbar, dispatch, enqueueSnackbar],
  );

  const fetchData = React.useCallback(
    async (resultFilter: string) => {
      try {
        const params: some = {
          isApproved: true,
        };
        if (resultFilter) {
          params.term = resultFilter;
        }
        const searchStr = queryString.stringify(params);
        const dataSubmit: some = {};
        const res = await dispatch(actionGetApprovalHotel(dataSubmit, searchStr));
        if (res?.code === SUCCESS_CODE) {
          setListHotel(res?.data?.items);
        }
      } catch (error) {}
    },
    [dispatch],
  );

  const searchDebounce = React.useCallback(
    debounce(
      (value: string) => {
        if (value.length > 0) {
          fetchData(value);
        }
        if (value === '' || value.length === 0) {
          setListHotel([]);
        }
      },
      300,
      {
        trailing: true,
        leading: false,
      },
    ),
    [],
  );

  const getAccountPermissions = React.useCallback(
    async (values: string) => {
      setLoadingFirst(true);
      const json = await dispatch(fetchThunk(API_PATHS.getOrAssignAssignmentOfUser(values), 'get'));

      if (json?.code === SUCCESS_CODE) {
        setUserPermission(json.data);
      } else {
        enqueueSnackbar(
          json.message,
          snackbarSetting(key => closeSnackbar(key), {
            color: 'error',
          }),
        );
      }
      setLoadingFirst(false);
    },
    [closeSnackbar, dispatch, enqueueSnackbar],
  );

  const assignAccountPermission = React.useCallback(
    async (body: Decentralization) => {
      setLoading(true);
      const json = await dispatch(
        fetchThunk(API_PATHS.getOrAssignAssignmentOfUser(id), 'post', JSON.stringify(body)),
      );

      if (json?.code === SUCCESS_CODE) {
        enqueueSnackbar(
          json.message,
          snackbarSetting(key => closeSnackbar(key), {}),
        );
      } else {
        enqueueSnackbar(
          json.message,
          snackbarSetting(key => closeSnackbar(key), {
            color: 'error',
          }),
        );
      }
      setLoading(false);
    },
    [closeSnackbar, dispatch, enqueueSnackbar, id],
  );

  const fetchListProvince = React.useCallback(
    debounce(
      async () => {
        try {
          const json = await dispatch(fetchThunk(API_PATHS.getProvinceByCountry(1)));
          if (json?.code === SUCCESS_CODE) {
            setListProvince(listProvince.concat(json.data?.items));
          }
        } catch (error) {}
      },
      200,
      {
        trailing: true,
        leading: false,
      },
    ),
    [],
  );

  const fetchListOperator = React.useCallback(
    debounce(
      async (role: string) => {
        try {
          const json = await dispatch(fetchThunk(API_PATHS.getGroupOperator(role)));
          if (json?.code === SUCCESS_CODE) {
            setListOperator(json.data?.items);
          }
        } catch (error) {}
      },
      200,
      {
        trailing: true,
        leading: false,
      },
    ),
    [],
  );

  const changeStatusUser = React.useCallback(
    async (userId: number, status: number) => {
      const json = await dispatch(
        fetchThunk(
          `${API_PATHS.changeStatusAccount}?${queryString.stringify({ id: userId, status })}`,
          'put',
        ),
      );
      if (json?.code === SUCCESS_CODE) {
        json.message &&
          enqueueSnackbar(
            json.message,
            snackbarSetting(key => closeSnackbar(key), {}),
          );
        if (id) {
          getAccountDetail(id);
          getAccountPermissions(id);
        }
      } else {
        json.message &&
          enqueueSnackbar(
            json.message,
            snackbarSetting(key => closeSnackbar(key), {
              color: 'error',
            }),
          );
      }
    },
    [closeSnackbar, dispatch, enqueueSnackbar, getAccountDetail, getAccountPermissions, id],
  );

  const updateOperatorHotel = React.useCallback(
    async (val: some) => {
      const json = await dispatch(
        fetchThunk(
          `${API_PATHS.updateGroupUserHotel}?${queryString.stringify({
            hotelId: val.hotelId,
            groupOperatorId: val.groupOperatorId,
            userId: val.userId,
          })}`,
          'post',
        ),
      );
      if (json?.code === SUCCESS_CODE) {
        json.message &&
          enqueueSnackbar(
            json.message,
            snackbarSetting(key => closeSnackbar(key), {}),
          );
      } else {
        json.message &&
          enqueueSnackbar(
            json.message,
            snackbarSetting(key => closeSnackbar(key), {
              color: 'error',
            }),
          );
      }
    },
    [closeSnackbar, dispatch, enqueueSnackbar],
  );

  const deleteUserFromHotel = React.useCallback(
    async (hotelIds: number, userId: number) => {
      const json = await dispatch(
        fetchThunk(`${API_PATHS.deleteUserFromHotel(hotelIds, userId)}`, 'delete'),
      );
      if (json?.code === SUCCESS_CODE) {
        json.message &&
          enqueueSnackbar(
            json.message,
            snackbarSetting(key => closeSnackbar(key), {}),
          );
        dispatch(goBackAction());
      } else {
        json.message &&
          enqueueSnackbar(
            json.message,
            snackbarSetting(key => closeSnackbar(key), {
              color: 'error',
            }),
          );
      }
    },
    [closeSnackbar, dispatch, enqueueSnackbar],
  );

  React.useEffect(() => {
    if (id) {
      getAccountDetail(id);
      fetchListProvince();
      hotelRootId ? getAccountOperatorHotel(hotelRootId, id) : getAccountPermissions(id);
    } else dispatch(goBackAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelRootId, id]);

  if (loadingFirst) {
    return <LoadingIcon />;
  }
  return (
    <MemberDetailDesktop
      userManagementInfo={userManagementInfo}
      userPermission={userPermission}
      onChangeRole={values => fetchListOperator(values)}
      listOperator={listOperator}
      listProvince={listProvince}
      searchDebounce={values => searchDebounce(values)}
      listHotel={listHotel}
      assignPermission={values => assignAccountPermission(values)}
      loading={loading}
      userHotelPermission={userHotelPermission}
      changeStatusUser={(userId: number, status: number) => changeStatusUser(userId, status)}
      onDeleteUserFromHotel={(hotelId: number, userId: number) =>
        deleteUserFromHotel(hotelId, userId)
      }
      updateOperatorHotel={values => updateOperatorHotel(values)}
    />
  );
};

export default MemberDetail;
