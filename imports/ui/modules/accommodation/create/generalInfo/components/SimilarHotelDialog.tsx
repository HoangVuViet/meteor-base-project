import React from 'react';
import { Typography, Grid, Card } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { Rating } from '@material-ui/lab';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { useSnackbar } from 'notistack';
import FullDialog from '../../../../ratePackage/components/ratePackageDistributed/result/components/FullDialog';
import { some, SUCCESS_CODE } from '../../../../../constants';
import { Col, Row, snackbarSetting } from '../../../../common/components/elements';
import { ReactComponent as InfoIcon } from '../../../../../svg/ic_info.svg';
import { PRIMARY, WHITE, GREY_600, GREY_400 } from '../../../../../configs/colors';
import defaultHotelImage from '../../../../../images/defaultHotelImage.png';
import { ReactComponent as LocationIcon } from '../../../../../svg/ic_location.svg';
import './style.dialog.scss';
import LoadingButton from '../../../../common/components/LoadingButton';
import { AppState } from '../../../../../redux/reducers';
import { actionApproveAndAssignHotel } from '../../../accommodationService';

interface Props {
  open: boolean;
  onClose(): void;
  hotelData: some[];
  hotelId?: number;
  onGetSimilarSuccess: () => void;
}
const SimilarHotelDialog: React.FC<Props> = props => {
  const { hotelData, open, onClose, hotelId, onGetSimilarSuccess } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const assignSimilarHotel = React.useCallback(
    async (rootHotelId: number, totalHotelId: number) => {
      const json = await dispatch(
        actionApproveAndAssignHotel({ rootHotelId, hotelId: totalHotelId }),
      );
      if (json?.code === SUCCESS_CODE) {
        enqueueSnackbar(
          json?.message,
          snackbarSetting(key => closeSnackbar(key)),
        );
        onClose();
        onGetSimilarSuccess();
      } else {
        enqueueSnackbar(
          json?.message,
          snackbarSetting(key => closeSnackbar(key)),
        );
      }
    },
    [closeSnackbar, dispatch, enqueueSnackbar, onClose, onGetSimilarSuccess],
  );
  return (
    <FullDialog open={open} onHandleClose={onClose}>
      <Col>
        <Typography variant="h5" style={{ marginBottom: 16 }}>
          <FormattedMessage id="IDS_HMS_HOTEL_SIMILAR_HOTEL" />
        </Typography>
        <Row style={{ marginBottom: 32 }}>
          <InfoIcon className="svgFillAll" style={{ fill: PRIMARY, stroke: WHITE }} />
          <Typography variant="body2" color="primary">
            <FormattedMessage id="IDS_HMS_HOTEL_SIMILAR_HOTEL_TEXT" />
          </Typography>
        </Row>
        <Grid container spacing={3}>
          {hotelData.map((v: typeof hotelData[number], index: number) => (
            <Grid
              item
              xs="auto"
              style={{ cursor: 'pointer', minWidth: 675, maxWidth: 800, width: '100%' }}
              key={index}
            >
              <Card
                style={{
                  height: 260,
                  minWidth: 675,
                  maxWidth: 800,
                  border: `0.5px solid ${GREY_400}`,
                  borderRadius: 8,
                  boxShadow: 'none',
                  flex: 1,
                }}
              >
                <Row style={{ flex: 3, height: '100%' }}>
                  <img
                    src={v?.logo || defaultHotelImage}
                    alt=""
                    style={{ height: '100%', width: 250, objectFit: 'cover' }}
                  />
                  <Col
                    style={{
                      flex: 2,
                      height: '100%',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      padding: 16,
                    }}
                  >
                    <Col>
                      <Typography
                        variant="h6"
                        style={{
                          maxWidth: 400,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {v?.name}
                      </Typography>
                      <Rating
                        name="starRating"
                        value={v?.starRating || 0}
                        precision={1}
                        readOnly
                        style={{ marginBottom: 8 }}
                        icon={<StarRoundedIcon fontSize="small" />}
                      />
                      <Row style={{ marginBottom: 8 }}>
                        <LocationIcon />
                        <Typography
                          variant="body2"
                          style={{
                            maxWidth: 400,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {v?.address}
                        </Typography>
                      </Row>
                      <div className="large-text">
                        <Typography variant="caption" style={{ color: GREY_600 }}>
                          {v?.description}
                        </Typography>
                      </div>
                    </Col>
                    <LoadingButton
                      variant="contained"
                      color="secondary"
                      disableElevation
                      style={{ height: 40, minWidth: 210 }}
                      onClick={() => hotelId && v?.id && assignSimilarHotel(v.id, hotelId)}
                    >
                      <FormattedMessage id="IDS_HMS_HOTEL_USE_SIMILAR_HOTEL" />
                    </LoadingButton>
                  </Col>
                </Row>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Col>
    </FullDialog>
  );
};

export default SimilarHotelDialog;
