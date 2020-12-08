import { Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as yup from 'yup';
import { GREY_100, GREY_600 } from '../../../../../configs/colors';
import { ROUTES } from '../../../../../configs/routes';
import { some, SUCCESS_CODE } from '../../../../../constants';
import { AppState } from '../../../../../redux/reducers';
import { Row, snackbarSetting } from '../../../../common/components/elements';
import LoadingButton from '../../../../common/components/LoadingButton';
import LoadingIcon from '../../../../common/components/LoadingIcon';
import { goToAction } from '../../../../common/redux/reducer';
import {
  actionsCreateAmenities,
  getAmenitieDetail,
  getInfoAmenities,
} from '../../../accommodationService';
import CreateFacilityForm from '../components/CreateFacilityForm';
import { FEE_ARR } from '../utils';

const Facility: React.FC = props => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [data, setData] = React.useState<some | undefined>();
  const [amenityData, setAmenityData] = React.useState<some[]>([]);
  const intl = useIntl();
  const match: any = useRouteMatch();
  const isApproval = match?.path === ROUTES.managerHotels.hotelInfo.approvalHotel.facility;
  const getPathName = (path?: string) => {
    return path ? path.replace(':hotelId', match?.params?.hotelId) : undefined;
  };
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleDataSubmit = (values: some) => {
    const result: Array<some> = [];
    amenityData.forEach((el: some, i: number) => {
      result.push({
        id: el?.id,
        pricePerHour: values[`pricePerHour_${el?.id}`],
      });
    });
    return {
      amenities: [...result],
    };
  };

  const createInitialValue = (arr: Array<number>) => {
    let result: some = {};
    arr.forEach((el: number) => {
      result = {
        ...result,
        [`isFree_${el}`]: 'false',
      };
    });
    return result;
  };

  const fetchData = async () => {
    try {
      const [listAmenities, amenityDetail] = await Promise.all([
        dispatch(getInfoAmenities()),
        dispatch(getAmenitieDetail(match?.params?.hotelId)),
      ]);
      setData(listAmenities?.data);
      setAmenityData(amenityDetail?.data?.items);
    } catch (error) {}
  };

  const getSchema = React.useMemo(() => {
    let result: some = {};
    amenityData.forEach((el: some, i: number) => {
      result = {
        ...result,
        [`pricePerHour_${el.id}`]: yup
          .number()
          .nullable()
          .when(`isFree_${el.id}`, {
            is: value => value === 'true',
            then: yup
              .number()
              .nullable()
              .min(0, intl.formatMessage({ id: 'IDS_HMS_POLICY_PRICE_SETTING_ERROR' }))
              .required(intl.formatMessage({ id: 'required' })),
          }),
      };
    });
    return result;
  }, [amenityData, intl]);

  const DisplayingErrorMessagesSchema = React.useMemo(() => {
    return yup.object().shape(getSchema);
  }, [getSchema]);

  const goNextAction = () =>
    dispatch(
      goToAction({
        pathname: getPathName(
          isApproval
            ? ROUTES.managerHotels.hotelInfo.approvalHotel.contactInfo
            : ROUTES.managerHotels.createHotel.contactInfo,
        ),
      }),
    );

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Formik
        initialValues={createInitialValue(FEE_ARR)}
        validationSchema={DisplayingErrorMessagesSchema}
        validate={values => {
          const errors: any = {};
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const dataPost = handleDataSubmit(values);
          const json = await dispatch(actionsCreateAmenities(match?.params?.hotelId, dataPost));
          setSubmitting(false);
          if (json?.code === SUCCESS_CODE) {
            enqueueSnackbar(
              json?.message,
              snackbarSetting(key => closeSnackbar(key), { color: 'success' }),
            );
            goNextAction();
          } else {
            enqueueSnackbar(
              json?.message,
              snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
            );
          }
        }}
      >
        {({ resetForm, values, isSubmitting }) => (
          <Form style={{ padding: isApproval ? 30 : 0 }}>
            {data ? (
              <CreateFacilityForm
                data={data}
                amenityData={amenityData}
                setAmenityData={setAmenityData}
                values={values}
              />
            ) : (
              <LoadingIcon />
            )}
            <Row>
              <LoadingButton
                type="submit"
                color="secondary"
                variant="contained"
                disableElevation
                style={{ marginRight: 24, minWidth: 150, height: 40 }}
                loading={isSubmitting}
              >
                <FormattedMessage id="IDS_HMS_SAVE" />
              </LoadingButton>
              <LoadingButton
                variant="outlined"
                style={{
                  height: 40,
                  minWidth: 150,
                  background: GREY_100,
                }}
                disableElevation
                onClick={() => goNextAction()}
                loading={isSubmitting}
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
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default Facility;
