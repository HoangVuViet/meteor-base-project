import {
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogProps,
  DialogTitle,
} from '@material-ui/core';
import IconClose from '@material-ui/icons/CloseOutlined';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Row } from './elements';

interface Props extends DialogProps {
  open: boolean;
  onClose(): void;
  onAccept(): void;
  titleLabel?: React.ReactNode;
  onReject?: () => void;
  acceptLabel?: string;
  rejectLabel?: string;
  onExited?: () => void;
}

const ConfirmDialogSimple: React.FC<Props> = props => {
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
    ...rest
  } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          padding: '24px 24px 12px',
          minWidth: 450,
          ...rest.PaperProps?.style,
        },
        ...rest.PaperProps,
      }}
      maxWidth="lg"
      onExited={onExited}
      {...rest}
    >
      {titleLabel && <DialogTitle style={{ padding: 0 }}>{titleLabel}</DialogTitle>}

      <IconButton
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          padding: '8px',
        }}
        onClick={onClose}
      >
        <IconClose />
      </IconButton>
      {children}
      <Row style={{ justifyContent: 'center', marginTop: 20 }}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ minWidth: 140, margin: '8px' }}
          onClick={onAccept}
          disableElevation
        >
          <FormattedMessage id={acceptLabel || 'accept'} />
        </Button>
        {onReject && (
          <Button
            variant="outlined"
            size="large"
            style={{ minWidth: 140, margin: '8px' }}
            onClick={onReject}
            disableElevation
          >
            <Typography variant="subtitle1" color="textSecondary">
              <FormattedMessage id={rejectLabel || 'cancel'} />
            </Typography>
          </Button>
        )}
      </Row>
    </Dialog>
  );
};

export default ConfirmDialogSimple;
