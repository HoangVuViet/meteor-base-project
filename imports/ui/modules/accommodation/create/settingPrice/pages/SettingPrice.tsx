import { Button, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as yup from 'yup';
import { GREY_100, GREY_600 } from '../../../../../configs/colors';
import { ROUTES } from '../../../../../configs/routes';
import { some, SUCCESS_CODE } from '../../../../../constants';
import { ROLES } from '../../../../../layout/constants';
import { AppState } from '../../../../../redux/reducers';
import { ReactComponent as AddIconCircle } from '../../../../../svg/ic_add_circle.svg';
import { ReactComponent as AddIconCircleFill } from '../../../../../svg/ic_add_circle_fill.svg';
import { Row, snackbarSetting } from '../../../../common/components/elements';
import LoadingButton from '../../../../common/components/LoadingButton';
import LoadingIcon from '../../../../common/components/LoadingIcon';
import { goToAction } from '../../../../common/redux/reducer';
import {
  actionCreateRoomList,
  actionGetBedType,
  actionGetRoomClass,
  actionGetRoomList,
  actionGetRoomTypes,
  actionGetRoomView,
  actionsGetHotelGeneralInfo,
  actionsGetRateTypes,
  getFeature,
  getFeatureType,
  getInfoPhotos,
} from '../../../accommodationService';
import {
  setGeneralHotelInfo,
  setBedType,
  setFeature,
  setFeatureType,
  setInfoPhoto,
  setRateType,
  setRoomClass,
  setRoomList,
  setRoomType,
  setRoomView,
} from '../../../redux/accommodationReducer';
import { checkRole, isEmpty } from '../../../utils';
import ListCard from '../components/ListCard';
import './CreateHotelPage.scss';

interface roomProps {
  isDelete: boolean;
}
const initRoomDefault: Array<roomProps> = [{ isDelete: false }];

const SettingPrice = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const intl = useIntl();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [rooms, setRooms] = useState(initRoomDefault);
  const [loadingFirst, setLoadingFirst] = React.useState(true);
  const [isSubmit, setSubmit] = React.useState(false);

  const match: any = useRouteMatch();
  const isApproval = match?.path === ROUTES.managerHotels.hotelInfo.approvalHotel.contactInfo;
  const { roomList, photos, generalHotelInfo } = useSelector(
    (state: AppState) => state.accommodation,
    shallowEqual,
  );
  const isHotelApproved = generalHotelInfo?.approveStatus === 'approved';
  const defaultItemsPhoto = photos?.rooms.map((element: any) => {
    Object.assign(element, { ...element, items: [] });
    return element;
  });
  const { roleUser } = useSelector((state: AppState) => state.auth, shallowEqual);

  const getPathName = (path?: string) => {
    return path ? path.replace(':hotelId', match?.params?.hotelId) : undefined;
  };
  const fetchData = async () => {
    try {
      const [
        resRoomType,
        resRoomClass,
        resRoomView,
        resBedType,
        resInfoPhoto,
        resRateType,
        resRoomList,
        resFeature,
        resFeatureType,
        resGeneralInfo,
      ] = await Promise.all([
        dispatch(actionGetRoomTypes()),
        dispatch(actionGetRoomClass()),
        dispatch(actionGetRoomView()),
        dispatch(actionGetBedType()),
        dispatch(getInfoPhotos()),
        dispatch(actionsGetRateTypes()),
        dispatch(actionGetRoomList(match?.params?.hotelId)),
        dispatch(getFeature()),
        dispatch(getFeatureType()),
        dispatch(actionsGetHotelGeneralInfo(match?.params?.hotelId)),
      ]);
      dispatch(setRoomType(resRoomType?.data));
      dispatch(setRoomClass(resRoomClass?.data));
      dispatch(setRoomView(resRoomView?.data));
      dispatch(setBedType(resBedType?.data));
      dispatch(setInfoPhoto(resInfoPhoto?.data));
      dispatch(setRateType(resRateType?.data));
      dispatch(setRoomList(resRoomList?.data));
      dispatch(setFeature(resFeature?.data));
      dispatch(setFeatureType(resFeatureType?.data));
      dispatch(setGeneralHotelInfo(resGeneralInfo?.data));
    } catch (error) {
    } finally {
      setLoadingFirst(false);
    }
  };

  useEffect(() => {
    fetchData(); // eslint-disable-next-line
  }, []);

  const fillRoomList = () => {
    const fieldResult: Array<roomProps> = [];
    if (roomList?.items && roomList?.items.length > 0) {
      roomList?.items.forEach((el: some, i: number) => {
        fieldResult.push(rooms[i] || { isDelete: false });
      });
      setRooms(fieldResult);
    } else {
      setRooms(isApproval ? [] : initRoomDefault);
    }
  };
  useEffect(() => {
    fillRoomList(); // eslint-disable-next-line
  }, [roomList]);

  const getRoomBedTypes = (dataForm: any, cardIndex: number) => {
    const result: Array<any> = [];

    const roomBedTypes = Object.keys(dataForm).filter(el =>
      el.includes(`roomBedTypes_${cardIndex}_0_`),
    );
    roomBedTypes.forEach((it: any) => {
      result.push({
        id: dataForm[it],
        number: dataForm[`roomBedTypesNumber_${cardIndex}_0_${it.split('_').pop()}`],
        option: 0,
      });
    });

    const roomBedTypesInstead = Object.keys(dataForm).filter(el =>
      el.includes(`roomBedTypes_${cardIndex}_1_`),
    );

    roomBedTypesInstead.forEach((it: any) => {
      result.push({
        id: dataForm[it],
        number: dataForm[`roomBedTypesNumber_${cardIndex}_1_${it.split('_').pop()}`],
        option: 1,
      });
    });

    return result;
  };

  const handleDataSubmit = (values: any) => {
    const result: Array<any> = [];
    rooms.forEach((el: any, i: number) => {
      if (!el.isDelete) {
        result.push({
          id: values[`id_${i}`],
          name: values[`name_${i}`],
          roomTypeId: values[`roomTypeId_${i}`],
          roomClassId: values[`roomClassId_${i}`],
          totalRoom: values[`totalRoom_${i}`],
          minArea: values[`minArea_${i}`],
          standardAdult: values[`standardAdult_${i}`],
          maxChildren: values[`maxChildren_${i}`],
          price: values[`price_${i}`],
          maxExtraBed: values[`maxExtraBed_${i}`],
          allowSmoking: values[`allowSmoking_${i}`] === 'true',
          hasBathroom: values[`hasBathroom_${i}`],
          roomViewIds: values[`roomViewIds_${i}`],
          roomFeatureIds: values[`roomFeatureIds_${i}`],
          roomBedTypes: getRoomBedTypes(values, i),
          roomPhotos: values[`photoRooms_${i}`],
        });
      }
    });

    return result;
  };
  const nextStep = () => {
    dispatch(
      goToAction({
        pathname: getPathName(
          isApproval
            ? ROUTES.managerHotels.hotelInfo.approvalHotel.hotelGallery
            : ROUTES.managerHotels.createHotel.hotelGallery,
        ),
      }),
    );
  };

  const handleAdd = () => {
    setRooms([...rooms, { isDelete: false }]);
  };
  const removeRoom = (idx: number) => {
    const temp = [...rooms].map((el: roomProps, i: number) => {
      if (i === idx) return { ...el, isDelete: true };
      return el;
    });
    setRooms(temp);
  };

  const getSchema = React.useMemo(() => {
    let result: any = {};
    rooms.forEach((el: roomProps, i: number) => {
      if (!el.isDelete) {
        let validateBedType = {};
        [0, 1, 2, 3, 4].forEach(element => {
          validateBedType = {
            ...validateBedType,
            [`roomBedTypesNumber_${i}_1_${element}`]: yup
              .number()
              .nullable()
              .min(0, intl.formatMessage({ id: 'IDS_HMS_POLICY_PRICE_SETTING_ERROR' }))
              .max(100, intl.formatMessage({ id: 'IDS_HMS_BED_NUMBER_VALIDATE' })),
            [`roomBedTypesNumber_${i}_0_${element}`]: yup
              .number()
              .nullable()
              .min(0, intl.formatMessage({ id: 'IDS_HMS_POLICY_PRICE_SETTING_ERROR' }))
              .max(100, intl.formatMessage({ id: 'IDS_HMS_BED_NUMBER_VALIDATE' })),
          };
        });
        result = {
          ...result,
          [`name_${i}`]: yup.string().required(intl.formatMessage({ id: 'required' })),
          [`roomTypeId_${i}`]: yup
            .number()
            .transform(value => value || undefined)
            .required(intl.formatMessage({ id: 'required' })),
          [`roomClassId_${i}`]: yup
            .number()
            .transform(value => value || undefined)
            .required(intl.formatMessage({ id: 'required' })),
          [`roomViewIds_${i}`]: yup
            .number()
            .transform(value => value || undefined)
            .required(intl.formatMessage({ id: 'required' })),
          [`standardAdult_${i}`]: yup
            .number()
            .nullable()
            .min(0, intl.formatMessage({ id: 'IDS_HMS_POLICY_PRICE_SETTING_ERROR' }))
            .max(100, intl.formatMessage({ id: 'IDS_HMS_STANDARD_ADULT_NUMBER_VALIDATE' }))
            .required(intl.formatMessage({ id: 'required' })),
          [`maxExtraBed_${i}`]: yup
            .number()
            .nullable()
            .min(0, intl.formatMessage({ id: 'IDS_HMS_POLICY_PRICE_SETTING_ERROR' }))
            .max(100, intl.formatMessage({ id: 'IDS_HMS_EXTRA_BED_VALIDATE' }))
            .required(intl.formatMessage({ id: 'required' })),

          [`roomBedTypes_${i}_1_0`]: yup.number().required(intl.formatMessage({ id: 'required' })),
          [`roomBedTypesNumber_${i}_1_0`]: yup
            .number()
            .required(intl.formatMessage({ id: 'required' })),
          [`minArea_${i}`]: yup
            .number()
            .min(0, intl.formatMessage({ id: 'IDS_HMS_POLICY_PRICE_SETTING_ERROR' }))
            .max(10000, intl.formatMessage({ id: 'IDS_HMS_AREA_MAX_VALIDATE' }))
            .required(intl.formatMessage({ id: 'required' })),
          [`maxChildren_${i}`]: yup
            .number()
            .nullable()
            .min(0, intl.formatMessage({ id: 'IDS_HMS_POLICY_PRICE_SETTING_ERROR' }))
            .max(100, intl.formatMessage({ id: 'IDS_HMS_MAX_CHILDREN_VALIDATE' }))
            .when(`hasChildren_${i}`, (hasChildren: any, schema: any) => {
              return schema.test({
                name: `maxChildren_${i}`,
                test: (maxChildren: number) => {
                  return !(hasChildren && isEmpty(maxChildren));
                },
                message: intl.formatMessage({ id: 'required' }),
              });
            }),
          [`totalRoom_${i}`]: yup
            .number()
            .min(0, intl.formatMessage({ id: 'IDS_HMS_POLICY_PRICE_SETTING_ERROR' }))
            .max(1000, intl.formatMessage({ id: 'IDS_HMS_TOTAL_ROOM_VALIDATE' }))
            .required(intl.formatMessage({ id: 'required' })),
          [`roomFeatureIds_${i}`]: yup.array().required(intl.formatMessage({ id: 'required' })),
          ...validateBedType,
        };
        if (
          checkRole(ROLES.HMS_PRE_PROVIDER, roleUser) &&
          !checkRole(ROLES.HMS_PRE_ADMIN, roleUser) &&
          !isHotelApproved
        ) {
          result = {
            ...result,
            [`price_${i}`]: yup
              .number()
              .nullable()
              .min(0, intl.formatMessage({ id: 'IDS_HMS_POLICY_PRICE_SETTING_ERROR' }))
              .max(1000000000, intl.formatMessage({ id: 'IDS_HMS_PRICE_VALIDATE' }))
              .required(intl.formatMessage({ id: 'required' })),
          };
        }
      }
    });
    return result;
  }, [intl, isHotelApproved, roleUser, rooms]);
  const roomSchema = React.useMemo(() => {
    return yup.object().shape(getSchema);
  }, [getSchema]);

  const handleSubmit = async (values: some) => {
    setSubmit(true);
    const dataPost = handleDataSubmit(values);
    const dataInfo: some = { edit: [], create: [], delete: [] };
    dataPost.forEach((it: some) => {
      if (it.id) dataInfo.edit.push(it);
      else dataInfo.create.push(it);
    });
    roomList?.items.forEach((it: some) => {
      if (!dataPost.some((v: any) => v?.id === it?.id)) dataInfo.delete.push(it?.id);
    });
    let res: any = {};
    if (dataInfo.create.length > 0) {
      const json = await dispatch(
        actionCreateRoomList(match?.params?.hotelId, 'post', dataInfo.create),
      );
      res = { ...json };
    }
    if (dataInfo.edit.length > 0) {
      const json = await dispatch(
        actionCreateRoomList(match?.params?.hotelId, 'put', dataInfo.edit),
      );
      res = { ...json };
    }
    if (dataInfo.delete.length > 0) {
      const json = await dispatch(
        actionCreateRoomList(match?.params?.hotelId, 'delete', dataInfo.delete),
      );
      res = { ...json };
    }
    setSubmit(false);
    if (res?.code === SUCCESS_CODE) {
      enqueueSnackbar(
        res?.message,
        snackbarSetting(key => closeSnackbar(key), { color: 'success' }),
      );
      nextStep();
    } else {
      enqueueSnackbar(
        res?.message,
        snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
      );
    }
  };

  if (loadingFirst) {
    return <LoadingIcon />;
  }
  let initValue = {};
  if (!isEmpty(roomList?.items)) {
    roomList?.items.forEach((data: any, index: number) => {
      initValue = {
        ...initValue,
        [`id_${index}`]: data?.id,
        [`name_${index}`]: data?.name,
        [`roomTypeId_${index}`]: data?.roomTypeId,
        [`roomClassId_${index}`]: data?.roomClassId,
        [`totalRoom_${index}`]: data?.totalRoom,
        [`minArea_${index}`]: data?.minArea,
        [`standardAdult_${index}`]: data?.standardAdult,
        [`maxChildren_${index}`]: data?.maxChildren,
        [`price_${index}`]: data?.price,
        [`maxExtraBed_${index}`]: `${data?.maxExtraBed}`,
        [`allowSmoking_${index}`]: data?.allowSmoking ? 'true' : 'false',
        [`hasBathroom_${index}`]: !!data?.hasBathroom,
        [`hasChildren_${index}`]: !!data?.maxChildren,
        [`roomViewIds_${index}`]: data?.roomViewIds,
        [`roomFeatureIds_${index}`]: data?.roomFeatureIds,
        [`photoRooms_${index}`]: data?.roomPhotos,
      };
      (data?.roomBedTypes || [])
        .filter((it: some) => it.option === 1)
        .forEach((v: some, i: number) => {
          initValue = {
            ...initValue,
            [`roomBedTypes_${index}_${v.option}_${i}`]: v?.id,
            [`roomBedTypesNumber_${index}_${v.option}_${i}`]: v?.number,
          };
        });
      (data?.roomBedTypes || [])
        .filter((it: some) => it.option === 0)
        .forEach((v: some, i: number) => {
          initValue = {
            ...initValue,
            [`roomBedTypes_${index}_${v.option}_${i}`]: v?.id,
            [`roomBedTypesNumber_${index}_${v.option}_${i}`]: v?.number,
          };
        });
    });
  }

  return (
    <>
      <Formik
        initialValues={{
          hasBathroom_0: true,
          hasChildren_0: true,
          photoRooms_0: JSON.parse(JSON.stringify(defaultItemsPhoto)),
          ...initValue,
        }}
        validationSchema={roomSchema}
        onSubmit={(values, { setSubmitting }) => {}}
      >
        {({ values, setValues, validateForm }) => {
          const addRoom = () => {
            setValues({
              ...values,
              [`hasBathroom_${rooms.length}`]: true,
              [`hasChildren_${rooms.length}`]: true,
              [`photoRooms_${rooms.length}`]: JSON.parse(JSON.stringify(defaultItemsPhoto)),
            });
            handleAdd();
          };
          return (
            <Form>
              {isApproval && (
                <Row className="approval-header" style={{ padding: '16px 30px' }}>
                  <Typography variant="h6" component="p" style={{ width: '100%' }}>
                    <FormattedMessage id="IDS_HMS_ROOM_LIST" />
                  </Typography>
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    disableElevation
                    style={{ width: 250 }}
                    onClick={addRoom}
                  >
                    <AddIconCircleFill style={{ marginRight: 8 }} />
                    <FormattedMessage id="IDS_HMS_CREATE_NEW_ROOM_TYPE" />
                  </Button>
                </Row>
              )}
              <ListCard removeRoom={removeRoom} copyRoom={handleAdd} rooms={rooms} />
              {!isApproval && (
                <Row className="add-container" onClick={addRoom}>
                  <AddIconCircle />
                  <Typography gutterBottom variant="body2" component="p">
                    <FormattedMessage id="IDS_HMS_CREATE_NEW_ROOM_TYPE" />
                  </Typography>
                </Row>
              )}
              <Row style={isApproval ? { margin: '0 30px 24px 30px' } : { marginTop: 24 }}>
                <LoadingButton
                  type="submit"
                  color="secondary"
                  variant="contained"
                  disableElevation
                  style={{
                    marginRight: 24,
                    minWidth: 150,
                  }}
                  loading={isSubmit}
                  onClick={() => {
                    validateForm().then(errors => {
                      if (Object.keys(errors).length > 0) {
                        enqueueSnackbar(
                          intl.formatMessage({ id: 'IDS_HMS_VALIDATE_FORM_ERROR' }),
                          snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
                        );
                      } else {
                        handleSubmit(values);
                      }
                    });
                  }}
                >
                  <FormattedMessage id="IDS_HMS_SAVE" />
                </LoadingButton>
                <Button
                  variant="outlined"
                  disableElevation
                  onClick={nextStep}
                  style={{
                    height: 40,
                    minWidth: 150,
                    background: GREY_100,
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    style={{
                      marginTop: 5,
                      textAlign: 'center',
                      color: GREY_600,
                    }}
                  >
                    <FormattedMessage id="IDS_HMS_REJECT" />
                  </Typography>
                </Button>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default React.memo(SettingPrice);
