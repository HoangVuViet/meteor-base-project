import { Grid, Typography } from '@material-ui/core';
import { useFormikContext } from 'formik';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { normalCharacter, rawAlphabetRegex } from '../../../../../models/regex';
import { Row } from '../../../../common/components/elements';
import { FieldTextContent } from '../../../common/FieldContent';
import { PaymentInfo } from '../../../utils';

interface InvoiceInfoProps {
  paymentInfo: PaymentInfo | undefined;
}

const InvoiceInfo: React.FC<InvoiceInfoProps> = props => {
  const intl = useIntl();
  const { setFieldValue } = useFormikContext();

  return (
    <>
      <Typography gutterBottom variant="subtitle1" component="p" className="header-text">
        <FormattedMessage id="IDS_HMS_INVOICEINFO" />
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <FieldTextContent
            name="company"
            label={intl.formatMessage({ id: 'IDS_HMS_COMPANY_NAME' })}
            placeholder={intl.formatMessage({ id: 'IDS_HMS_COMPANY_NAME' })}
            inputProps={{ maxLength: 1000 }}
          />
        </Grid>
        <Grid item xs={4}>
          <FieldTextContent
            name="delegate"
            label={intl.formatMessage({ id: 'IDS_HMS_REPRESENTATIVE' })}
            placeholder={intl.formatMessage({ id: 'IDS_HMS_REPRESENTATIVE' })}
            inputProps={{ maxLength: 100 }}
            onChange={e => {
              if (rawAlphabetRegex.test(e.target.value)) {
                setFieldValue('delegate', e.target.value);
              }
            }}
          />
        </Grid>
      </Grid>
      <Row>
        <FieldTextContent
          name="address"
          label={intl.formatMessage({ id: 'IDS_HMS_ADDRESS' })}
          placeholder={intl.formatMessage({ id: 'IDS_HMS_ADDRESS' })}
          inputProps={{ maxLength: 1000 }}
        />
      </Row>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <FieldTextContent
            name="taxCode"
            label={intl.formatMessage({ id: 'IDS_HMS_TAX_CODE' })}
            placeholder={intl.formatMessage({ id: 'IDS_HMS_TAX_CODE' })}
            inputProps={{ maxLength: 1000 }}
            onChange={e => {
              if (normalCharacter.test(e.target.value)) {
                setFieldValue('taxCode', e.target.value);
              }
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <FieldTextContent
            name="email"
            label={intl.formatMessage({ id: 'IDS_HMS_EMAIL' })}
            placeholder={intl.formatMessage({ id: 'IDS_HMS_EMAIL' })}
            inputProps={{ maxLength: 1000 }}
          />
          <Typography variant="caption" style={{ position: 'relative', top: -20 }}>
            <FormattedMessage id="IDS_HMS_PAYMENT_INFO_EMAIL_NOTE" />
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(InvoiceInfo);
