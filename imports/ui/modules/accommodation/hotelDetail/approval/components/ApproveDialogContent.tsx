import React, { useState, useEffect } from 'react';
import { Typography, IconButton, Toolbar, Button, List, Divider, Grid } from '@material-ui/core';
import { useRouteMatch } from 'react-router';
import { useSnackbar } from 'notistack';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import IconClose from '@material-ui/icons/Close';
import { Rating } from '@material-ui/lab';
import {
  actionApproveAndCreateHotel,
  actionApproveAndAssignHotel,
} from '../../../accommodationService';
import { AppState } from '../../../../../redux/reducers';
import LoadingButton from '../../../../common/components/LoadingButton';
import { Row, snackbarSetting } from '../../../../common/components/elements';
import { WHITE, BLACK, GREY_400, GREY_100 } from '../../../../../configs/colors';
import { some } from '../../../../../constants';
import { isEmpty } from '../../../utils';
import SingleSelect from '../../../../common/components/SingleSelect';

interface Props {
  closeDialog: () => void;
  nextStep: () => void;
  generalHotelInfo: some | undefined;
  duplicateHotels: some[];
}

const ApproveDialogContent: React.FC<Props> = props => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const match: any = useRouteMatch();
  const { closeDialog, generalHotelInfo, duplicateHotels, nextStep } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [hotelSelected, setHotelSelected] = useState<some>([]);
  useEffect(() => {
    if (!isEmpty(duplicateHotels)) setHotelSelected(duplicateHotels[0]);
  }, [duplicateHotels]);
  const handleSubmit = async (isCreate: boolean) => {
    try {
      setLoading(true);
      const { code, message } = await dispatch(
        isCreate
          ? actionApproveAndCreateHotel({ hotelId: match?.params?.hotelId })
          : actionApproveAndAssignHotel({
              hotelId: match?.params?.hotelId,
              rootHotelId: hotelSelected?.rootHotelId,
            }),
      );
      if (code === 200) {
        enqueueSnackbar(
          message,
          snackbarSetting(key => closeSnackbar(key), { color: 'success' }),
        );
        closeDialog();
        nextStep();
      } else {
        enqueueSnackbar(
          message,
          snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
        );
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const getTitleRow = (id?: string) => {
    return (
      <Grid item xs={2} style={{ padding: 12 }}>
        {id && (
          <Typography gutterBottom variant="body2" component="span">
            <FormattedMessage id={id} />
          </Typography>
        )}
      </Grid>
    );
  };
  return (
    <>
      <Toolbar style={{ background: BLACK, opacity: 0.8, justifyContent: 'flex-end' }}>
        <IconButton edge="end" size="medium" onClick={closeDialog}>
          <IconClose className="svgFilAll" style={{ height: 40, width: 40, fill: WHITE }} />
        </IconButton>
      </Toolbar>
      <div className="dialog-content" style={{ padding: '16px 30px' }}>
        <Typography variant="h5" component="p" className="contract-header">
          <FormattedMessage id="IDS_HMS_CONTRACT_RATE_PACKAGE" />
        </Typography>

        <List
          component="nav"
          style={{ borderRadius: 8, border: `0.5px solid ${GREY_400}`, padding: 0 }}
        >
          <Grid
            container
            alignItems="center"
            style={{ flexWrap: 'initial', background: GREY_100, borderRadius: '8px 8px 0 0' }}
          >
            {getTitleRow()}
            <Divider orientation="vertical" flexItem />
            <Grid item xs={4} style={{ padding: 12, textAlign: 'center' }}>
              <Typography gutterBottom variant="subtitle1" component="span">
                <FormattedMessage id="IDS_HMS_ACCOMMODATION_SEND_APPROVE" />
              </Typography>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={6} style={{ padding: 12, textAlign: 'center' }}>
              <Typography gutterBottom variant="subtitle1" component="span">
                <FormattedMessage id="IDS_HMS_ACCOMMODATION_APPROVED" />
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container alignItems="center" style={{ flexWrap: 'initial' }}>
            {getTitleRow('IDS_HMS_HOTEL_NAME')}
            <Divider orientation="vertical" flexItem />
            <Grid item xs={4} style={{ padding: 12 }}>
              <Typography gutterBottom variant="body2" component="span">
                {generalHotelInfo?.name}
              </Typography>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={6} style={{ padding: 12 }}>
              <SingleSelect
                label=""
                value={hotelSelected?.id}
                disableCloseIcon
                style={{ width: 438 }}
                formControlStyle={{ minWidth: 438, width: 438, marginRight: 0 }}
                options={duplicateHotels || []}
                onSelectOption={(value: number) => {
                  const hotelSelect = duplicateHotels.find(el => el.id === value);
                  setHotelSelected(hotelSelect || {});
                }}
                optional
                getOptionLabel={(v: some) => v?.name}
              />
            </Grid>
          </Grid>
          <Divider />
          <Grid container alignItems="center" style={{ flexWrap: 'initial' }}>
            {getTitleRow('IDS_HMS_ADDRESS')}
            <Divider orientation="vertical" flexItem />
            <Grid item xs={4} style={{ padding: 12 }}>
              <Typography gutterBottom variant="body2" component="span">
                {generalHotelInfo?.address}
              </Typography>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={6} style={{ padding: 12 }}>
              <Typography gutterBottom variant="body2" component="span">
                {hotelSelected?.address}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container alignItems="center" style={{ flexWrap: 'initial' }}>
            {getTitleRow('starRating')}
            <Divider orientation="vertical" flexItem />
            <Grid item xs={4} style={{ padding: 12 }}>
              <Rating value={generalHotelInfo?.starRating || 0} readOnly />
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={6} style={{ padding: 12 }}>
              <Rating value={hotelSelected?.starRating || 0} readOnly />
            </Grid>
          </Grid>
          <Divider />
          <Grid container alignItems="center" style={{ flexWrap: 'initial' }}>
            {getTitleRow('avatar')}
            <Divider orientation="vertical" flexItem />
            <Grid item xs={4} style={{ padding: 12 }}>
              <img
                style={{ width: 160, height: 160, objectFit: 'cover' }}
                src={generalHotelInfo?.logo}
                alt=""
              />
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={6} style={{ padding: 12 }}>
              <img
                style={{ width: 160, height: 160, objectFit: 'cover' }}
                src={hotelSelected?.logo}
                alt=""
              />
            </Grid>
          </Grid>
          <Divider />
          <Grid container alignItems="center" style={{ flexWrap: 'initial' }}>
            {getTitleRow('IDS_HMS_DESCRIPTION')}
            <Divider orientation="vertical" flexItem />
            <Grid item xs={4} style={{ padding: 12 }}>
              <Typography gutterBottom variant="body2" component="span">
                {generalHotelInfo?.description}
              </Typography>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={6} style={{ padding: 12 }}>
              <Typography gutterBottom variant="body2" component="span">
                {hotelSelected?.description}
              </Typography>
            </Grid>
          </Grid>
        </List>
        <Row style={{ marginTop: 24, marginBottom: 20 }}>
          <LoadingButton
            color="secondary"
            variant="contained"
            disableElevation
            style={{ marginRight: 24 }}
            loading={isLoading}
            onClick={() => handleSubmit(false)}
          >
            <FormattedMessage id="IDS_HMS_APPROVE_AND_REPLACE" />
          </LoadingButton>
          <LoadingButton
            color="secondary"
            variant="contained"
            disableElevation
            style={{ marginRight: 24 }}
            loading={isLoading}
            onClick={() => handleSubmit(true)}
          >
            <FormattedMessage id="IDS_HMS_APPROVE_AND_CREATE" />
          </LoadingButton>
          <Button
            variant="outlined"
            disableElevation
            onClick={() => {
              closeDialog();
            }}
          >
            <FormattedMessage id="IDS_HMS_REJECT" />
          </Button>
        </Row>
      </div>
    </>
  );
};
export default React.memo(ApproveDialogContent);
