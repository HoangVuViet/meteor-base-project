import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  // eslint-disable-next-line no-unused-vars
  DialogProps,
  Divider,
  IconButton,
  Typography,
} from '@material-ui/core';
import IconClose from '@material-ui/icons/CloseOutlined';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { GREY } from '../../../configs/colors';

interface Props extends DialogProps {
  open: boolean;
  onClose(): void;
  onAccept(): void;
  titleLabel?: React.ReactNode;
  onReject?: () => void;
  acceptLabel?: string;
  rejectLabel?: string;
  onExited?: () => void;
  styleActions?: React.CSSProperties;
}

const ConfirmDialog: React.FC<Props> = props => {
  const {
    open,
    onClose,
    onExited,
    onAccept,
    titleLabel,
    onReject,
    acceptLabel,
    rejectLabel,
    children,
    style,
    styleActions,
    ...rest
  } = props;
  return (
    <Dialog
      open={Boolean(open)}
      onClose={onClose}
      PaperProps={{
        style: {
          minWidth: 420,
          ...style,
        },
      }}
      maxWidth="lg"
      onExited={onExited}
      {...rest}
    >
      {titleLabel && (
        <div
          style={{ padding: 16, fontWeight: 500, fontSize: 16, lineHeight: '26px', color: GREY }}
        >
          {titleLabel}
        </div>
      )}
      <IconButton
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          padding: '8px',
        }}
        onClick={onClose}
      >
        <IconClose />
      </IconButton>
      <Divider />
      <DialogContent style={{ alignItems: 'center' }}>{children}</DialogContent>
      <Divider />
      <DialogActions style={{ padding: 16, justifyContent: 'flex-end', ...styleActions }}>
        <Button
          variant="contained"
          color="secondary"
          size="medium"
          style={{ minWidth: 108, marginRight: 12 }}
          onClick={onAccept}
          disableElevation
        >
          <FormattedMessage id={acceptLabel || 'accept'} />
        </Button>
        {onReject && (
          <Button
            variant="outlined"
            size="medium"
            style={{ minWidth: 108 }}
            onClick={onReject}
            disableElevation
          >
            <Typography variant="body2" color="textSecondary">
              <FormattedMessage id={rejectLabel || 'IDS_HMS_REJECT'} />
            </Typography>
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
