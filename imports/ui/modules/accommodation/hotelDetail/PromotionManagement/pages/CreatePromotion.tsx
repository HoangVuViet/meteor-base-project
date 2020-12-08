import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Action, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { BLUE_800 } from '../../../../../configs/colors';
import { ROUTES } from '../../../../../configs/routes';
import { AppState } from '../../../../../redux/reducers';
import Link from '../../../../common/components/Link';
import LoadingIcon from '../../../../common/components/LoadingIcon';
import TableCardCustom from '../../../../common/components/TableCardCustom';
import { getListPromotions } from '../../../accommodationService';
import '../../../createDefault/pages/Hotel.scss';
import HeaderPromotion from '../components/HeaderPromotion';

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

  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading] = useState(false);
  const [listPromotions, setListPromotions] = useState<any>();
  // const [activeStep, setActiveStep] = React.useState(1);

  const match: any = useRouteMatch();

  const getPathName = (path: string) => {
    return path.replace(':hotelId', match?.params?.hotelId);
  };
  const fetchData = useCallback(async () => {
    try {
      const data = await dispatch(getListPromotions());
      setListPromotions(data?.data?.items);
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {loading ? (
        <LoadingIcon />
      ) : (
        <div className="hotel-wrapper" style={{ marginLeft: 30 }}>
          <HeaderPromotion />
          <TableCardCustom
            dataSource={listPromotions}
            renderItem={(v: any, index: number) => (
              <Card
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  padding: '40px 16px',
                }}
              >
                <CardContent style={{ height: 115 }}>
                  <Typography
                    variant="body1"
                    gutterBottom
                    style={{ textAlign: 'center', color: BLUE_800 }}
                  >
                    {v?.name}
                  </Typography>
                  <Typography variant="body2">{v?.description}</Typography>
                </CardContent>
                <CardActions>
                  <Link
                    to={{
                      pathname: getPathName(
                        ROUTES.managerHotels.hotelInfo.promotion.value.replace(
                          ':promotionId',
                          v?.id,
                        ),
                      ),
                    }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ height: 35 }}
                      disableElevation
                    >
                      <FormattedMessage id="IDS_HMS_CREATE_NEW_PROGRAM" />
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            )}
            loading={loading}
            styleTable={{ width: '100%', flex: 1 }}
          />
        </div>
      )}
    </>
  );
};

export default connect(mapStateToProps)(CreateHotel);
