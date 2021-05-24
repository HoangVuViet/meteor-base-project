import {
  Button,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Paper,
  Typography,
} from '@material-ui/core';
import {
  DataGrid,
  GridColDef,
  GridRowData,
  GridToolbar,
  GridValueGetterParams,
} from '@material-ui/data-grid';
import AddIcon from '@material-ui/icons/Add';
import IconClose from '@material-ui/icons/CloseOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Form, Formik } from 'formik';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ConfirmDialog from '../../common/components/ConfirmDialog';
import { Col, Row, snackbarSetting } from '../../common/components/elements';
import LoadingButton from '../../common/components/LoadingButton';
import { filterList } from '../utils';
import AddDataDialog from './AddDataDialog';
import EditDataDialog from './EditDataDialog';
import { GREY } from '/imports/ui/configs/colors';
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
  const { dataList, handleDeleteData, handleEditData, handleAddData, loading } = props;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);
  const [rowData, setRowData] = React.useState<some>({});
  const intl = useIntl();

  const columns: GridColDef[] = React.useMemo(() => {
    return [
      {
        field: 'created',
        headerName: 'Ngày thêm mới dữ liệu',
        width: 250,
        headerClassName: 'super-app-theme--header',
        align: 'left',
        headerAlign: 'left',
        type: 'date',
        renderCell: (params: GridValueGetterParams | some) => (
          <Col>
            <Typography variant="body2">
              {moment(
                params?.getValue('created') || params?.getValue('createAt'),
                DATE_TIME_FORMAT,
              ).format(DATE_FORMAT)}
            </Typography>
          </Col>
        ),
      },
      {
        field: 'bookingCode',
        headerName: intl.formatMessage({ id: 'orderCode' }),
        width: 220,
        headerClassName: 'super-app-theme--header',
        align: 'left',
        headerAlign: 'left',
        type: 'string',
        renderCell: (params: GridValueGetterParams | some) => (
          <Col>
            <Typography variant="body2">
              {params?.getValue('bookingCode') || params?.getValue('dataName')}
            </Typography>
          </Col>
        ),
      },
      {
        field: 'imageP',
        headerName: intl.formatMessage({ id: 'Định dạng file ảnh' }),
        width: 220,
        headerClassName: 'super-app-theme--header',
        align: 'left',
        headerAlign: 'left',
        renderCell: (params: GridValueGetterParams | some) => (
          <Col>
            <Typography variant="body2">geotiff</Typography>
          </Col>
        ),
      },
      {
        field: 'dataType',
        headerName: intl.formatMessage({ id: 'Loại dữ liệu' }),
        width: 220,
        headerClassName: 'super-app-theme--header',
        align: 'left',
        headerAlign: 'left',
        type: 'string',
        renderCell: (params: GridValueGetterParams | some) => (
          <Col>
            <Typography variant="body2">
              {filterList?.find((el: some) => el.id === params?.getValue('dataType'))?.name}
            </Typography>
          </Col>
        ),
      },
      {
        field: 'collectedDate',
        headerName: intl.formatMessage({ id: 'Ngày thu nhận dữ liệu' }),
        width: 250,
        headerClassName: 'super-app-theme--header',
        align: 'left',
        headerAlign: 'left',
        type: 'date',
        renderCell: (params: GridValueGetterParams | some) => (
          <Col>
            <Typography variant="body2">
              {moment(params?.getValue('collectedDate'), DATE_TIME_FORMAT).format(DATE_FORMAT)}
            </Typography>
          </Col>
        ),
      },
      {
        field: 'Chỉnh Sửa / Xóa',
        width: 220,
        headerClassName: 'super-app-theme--header',
        align: 'left',
        headerAlign: 'left',
        renderCell: (params: GridValueGetterParams | some) => (
          <Row>
            <IconButton
              style={{
                marginRight: 10,
                padding: 4,
              }}
              onClick={() => {
                setEditOpen(true);
                setRowData(params.row);
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
                setRowData(params.row);
              }}
            >
              <DeleteIcon className="svgFillAll" />
            </IconButton>
          </Row>
        ),
      },
    ];
  }, []);

  console.log('rowData', rowData);
  return (
    <React.Fragment>
      <Row
        style={{
          justifyContent: 'space-between',
          padding: '4px 16px 0px 16px',
          marginTop: 10,
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
            width: 220,
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
      <Paper style={{ margin: '16px 12px', height: 620, width: '100%' }}>
        <DataGrid
          rows={dataList as GridRowData[]}
          columns={columns}
          pageSize={10}
          // checkboxSelection
          disableSelectionOnClick
          components={{
            Toolbar: GridToolbar,
          }}
          loading={loading}
        />
      </Paper>
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
                    }}
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
