import {
  Avatar,
  Button,
  ClickAwayListener,
  IconButton,
  Paper,
  Popper,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import querystring from 'query-string';
import React, { useCallback, useEffect, useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FormattedMessage, useIntl } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  CRAYOLA,
  GREEN,
  GREY_300,
  GREY_400,
  GREY_600,
  RED_500,
  YELLOW,
} from '../../../configs/colors';
import { ROUTES } from '../../../configs/routes';
import { some, SUCCESS_CODE } from '../../../constants';
import hotelLogo from '../../../images/defaultHotel.png';
import TableCustom, { Column } from '../../../modules/common/components/TableCustom';
import { AppState } from '../../../redux/reducers';
import { ReactComponent as AddIconCircleFill } from '../../../svg/ic_add_circle_fill.svg';
import { ReactComponent as DotIcon } from '../../../svg/ic_dotIcon.svg';
import { ReactComponent as EditIcon } from '../../../svg/ic_edit.svg';
import { Col, Row } from '../../common/components/elements';
import SingleSelect from '../../common/components/SingleSelect';
import { goToReplace } from '../../common/redux/reducer';
import { actionGetApprovalHotel } from '../accommodationService';
import {
  defaultResultAccommodationFilter,
  ResultAccommodationFilter,
  STATUS_LIST,
  STATUS_LIST_APPROVED,
} from '../constant';
import Filters from './components/Filters';
import './Result.scss';

const mapStateToProps = (state: AppState) => {
  return {
    userData: state.account.userData,
  };
};

interface Props extends ReturnType<typeof mapStateToProps> {
  dispatch: ThunkDispatch<AppState, null, Action<string>>;
}

