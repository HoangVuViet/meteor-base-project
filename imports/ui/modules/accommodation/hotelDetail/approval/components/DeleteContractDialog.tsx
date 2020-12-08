import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { useRouteMatch } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import ConfirmDialog from '../../../../common/components/ConfirmDialog';
import { actionContractHotel } from '../../../accommodationService';
import { AppState } from '../../../../../redux/reducers';
import { snackbarSetting } from '../../../../common/components/elements';
import { ReactComponent as DeleteCircleIcon } from '../../../../../svg/ic_delete_circle.svg';
import { some } from '../../../../../constants';

interface Props {
  contractItem: some;
  fetchContract: () => void;
}
const DeleteContractDialog: React.FC<Props> = props => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { contractItem, fetchContract } = props;
  const match: any = useRouteMatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  const handleSubmit = async () => {
    try {
      const { code, message } = await dispatch(
        actionContractHotel(match?.params?.hotelId, 'delete', [contractItem?.id]),
      );
      if (code === 200) {
        enqueueSnackbar(
          message,
          snackbarSetting(key => closeSnackbar(key), { color: 'success' }),
        );
        fetchContract();
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
      <DeleteCircleIcon style={{ position: 'absolute', right: 34 }} onClick={openDialog} />
      <ConfirmDialog
        open={open}
        onClose={closeDialog}
        onAccept={handleSubmit}
        onReject={closeDialog}
        titleLabel={
          <Typography gutterBottom variant="body2" component="span">
            <FormattedMessage id="IDS_HMS_DELETE_CONTRACT" />
          </Typography>
        }
        acceptLabel="accept"
        rejectLabel="IDS_HMS_REJECT"
      >
        <div className="dialog-content">
          <Typography gutterBottom variant="body2" component="span">
            <FormattedMessage
              id="IDS_HMS_DELETE_CONTRACT_CONFIRM"
              values={{ code: contractItem?.contractCode }}
            />
          </Typography>
        </div>
      </ConfirmDialog>
    </>
  );
};
export default React.memo(DeleteContractDialog);
