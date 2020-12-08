import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Typography } from '@material-ui/core';
import ConfirmDialog from '../../../../common/components/ConfirmDialog';
import { ReactComponent as WarningIcon } from '../../../../../svg/ic_warning.svg';

interface Props {
  handleSubmit: () => void;
  handleClose: () => void;
}
const DeleteRateDialog: React.FC<Props> = props => {
  const { handleSubmit, handleClose } = props;

  return (
    <>
      <ConfirmDialog
        open
        onClose={handleClose}
        onAccept={handleSubmit}
        onReject={handleClose}
        titleLabel={null}
        acceptLabel="IDS_HMS_DELETE"
        rejectLabel="IDS_HMS_REJECT"
        maxWidth="sm"
      >
        <div className="dialog-content" style={{ textAlign: 'center' }}>
          <WarningIcon style={{ margin: '0 auto', marginTop: 36, marginBottom: 16 }} />
          <Typography
            gutterBottom
            variant="body2"
            component="p"
            style={{ fontWeight: 600, marginBottom: 16 }}
          >
            <FormattedMessage id="IDS_HMS_DELETE_RATE_PLAN" />
          </Typography>
          <Typography gutterBottom variant="body2" component="p">
            <FormattedMessage id="IDS_HMS_DELETE_RATE_PLAN_DESCRIPTION" />
          </Typography>
        </div>
      </ConfirmDialog>
    </>
  );
};
export default React.memo(DeleteRateDialog);
