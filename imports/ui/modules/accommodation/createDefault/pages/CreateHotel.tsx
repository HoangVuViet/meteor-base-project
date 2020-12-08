import React, { useState, useEffect, Fragment } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { FormattedMessage } from 'react-intl';
import { useDispatch, connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action, Dispatch } from 'redux';
import CreateHotelCard from '../components/CreateHotelCard';
import { ReactComponent as BackIcon } from '../../../../svg/ic_back.svg';
import './Hotel.scss';
import { goToAction } from '../../../common/redux/reducer';
import { AppState } from '../../../../redux/reducers';
import { ROUTES } from '../../../../configs/routes';
import LoadingIcon from '../../../common/components/LoadingIcon';
import { actionGetHotelCategories, actionCreateHotel } from '../../accommodationService';
import { some, SUCCESS_CODE } from '../../../../constants';
import { snackbarSetting } from '../../../common/components/elements';

function mapStateToProps(state: AppState) {
  return {
    locale: state.intl.locale,
  };
}
interface Props extends ReturnType<typeof mapStateToProps> {
  dispatch: Dispatch;
}

const CreateHotel: React.FC<Props> = props => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [contents, setContents] = useState<Array<some>>([]);
  const handleBack = () => {
    // dispatch(goToAction({ pathname: ROUTES.managerHotels.results.pending }));
    window.history.back();
  };
  const getHotelCategories = async () => {
    try {
      setLoading(true);
      const { data } = await dispatch(actionGetHotelCategories(props.locale));
      setContents(data.items);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getHotelCategories(); // eslint-disable-next-line
  }, []);
  const openCreate = async (categoryId: number, subCategoryId: number) => {
    setLoading(true);
    const json = await dispatch(actionCreateHotel({ categoryId, subCategoryId }));
    setLoading(false);
    if (json?.code === SUCCESS_CODE) {
      dispatch(
        goToAction({
          pathname: ROUTES.managerHotels.createHotel.generalInfo.replace(':hotelId', json?.data),
        }),
      );
    } else {
      enqueueSnackbar(
        json?.message,
        snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
      );
    }
  };

  return (
    <>
      {loading ? (
        <LoadingIcon />
      ) : (
        <div className="hotel-wrapper">
          <div className="back-header-container">
            <BackIcon onClick={handleBack} />
            <Typography variant="body2" component="p" className="home-text">
              <FormattedMessage id="IDS_HMS_HOME" />
            </Typography>
          </div>
          <Typography variant="h5" component="p" className="create-hotel-header">
            <FormattedMessage id="IDS_HMS_HOTEL_SELECT_TYPE" />
          </Typography>

          {contents.map((elm: any) => (
            <Fragment key={elm?.id}>
              {elm?.active ? (
                <>
                  <Typography variant="h6" component="p" className="create-hotel-title">
                    {elm?.name}
                  </Typography>
                  <Grid container style={{ margin: '0 -16px 32px -16px' }}>
                    {elm?.subCategories.map((el: some) => (
                      <Fragment key={el?.id}>
                        {el?.active ? (
                          <Grid item xs={3} key={el.id}>
                            <CreateHotelCard
                              item={el}
                              disable={elm?.id !== 1}
                              openCreate={() => openCreate(elm.id, el.id)}
                            />
                          </Grid>
                        ) : null}
                      </Fragment>
                    ))}
                  </Grid>
                </>
              ) : null}
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
};

export default connect(mapStateToProps)(CreateHotel);
