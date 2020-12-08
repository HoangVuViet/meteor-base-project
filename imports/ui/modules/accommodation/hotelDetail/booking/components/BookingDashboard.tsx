import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { BLUE_500, GREY_600 } from '../../../../../configs/colors';
import { ROUTES } from '../../../../../configs/routes';
import { some } from '../../../../../constants';
import { AppState } from '../../../../../redux/reducers';
import { ReactComponent as EmptyIcon } from '../../../../../svg/ic_empty_data.svg';
import { Col, Row } from '../../../../common/components/elements';
import SingleSelect from '../../../../common/components/SingleSelect';
import TableCustom, { Column } from '../../../../common/components/TableCustom';
import { goToReplace } from '../../../../common/redux/reducer';
import {
  getPaymentStatus,
  getStatus,
  IBookingDefaultPagination,
  ORDER_STATUS_TYPES,
  IBookingFilter,
} from '../utils';
import Filter from './Filter';
import { isEmpty } from '../../../utils';

interface Props {
  loading: boolean;
  bookingDataList?: some;
  setFilter: (value: IBookingFilter) => void;
  filter: IBookingFilter;
}

const BookingDashboard: React.FC<Props> = props => {
  const { loading, bookingDataList, setFilter, filter } = props;

  const intl = useIntl();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  // const { roleUser } = useSelector((state: AppState) => state.auth, shallowEqual);

  const columns = React.useMemo(() => {
    return [
      {
        styleHeader: { color: GREY_600 },
        style: { fontWeight: 500 },
        title: 'IDS_HMS_BOOKING_ORDER',
        dataIndex: 'maDonHang',
        variant: 'body2',
        render: (record: some, index: number) => (
          <Col>
            <Typography style={{ color: BLUE_500 }}>{record.maDonHang.code}</Typography>
            <Typography>{record.maDonHang.orderDate}</Typography>
            <Typography>{record.maDonHang.orderTime}</Typography>
          </Col>
        ),
      },
      {
        styleHeader: { color: GREY_600 },
        title: 'status',
        dataIndex: 'trangThai',
        variant: 'body2',
        render: (record: any, index: number) => (
          <Typography
            gutterBottom
            variant="body2"
            component="span"
            style={{ color: getStatus(record?.trangThai).color }}
          >
            <FormattedMessage id={getStatus(record?.trangThai).id} />
          </Typography>
        ),
      },
      {
        styleHeader: { color: GREY_600 },
        title: 'IDS_HMS_BOOKING_ORDER_CODE',
        dataIndex: 'thongTinPhong',
        variant: 'body2',
      },
      {
        styleHeader: { color: GREY_600 },
        title: 'IDS_HMS_BOOKING_ORDER_STAYING_DAY',
        dataIndex: 'ngayLuuTru',
        variant: 'body2',
        render: (record: some, index: number) => (
          <Col>
            <Typography>{record.ngayLuuTru.date}</Typography>
            <Typography>{record.ngayLuuTru.night}</Typography>
          </Col>
        ),
      },
      {
        styleHeader: { color: GREY_600 },
        title: 'IDS_HMS_BOOKING_ORDER_CUSTOMER',
        variant: 'body2',
        render: (record: some, index: number) => (
          <Col>
            <Typography>{record.khachHang.name}</Typography>
            <Typography>{record.khachHang.sdt}</Typography>
            <Typography style={{ color: BLUE_500 }}>{record.khachHang.email}</Typography>
          </Col>
        ),
      },
      {
        styleHeader: { color: GREY_600 },
        title: 'IDS_HMS_BOOKING_NCC_MYTOUR',
        dataIndex: 'nCCMTour',
        variant: 'body2',
        render: (record: any, index: number) => (
          <Typography
            gutterBottom
            variant="body2"
            component="span"
            style={{ color: getPaymentStatus(record?.nCCMTour).color }}
          >
            <FormattedMessage id={getPaymentStatus(record?.nCCMTour).id} />
          </Typography>
        ),
      },
      {
        styleHeader: { color: GREY_600 },
        title: 'IDS_HMS_BOOKING_CUS_AND_MYTOUR',
        dataIndex: 'nCCMTour',
        variant: 'body2',
        render: (record: any, index: number) => (
          <Typography
            gutterBottom
            variant="body2"
            component="span"
            style={{ color: getPaymentStatus(record?.nCCMTour).color }}
          >
            <FormattedMessage id={getPaymentStatus(record?.nCCMTour).id} />
          </Typography>
        ),
      },
    ] as Column[];
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Row>
        <Typography variant="h5" style={{ marginBottom: 20 }}>
          <FormattedMessage id="managerHotels.booking" />
        </Typography>
      </Row>
      {!isEmpty(bookingDataList?.items) ? (
        <>
          <Row>
            <Col>
              <Filter
                onUpdateFilter={val => {
                  setFilter({
                    ...val,
                    status: filter.status,
                    pageOffset: IBookingDefaultPagination.pageOffset,
                    pageSize: IBookingDefaultPagination.pageSize,
                  });
                }}
              />
            </Col>
            <Col style={{ paddingBottom: 20, marginRight: 12 }}>
              <Typography gutterBottom variant="body2" component="span">
                <FormattedMessage id="IDS_HMS_FILTER" />
              </Typography>
            </Col>
            <Col>
              <SingleSelect
                value={filter.status}
                placeholder={intl.formatMessage({ id: 'all' })}
                multiple
                getOptionLabel={value => intl.formatMessage({ id: value.name })}
                options={ORDER_STATUS_TYPES}
                onSelectOption={(value: any) => {
                  setFilter({
                    ...filter,
                    pageSize: IBookingDefaultPagination.pageSize,
                    pageOffset: IBookingDefaultPagination.pageOffset,
                    status: value,
                  });
                }}
                formControlStyle={{ width: 250 }}
              />
            </Col>
          </Row>
          <TableCustom
            style={{ borderRadius: 8 }}
            dataSource={bookingDataList?.items || []}
            columns={columns}
            noColumnIndex
            onRowClick={(record: some, index: number) =>
              dispatch(
                goToReplace({
                  pathname: ROUTES.managerHotels.hotelInfo.booking.detail.replace(
                    ':hotelId',
                    record?.id,
                  ),
                }),
              )
            }
            loading={loading}
            paginationProps={{
              count: bookingDataList?.total || 0,
              page: filter.pageOffset || 0,
              rowsPerPage: filter.pageSize || 10,
              onChangePage: (e: unknown, newPage: number) => {
                setFilter({ ...filter, pageOffset: newPage });
              },
              onChangeRowsPerPage: (e: React.ChangeEvent<HTMLInputElement>) => {
                setFilter({ ...filter, pageSize: Number(e.target.value), pageOffset: 0 });
              },
            }}
          />
        </>
      ) : (
        <Paper style={{ height: '100%', borderRadius: 12 }}>
          <Col style={{ width: '100%', textAlign: 'center' }}>
            <EmptyIcon style={{ margin: '200 auto', marginBottom: 8 }} />
            <Typography gutterBottom variant="subtitle2" component="p" style={{ color: GREY_600 }}>
              <FormattedMessage id="IDS_HMS_BOOKING_EMPTY_DESCRIPTION" />
            </Typography>
          </Col>
        </Paper>
      )}
    </>
  );
};
export default BookingDashboard;
