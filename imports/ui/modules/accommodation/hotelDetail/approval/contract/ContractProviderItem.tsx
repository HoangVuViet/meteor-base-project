import React from 'react';
import { Typography, Chip, Grid } from '@material-ui/core';
import moment from 'moment';
import { FormattedMessage, useIntl } from 'react-intl';
import { some } from '../../../../../constants';
import { DATE_FORMAT_BACK_END } from '../../../../../models/moment';
import {
  GREEN,
  GREEN_100,
  GREY_400,
  WHITE,
  GREY_600,
  GREY_900,
} from '../../../../../configs/colors';
import { isEmpty } from '../../../utils';
import ContractProviderDialog from './ContractProviderDialog';
import MoreFileDialog from './MoreFileDialog';

interface Props {
  contract: some;
  contractType: some;
  index: number;
  fetchContract: () => void;
}
const ContractProviderItem: React.FC<Props> = props => {
  const { contract, index, contractType, fetchContract } = props;
  const intl = useIntl();
  const isActive =
    contract.endDate === null ||
    (contract.endDate && moment().isBefore(moment(contract.endDate, DATE_FORMAT_BACK_END), 'days'));
  const genSelectDate = (date: string) => {
    return `${date || intl.formatMessage({ id: 'IDS_HMS_UNLIMITED' })}`;
  };
  const renderRow = (title: string, value: any) => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Typography gutterBottom variant="body2" component="span" style={{ color: GREY_600 }}>
            <FormattedMessage id={title} />
          </Typography>
        </Grid>
        <Grid
          item
          xs={8}
          style={{
            maxWidth: 340,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          <Typography
            title={value}
            gutterBottom
            variant="body2"
            component="span"
            style={{ color: GREY_900 }}
          >
            {value}
          </Typography>
        </Grid>
      </Grid>
    );
  };
  const hotelInvoice = (contractType?.items || []).find(
    (v: some) => v?.id === contract?.hotelInvoiceTypeId,
  );
  const getPeriod = (period: some) => {
    if (period?.timeType === 'BOOKING') return intl.formatMessage({ id: 'IDS_HMS_BOOKING' });
    if (period?.timeType === 'WEEKLY') return intl.formatMessage({ id: 'IDS_HMS_WEEKLY' });
    if (period?.timeType === 'MONTHLY') return intl.formatMessage({ id: 'IDS_HMS_MONTHLY' });
    if (period?.timeType === 'TWICE_MONTHLY')
      return intl.formatMessage({ id: 'IDS_HMS_TWICE_MONTHLY' });
    return '';
  };
  return (
    <div
      style={{
        borderRight: index % 3 === 2 ? undefined : `0.5px solid ${GREY_400}`,
        marginBottom: 12,
        minHeight: 386,
      }}
    >
      <Typography
        gutterBottom
        variant="body1"
        component="p"
        className="contract-text"
        style={{ marginBottom: 10 }}
      >
        <FormattedMessage id="IDS_HMS_CONTRACT" />
        <span>&nbsp;{index + 1}</span>
        <Chip
          label={intl.formatMessage({ id: isActive ? 'IDS_HMS_ACTIVE' : 'IDS_HMS_EXPIRE' })}
          style={{
            backgroundColor: isActive ? GREEN_100 : GREY_400,
            color: isActive ? GREEN : WHITE,
            marginLeft: 12,
          }}
        />
      </Typography>
      {renderRow('IDS_HMS_CONTRACT_TYPE', contractType?.name)}
      {renderRow('IDS_HMS_CONTRACT_CODE', contract?.contractCode)}
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Typography gutterBottom variant="body2" component="span" style={{ color: GREY_600 }}>
            <FormattedMessage id="IDS_HMS_MONEY_DISCOUNT" />
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography gutterBottom variant="body2" component="span" style={{ color: GREY_900 }}>
            {contract?.commission} %
          </Typography>
          <ContractProviderDialog contract={contract} fetchContract={fetchContract} />
        </Grid>
      </Grid>
      {renderRow('IDS_HMS_START_DATE', contract?.startDate)}
      {renderRow('IDS_HMS_END_DATE', genSelectDate(contract?.endDate))}
      {renderRow('IDS_HMS_PAYMENT_PERIOD', getPeriod(contract?.paymentTime))}
      {renderRow('IDS_HMS_CHECK_PERIOD', getPeriod(contract?.crossCheckingTime))}
      {renderRow('IDS_HMS_EXPORT_INFORM', hotelInvoice?.name)}
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Typography gutterBottom variant="body2" component="span" style={{ color: GREY_600 }}>
            <FormattedMessage id="IDS_HMS_CONTRACT_FILE" />
          </Typography>
        </Grid>
        <Grid item xs={8}>
          {!isEmpty(contract?.files) &&
            contract?.files.map((el: some, idx: number) => {
              if (idx === 2) return <MoreFileDialog contract={contract} />;
              if (idx > 1) return null;
              return (
                <Typography key={el?.id} variant="body2" component="p">
                  <a href={el?.url} type="download" style={{ textDecoration: 'none' }}>
                    {el?.name}
                  </a>
                </Typography>
              );
            })}
          {}
        </Grid>
      </Grid>
    </div>
  );
};

export default ContractProviderItem;
