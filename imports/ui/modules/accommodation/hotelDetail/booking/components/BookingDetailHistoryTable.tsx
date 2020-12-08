import React from 'react';
import { Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import TableCustom, { Column } from '../../../../common/components/TableCustom';
import { getStatus, getPaymentStatus } from '../utils';
import { some } from '../../../../../constants';
import { GREY_600 } from '../../../../../configs/colors';

interface Props {
  data?: some[];
  loading: boolean;
}

const BookingDetailHistoryTable: React.FC<Props> = props => {
  const { data, loading } = props;

  const columns = React.useMemo(() => {
    return [
      {
        styleHeader: { color: GREY_600 },
        style: { fontWeight: 500 },
        title: 'IDS_HMS_TIME',
        dataIndex: 'date',
        variant: 'body2',
      },
      {
        styleHeader: { color: GREY_600 },
        style: { fontWeight: 500 },
        title: 'IDS_HMS_ORDER_STATUS',
        dataIndex: 'status',
        variant: 'body2',
        render: (record: any, index: number) => (
          <Typography
            gutterBottom
            variant="body2"
            component="span"
            style={{ color: getStatus(record?.status).color }}
          >
            <FormattedMessage id={getStatus(record?.status).id} />
          </Typography>
        ),
      },
      {
        styleHeader: { color: GREY_600 },
        style: { fontWeight: 500 },
        title: 'IDS_HMS_BOOKING_PAYMENT_CUS_MYTOUR',
        dataIndex: 'cusMytour',
        variant: 'body2',
        render: (record: any, index: number) => (
          <Typography
            gutterBottom
            variant="body2"
            component="span"
            style={{ color: getPaymentStatus(record?.cusMytour).color }}
          >
            <FormattedMessage id={getPaymentStatus(record?.cusMytour).id} />
          </Typography>
        ),
      },
      {
        styleHeader: { color: GREY_600 },
        style: { fontWeight: 500 },
        title: 'IDS_HMS_BOOKING_PAYMENT_NCC_MYTOUR',
        dataIndex: 'nccMytour',
        variant: 'body2',
        render: (record: any, index: number) => (
          <Typography
            gutterBottom
            variant="body2"
            component="span"
            style={{ color: getPaymentStatus(record?.nccMytour).color }}
          >
            <FormattedMessage id={getPaymentStatus(record?.nccMytour).id} />
          </Typography>
        ),
      },
    ] as Column[];
    // eslint-disable-next-line
  }, []);

  return (
    <TableCustom
      style={{ borderRadius: 8, width: '85%' }}
      dataSource={data || []}
      columns={columns}
      noColumnIndex
      loading={loading}
    />
  );
};
export default BookingDetailHistoryTable;
