import {
  Checkbox,
  Divider,
  FormControlLabel,
  Paper,
  Radio,
  Typography,
  ButtonBase,
} from '@material-ui/core';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import { Rating } from '@material-ui/lab';
import { FormikErrors, useFormik } from 'formik';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as yup from 'yup';
import { BLACK, GREY_100, GREY_600, RED, TEAL, BLUE, WHITE } from '../../../../../configs/colors';
import { ROUTES } from '../../../../../configs/routes';
import { some, SUCCESS_CODE } from '../../../../../constants';
import { DATE_FORMAT_BACK_END, YEAR_FORMAT } from '../../../../../models/moment';
import { validNumberRegex } from '../../../../../models/regex';
import { AppState } from '../../../../../redux/reducers';
import BirthDayField from '../../../../common/components/BirthDayField';
import BoxUpload from '../../../../common/components/BoxUpload';
import DateRangeFormControl from '../../../../common/components/DateRangeFormControl';
import {
  Col,
  Row,
  snackbarSetting,
  YearMaskCustomSingle,
} from '../../../../common/components/elements';
import { NumberFormatCustom, redMark } from '../../../../common/components/Form';
import FormControlAutoComplete from '../../../../common/components/FormControlAutoComplete';
import FormControlTextField from '../../../../common/components/FormControlTextField';
import Link from '../../../../common/components/Link';
import LoadingButton from '../../../../common/components/LoadingButton';
import LoadingIcon from '../../../../common/components/LoadingIcon';
import SelectTimeCheck from '../../../../common/components/SelectTimeCheck';
import { uploadImage } from '../../../../common/redux/reducer';
import { fakeLocation, listContactButton } from '../constants';
import {
  defaultCreateHotelGeneralInfo,
  defaultHotelContact,
  HotelContacts,
  ICreateHotelGeneralInfo,
  listLanguage,
} from '../utils';
import HotelContactCard from './HotelContactCard';
import { ReactComponent as InfoIcon } from '../../../../../svg/ic_info.svg';
import SimilarHotelDialog from './SimilarHotelDialog';
import { ROLES } from '../../../../../layout/constants';

