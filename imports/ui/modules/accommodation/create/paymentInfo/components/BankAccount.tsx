import { Grid, Typography } from '@material-ui/core';
import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import voca from 'voca';
import { some } from '../../../../../constants';
import { normalCharacter, rawAlphabetRegex } from '../../../../../models/regex';
import { Row } from '../../../../common/components/elements';
import FormControlAutoComplete from '../../../../common/components/FormControlAutoComplete';
import { FieldTextContent } from '../../../common/FieldContent';
import { PaymentInfo } from '../../../utils';

interface BankAccountProps {
  banks: any[];
  bankBranchs: any[];
  listBranchHotels: (data: number) => void;
  paymentInfo: PaymentInfo | undefined;
}

const BankAccount: React.FC<BankAccountProps> = props => {
  const { banks, listBranchHotels, bankBranchs, paymentInfo } = props;

  const { setFieldValue, setValues, values } = useFormikContext();

  const intl = useIntl();
  useEffect(() => {
    setValues({
      ...(values as any),
      company: paymentInfo?.company,
      delegate: paymentInfo?.delegate,
      address: paymentInfo?.address,
      taxCode: paymentInfo?.taxCode,
      email: paymentInfo?.email,
      bankId: paymentInfo?.bankId,
      bankBranchId: paymentInfo?.bankBranchId,
      accountNumber: paymentInfo?.accountNumber,
      accountName: paymentInfo?.accountName,
    });
    // eslint-disable-next-line
  }, [paymentInfo]);
  return (
    <>
      <Typography
        gutterBottom
        variant="h6"
        component="p"
        className="header-text"
        style={{ marginBottom: 17 }}
      >
        <FormattedMessage id="IDS_HMS_BANKACCOUNT" />
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          {banks && (
            <FormControlAutoComplete
              label={<FormattedMessage id="IDS_HMS_BANK" />}
              placeholder={intl.formatMessage({ id: 'IDS_HMS_PICK_BANK' })}
              formControlStyle={{ minWidth: 500 }}
              value={banks.find(v => v.id === (values as any).bankId) || null}
              options={banks}
              onChange={(e: any, value: some | null) => {
                setFieldValue('bankId', value?.id, true);
                listBranchHotels(value?.id);
              }}
              getOptionLabel={value => value.name}
              errorMessage=""
            />
          )}
        </Grid>
        <Grid item xs={6}>
          {!!bankBranchs.length && (
            <FormControlAutoComplete
              label={<FormattedMessage id="IDS_HMS_BRANCHBANK" />}
              placeholder={intl.formatMessage({ id: 'IDS_HMS_PICK_BRANCHBANK' })}
              formControlStyle={{ minWidth: 500 }}
              value={bankBranchs.find(v => v.id === (values as any).bankBranchId) || null}
              options={bankBranchs}
              onChange={(e: any, value: some | null) =>
                setFieldValue('bankBranchId', value?.id, true)
              }
              getOptionLabel={value => value.name}
              errorMessage=""
            />
          )}
        </Grid>
      </Grid>
      <Row>
        <FieldTextContent
          style={{ maxWidth: 350 }}
          name="accountNumber"
          label={intl.formatMessage({ id: 'IDS_HMS_ACCOUNT_NUMBER' })}
          placeholder={intl.formatMessage({ id: 'IDS_HMS_ACCOUNT_NUMBER' })}
          inputProps={{ maxLength: 100 }}
          onChange={e => {
            if (normalCharacter.test(e.target.value)) {
              setFieldValue('accountNumber', e.target.value);
            }
          }}
        />
      </Row>
      <Row>
        <FieldTextContent
          style={{ maxWidth: 350 }}
          name="accountName"
          label={intl.formatMessage({ id: 'IDS_HMS_ACCOUNT_NAME' })}
          placeholder={intl.formatMessage({ id: 'IDS_HMS_ACCOUNT_NAME' })}
          inputProps={{ maxLength: 100 }}
          onChange={e => {
            if (rawAlphabetRegex.test(e.target.value)) {
              setFieldValue('accountName', voca.latinise(e.target.value).toUpperCase());
            }
          }}
        />
      </Row>
    </>
  );
};

export default React.memo(BankAccount);
