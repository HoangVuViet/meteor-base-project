import { Button, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { GREY_400 } from '../../../../../configs/colors';
import { ROUTES } from '../../../../../configs/routes';
import { AppState } from '../../../../../redux/reducers';
import ConfirmDialog from '../../../../common/components/ConfirmDialog';
import { snackbarSetting } from '../../../../common/components/elements';
import { redMark } from '../../../../common/components/Form';
import FormControlTextField from '../../../../common/components/FormControlTextField';
import { goToAction } from '../../../../common/redux/reducer';
import { actionRejectAccommodation } from '../../../accommodationService';

const RejectDialog = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const match: any = useRouteMatch();
  const intl = useIntl();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);
  const nextStep = () => {
    dispatch(goToAction({ pathname: ROUTES.managerHotels.results.pending }));
  };
  const handleSubmit = async () => {
    try {
      const { code, message } = await dispatch(
        actionRejectAccommodation({
          hotelId: match?.params?.hotelId,
          reason: reason.trim(),
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
      setOpen(false);
    } catch (error) {
    } finally {
    }
  };
  return (
    <>
      <Button
        color="secondary"
        variant="contained"
        disableElevation
        fullWidth
        style={{ width: 130, marginLeft: 16 }}
        onClick={openDialog}
      >
        <FormattedMessage id="IDS_HMS_REJECTED" />
      </Button>
      <ConfirmDialog
        open={open}
        onClose={closeDialog}
        onAccept={handleSubmit}
        onReject={closeDialog}
        titleLabel={
          <Typography gutterBottom variant="subtitle1" component="span">
            <FormattedMessage id="IDS_HMS_REJECT_APPROVAL" />
          </Typography>
        }
        acceptLabel="accept"
        rejectLabel="IDS_HMS_REJECT"
      >
        <div className="dialog-content">
          <Typography gutterBottom variant="body2" component="span">
            <FormattedMessage id="IDS_HMS_REASON_REJECTED_LABEL" />
            <>&nbsp;{redMark}</>
          </Typography>

          <FormControlTextField
            id="rejected"
            placeholder={intl.formatMessage({ id: 'IDS_HMS_REASON_REJECTED' })}
            inputProps={{
              maxLength: 3000,
            }}
            multiline
            rows={4}
            value={reason}
            onChange={e => setReason(e.target.value)}
            style={{
              border: `0.5px solid ${GREY_400}`,
              boxSizing: 'border-box',
              borderRadius: 4,
              padding: 4,
              minHeight: 64,
            }}
          />
        </div>
      </ConfirmDialog>
    </>
  );
};
export default React.memo(RejectDialog);