interface Props {
  provinceList: some[];
  fetchDistrict: (values: number) => void;
  districtList: some[];
  streetList: some[];
  fetchStreet: (provinceId: number, districtId: number) => void;
  loading: boolean;
  loadingFirst: boolean;
  data: ICreateHotelGeneralInfo;
  onRegisterGeneralInfoHotel: (values: ICreateHotelGeneralInfo) => void;
  getSimilarHotel: (name: string, provinceId: number, districtId: number) => void;
  similarHotels: some[];
  reload: () => void;
}
const GeneralInfoDesktop: React.FC<Props> = props => {
  const {
    provinceList,
    districtList,
    fetchDistrict,
    loading,
    onRegisterGeneralInfoHotel,
    data,
    loadingFirst,
    getSimilarHotel,
    similarHotels,
    fetchStreet,
    streetList,
    reload,
  } = props;
  const [logoLoading, setLogoLoading] = React.useState(false);
  const [openCms, setOpenCms] = React.useState(false);
  const [openRepairDate, setOpenRepairTime] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [openDialog, setOpenDialog] = React.useState(false);
  const intl = useIntl();
  const match: any = useRouteMatch();
  const approving = match?.path === ROUTES.managerHotels.hotelInfo.approvalHotel.generalInfo;
  const userRole = useSelector((state: AppState) => state.auth.roleUser);
  const isAdminRole = !!userRole?.find(v => v.name === ROLES.HMS_PRE_ADMIN);
  const isApproved = data?.approveStatus === 'approved';
  const schemaValidate = yup.object().shape({
    name: yup
      .string()
      .trim()
      .nullable()
      .required(intl.formatMessage({ id: 'required' })),
    logo: yup
      .string()
      .trim()
      .nullable()
      .required(intl.formatMessage({ id: 'required' })),
    starRating: yup
      .number()
      .min(1, intl.formatMessage({ id: 'required' }))
      .nullable()
      .required(intl.formatMessage({ id: 'required' })),
    numberOfRoom: yup
      .number()
      .nullable()
      .max(10000, intl.formatMessage({ id: 'required' })),
    checkInFrom: yup
      .string()
      .nullable()
      .required(intl.formatMessage({ id: 'required' })),
    checkInTo: yup
      .string()
      .nullable()
      .required(intl.formatMessage({ id: 'required' })),
    checkOutFrom: yup
      .string()
      .nullable()
      .required(intl.formatMessage({ id: 'required' })),
    checkOutTo: yup
      .string()
      .nullable()
      .required(intl.formatMessage({ id: 'required' })),
    countryId: yup
      .number()
      .nullable()
      .required(intl.formatMessage({ id: 'required' })),
    provinceId: yup
      .number()
      .nullable()
      .required(intl.formatMessage({ id: 'required' })),
    districtId: yup
      .number()
      .nullable()
      .required(intl.formatMessage({ id: 'required' })),
    streetId: yup
      .string()
      .trim()
      .nullable()
      .required(intl.formatMessage({ id: 'required' })),
    established: yup.number().nullable(),
    recentRepair: yup
      .number()
      .nullable()
      .when('established', (established: number, schema: any) => {
        return schema.test({
          name: 'recentRepair',
          test: (recentRepair: number) => {
            return recentRepair ? established && established <= recentRepair : true;
          },
          message: established ? intl.formatMessage({ id: 'recentRepairInvalid' }) : null,
        });
      }),
    houseNumber: yup
      .string()
      .trim()
      .nullable()
      .required(intl.formatMessage({ id: 'required' })),
    description: yup
      .string()
      .trim()
      .nullable()
      .required(intl.formatMessage({ id: 'required' })),
    hotelContacts: yup.array().of(
      yup.object().shape({
        name: yup
          .string()
          .trim()
          .nullable()
          .required(intl.formatMessage({ id: 'required' })),
        email: yup
          .string()
          .email(intl.formatMessage({ id: 'emailInvalid' }))
          .trim()
          .nullable()
          .required(intl.formatMessage({ id: 'required' })),
        phone: yup
          .number()
          .nullable()
          .required(intl.formatMessage({ id: 'required' })),
      }),
    ),
  });
  const formik = useFormik({
    initialValues: data,
    onSubmit: values => {
      onRegisterGeneralInfoHotel(values as ICreateHotelGeneralInfo);
    },
    validationSchema: schemaValidate,
  });
  const getPathName = (path?: string) => {
    return path ? path.replace(':hotelId', match?.params?.hotelId) : undefined;
  };

  const uploadPhoto = React.useCallback(
    async (files: File[]) => {
      setLogoLoading(true);
      if (files.length === 0) {
        enqueueSnackbar(
          intl.formatMessage({ id: 'avatarSizeInvalid' }),
          snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
        );
      } else {
        const json = await dispatch(uploadImage(files));
        if (json?.code === SUCCESS_CODE) {
          formik.setFieldValue('logo', json.photo?.thumbLink);
        } else {
          json?.message &&
            enqueueSnackbar(
              json?.message,
              snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
            );
        }
      }
      setLogoLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );

  const handleData = React.useCallback(() => {
    if (data?.hotelContacts.length === 0) {
      formik.setValues({ ...data, hotelContacts: [{ ...defaultHotelContact, type: 'PRIMARY' }] });
    } else formik.setValues(data);
    if (data?.cms) {
      setOpenCms(true);
    }
    if (data?.recentRepair) {
      setOpenRepairTime(true);
    }
    if (!data?.checkInFrom) {
      formik.setFieldValue('checkInFrom', defaultCreateHotelGeneralInfo.checkInFrom);
    }
    if (!data?.checkInTo) {
      formik.setFieldValue('checkInTo', defaultCreateHotelGeneralInfo.checkInTo);
    }
    if (!data?.checkOutFrom) {
      formik.setFieldValue('checkOutFrom', defaultCreateHotelGeneralInfo.checkOutFrom);
    }
    if (!data?.checkOutTo) {
      formik.setFieldValue('checkOutTo', defaultCreateHotelGeneralInfo.checkOutTo);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const handleSubmit = () => {
    if (Object.keys(formik.errors).length > 0) {
      enqueueSnackbar(
        intl.formatMessage({ id: 'IDS_HMS_DATA_INPUT_ERROR' }),
        snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
      );
    }
  };

  const handleGetSimilarHotel = React.useCallback(() => {
    if (formik.values.name && formik.values.provinceId && formik.values.districtId && !approving) {
      getSimilarHotel(formik.values.name, formik.values.provinceId, formik.values.districtId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.districtId, formik.values.name, formik.values.provinceId]);

  React.useEffect(() => {
    formik.values.provinceId && fetchDistrict(formik.values.provinceId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.provinceId]);

  React.useEffect(() => {
    if (formik.values.provinceId && formik.values.districtId) {
      fetchStreet(formik.values.provinceId, formik.values.districtId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.districtId]);

  React.useEffect(() => {
    handleData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  React.useEffect(() => {
    handleGetSimilarHotel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.provinceId, formik.values.districtId]);

  if (loadingFirst) {
    return <LoadingIcon />;
  }
  return (
    <form onSubmit={formik.handleSubmit}>
      <Col style={{ padding: approving ? 30 : 0 }}>
        <FormControlLabel
          style={{ marginBottom: 16 }}
          control={
            <Checkbox
              checked={formik.values.potential}
              color="primary"
              style={{ padding: 0, marginRight: 6 }}
              onChange={() => {
                formik.setFieldValue('potential', !formik.values.potential);
              }}
            />
          }
          label={
            <Typography variant="body2">
              <FormattedMessage id="IDS_HMS_HOTEL_POTENTIAL" />
            </Typography>
          }
        />
        {(isAdminRole || !isApproved) && (
          <>
            <Row style={{ alignItems: 'flex-start' }}>
              <Col style={{ flex: 2, marginRight: 30 }}>
                <FormControlTextField
                  id="name"
                  label={<FormattedMessage id="IDS_HMS_ACCOMMODATION_NAME" />}
                  placeholder={intl.formatMessage({ id: 'IDS_HMS_ACCOMMODATION_NAME' })}
                  value={formik.values.name || ''}
                  formControlStyle={{ minWidth: 590, marginRight: 0 }}
                  onChange={formik.handleChange}
                  inputProps={{ maxLength: 250 }}
                  errorMessage={
                    formik.errors.name && formik.submitCount > 0 ? formik.errors.name : undefined
                  }
                  onBlur={e => handleGetSimilarHotel()}
                />

                <Row>
                  {similarHotels?.length > 0 && formik.values.name && formik.values.districtId ? (
                    <ButtonBase onClick={() => setOpenDialog(true)} disableRipple>
                      <Row style={{ alignItems: 'center' }}>
                        <InfoIcon
                          className="svgFillAll"
                          style={{ fill: BLUE, stroke: WHITE, marginRight: 6 }}
                        />
                        <Typography variant="body2" style={{ color: BLUE }}>
                          <FormattedMessage id="IDS_HMS_HOTEL_SIMILAR_PREVIEW" />
                        </Typography>
                      </Row>
                    </ButtonBase>
                  ) : (
                    <></>
                  )}
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Typography
                    variant="body2"
                    style={{
                      marginRight: 16,
                    }}
                  >
                    <FormattedMessage id="starRating" />
                    &nbsp;{redMark}
                  </Typography>
                  <Rating
                    name="starRating"
                    value={formik.values.starRating || 0}
                    precision={1}
                    onChange={(e: any, values: number | null) => {
                      formik.setFieldValue('starRating', values || 0);
                    }}
                    icon={<StarRoundedIcon />}
                  />
                </Row>
                <Typography
                  variant="body2"
                  style={{
                    color: formik.submitCount > 0 && formik.errors.starRating ? RED : BLACK,
                  }}
                >
                  {formik.errors.starRating && formik.submitCount > 0
                    ? formik.errors.starRating
                    : undefined}
                </Typography>
              </Col>
              <Row style={{ alignItems: 'flex-start', flex: 1 }}>
                <BoxUpload
                  label="avatar"
                  imageUrl={formik.values.logo || ''}
                  onDrop={files => uploadPhoto(files)}
                  loading={logoLoading}
                  errorMessage={
                    formik.errors.logo && formik.submitCount > 0 ? formik.errors.logo : undefined
                  }
                  required
                />
                <Col style={{ marginTop: 20, marginLeft: 12 }}>
                  <Typography variant="body2" color="textSecondary">
                    <FormattedMessage id="IDS_HMS_HOTEL_LOGO_SIZE_TEXT1" />
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <FormattedMessage id="IDS_HMS_HOTEL_LOGO_SIZE_TEXT2" />
                  </Typography>
                </Col>
              </Row>
            </Row>
          </>
        )}

        <Row style={{ marginTop: 30, alignItems: 'flex-start' }}>
          <Row style={{ flex: 2, marginRight: 30 }}>
            <Col style={{ minWidth: 280, marginRight: 30, flex: 1 }}>
              <Typography
                variant="body2"
                style={{
                  marginBottom: 4,
                  color:
                    (formik.errors.checkInFrom || formik.errors.checkInTo) && formik.submitCount > 0
                      ? RED
                      : BLACK,
                }}
              >
                <FormattedMessage id="IDS_HMS_CHECKIN_TIME" />
                &nbsp;{redMark}
              </Typography>
              <Row style={{ alignItems: 'flex-start', flex: 1 }}>
                <div style={{ flex: 1 }}>
                  <SelectTimeCheck
                    time={formik.values.checkInFrom || ''}
                    onChangeTime={values => formik.setFieldValue('checkInFrom', values)}
                  />
                </div>
                <Typography variant="body2" style={{ margin: 12 }}>
                  <FormattedMessage id="to" />
                </Typography>
                <div style={{ flex: 1 }}>
                  <SelectTimeCheck
                    time={formik.values.checkInTo || ''}
                    onChangeTime={values => formik.setFieldValue('checkInTo', values)}
                  />
                </div>
              </Row>
              <Typography variant="body2" style={{ color: RED, marginTop: -20 }}>
                {(formik.errors.checkInFrom || formik.errors.checkInTo) && formik.submitCount > 0
                  ? formik.errors.checkInFrom || formik.errors.checkInTo
                  : undefined}
              </Typography>
            </Col>
            <Col style={{ minWidth: 280, flex: 1 }}>
              <Typography
                variant="body2"
                style={{
                  marginBottom: 4,
                  color:
                    (formik.errors.checkOutFrom || formik.errors.checkOutTo) &&
                    formik.submitCount > 0
                      ? RED
                      : BLACK,
                }}
              >
                <FormattedMessage id="IDS_HMS_CHECKOUT_TIME" />
                &nbsp;{redMark}
              </Typography>
              <Row style={{ alignItems: 'flex-start', flex: 1 }}>
                <div style={{ flex: 1 }}>
                  <SelectTimeCheck
                    time={formik.values.checkOutFrom || ''}
                    onChangeTime={values => formik.setFieldValue('checkOutFrom', values)}
                  />
                </div>
                <Typography variant="body2" style={{ margin: 12 }}>
                  <FormattedMessage id="to" />
                </Typography>
                <div style={{ flex: 1 }}>
                  <SelectTimeCheck
                    time={formik.values.checkOutTo || ''}
                    onChangeTime={values => formik.setFieldValue('checkOutTo', values)}
                  />
                </div>
              </Row>
              <Typography variant="body2" style={{ color: RED, marginTop: -20 }}>
                {(formik.errors.checkOutFrom || formik.errors.checkOutTo) && formik.submitCount > 0
                  ? formik.errors.checkOutFrom || formik.errors.checkOutTo
                  : undefined}
              </Typography>
            </Col>
          </Row>
          <div style={{ flex: 1, minWidth: 264 }}>
            <FormControlTextField
              name="numberOfRoom"
              formControlStyle={{ marginRight: 0 }}
              label={<FormattedMessage id="IDS_HMS_HOTEL_NUMBER_OF_ROOM" />}
              placeholder={intl.formatMessage({ id: 'IDS_HMS_HOTEL_NUMBER_OF_ROOM' })}
              value={formik.values.numberOfRoom || ''}
              onChange={e =>
                validNumberRegex.test(e.target.value) &&
                (parseInt(e.target.value, 10) > 10000
                  ? formik.setFieldValue('numberOfRoom', 10000)
                  : formik.setFieldValue('numberOfRoom', e.target.value))
              }
              inputComponent={NumberFormatCustom as any}
              inputProps={{
                maxLength: 7,
              }}
              optional
            />
          </div>
        </Row>
        <Row style={{ flex: 1 }}>
          <Col style={{ flex: 2, marginRight: 30 }}>
            <Row style={{ flex: 1 }}>
              <FormControlAutoComplete
                label={<FormattedMessage id="IDS_HMS_HOTEL_COUNTRY" />}
                placeholder={intl.formatMessage({ id: 'choose' })}
                formControlStyle={{ minWidth: 270, marginRight: 30, flex: 1 }}
                style={{ minWidth: 270 }}
                value={fakeLocation.find(v => v.id === formik.values.countryId) || null}
                options={fakeLocation}
                // disabled
                onChange={(e: any, value: some | null) => {
                  formik.setFieldValue('countryId', value?.id, true);
                  formik.setFieldValue('provinceId', null);
                  formik.setFieldValue('districtId', null);
                  formik.setFieldValue('streetId', null);
                }}
                getOptionLabel={value => value.name}
                errorMessage={
                  formik.errors.countryId && formik.submitCount > 0
                    ? formik.errors.countryId
                    : undefined
                }
              />
              <FormControlAutoComplete
                label={<FormattedMessage id="IDS_HMS_HOTEL_PROVINCE" />}
                placeholder={intl.formatMessage({ id: 'choose' })}
                formControlStyle={{ minWidth: 270, marginRight: 0, flex: 1 }}
                style={{ minWidth: 270 }}
                disabled={!formik.values.countryId}
                value={provinceList.find(v => v.id === formik.values.provinceId) || null}
                options={provinceList}
                onChange={(e: any, value: some | null) => {
                  formik.setFieldValue('provinceId', value?.id, true);
                  formik.setFieldValue('districtId', null);
                  formik.setFieldValue('streetId', null);
                }}
                getOptionLabel={value => value.name}
                errorMessage={
                  formik.errors.provinceId && formik.submitCount > 0
                    ? formik.errors.provinceId
                    : undefined
                }
              />
            </Row>
            <Row style={{ flex: 1 }}>
              <FormControlAutoComplete
                label={<FormattedMessage id="IDS_HMS_HOTEL_DISTRICT" />}
                placeholder={intl.formatMessage({ id: 'choose' })}
                formControlStyle={{ minWidth: 270, flex: 1, marginRight: 30 }}
                disabled={!formik.values.countryId || !formik.values.provinceId}
                value={districtList.find(v => v.id === formik.values.districtId) || null}
                options={districtList}
                onChange={(e: any, value: some | null) => {
                  formik.setFieldValue('districtId', value?.id, true);
                  formik.setFieldValue('streetId', null);
                }}
                getOptionLabel={value => value.name}
                errorMessage={
                  formik.errors.districtId && formik.submitCount > 0
                    ? formik.errors.districtId
                    : undefined
                }
                onBlur={e => handleGetSimilarHotel()}
              />
              <FormControlAutoComplete
                label={<FormattedMessage id="IDS_HMS_HOTEL_STREET" />}
                placeholder={intl.formatMessage({ id: 'choose' })}
                formControlStyle={{ minWidth: 200, flex: 1, marginRight: 0 }}
                disabled={!formik.values.countryId || !formik.values.districtId}
                value={streetList.find(v => v.id === formik.values.streetId) || null}
                options={streetList}
                onChange={(e: any, value: some | null) =>
                  formik.setFieldValue('streetId', value?.id, true)
                }
                getOptionLabel={value => value.name}
                errorMessage={
                  formik.errors.streetId && formik.submitCount > 0
                    ? formik.errors.streetId
                    : undefined
                }
              />
            </Row>
            <FormControlTextField
              id="houseNumber"
              formControlStyle={{ flex: 1 }}
              label={<FormattedMessage id="addressNumber" />}
              placeholder={intl.formatMessage({ id: 'addressNumber' })}
              value={formik.values.houseNumber || ''}
              onChange={formik.handleChange}
              inputProps={{
                maxLength: 1000,
              }}
              errorMessage={
                formik.errors.houseNumber && formik.submitCount > 0
                  ? formik.errors.houseNumber
                  : undefined
              }
            />
            <FormControlTextField
              id="description"
              formControlStyle={{ flex: 1 }}
              label={<FormattedMessage id="IDS_HMS_HOTEL_ACCOMMODATION_INTRODUCE" />}
              placeholder={intl.formatMessage({ id: 'enterContent' })}
              value={formik.values.description || ''}
              onChange={formik.handleChange}
              inputProps={{
                maxLength: 5000,
              }}
              multiline
              rows={15}
              errorMessage={
                formik.errors.description && formik.submitCount > 0
                  ? formik.errors.description
                  : undefined
              }
            />
            <Row style={{ alignItems: 'flex-start' }}>
              <Typography variant="body2" style={{ lineHeight: '32px', marginRight: 26 }}>
                <FormattedMessage id="IDS_HMS_HOTEL_CMS_CONTENT" />
              </Typography>
              <Col>
                <Row style={{ margin: '0px 10px' }}>
                  <FormControlLabel
                    control={
                      <Radio
                        checked={openCms}
                        style={{ padding: 2 }}
                        onChange={() => {
                          setOpenCms(true);
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2">
                        <FormattedMessage id="yes" />
                      </Typography>
                    }
                    style={{ marginRight: 62 }}
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        checked={!openCms}
                        style={{ padding: 2 }}
                        onChange={() => {
                          setOpenCms(false);
                          formik.setFieldValue('cms', '');
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2">
                        <FormattedMessage id="no" />
                      </Typography>
                    }
                  />
                </Row>
                {openCms && (
                  <FormControlTextField
                    id="cms"
                    placeholder={intl.formatMessage({ id: 'IDS_HMS_HOTEL_CMS_PLACE_HOLDER' })}
                    value={formik.values.cms || ''}
                    onChange={formik.handleChange}
                    formControlStyle={{ width: 300, marginTop: 18 }}
                    inputProps={{
                      maxLength: 1000,
                    }}
                    optional
                  />
                )}
              </Col>
            </Row>
          </Col>
          <div style={{ flex: 1, minWidth: 264 }} />
        </Row>
        <Divider style={{ margin: '28px 0px 16px 0px' }} />
        <Typography variant="subtitle1" style={{ color: TEAL }}>
          <FormattedMessage id="IDS_HMS_HOTEL_OTHER_UTILITIES" />
        </Typography>
        <Row style={{ marginTop: 18, flex: 1 }}>
          <FormControlTextField
            name="numberOfFloor"
            label={<FormattedMessage id="IDS_HMS_HOTEL_NUMBER_OF_FLOOR" />}
            placeholder={intl.formatMessage({ id: 'IDS_HMS_HOTEL_NUMBER_OF_FLOOR' })}
            value={formik.values.numberOfFloor || ''}
            onChange={e =>
              validNumberRegex.test(e.target.value) &&
              (parseInt(e.target.value, 10) > 1000
                ? formik.setFieldValue('numberOfFloor', 1000)
                : formik.setFieldValue('numberOfFloor', e.target.value))
            }
            formControlStyle={{ minWidth: 270 }}
            inputProps={{
              maxLength: 4,
            }}
            inputComponent={NumberFormatCustom as any}
            optional
          />
          <FormControlTextField
            name="numberOfRestaurant"
            label={<FormattedMessage id="IDS_HMS_HOTEL_NUMBER_OF_RESTAURANT" />}
            placeholder={intl.formatMessage({ id: 'IDS_HMS_HOTEL_NUMBER_OF_RESTAURANT' })}
            value={formik.values.numberOfRestaurant || ''}
            onChange={e =>
              validNumberRegex.test(e.target.value) &&
              (parseInt(e.target.value, 10) > 1000
                ? formik.setFieldValue('numberOfRestaurant', 1000)
                : formik.setFieldValue('numberOfRestaurant', e.target.value))
            }
            formControlStyle={{ minWidth: 270 }}
            inputProps={{
              maxLength: 4,
            }}
            inputComponent={NumberFormatCustom as any}
            optional
          />
          <FormControlTextField
            name="numberOfBar"
            label={<FormattedMessage id="IDS_HMS_HOTEL_NUMBER_OF_BAR" />}
            placeholder={intl.formatMessage({ id: 'IDS_HMS_HOTEL_NUMBER_OF_BAR' })}
            value={formik.values.numberOfBar || ''}
            onChange={e =>
              validNumberRegex.test(e.target.value) &&
              (parseInt(e.target.value, 10) > 1000
                ? formik.setFieldValue('numberOfBar', 1000)
                : formik.setFieldValue('numberOfBar', e.target.value))
            }
            formControlStyle={{ minWidth: 270 }}
            inputProps={{
              maxLength: 4,
            }}
            inputComponent={NumberFormatCustom as any}
            optional
          />
        </Row>
        <Row style={{ flex: 1 }}>
          <BirthDayField
            id="established"
            label={intl.formatMessage({ id: 'IDS_HMS_HOTEL_ESTABLISHED' })}
            date={
              formik.values.established ? moment(formik.values.established, YEAR_FORMAT) : undefined
            }
            placeholder="----"
            disableFuture
            update={val => formik.setFieldValue('established', val?.format(YEAR_FORMAT))}
            yearOnly
            inputProps={YearMaskCustomSingle as any}
            style={{ minWidth: 270, flex: 1, marginRight: 30 }}
            inputStyle={{ minWidth: 270 }}
            noEndAdorn
            errorMessage={
              formik.errors.established && formik.submitCount > 0
                ? formik.errors.established
                : undefined
            }
            optional
          />
          <BirthDayField
            id="recentRepair"
            disableFuture
            label={intl.formatMessage({ id: 'IDS_HMS_HOTEL_RECENT_REPAIR' })}
            date={
              formik.values.recentRepair
                ? moment(formik.values.recentRepair, YEAR_FORMAT)
                : undefined
            }
            placeholder="----"
            style={{ minWidth: 270, marginRight: 30, flex: 1 }}
            inputStyle={{ minWidth: 270 }}
            update={val => formik.setFieldValue('recentRepair', val?.format(YEAR_FORMAT))}
            yearOnly
            inputProps={YearMaskCustomSingle as any}
            noEndAdorn
            optional
            errorMessage={formik.errors.recentRepair ? formik.errors.recentRepair : undefined}
          />
          <div style={{ flex: 1, minWidth: 270, marginRight: 30 }} />
        </Row>
        <Col style={{ marginBottom: 20, flex: 1 }}>
          <FormControlLabel
            style={{ margin: 0 }}
            control={
              <Checkbox
                checked={openRepairDate}
                color="primary"
                style={{ padding: 2 }}
                onChange={() => {
                  if (openRepairDate) {
                    formik.setFieldValue('repairFrom', '');
                    formik.setFieldValue('repairTo', '');
                  }
                  setOpenRepairTime(!openRepairDate);
                }}
              />
            }
            label={
              <Typography variant="body2">
                <FormattedMessage id="IDS_HMS_HOTEL_FIXED_IN" />
              </Typography>
            }
          />

          {openRepairDate && (
            <Row style={{ flex: 1 }}>
              <Col style={{ flex: 2 }}>
                <DateRangeFormControl
                  style={{ marginRight: 10 }}
                  numberOfMonths={2}
                  optional
                  startDate={
                    formik.values.repairFrom &&
                    moment(formik.values.repairFrom, DATE_FORMAT_BACK_END, true).isValid()
                      ? moment(formik.values.repairFrom, DATE_FORMAT_BACK_END, true)
                      : undefined
                  }
                  endDate={
                    formik.values.repairTo &&
                    moment(formik.values.repairTo, DATE_FORMAT_BACK_END, true).isValid()
                      ? moment(formik.values.repairTo, DATE_FORMAT_BACK_END, true)
                      : undefined
                  }
                  onChange={(startDate, endDate) => {
                    formik.setFieldValue(
                      'repairFrom',
                      startDate?.format(DATE_FORMAT_BACK_END),
                      true,
                    );
                    formik.setFieldValue(
                      'repairTo',
                      startDate && !endDate
                        ? moment().format(DATE_FORMAT_BACK_END)
                        : endDate?.format(DATE_FORMAT_BACK_END),
                      true,
                    );
                  }}
                  isOutsideRange={(e: any) => false}
                />
                <Typography variant="body2" style={{ marginTop: -20, color: RED }}>
                  <FormattedMessage id="IDS_HMS_HOTEL_CLOSED_IN_THIS_TIME" />
                </Typography>
              </Col>
              <div style={{ flex: 1, marginRight: 30 }} />
            </Row>
          )}
        </Col>
        <Row>
          <Typography variant="body2" style={{ marginRight: 42 }}>
            <FormattedMessage id="supportedLanguage" />
          </Typography>
          {listLanguage.map((v: some, index: number) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={formik.values.supportLanguages.includes(v.id) || v.id === 'vi'}
                  style={{ padding: 2 }}
                  color="primary"
                  onChange={() => {
                    v.id !== 'vi' &&
                      (formik.values.supportLanguages.includes(v.id)
                        ? formik.setFieldValue(
                            'supportLanguages',
                            formik.values.supportLanguages.filter(one => one !== v.id),
                          )
                        : formik.setFieldValue(
                            'supportLanguages',
                            formik.values.supportLanguages.concat(v.id),
                          ));
                  }}
                />
              }
              label={
                <Typography variant="body2">
                  <FormattedMessage id={v.name} />
                </Typography>
              }
              labelPlacement="end"
            />
          ))}
        </Row>
        <Row style={{ marginTop: 24, flexWrap: 'wrap' }}>
          {formik.values.hotelContacts.map((v: HotelContacts, index: number) => (
            <HotelContactCard
              key={index}
              style={{ marginBottom: 24 }}
              info={v}
              submitCount={formik.submitCount}
              errorsObject={
                (formik.errors.hotelContacts?.[index] as FormikErrors<HotelContacts>)
                  ? (formik.errors.hotelContacts?.[index] as FormikErrors<HotelContacts>)
                  : undefined
              }
              onChangeInfo={values =>
                formik.setFieldValue('hotelContacts', [
                  ...formik.values.hotelContacts.slice(0, index),
                  values,
                  ...formik.values.hotelContacts.slice(
                    index + 1,
                    formik.values.hotelContacts.length,
                  ),
                ])
              }
              onClose={
                v.type === 'PRIMARY'
                  ? undefined
                  : () =>
                      formik.setFieldValue('hotelContacts', [
                        ...formik.values.hotelContacts.slice(0, index),
                        ...formik.values.hotelContacts.slice(
                          index + 1,
                          formik.values.hotelContacts.length,
                        ),
                      ])
              }
            />
          ))}
          {formik.values.hotelContacts.length < 4 && (
            <Paper style={{ borderRadius: 8, height: 550, width: 322, marginBottom: 24 }}>
              <Col style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Typography variant="subtitle1" style={{ marginBottom: 16 }}>
                  <FormattedMessage id="IDS_HMS_HOTEL_ADD_CONTACT" />
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ textAlign: 'center', whiteSpace: 'break-spaces', marginBottom: 24 }}
                >
                  <FormattedMessage id="IDS_HMS_HOTEL_ADD_CONTACT_NOTE" />
                </Typography>
                {listContactButton.map((v: some, index: number) => (
                  <LoadingButton
                    key={index}
                    style={{ minHeight: 40, minWidth: 250, marginBottom: 12 }}
                    variant="outlined"
                    color="secondary"
                    disableElevation
                    onClick={() =>
                      formik.setFieldValue(
                        'hotelContacts',
                        formik.values.hotelContacts.concat({ ...defaultHotelContact, type: v.id }),
                      )
                    }
                  >
                    <FormattedMessage id={v.name} />
                  </LoadingButton>
                ))}
              </Col>
            </Paper>
          )}
        </Row>
        <Row>
          <LoadingButton
            color="secondary"
            type="submit"
            onClick={() => {
              handleSubmit();
            }}
            style={{
              marginRight: 24,
              minWidth: 150,
              height: 40,
              marginTop: 12,
            }}
            variant="contained"
            loading={loading}
            disableElevation
          >
            <FormattedMessage id="IDS_HMS_SAVE" />
          </LoadingButton>
          <Link
            replace
            to={{
              pathname:
                getPathName(
                  approving
                    ? ROUTES.managerHotels.hotelInfo.approvalHotel.facility
                    : ROUTES.managerHotels.createHotel.facility,
                ) || undefined,
            }}
          >
            <LoadingButton
              variant="outlined"
              style={{
                height: 40,
                marginTop: 12,
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
            </LoadingButton>
          </Link>
        </Row>
      </Col>
      <SimilarHotelDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        hotelData={similarHotels}
        hotelId={data?.id}
        onGetSimilarSuccess={() => reload()}
      />
    </form>
  );
};

export default GeneralInfoDesktop;
