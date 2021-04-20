import { IconButton, Typography } from '@material-ui/core';
import moment from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Col, Row } from '../../common/components/elements';
import TableCustom, { Column } from '../../common/components/TableCustom';
import { some } from '/imports/ui/constants';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import {
  DATE_FORMAT,
  DATE_FORMAT_BACK_END,
  DATE_TIME_FORMAT,
  TIME_FORMAT,
} from '/imports/ui/models/moment';
import LoadingButton from '../../common/components/LoadingButton';

interface ITableProps {}

const Table: React.FunctionComponent<ITableProps> = (_props) => {
  const columns = React.useMemo(() => {
    const temp: Column[] = [
      {
        style: { fontWeight: 500 },
        title: 'IDS_HMS_BOOKING_ORDER',
        dataIndex: 'bookingCode',
        variant: 'body2',
        render: (record: some, _index: number) => (
          <Col>
            {record?.orderCode ? (
              <Typography variant="body2">{record?.orderCode}</Typography>
            ) : (
              <Typography variant="body2">
                <FormattedMessage id="IDS_HMS_NULL_DATA" />
              </Typography>
            )}
            <Typography variant="body2">
              {moment(record?.created, DATE_TIME_FORMAT).format(DATE_FORMAT)}
            </Typography>
            <Typography variant="body2">
              {moment(record?.created, DATE_TIME_FORMAT).format(TIME_FORMAT)}
            </Typography>
          </Col>
        ),
      },
      {
        title: 'IDS_HMS_BOOKING_ORDER_CODE',
        dataIndex: 'bookingCode',
        variant: 'body2',
      },
      {
        title: 'IDS_HMS_BOOKING_ORDER_STAYING_DAY',
        dataIndex: 'checkIn-checkOut',
        variant: 'body2',
        render: (record: some, _index: number) => (
          <Col>
            <Typography variant="body2">
              <span>
                {moment(record?.checkIn, DATE_FORMAT_BACK_END).format(DATE_FORMAT)}&nbsp;-&nbsp;
                {moment(record?.checkOut, DATE_FORMAT_BACK_END).format(DATE_FORMAT)}
              </span>
            </Typography>
            <Typography variant="body2">
              <span>
                {moment(record?.checkOut, DATE_FORMAT_BACK_END).diff(
                  moment(record?.checkIn, DATE_FORMAT_BACK_END),
                  'days',
                )}
              </span>
              &nbsp;
              <FormattedMessage id="IDS_HMS_NIGHT" />
            </Typography>
          </Col>
        ),
      },
      {
        disableAction: true,
        render: (_record: some, _index: number) => (
          <Row>
            <IconButton
              style={{
                marginRight: 10,
                padding: 4,
              }}
              // onClick={() => onClickUpdate(record as ICreateUpdatePricePackage)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              style={{
                padding: 4,
              }}
              // onClick={() => setDeleteInfo(record as ICreateUpdatePricePackage)}
            >
              <DeleteIcon className="svgFillAll" />
            </IconButton>
          </Row>
        ),
      },
    ];
    return temp as Column[];
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <TableCustom
        style={{ borderRadius: 8, boxShadow: 'none', height: 600 }}
        dataSource={[]}
        columns={columns}
        noColumnIndex
        header={
          <Row
            style={{
              justifyContent: 'space-between',
              padding: '4px 16px',
            }}
          >
            <Typography
              variant="subtitle1"
              style={{
                fontWeight: 'bold',
              }}
            >
              <FormattedMessage id="ratePackage.listPackage" />
            </Typography>
            <LoadingButton
              variant="contained"
              color="secondary"
              style={{
                width: 150,
                height: 36,
              }}
              disableElevation
              // onClick={() => onClickCreate()}
            >
              <Row>
                <AddIcon
                  style={{
                    marginRight: 10,
                  }}
                />
                <Typography variant="body2">
                  <FormattedMessage id="ratePackage.createNewPricePackage" />
                </Typography>
              </Row>
            </LoadingButton>
          </Row>
        }
        // onRowClick={(record: some, index: number) =>
        //   dispatch(
        //     goToReplace({
        //       pathname: ROUTES.managerHotels.hotelInfo.booking.detail
        //         .replace(':bookingId', record?.id)
        //         .replace(':hotelId', match?.params?.hotelId),
        //     }),
        //   )
        // }
        loading={false}
        // paginationProps={{
        //   count: bookingDataList?.totalCount || 0,
        //   page: filter.pageOffset || 0,
        //   rowsPerPage: filter.pageSize || 10,
        //   onChangePage: (e: unknown, newPage: number) => {
        //     setFilter({ ...filter, pageOffset: newPage });
        //   },
        //   onChangeRowsPerPage: (e: React.ChangeEvent<HTMLInputElement>) => {
        //     setFilter({ ...filter, pageSize: Number(e.target.value), pageOffset: 0 });
        //   },
        // }}
      />
    </React.Fragment>
  );
};

export default Table;
