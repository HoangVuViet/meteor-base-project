import { Button, Grid, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
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
import { actionCreateNearBy, actionGetNearBy } from '../../../accommodationService';
import CardNearBy from '../components/CardNearBy';
import { nearByData, NearByItemsProps } from '../constants';
import './NearBy.scss';

interface tempTypesProps {
  [key: string]: Array<some>;
}
const NearBy = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const match: any = useRouteMatch();
  const intl = useIntl();
  const [data, setData] = useState<Array<some> | undefined>(undefined);
  const isApproval = match?.path === ROUTES.managerHotels.hotelInfo.approvalHotel.nearBy;
  const getPathName = (path?: string) => {
    return path ? path.replace(':hotelId', match?.params?.hotelId) : undefined;
  };
  const handleDataSubmit = (values: some) => {
    const tempTypes: tempTypesProps = { SD: [], PI: [] };
    const result: some = { hotelId: match?.params?.hotelId, data: [] };
    ['SD', 'PI'].forEach((cateItem: string) => {
      nearByData[cateItem].forEach((el: NearByItemsProps) => {
        tempTypes[cateItem].push({ code: el.code, data: [] });

        const itemChildren = Object.keys(values).filter(keyElm =>
          keyElm.includes(`${el.code}_${cateItem}_`),
        );
        itemChildren.forEach(child => {
          tempTypes[cateItem].forEach((tempItem: some) => {
            if (el.code === tempItem.code) {
              result.data.push({
                id: values[`${el.code}_id_${cateItem}_${child.split('_').pop()}`],
                category: cateItem,
                types: el.code,
                name: values[child],
                distance: values[`${el.code}_distance_${cateItem}_${child.split('_').pop()}`],
              });
            }
          });
        });
      });
    });
    return result;
  };

  const fetchData = async () => {
    try {
      const res: some = await dispatch(actionGetNearBy(match?.params?.hotelId));
      if (res?.code === SUCCESS_CODE) setData(res?.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData(); // eslint-disable-next-line
  }, []);
  const nextStep = () => {
    dispatch(
      goToAction({
        pathname: isApproval
          ? getPathName(ROUTES.managerHotels.hotelInfo.approvalHotel.payment)
          : getPathName(ROUTES.managerHotels.createHotel.payment),
      }),
    );
  };
  const nearBySchema = React.useMemo(
    () =>
      yup.lazy((values: any) => {
        let result: any = {};
        const distance = Object.keys(values).filter(el => el.includes(`distance_`));
        const nameField = Object.keys(values).filter(
          el => !el.includes(`distance_`) && !el.includes(`id_`),
        );
        distance.forEach(field => {
          result = {
            ...result,
            [field]: yup
              .number()
              .nullable()
              .min(0, intl.formatMessage({ id: 'IDS_HMS_POLICY_PRICE_SETTING_ERROR' }))
              .max(10000, intl.formatMessage({ id: 'IDS_HMS_DISTANCE_VALIDATE' })),
          };
        });
        nameField.forEach(field => {
          result = {
            ...result,
            [field]: yup
              .string()
              .trim()
              .nullable()
              .max(500, intl.formatMessage({ id: 'IDS_HMS_ADDRESS_ERROR_MESSAGE' })),
          };
        });
        return yup.object().shape(result);
      }),
    [intl],
  );
  return (
    <>
      <Formik
        initialValues={{}}
        validationSchema={nearBySchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const dataPost = handleDataSubmit(values);
          const json = await dispatch(actionCreateNearBy(dataPost));
          setSubmitting(false);
          if (json?.code === SUCCESS_CODE) {
            enqueueSnackbar(
              json?.message,
              snackbarSetting(key => closeSnackbar(key), { color: 'success' }),
            );
            nextStep();
          } else {
            enqueueSnackbar(
              json?.message,
              snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
            );
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <Grid container spacing={3} style={{ paddingTop: isApproval ? 30 : 0 }}>
                <Grid item xs={isApproval ? 6 : 12}>
                  {data ? (
                    <CardNearBy
                      type="SD"
                      data={data}
                      title={intl.formatMessage({ id: 'IDS_HMS_SHOPPING_AND_EATING' })}
                    />
                  ) : (
                    <LoadingIcon />
                  )}
                </Grid>
                <Grid item xs={isApproval ? 6 : 12}>
                  {data && (
                    <CardNearBy
                      type="PI"
                      data={data}
                      title={intl.formatMessage({ id: 'IDS_HMS_ATTRACTIONS' })}
                    />
                  )}
                </Grid>
              </Grid>
              <Row style={isApproval ? { margin: 24 } : { marginTop: 24 }}>
                <LoadingButton
                  type="submit"
                  color="secondary"
                  variant="contained"
                  disableElevation
                  style={{
                    marginRight: 24,
                    minWidth: 150,
                  }}
                  loading={isSubmitting}
                >
                  <FormattedMessage id="IDS_HMS_SAVE" />
                </LoadingButton>
                <Button
                  variant="outlined"
                  disableElevation
                  style={{
                    height: 40,
                    minWidth: 150,
                    background: GREY_100,
                  }}
                  onClick={nextStep}
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

export default React.memo(NearBy);
