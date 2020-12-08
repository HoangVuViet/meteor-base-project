import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Paper,
  Switch,
  Typography,
  withStyles,
} from '@material-ui/core';
import { FormikErrors } from 'formik';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { BLUE, GREEN, GREEN_300, TEAL } from '../../../../../configs/colors';
import { validNumberRegex } from '../../../../../models/regex';
import { ReactComponent as CloseIcon } from '../../../../../svg/ic_close.svg';
import { Col, Row } from '../../../../common/components/elements';
import FormControlTextField from '../../../../common/components/FormControlTextField';
import { HotelContacts } from '../utils';

interface Props {
  info: HotelContacts;
  onChangeInfo: (value: HotelContacts) => void;
  style?: React.CSSProperties;
  onClose?: () => void;
  errorsObject?: FormikErrors<HotelContacts>;
  submitCount: number;
}
const CustomSwitch = withStyles({
  switchBase: {
    '&$checked': {
      color: GREEN,
    },
    '&$checked + $track': {
      backgroundColor: GREEN_300,
    },
  },
  checked: {},
  track: {},
})(Switch);

const HotelContactCard: React.FC<Props> = props => {
  const { info, onChangeInfo, style, onClose, errorsObject, submitCount } = props;
  const intl = useIntl();
  const [open, setOpen] = React.useState(false);
  const getTypeLabel = (values: string) => {
    if (values === 'PRIMARY') {
      return 'IDS_HMS_HOTEL_PRIMARY';
    }
    if (values === 'RESERVATION') {
      return 'IDS_HMS_HOTEL_RESERVATION';
    }
    if (values === 'FINANCIAL') {
      return 'IDS_HMS_HOTEL_FINANCIAL';
    }
    return 'IDS_HMS_HOTEL_SALE';
  };

  React.useEffect(() => {
    if (info.emailBooking || info.emailFeedback || info.emailReport || info.emailUpdateBooking) {
      setOpen(true);
    } else setOpen(false);
  }, [info.emailBooking, info.emailFeedback, info.emailReport, info.emailUpdateBooking]);

  return (
    <Paper style={{ borderRadius: 8, padding: 16, marginRight: 30, height: 550, ...style }}>
      <Col>
        <Row style={{ justifyContent: 'space-between' }}>
          <Typography
            variant="subtitle1"
            style={{ color: info.type === 'PRIMARY' ? TEAL : 'initial', marginBottom: 14 }}
          >
            <FormattedMessage id={getTypeLabel(info.type)} />
          </Typography>
          {onClose && (
            <IconButton style={{ padding: 0 }} onClick={onClose}>
              <CloseIcon />
            </IconButton>
          )}
        </Row>
        <FormControlTextField
          id="name"
          label={<FormattedMessage id="fullName" />}
          formControlStyle={{ width: 290, margin: 0 }}
          placeholder={intl.formatMessage({ id: 'fullName' })}
          value={info.name}
          inputProps={{ maxLength: 100 }}
          onChange={e => onChangeInfo({ ...info, name: e.target.value })}
          errorMessage={errorsObject?.name && submitCount > 0 ? errorsObject?.name : undefined}
        />
        <FormControlTextField
          label={<FormattedMessage id="phone" />}
          formControlStyle={{ width: 290, margin: 0 }}
          placeholder={intl.formatMessage({ id: 'phone' })}
          id="phone"
          value={info.phone}
          inputProps={{ maxLength: 15 }}
          onChange={e =>
            (validNumberRegex.test(e.target.value) || e.target.value === '') &&
            onChangeInfo({ ...info, phone: e.target.value })
          }
          errorMessage={errorsObject?.phone && submitCount > 0 ? errorsObject?.phone : undefined}
        />
        <FormControlTextField
          label={<FormattedMessage id="email" />}
          placeholder={intl.formatMessage({ id: 'email' })}
          formControlStyle={{ width: 290, margin: 0 }}
          id="email"
          value={info.email}
          inputProps={{ maxLength: 50 }}
          onChange={e => onChangeInfo({ ...info, email: e.target.value })}
          errorMessage={errorsObject?.email && submitCount > 0 ? errorsObject?.email : undefined}
        />

        <Row style={{ justifyContent: 'space-between' }}>
          <Typography variant="subtitle2">
            <FormattedMessage id="IDS_HMS_HOTEL_RECEIVE_EMAIL" />
          </Typography>
          <CustomSwitch
            checked={open}
            onChange={() => {
              if (open) {
                onChangeInfo({
                  ...info,
                  emailBooking: false,
                  emailFeedback: false,
                  emailReport: false,
                  emailUpdateBooking: false,
                });
              } else {
                onChangeInfo({
                  ...info,
                  emailBooking: true,
                  emailFeedback: true,
                  emailReport: true,
                  emailUpdateBooking: true,
                });
              }
              setOpen(!open);
            }}
          />
        </Row>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={info.emailBooking}
              onChange={() => onChangeInfo({ ...info, emailBooking: !info.emailBooking })}
            />
          }
          label={
            <Typography variant="body2" style={{ color: BLUE }}>
              <FormattedMessage id="IDS_HMS_HOTEL_EMAIL_BOOKING" />
            </Typography>
          }
          disabled={!open}
          labelPlacement="end"
        />
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={info.emailReport}
              onChange={() => onChangeInfo({ ...info, emailReport: !info.emailReport })}
            />
          }
          label={
            <Typography variant="body2" style={{ color: BLUE }}>
              <FormattedMessage id="IDS_HMS_HOTEL_EMAIL_REPORT" />
            </Typography>
          }
          disabled={!open}
          labelPlacement="end"
        />
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={info.emailUpdateBooking}
              onChange={() =>
                onChangeInfo({ ...info, emailUpdateBooking: !info.emailUpdateBooking })
              }
            />
          }
          label={
            <Typography variant="body2" style={{ color: BLUE }}>
              <FormattedMessage id="IDS_HMS_HOTEL_EMAIL_UPDATE_BOOKING" />
            </Typography>
          }
          disabled={!open}
          labelPlacement="end"
        />
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={info.emailFeedback}
              onChange={() => onChangeInfo({ ...info, emailFeedback: !info.emailFeedback })}
            />
          }
          label={
            <Typography variant="body2" style={{ color: BLUE }}>
              <FormattedMessage id="IDS_HMS_HOTEL_EMAIL_FEEDBACK" />
            </Typography>
          }
          disabled={!open}
          labelPlacement="end"
        />
      </Col>
    </Paper>
  );
};

export default HotelContactCard;
