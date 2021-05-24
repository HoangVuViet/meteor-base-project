import { Button, Dialog, DialogContent, Divider, IconButton, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IconClose from '@material-ui/icons/CloseOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Form, Formik } from 'formik';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import ConfirmDialog from '../../common/components/ConfirmDialog';
import { Col, Row, snackbarSetting } from '../../common/components/elements';
import LoadingButton from '../../common/components/LoadingButton';
import TableCustom, { Column } from '../../common/components/TableCustom';
import { filterList } from '../utils';
import AddDataDialog from './AddDataDialog';
import EditDataDialog from './EditDataDialog';
import Filter from './Filter';
import { GREY, GREY_600 } from '/imports/ui/configs/colors';
import { isEmpty, some } from '/imports/ui/constants';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '/imports/ui/models/moment';

interface ITableProps {
  loading: boolean;
  dataList?: some[];
  setFilter: (value: some) => void;
  filter: some;
  handleDeleteData: (value: number) => void;
  handleAddData: (value: some) => void;
  handleEditData: (value: some) => void;
}

const Table: React.FunctionComponent<ITableProps> = (props) => {
  const { loading, dataList, setFilter, filter, handleDeleteData, handleEditData, handleAddData } =
    props;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);
  const [rowData, setRowData] = React.useState<some>({});

  const columns = React.useMemo(() => {
    const temp: Column[] = [
      {
        styleHeader: { color: GREY_600 },
        style: { fontWeight: 500 },
        title: 'Ngày thêm mới dữ liệu',
        dataIndex: 'bookingCode',
        variant: 'body2',
        render: (record: some, _index: number) => (
          <Col>
            <Typography variant="body2">
              {moment(record?.created || record?.createAt, DATE_TIME_FORMAT).format(DATE_FORMAT)}
            </Typography>
          </Col>
        ),
      },
      {
        styleHeader: { color: GREY_600 },
        title: 'orderCode',
        dataIndex: 'bookingCode',
        variant: 'body2',
        render: (record: some, _index: number) => (
          <Col>
            <Typography variant="body2">{record?.bookingCode || record?.dataName}</Typography>
          </Col>
        ),
      },
      {
        styleHeader: { color: GREY_600 },
        title: 'Định dạng file ảnh',
        dataIndex: 'imageP',
        variant: 'body2',
        render: (_record: some, _index: number) => (
          <Col>
            <Typography variant="body2">geotiff</Typography>
          </Col>
        ),
      },
      {
        styleHeader: { color: GREY_600 },
        title: 'Loại dữ liệu',
        variant: 'body2',
        render: (record: some, _index: number) => (
          <Col>
            <Typography variant="body2">
              {filterList?.find((el: some) => el.id === record?.dataType)?.name}
            </Typography>
          </Col>
        ),
      },
      {
        styleHeader: { color: GREY_600 },
        style: { fontWeight: 500 },
        title: 'Ngày thu nhận dữ liệu',
        variant: 'body2',
        render: (record: some, _index: number) => (
          <Col>
            <Typography variant="body2">
              {moment(record?.collectedDate, DATE_TIME_FORMAT).format(DATE_FORMAT)}
            </Typography>
          </Col>
        ),
      },
      {
        disableAction: true,
        render: (record: some, _index: number) => (
          <Row>
            <IconButton
              style={{
                marginRight: 10,
                padding: 4,
              }}
              onClick={() => {
                setEditOpen(true);
                setRowData(record);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              style={{
                padding: 4,
              }}
              onClick={() => {
                setOpen(true);
                setRowData(record);
              }}
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
  console.log('dataList', dataList);
  return (
    <React.Fragment>
      <Formik initialValues={{}} onSubmit={() => {}}>
        {() => (
          <Form>
            <div style={{ marginLeft: 12, marginTop: 10 }}>
              <Filter
                onUpdateFilter={(val) => {
                  setFilter({
                    ...filter,
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
        dataSource={dataList || []}
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
              <FormattedMessage id="listDisPlay" />
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
                  <FormattedMessage id="addNew" />
                </Typography>
              </Row>
            </LoadingButton>
          </Row>
        }
        loading={loading}
        paginationProps={{
          // count: bookingDataList?.totalCount || 0,
          count: dataList?.length || 0,
          page: filter.pageOffset || 0,
          rowsPerPage: filter.pageSize || 10,
          onChangePage: (_e: unknown, newPage: number) => {
            setFilter({ ...filter, pageOffset: newPage });
          },
          onChangeRowsPerPage: (e: React.ChangeEvent<HTMLInputElement>) => {
            setFilter({ ...filter, pageSize: Number(e.target.value), pageOffset: 0 });
          },
        }}
      />
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(!editOpen)}
        PaperProps={{
          style: {
            minWidth: 420,
          },
        }}
        maxWidth="lg"
      >
        <div
          style={{ padding: 16, fontWeight: 500, fontSize: 16, lineHeight: '26px', color: GREY }}
        >
          <Typography gutterBottom variant="body2" component="span">
            <FormattedMessage id="Chỉnh sửa dữ liệu" />
          </Typography>
        </div>
        <IconButton
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            padding: '8px',
          }}
          onClick={() => {
            setEditOpen(!editOpen);
          }}
        >
          <IconClose />
        </IconButton>
        <Divider />
        <DialogContent style={{ alignItems: 'center' }}>
          <Formik initialValues={{}} onSubmit={() => {}}>
            {({ values }) => (
              <Form>
                <EditDataDialog rowData={rowData} values={values} />
                <Divider />
                <Row style={{ padding: 16, justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="medium"
                    style={{ minWidth: 108, marginRight: 12 }}
                    onClick={() => {
                      setEditOpen(!editOpen);
                      handleEditData({
                        ...values,
                        createAt: moment(new Date()).format(DATE_FORMAT),
                        id: rowData.id,
                      });
                      enqueueSnackbar(
                        'Thành công',
                        snackbarSetting((key) => closeSnackbar(key), {
                          color: 'success',
                        }),
                      );
                    }} //''''must change edit func
                    disableElevation
                  >
                    <FormattedMessage id="accept" />
                  </Button>
                  <Button
                    variant="outlined"
                    size="medium"
                    style={{ minWidth: 108 }}
                    onClick={() => setEditOpen(!editOpen)}
                    disableElevation
                  >
                    <Typography variant="body2" color="textSecondary">
                      <FormattedMessage id="rejectData" />
                    </Typography>
                  </Button>
                </Row>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      <Dialog
        open={addOpen}
        onClose={() => setAddOpen(!addOpen)}
        PaperProps={{
          style: {
            minWidth: 420,
          },
        }}
        maxWidth="lg"
      >
        <div
          style={{ padding: 16, fontWeight: 500, fontSize: 16, lineHeight: '26px', color: GREY }}
        >
          <Typography gutterBottom variant="body2" component="span">
            <FormattedMessage id="Thêm mới dữ liệu" />
          </Typography>
        </div>
        <IconButton
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            padding: '8px',
          }}
          onClick={() => setAddOpen(!addOpen)}
        >
          <IconClose />
        </IconButton>
        <Divider />
        <DialogContent style={{ alignItems: 'center' }}>
          <Formik initialValues={{}} onSubmit={() => {}}>
            {({ values }) => (
              <Form>
                <AddDataDialog values={values} />
                <Divider />
                <Row style={{ padding: 16, justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="medium"
                    style={{ minWidth: 108, marginRight: 12 }}
                    onClick={() => {
                      handleAddData({
                        ...values,
                        createAt: moment(new Date()).format(DATE_FORMAT),
                        id: new Date().getTime(),
                      });
                      setAddOpen(!addOpen);
                      enqueueSnackbar(
                        'Thành công',
                        snackbarSetting((key) => closeSnackbar(key), {
                          color: 'success',
                        }),
                      );
                    }}
                    disableElevation
                    disabled={isEmpty(values)}
                  >
                    <FormattedMessage id="accept" />
                  </Button>
                  <Button
                    variant="outlined"
                    size="medium"
                    style={{ minWidth: 108 }}
                    onClick={() => setAddOpen(!addOpen)}
                    disableElevation
                  >
                    <Typography variant="body2" color="textSecondary">
                      <FormattedMessage id="rejectData" />
                    </Typography>
                  </Button>
                </Row>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      <ConfirmDialog
        open={open}
        onClose={() => setOpen(!open)}
        onAccept={() => {
          handleDeleteData(rowData.id);
          setOpen(false);
          enqueueSnackbar(
            'Thành công',
            snackbarSetting((key) => closeSnackbar(key), {
              color: 'success',
            }),
          );
        }}
        onReject={() => setOpen(!open)}
        titleLabel={
          <Typography gutterBottom variant="body2" component="span">
            <FormattedMessage id="deleteData" />
          </Typography>
        }
        acceptLabel="accept"
        rejectLabel="rejectData"
      >
        <div className="dialog-content">
          <Typography gutterBottom variant="body2" component="span">
            <FormattedMessage id="deleteDataConfirm" />
          </Typography>
        </div>
      </ConfirmDialog>
    </React.Fragment>
  );
};

export default Table;
