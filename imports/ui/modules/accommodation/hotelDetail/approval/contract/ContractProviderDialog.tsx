import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import querystring from 'query-string';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { useRouteMatch } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { Typography, Button, Popover, Divider } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { ReactComponent as CloseIcon } from '../../../../../svg/ic_close.svg';
import { updateCommissionProvider } from '../../../accommodationService';
import { AppState } from '../../../../../redux/reducers';
import { Row, snackbarSetting } from '../../../../common/components/elements';
import { GREY_100, GREY_600 } from '../../../../../configs/colors';
import { some, SUCCESS_CODE } from '../../../../../constants';
import FormControlTextField from '../../../../common/components/FormControlTextField';
import { NumberFormatCustom } from '../../../../common/components/Form';
import LoadingButton from '../../../../common/components/LoadingButton';

interface Props {
  contract: some;
  fetchContract: () => void;
}
const ContractProviderDialog: React.FC<Props> = props => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { contract, fetchContract } = props;
  const match: any = useRouteMatch();
  const intl = useIntl();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [price, setPrice] = useState(contract.commission);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isSubmit, setSubmit] = React.useState<boolean>(false);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleSubmit = async () => {
    try {
      if (Number(price) < 15 || Number(price) > 100) return;
      setSubmit(true);
      const searchStr = querystring.stringify({
        hotelId: match?.params?.hotelId,
        contractId: contract?.id,
        commission: price,
      });
      const { code, message } = await dispatch(updateCommissionProvider(searchStr));
      if (code === SUCCESS_CODE) {
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
      handleClose();
    } catch (error) {
    } finally {
      setSubmit(false);
    }
  };
  return (
    <>
      <Button
        color="secondary"
        variant="contained"
        disableElevation
        fullWidth
        style={{ width: 97, marginLeft: 16, minHeight: 24 }}
        onClick={handleClick}
      >
        <FormattedMessage id="IDS_HMS_CHANGE" />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Row style={{ padding: '12px 16px' }}>
          <Typography variant="body2" component="span">
            <FormattedMessage id="IDS_HMS_CHANGE_DISCOUNT" />
          </Typography>
          <CloseIcon style={{ marginLeft: 'auto', cursor: 'pointer' }} onClick={handleClose} />
        </Row>
        <Divider />
        <div className="dialog-content" style={{ padding: '12px 16px', maxWidth: 340 }}>
          <Typography gutterBottom variant="body2" component="p" style={{ color: GREY_600 }}>
            <FormattedMessage id="IDS_HMS_CHANGE_DISCOUNT_DESCRIPTION" />
          </Typography>
          <Typography gutterBottom variant="body2" component="p" style={{ color: GREY_600 }}>
            <FormattedMessage id="IDS_HMS_CHANGE_DISCOUNT_NOTE" />
          </Typography>
          <FormControlTextField
            label={intl.formatMessage({ id: 'IDS_HMS_MONEY_DISCOUNT' })}
            placeholder={intl.formatMessage({ id: 'IDS_HMS_SELL_PRICE' })}
            helpText={`${intl.formatMessage({ id: 'IDS_HMS_MONEY_DISCOUNT' })}: ${
              contract.commission
            }%`}
            optional
            endAdornment={<span className="end-adornment">VNĐ</span>}
            inputComponent={NumberFormatCustom as any}
            value={price}
            onChange={(e: any) => {
              setPrice(e.target.value);
              if (Number(e.target.value) < 15 || Number(e.target.value) > 100) {
                setPriceError(intl.formatMessage({ id: 'IDS_HMS_DISCOUNT_ERROR' }));
              } else {
                setPriceError(null);
              }
            }}
            errorMessage={priceError || ''}
          />
        </div>
        <Divider />
        <Row style={{ padding: '12px 16px', justifyContent: 'flex-end' }}>
          <LoadingButton
            type="submit"
            color="secondary"
            variant="contained"
            disableElevation
            style={{ marginRight: 16, minWidth: 132, height: 34 }}
            loading={isSubmit}
            onClick={handleSubmit}
          >
            <FormattedMessage id="IDS_HMS_SAVE" />
          </LoadingButton>
          <Button
            variant="outlined"
            disableElevation
            onClick={handleClose}
            style={{ height: 34, minWidth: 100, background: GREY_100 }}
          >
            <Typography
              variant="subtitle2"
              style={{ marginTop: 5, textAlign: 'center', color: GREY_600 }}
            >
              <FormattedMessage id="IDS_HMS_REJECT" />
            </Typography>
          </Button>
        </Row>
      </Popover>
    </>
  );
};
export default React.memo(ContractProviderDialog);
