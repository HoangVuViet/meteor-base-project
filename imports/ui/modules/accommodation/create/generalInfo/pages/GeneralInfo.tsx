import { debounce } from 'lodash';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../../../configs/API';
import { ROUTES } from '../../../../../configs/routes';
import { some, SUCCESS_CODE } from '../../../../../constants';
import { AppState } from '../../../../../redux/reducers';
import { snackbarSetting } from '../../../../common/components/elements';
import { goToAction } from '../../../../common/redux/reducer';
import { fetchThunk } from '../../../../common/redux/thunk';
import { actionGetHotelName } from '../../../accommodationService';
import GeneralInfoDesktop from '../components/GeneralInfoDesktop';
import { defaultCreateHotelGeneralInfo, ICreateHotelGeneralInfo } from '../utils';

const GeneralInfo = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = React.useState(false);
  const [province, setProvince] = React.useState<some | undefined>();
  const [district, setDistrict] = React.useState<some | undefined>();
  const [street, setStreet] = React.useState<some | undefined>();
  const [defaultGeneralInfo, setDefaultGeneralInfo] = React.useState<ICreateHotelGeneralInfo>(
    defaultCreateHotelGeneralInfo,
  );
  const [similarHotels, setSimilarHotels] = React.useState<some | undefined>();
  const [loadingFirst, setLoadingFirst] = React.useState(true);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const match: any = useRouteMatch();
  const isApproval = match?.path === ROUTES.managerHotels.hotelInfo.approvalHotel.generalInfo;
  const getPathName = (path?: string) => {
    return path ? path.replace(':hotelId', match?.params?.hotelId) : undefined;
  };

  const fetchProvince = React.useCallback(async () => {
    setLoadingFirst(true);
    const json = await dispatch(fetchThunk(API_PATHS.getProvinceByCountry(1), 'get'));
    if (json.code === SUCCESS_CODE) {
      setProvince(json.data);
    }
    if (json.code !== SUCCESS_CODE) {
      enqueueSnackbar(
        json?.message,
        snackbarSetting(key => closeSnackbar(key)),
      );
    }
    setLoadingFirst(false);
  }, [closeSnackbar, dispatch, enqueueSnackbar]);

  const fetchDistrict = React.useCallback(
    async (provinceId: number) => {
      setLoading(true);
      const json = await dispatch(fetchThunk(API_PATHS.getDistrictByProvince(provinceId), 'get'));
      if (json.code === SUCCESS_CODE) {
        setDistrict(json.data);
      }
      setLoading(false);
      if (json.code !== SUCCESS_CODE) {
        enqueueSnackbar(
          json?.message,
          snackbarSetting(key => closeSnackbar(key)),
        );
      }
    },
    [closeSnackbar, dispatch, enqueueSnackbar],
  );

  const fetchStreet = React.useCallback(
    async (provinceId: number, districtId: number) => {
      setLoading(true);
      const json = await dispatch(
        fetchThunk(API_PATHS.getStreetByProvinceAndDistrict(provinceId, districtId), 'get'),
      );
      if (json.code === SUCCESS_CODE) {
        setStreet(json.data);
      } else {
        enqueueSnackbar(
          json?.message,
          snackbarSetting(key => closeSnackbar(key)),
        );
      }
      setLoading(false);
    },
    [closeSnackbar, dispatch, enqueueSnackbar],
  );

  const getSimilarHotel = React.useCallback(
    async (hotelName: string, provinceId: number, districtId: number) => {
      setLoading(true);
      setSimilarHotels([]);
      const json = await dispatch(actionGetHotelName(hotelName, provinceId, districtId));
      if (json?.code === SUCCESS_CODE) {
        setSimilarHotels(json.data);
      } else setSimilarHotels([]);
      setLoading(false);
    },
    [dispatch],
  );

  const getDetailGeneralInfo = React.useCallback(
    debounce(
      async () => {
        setLoadingFirst(true);
        const json = await dispatch(
          fetchThunk(`${API_PATHS.getGeneralInfo(match?.params?.hotelId)}`, 'get'),
        );
        if (json.code === SUCCESS_CODE) {
          setDefaultGeneralInfo(json?.data);
        } else {
          enqueueSnackbar(
            json?.message,
            snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
          );
        }
        setLoadingFirst(false);
      },
      200,
      {
        trailing: true,
        leading: false,
      },
    ),
    [],
  );
  const RegisterGeneralInfo = React.useCallback(
    debounce(
      async (value: ICreateHotelGeneralInfo) => {
        setLoading(true);
        const json = await dispatch(
          fetchThunk(
            `${API_PATHS.registerGeneralInfo}?hotelId=${match?.params?.hotelId}`,
            'post',
            JSON.stringify({
              ...value,
              countryId: value.countryId,
              provinceId: value.provinceId,
              districtId: value.districtId,
            }),
          ),
        );
        if (json.code === SUCCESS_CODE) {
          dispatch(
            goToAction({
              pathname: isApproval
                ? getPathName(ROUTES.managerHotels.hotelInfo.approvalHotel.facility)
                : getPathName(ROUTES.managerHotels.createHotel.facility),
            }),
          );
          enqueueSnackbar(
            json?.message,
            snackbarSetting(key => closeSnackbar(key)),
          );
        } else {
          enqueueSnackbar(
            json?.message,
            snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
          );
        }
        setLoading(false);
      },
      200,
      {
        trailing: true,
        leading: false,
      },
    ),
    [],
  );

  React.useEffect(() => {
    fetchProvince();
  }, [fetchProvince]);

  React.useEffect(() => {
    getDetailGeneralInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GeneralInfoDesktop
      data={defaultGeneralInfo}
      provinceList={province?.items || []}
      fetchDistrict={val => fetchDistrict(val)}
      fetchStreet={(provinceId: number, districtId: number) => fetchStreet(provinceId, districtId)}
      streetList={street?.items || []}
      districtList={district?.items || []}
      loading={loading}
      loadingFirst={loadingFirst}
      onRegisterGeneralInfoHotel={val => RegisterGeneralInfo(val)}
      getSimilarHotel={(name: string, provinceId: number, districtId: number) =>
        getSimilarHotel(name, provinceId, districtId)
      }
      reload={() => getDetailGeneralInfo()}
      similarHotels={similarHotels?.items || []}
    />
  );
};

export default GeneralInfo;