const ResultAccommodation: React.FunctionComponent<Props> = props => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const intl = useIntl();
  const [dataList, setData] = useState<any>({});

  const [filter, setFilter] = React.useState<ResultAccommodationFilter>(
    defaultResultAccommodationFilter,
  );
  const [loading, setLoading] = React.useState(false);

  const [popAnchor, setPopAnchor] = React.useState<any>(null);
  const history = useHistory();
  const location = useLocation();
  const listRoutes = [ROUTES.managerHotels.results.pending, ROUTES.managerHotels.results.approve];
  const isApproval = location.pathname === ROUTES.managerHotels.results.approve;
  const getData = () => (!isApproval ? STATUS_LIST : STATUS_LIST_APPROVED);

  const fetchData = useCallback(
    async (resultFilter: ResultAccommodationFilter) => {
      try {
        setData({});
        const params: some = {
          isApproved: isApproval,
          pageOffset: resultFilter.pageOffset,
          pageSize: resultFilter.pageSize,
        };
        if (resultFilter && resultFilter.term) {
          params.term = resultFilter.term;
        }
        const searchStr = querystring.stringify(params);
        const dataSubmit: some = {
          provinceIds: resultFilter.provinceIds,
          status: resultFilter.status,
          starNumbers: resultFilter.starNumbers,
        };
        setLoading(true);
        const res = await dispatch(actionGetApprovalHotel(dataSubmit, searchStr));
        if (res?.code === SUCCESS_CODE) {
          setData(res?.data);
        }
        setLoading(false);
      } catch (error) {}
    },
    [dispatch, isApproval],
  );

  useEffect(() => {
    setFilter({ ...defaultResultAccommodationFilter, status: isApproval ? [1] : [-2] });
  }, [isApproval]);

  useEffect(() => {
    fetchData(filter);
  }, [fetchData, filter]);

  const linkDetail = React.useCallback(
    (id: string, record: some) => {
      if (record?.status === 0) {
        return ROUTES.managerHotels.createHotel.generalInfo.replace(':hotelId', id);
      }
      if (!isApproval) {
        return ROUTES.managerHotels.hotelInfo.approvalHotel.generalInfo.replace(':hotelId', id);
      }
      return ROUTES.managerHotels.hotelInfo.dashboard.replace(':hotelId', id);
    },
    [isApproval],
  );
  const columns = React.useMemo(() => {
    const temp = [
      { title: 'IDS_HMS_ID', dataIndex: 'id', width: 78, styleHeader: { color: GREY_600 } },
      {
        width: 64,
        render: (record: any, index: number) => (
          <Avatar
            alt="Logo"
            style={{
              width: 64,
              height: 64,
              objectFit: 'cover',
              backgroundColor: GREY_300,
              padding: record?.logo ? 0 : 10,
              opacity: record?.logo ? 1 : 0.8,
            }}
            src={record?.logo || hotelLogo}
          />
        ),
      },
      {
        styleHeader: { color: GREY_600 },
        title: 'IDS_HMS_ACCOMMODATION_NAME',
        dataIndex: 'name',
        render: (record: any, index: number) => (
          <Row>
            <Col>
              <Typography gutterBottom variant="subtitle1" component="span">
                {record.name || intl.formatMessage({ id: 'IDS_HMS_UPDATING' })}
              </Typography>
              <Rating value={record.starNumber} readOnly />
            </Col>
          </Row>
        ),
      },
      {
        title: 'IDS_HMS_ACCOMMODATION_ADDRESS',
        styleHeader: { color: GREY_600 },
        dataIndex: 'address',
        render: (record: any, index: number) => (
          <Col>
            <Typography gutterBottom variant="body2" component="span">
              {record.address || intl.formatMessage({ id: 'IDS_HMS_UPDATING' })}
            </Typography>
          </Col>
        ),
      },
    ] as Column[];
    if (!isApproval) {
      temp.push({
        title: '',
        dataIndex: 'progress',
        width: 120,
        render: (record: any, index: number) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              color: record?.progress === 100 ? GREEN : RED_500,
            }}
          >
            <span style={{ width: 30, height: 30 }}>
              <CircularProgressbar
                value={record?.progress}
                strokeWidth={10}
                styles={buildStyles({ pathColor: record?.progress === 100 ? GREEN : RED_500 })}
              />
            </span>

            <Typography
              gutterBottom
              variant="body2"
              component="span"
              style={{ margin: 0, marginLeft: 10 }}
            >
              {`${record?.progress} %`}
            </Typography>
          </div>
        ),
      });
    }
    return [
      ...temp,
      {
        styleHeader: { color: GREY_600 },
        title: 'status',
        width: 150,
        dataIndex: 'status',
        render: (record: any, index: number) => {
          const getStatus = (ids: string, color: string) => {
            return (
              <Typography gutterBottom variant="body2" component="span" style={{ color }}>
                <FormattedMessage id={ids} />
              </Typography>
            );
          };
          if (!isApproval) {
            if (record?.status === 0) return getStatus('IDS_HMS_DRAFT_STATUS', GREY_600);
            if (record?.status === -2) return getStatus('IDS_HMS_PENDING_STATUS', CRAYOLA);
            if (record?.status === -3) return getStatus('IDS_HMS_REJECT_STATUS', RED_500);
          } else {
            if (record?.status === -1) return getStatus('IDS_HMS_CLOSED_STATUS', GREY_600);
            if (record?.status === 1) return getStatus('IDS_HMS_OPEN_STATUS', GREEN);
            if (record?.status === 2) return getStatus('IDS_HMS_PAUSED_STATUS', YELLOW);
          }
          return null;
        },
      },
      // {
      //   title: 'IDS_HMS_ACCOMMODATION_SALE',
      //   dataIndex: 'channels',
      //   render: (record: any, index: number) => (
      //     <BootstrapTooltip title={record?.channels.join(', ')} placement="bottom">
      //       <Row>
      //         <ListViewIcon style={{ marginRight: 8 }} />
      //         <Typography
      //           gutterBottom
      //           variant="body2"
      //           component="span"
      //           style={{ margin: 0, color: BLUE_500 }}
      //         >
      //           <FormattedMessage id="IDS_HMS_LIST" />
      //         </Typography>
      //       </Row>
      //     </BootstrapTooltip>
      //   ),
      // },
      {
        styleHeader: { color: GREY_600, textAlign: 'center' },
        title: 'IDS_HMS_ACCOMMODATION_UPDATE',
        dataIndex: 'updatedTime',
        render: (record: any, index: number) => (
          <Col>
            <Typography
              gutterBottom
              variant="body2"
              component="span"
              style={{ alignSelf: 'center', textAlign: 'center', maxWidth: 120 }}
            >
              {record.updatedTime}
            </Typography>
          </Col>
        ),
      },
      {
        title: null,
        dataIndex: 'action',
        width: 70,
        disableAction: true,
        render: (record: any, index: number) => (
          <>
            {!isApproval ? (
              <Link to={{ pathname: linkDetail(record.id, record) }}>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Link>
            ) : (
              <div>
                <IconButton
                  id={record?.id}
                  key={index}
                  onClick={e => {
                    if (e?.currentTarget === popAnchor) {
                      setPopAnchor(null);
                    } else setPopAnchor(e?.currentTarget);
                  }}
                >
                  <DotIcon />
                </IconButton>
                <Popper
                  open={Boolean(popAnchor)}
                  anchorEl={popAnchor}
                  style={{ boxShadow: 'none' }}
                >
                  <ClickAwayListener onClickAway={() => setPopAnchor(null)}>
                    <Paper
                      style={{
                        width: 120,
                        borderRadius: 8,
                        padding: '8px 4px 12px 4px',
                        marginRight: 50,
                        marginTop: -12,
                        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.1), 0px 2px 5px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <Button
                        style={{
                          width: '100%',
                          borderBottom: `0.5px solid ${GREY_400}`,
                          borderRadius: 0,
                        }}
                        disableElevation
                      >
                        <Typography>
                          <FormattedMessage id="IDS_HMS_HOTEL_STOP" />
                        </Typography>
                      </Button>
                      <Button
                        style={{
                          width: '100%',
                          borderBottom: `0.5px solid ${GREY_400}`,
                          borderRadius: 0,
                        }}
                        disableElevation
                      >
                        <Typography>
                          <FormattedMessage id="IDS_HMS_HOTEL_CLOSE" />
                        </Typography>
                      </Button>
                    </Paper>
                  </ClickAwayListener>
                </Popper>
              </div>
            )}
          </>
        ),
      },
    ] as Column[];
  }, [intl, isApproval, linkDetail, popAnchor]);

  const handleChangeTab = (e: React.ChangeEvent<{}>, newValue: any) => {
    history.replace({ pathname: listRoutes[newValue] });
  };

  const getTitle = () => {
    if (!isApproval) return intl.formatMessage({ id: 'IDS_HMS_ACCOMMODATION_NOT_APPROVAL' });
    return intl.formatMessage({ id: 'IDS_HMS_ACCOMMODATION_APPROVAL' });
  };
  return (
    <>
      <Paper variant="outlined" square className="header-tab-container">
        <Row>
          <Row className="title-header">
            <Typography gutterBottom variant="h5" component="span">
              {getTitle()}
            </Typography>
          </Row>
          <Col>
            <Tabs
              value={isApproval ? 1 : 0}
              onChange={handleChangeTab}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label={intl.formatMessage({ id: 'IDS_HMS_ACCOMMODATION_NOT_APPROVAL' })} />
              <Tab label={intl.formatMessage({ id: 'IDS_HMS_ACCOMMODATION_APPROVAL' })} />
            </Tabs>
          </Col>
        </Row>
      </Paper>
      <Row>
        <Row style={{ width: '100%' }}>
          <Col>
            <Filters
              onUpdateFilter={val => {
                setFilter({
                  ...val,
                  status: filter.status,
                  pageOffset: defaultResultAccommodationFilter.pageOffset,
                });
              }}
            />
          </Col>
          <Col style={{ paddingBottom: 20, marginRight: 12 }}>
            <Typography gutterBottom variant="body2" component="span">
              <FormattedMessage id="status" />
            </Typography>
          </Col>
          <Col>
            <SingleSelect
              value={filter.status}
              placeholder={intl.formatMessage({ id: 'all' })}
              multiple
              getOptionLabel={value => intl.formatMessage({ id: value.name })}
              options={getData()}
              onSelectOption={(value: any) => {
                setFilter({
                  ...filter,
                  pageSize: defaultResultAccommodationFilter.pageSize,
                  pageOffset: defaultResultAccommodationFilter.pageOffset,
                  status: value,
                });
              }}
              formControlStyle={{ width: 250 }}
            />
          </Col>
        </Row>

        <Col style={{ paddingBottom: 20 }}>
          <Link to={{ pathname: ROUTES.managerHotels.create }} style={{ textDecoration: 'none' }}>
            <Button color="secondary" variant="contained" disableElevation style={{ width: 200 }}>
              <AddIconCircleFill style={{ marginRight: 8 }} />
              <FormattedMessage id="IDS_HMS_CREATE_NEW" />
            </Button>
          </Link>
        </Col>
      </Row>

      <TableCustom
        dataSource={dataList?.items || []}
        columns={columns}
        noColumnIndex
        onRowClick={(record: some, index: number) =>
          dispatch(goToReplace({ pathname: linkDetail(record.id, record) }))
        }
        loading={loading}
        paginationProps={{
          count: dataList?.total || 0,
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
  );
};

export default connect(mapStateToProps)(ResultAccommodation);
