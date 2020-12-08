import { Button, TablePagination, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { FormattedMessage, useIntl } from 'react-intl';
import querystring from 'query-string';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { GREY_600 } from '../../../../configs/colors';
import { some, SUCCESS_CODE } from '../../../../constants';
import { AppState } from '../../../../redux/reducers';
import { ReactComponent as AddIconCircleFill } from '../../../../svg/ic_add_circle_fill.svg';
import { ReactComponent as EmptyIcon } from '../../../../svg/ic_empty_data.svg';
import { Col, Row } from '../../../common/components/elements';
import { getAllRatePlanList } from '../../accommodationService';
import { isEmpty } from '../../utils';
import NewRateDialog from './components/NewRateDialog';
import RatePlanItem from './components/RatePlanItem';
import './RatePlan.scss';
import { useStylePagination } from '../../../common/components/TableCustom';
import TablePaginationActionsCustom from '../../../common/components/TableCustom/TablePaginationActionsCustom';
import { Pagination } from '../../../../models/pagination';

let pagination: Pagination = { pageOffset: 0, pageSize: 10 };
const RatePlan: React.FunctionComponent = props => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const classesPagination = useStylePagination();
  const match: any = useRouteMatch();
  const intl = useIntl();

  const [rateList, setRateList] = React.useState<some>({});
  const [ratePlanID, setRatePlanID] = React.useState<number | undefined>(undefined);

  const fetchData = async () => {
    try {
      const params: some = {
        hotelId: match?.params?.hotelId,
        pageOffset: pagination.pageOffset,
        pageSize: pagination.pageSize,
      };
      const searchStr = querystring.stringify(params);
      const res = await dispatch(getAllRatePlanList(searchStr));
      if (res?.code === SUCCESS_CODE) setRateList(res?.data);
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchData();
    return () => {
      pagination = { pageOffset: 0, pageSize: 10 };
    }; // eslint-disable-next-line
  }, []);

  if (isEmpty(rateList?.items))
    return (
      <Row style={{ height: '100%', justifyContent: 'center' }}>
        <Col style={{ width: 400, textAlign: 'center' }}>
          <EmptyIcon style={{ margin: '0 auto', marginBottom: 8 }} />
          <Typography gutterBottom variant="subtitle2" component="p" style={{ color: GREY_600 }}>
            <FormattedMessage id="IDS_HMS_RATE_PLAN_DESCRIPTION" />
          </Typography>
          <span style={{ margin: '0 auto', marginTop: 32 }}>
            <Button
              color="secondary"
              variant="contained"
              disableElevation
              style={{ width: 200 }}
              onClick={() => setRatePlanID(-1)}
            >
              <AddIconCircleFill style={{ marginRight: 8 }} />
              <FormattedMessage id="IDS_HMS_NEW_RATE_PLAN" />
            </Button>
            <NewRateDialog
              setRatePlanID={setRatePlanID}
              ratePlanID={ratePlanID}
              handleFetchData={fetchData}
            />
          </span>
        </Col>
      </Row>
    );
  return (
    <>
      <Row>
        <Row style={{ width: '100%' }}>
          <Col style={{ paddingBottom: 20, marginRight: 12 }}>
            <Typography gutterBottom variant="subtitle1" component="span">
              <FormattedMessage id="IDS_HMS_RATE_PLAN_LIST" />
            </Typography>
          </Col>
        </Row>

        <Col style={{ paddingBottom: 20 }}>
          <Button
            color="secondary"
            variant="contained"
            disableElevation
            style={{ width: 200 }}
            onClick={() => setRatePlanID(-1)}
          >
            <AddIconCircleFill style={{ marginRight: 8 }} />
            <FormattedMessage id="IDS_HMS_NEW_RATE_PLAN" />
          </Button>
        </Col>
      </Row>
      {rateList?.items.map((el: some, i: number) => (
        <Fragment key={i}>
          <RatePlanItem item={el} handleFetchData={fetchData} setRatePlanID={setRatePlanID} />
        </Fragment>
      ))}
      <TablePagination
        component={Row}
        rowsPerPageOptions={[10, 15, 20, 25, 30, 35, 40]}
        classes={{
          root: classesPagination.root,
          selectRoot: classesPagination.selectRoot,
          selectIcon: classesPagination.selectIcon,
          input: classesPagination.input,
          actions: classesPagination.actions,
          caption: classesPagination.caption,
        }}
        labelRowsPerPage={intl.formatMessage({ id: 'labelRowPerPage' })}
        ActionsComponent={TablePaginationActionsCustom}
        count={rateList?.total || 0}
        page={pagination.pageOffset || 0}
        rowsPerPage={pagination.pageSize || 10}
        onChangePage={(e: unknown, newPage: number) => {
          pagination = { ...pagination, pageOffset: newPage };
          fetchData();
        }}
        onChangeRowsPerPage={(e: React.ChangeEvent<HTMLInputElement>) => {
          pagination = { pageSize: parseInt(e.target.value, 10), pageOffset: 0 };
          fetchData();
        }}
      />
      <NewRateDialog
        setRatePlanID={setRatePlanID}
        ratePlanID={ratePlanID}
        handleFetchData={fetchData}
      />
    </>
  );
};

export default RatePlan;
