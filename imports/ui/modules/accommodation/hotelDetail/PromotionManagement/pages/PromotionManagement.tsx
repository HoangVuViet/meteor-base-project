import { Button, IconButton, Paper, Switch, Tab, Tabs, Typography } from '@material-ui/core';
import querystring from 'query-string';
import React, { useCallback, useEffect, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { FormattedMessage, useIntl } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
// import { useHistory } from 'react-router-dom';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { CRAYOLA, GREEN, GREY_400, GREY_600 } from '../../../../../configs/colors';
import { ROUTES } from '../../../../../configs/routes';
import { PAGE_SIZE, SUCCESS_CODE } from '../../../../../constants';
import TableCustom, { Column } from '../../../../../modules/common/components/TableCustom';
import { AppState } from '../../../../../redux/reducers';
import { ReactComponent as AddIcon } from '../../../../../svg/ic_addIcon.svg';
import { ReactComponent as DeleteIconCircle } from '../../../../../svg/ic_delete_circle.svg';
import {
  defaultPromotionFilterProps,
  PromotionFilterProps,
  PROMOTION_STATUS,
  WEEKLY,
} from '../../../../accommodation/constant';
import { Col, Row } from '../../../../common/components/elements';
import Link from '../../../../common/components/Link';
import SingleSelect from '../../../../common/components/SingleSelect';
import { actionPromotions, getListPromotions } from '../../../accommodationService';
import '../../../result/Result.scss';
import Filters from '../components/Filters';

const mapStateToProps = (state: AppState) => {
  return {
    userData: state.account.userData,
  };
};

interface Props {}

const PromotionManagement: React.FunctionComponent<Props> = props => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const intl = useIntl();
  const [dataList, setData] = useState<any>({});

  const [filter, setFilter] = React.useState<PromotionFilterProps>(defaultPromotionFilterProps);
  const [loading, setLoading] = React.useState(false);
  const [popAnchor, setPopAnchor] = React.useState<any>(null);
  const [listPromotions, setListPromotions] = useState<any>();

  // const history = useHistory();
  const match: any = useRouteMatch();

  // const listRoutes = [ROUTES.managerHotels.results.pending, ROUTES.managerHotels.results.approve];
  const getData = () => PROMOTION_STATUS;

  const fetchData = useCallback(
    async (resultFilter: PromotionFilterProps) => {
      try {
        const data = await dispatch(getListPromotions());
        setListPromotions(data?.data?.items);
        setData({});
        const searchStr = querystring.stringify({
          pageOffset: 0,
          pageSize: PAGE_SIZE,
          hotelId: match?.params?.hotelId,
        });
        setLoading(true);
        const res = await dispatch(actionPromotions(searchStr, resultFilter));
        if (res?.code === SUCCESS_CODE) {
          setData(res?.data);
        }
        setLoading(false);
      } catch (error) {}
    },
    [dispatch, match],
  );

  const getPathName = (path: string) => {
    return path.replace(':hotelId', match?.params?.hotelId);
  };

  useEffect(() => {
    setFilter({ ...defaultPromotionFilterProps });
  }, []);

  useEffect(() => {
    fetchData(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const columns = React.useMemo(() => {
    const temp = [
      {
        title: 'IDS_HMS_PROGRAM_NAME',
        dataIndex: 'name',
        width: 78,
        styleHeader: { color: GREY_600 },
      },
      {
        styleHeader: { color: GREY_600 },
        title: 'IDS_HMS_TYPES',
        dataIndex: 'promotionTypeId',
        render: (record: any, index: number) => {
          const promotionName = listPromotions?.find(
            (element: any) => element.id === record.promotionTypeId,
          )?.name;
          return (
            <Typography gutterBottom variant="body2">
              {promotionName}
            </Typography>
          );
        },
      },
      {
        title: 'IDS_HMS_DISCOUNTS_RATE',
        styleHeader: { color: GREY_600 },
        dataIndex: 'amount',
        render: (record: any, index: number) => {
          return (
            <Typography gutterBottom variant="body2">
              {record.amount}
              {record.discountType === 'PERCENTAGE' ? '%' : 'VND'}
            </Typography>
          );
        },
      },
      {
        title: 'IDS_HMS_APPLY_TIMES',
        styleHeader: { color: GREY_600 },
        dataIndex: 'discountOnWeekdays',
        render: (record: any, index) => {
          const dayName: any[] = [];
          record.discountOnWeekdays.forEach((element: any) => {
            const day = WEEKLY.find(ele => ele.alias === element)?.name;
            dayName.push(`${intl.formatMessage({ id: day })}, `);
          });
          dayName[dayName.length - 1] = dayName[dayName.length - 1].substring(
            0,
            dayName[dayName.length - 1].length - 2,
          );
          return (
            <Typography gutterBottom variant="body2">
              {record?.applyBookingFrom} - {record?.applyBookingTo} <br />
              {dayName}
            </Typography>
          );
        },
      },
    ] as Column[];
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
          if (record?.status === 1) return getStatus('activated', GREEN);
          if (record?.status === 0) return getStatus('inactivate', CRAYOLA);
          if (record?.status === -1) return getStatus('deleted', GREY_400);
          if (record?.status === -2) return getStatus('IDS_HMS_EXPIRE', GREY_400);
          return null;
        },
      },
      {
        title: null,
        dataIndex: 'action',
        width: 70,
        disableAction: true,
        render: (record: any, index: number) => (
          <>
            <Switch color="primary" />
          </>
        ),
      },
      {
        title: null,
        dataIndex: 'action',
        width: 70,
        disableAction: true,
        render: (record: any, index: number) => (
          <>
            <IconButton
              id={record?.id}
              key={index}
              onClick={e => {
                if (e?.currentTarget === popAnchor) {
                  setPopAnchor(null);
                } else setPopAnchor(e?.currentTarget);
              }}
            >
              <DeleteIconCircle />
            </IconButton>
          </>
        ),
      },
    ] as Column[];
  }, [intl, listPromotions, popAnchor]);

  // const handleChangeTab = (e: React.ChangeEvent<{}>, newValue: any) => {
  //   history.replace({ pathname: listRoutes[newValue] });
  // };

  const getTitle = () => {
    return intl.formatMessage({ id: 'IDS_HMS_PROMOTION_MANAGEMENT' });
  };
  return (
    <>
      <Paper variant="outlined" square className="header-tab-container">
        <Row style={{ justifyContent: 'space-between' }}>
          <Row>
            <Typography gutterBottom variant="h5">
              {getTitle()}
            </Typography>
          </Row>
          <Col>
            <Tabs
              value={0}
              onChange={() => {}}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab
                style={{ minWidth: 'unset' }}
                label={intl.formatMessage({ id: 'IDS_HMS_PROMOTION_MANAGEMENT' })}
              />
              <Tab
                style={{ minWidth: 'unset' }}
                fullWidth
                label={intl.formatMessage({ id: 'IDS_HMS_UPDATE_HISTORY' })}
              />
            </Tabs>
          </Col>
        </Row>
      </Paper>
      <Row>
        <Row style={{ width: '100%' }}>
          <Col>
            <Filters
              listPromotions={listPromotions}
              filter={filter}
              onUpdateFilter={val => {
                fetchData(val);
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
              getOptionLabel={value => intl.formatMessage({ id: value.alias })}
              options={getData()}
              onSelectOption={(value: any) => {
                setFilter({
                  ...filter,
                  pageSize: defaultPromotionFilterProps.pageSize,
                  pageOffset: defaultPromotionFilterProps.pageOffset,
                  status: value,
                });
                fetchData({
                  ...filter,
                  status: value,
                });
              }}
              formControlStyle={{ width: 250 }}
            />
          </Col>
        </Row>
      </Row>

      <TableCustom
        dataSource={dataList?.items || []}
        columns={columns}
        noColumnIndex
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
        header={
          <Row
            style={{
              justifyContent: 'space-between',
              padding: '24px 16px',
            }}
          >
            <Typography
              variant="subtitle1"
              style={{
                fontWeight: 'bold',
              }}
            >
              <FormattedMessage id="IDS_HMS_LIST_PROGRAM" />
            </Typography>
            <Link to={{ pathname: getPathName(ROUTES.managerHotels.hotelInfo.promotion.create) }}>
              <Button variant="contained" color="secondary" style={{ height: 35 }} disableElevation>
                <AddIcon style={{ marginRight: 8 }} />
                <FormattedMessage id="IDS_HMS_CREATE_PROGRAM" />
              </Button>
            </Link>
          </Row>
        }
      />
    </>
  );
};

export default connect(mapStateToProps)(PromotionManagement);
