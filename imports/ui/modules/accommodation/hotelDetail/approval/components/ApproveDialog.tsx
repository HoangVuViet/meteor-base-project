import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { useRouteMatch } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { Typography, SwipeableDrawer } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import ConfirmDialog from '../../../../common/components/ConfirmDialog';
import {
  actionApproveAndCreateHotel,
  actionGetHotelDuplicate,
} from '../../../accommodationService';
import { AppState } from '../../../../../redux/reducers';
import { snackbarSetting } from '../../../../common/components/elements';
import { GREY_600 } from '../../../../../configs/colors';
import { goToAction } from '../../../../common/redux/reducer';
import { ROUTES } from '../../../../../configs/routes';
import ApproveDialogContent from './ApproveDialogContent';
import LoadingButton from '../../../../common/components/LoadingButton';
import { isEmpty } from '../../../utils';
import { some } from '../../../../../constants';

const ApproveDialog = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const match: any = useRouteMatch();
  const { generalHotelInfo } = useSelector((state: AppState) => state.accommodation, shallowEqual);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open, setOpen] = useState<'dialog' | 'drawer' | null>(null);
  const [duplicateHotels, setDuplicateHotels] = useState<some[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const openDialog = async () => {
    try {
      setLoading(true);
      const { code, data } = await dispatch(actionGetHotelDuplicate(match?.params?.hotelId));
      // const { code, data } = await dispatch(actionGetHotelDuplicate(49280));
      if (code === 200 && data && !isEmpty(data?.items)) {
        setOpen('drawer');
        setDuplicateHotels(data?.items);
      } else {
        setDuplicateHotels([]);
        setOpen('dialog');
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const closeDialog = () => setOpen(null);
  const nextStep = () => {
    dispatch(goToAction({ pathname: ROUTES.managerHotels.results.approve }));
  };
  const handleSubmit = async () => {
    try {
      const { code, message } = await dispatch(
        actionApproveAndCreateHotel({ hotelId: match?.params?.hotelId }),
      );
      if (code === 200) {
        enqueueSnackbar(
          message,
          snackbarSetting(key => closeSnackbar(key), { color: 'success' }),
        );
        setOpen(null);
        nextStep();
      } else {
        enqueueSnackbar(
          message,
          snackbarSetting(key => closeSnackbar(key), { color: 'error' }),
        );
      }
    } catch (error) {
    } finally {
    }
  };

  return (
    <>
      <LoadingButton
        color="secondary"
        variant="contained"
        disableElevation
        fullWidth
        style={{ width: 130, marginLeft: 16 }}
        onClick={openDialog}
        loading={loading}
      >
        <FormattedMessage id="IDS_HMS_APPROVE" />
      </LoadingButton>
      <ConfirmDialog
        open={open === 'dialog'}
        onClose={closeDialog}
        onAccept={handleSubmit}
        onReject={closeDialog}
        titleLabel={
          <Typography gutterBottom variant="body2" component="span">
            <FormattedMessage id="IDS_HMS_APPROVE_ACCOMMODATION" />
          </Typography>
        }
        acceptLabel="IDS_HMS_APPROVE"
        rejectLabel="IDS_HMS_REJECT"
        maxWidth="sm"
      >
        <div className="dialog-content" style={{ padding: '10px' }}>
          <Typography gutterBottom variant="body2" component="span" style={{ color: GREY_600 }}>
            <FormattedMessage id="IDS_HMS_APPROVED_DESCRIPTION" />
          </Typography>
        </div>
      </ConfirmDialog>
      <SwipeableDrawer
        anchor="bottom"
        open={open === 'drawer'}
        onClose={closeDialog}
        onOpen={openDialog}
        className="contract-drawer"
        style={{ borderRadius: 0, height: '100%' }}
      >
        <ApproveDialogContent
          closeDialog={closeDialog}
          generalHotelInfo={generalHotelInfo}
          duplicateHotels={duplicateHotels}
          nextStep={nextStep}
        />
      </SwipeableDrawer>
    </>
  );
};
export default React.memo(ApproveDialog);
