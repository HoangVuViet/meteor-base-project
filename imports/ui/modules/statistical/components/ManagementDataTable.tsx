import { IconButton, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import ConfirmDialog from '../../common/components/ConfirmDialog';
import { Row } from '../../common/components/elements';
import LoadingButton from '../../common/components/LoadingButton';
import TableCustom, { Column } from '../../common/components/TableCustom';
import { dataFake } from './dataFake';
import Filter from './Filter';
import { some } from '/imports/ui/constants';
interface ITableProps {
  loading: boolean;
  dataList?: some;
  setFilter: (value: some) => void;
  filter: some;
}

const Table: React.FunctionComponent<ITableProps> = (props) => {
  const { loading, dataList, setFilter, filter } = props;

  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);


  const columns = React.useMemo(() => {
    const temp: Column[] = [
      {
        title: 'id',
        dataIndex: 'employeeCode',
        variant: 'body2',
      },
      {
        title: 'name',
        dataIndex: 'name',
        variant: 'body2',
      },
      {
        title: 'Ngày sinh',
        dataIndex: 'birthday',
        variant: 'body2',
      },
      {
        title: 'email',
        dataIndex: 'email',
        variant: 'body2',
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
              onClick={() => setEditOpen(true)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              style={{
                padding: 4,
              }}
              onClick={() => setOpen(true)}
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
      <Formik initialValues={{}} onSubmit={() => {}}>
        {() => (
          <Form>
            <div style={{ marginLeft: 12, marginTop: 10 }}>
              <Filter
                onUpdateFilter={(val) => {
                  setFilter({
                    ...val,
                  });
                }}
              ></Filter>
            </div>
          </Form>
        )}
      </Formik>
      <TableCustom
        style={{
          borderRadius: 8,
          boxShadow: 'none',
          padding: '16px 12px',
          margin: '12px 12px 16px',
        }}
        dataSource={dataFake || []}
        columns={columns}
        noColumnIndex
        header={
          <Row
            style={{
              justifyContent: 'space-between',
              padding: '4px 16px 0px 16px',
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
                width: 180,
                height: 36,
                whiteSpace: 'nowrap',
              }}
              disableElevation
              onClick={() => setAddOpen(true)}
            >
              <Row>
                <AddIcon
                  style={{
                    marginRight: 8,
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
        paginationProps={{
          // count: bookingDataList?.totalCount || 0,
          count: 0,
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
      <ConfirmDialog
        open={open}
        onClose={() => setOpen(!open)}
        onAccept={() => setOpen(!open)} //''''
        onReject={() => setOpen(!open)}
        titleLabel={
          <Typography gutterBottom variant="body2" component="span">
            <FormattedMessage id="IDS_HMS_DELETE_CONTRACT" />
          </Typography>
        }
        acceptLabel="accept"
        rejectLabel="IDS_HMS_REJECT"
      >
        <div className="dialog-content">
          <Typography gutterBottom variant="body2" component="span">
            <FormattedMessage id="IDS_HMS_DELETE_CONTRACT_CONFIRM" />
          </Typography>
        </div>
      </ConfirmDialog>
      <ConfirmDialog
        open={editOpen}
        onClose={() => setEditOpen(!editOpen)}
        onAccept={() => setEditOpen(!editOpen)} //''''
        onReject={() => setEditOpen(!editOpen)}
        titleLabel={
          <Typography gutterBottom variant="body2" component="span">
            <FormattedMessage id="Chỉnh sửa dữ liệu" />
          </Typography>
        }
        acceptLabel="IDS_HMS_SAVE"
        rejectLabel="IDS_HMS_REJECT"
      >
        <div className="dialog-content">editOpen</div>
      </ConfirmDialog>
      <ConfirmDialog
        open={addOpen}
        onClose={() => setAddOpen(!addOpen)}
        onAccept={() => setAddOpen(!addOpen)} //''''
        onReject={() => setAddOpen(!addOpen)}
        titleLabel={
          <Typography gutterBottom variant="body2" component="span">
            <FormattedMessage id="Thêm mới dữ liệu" />
          </Typography>
        }
        acceptLabel="IDS_HMS_SAVE"
        rejectLabel="IDS_HMS_REJECT"
      >
        <div className="dialog-content">addOpen</div>
      </ConfirmDialog>
    </React.Fragment>
  );
};

export default Table;
