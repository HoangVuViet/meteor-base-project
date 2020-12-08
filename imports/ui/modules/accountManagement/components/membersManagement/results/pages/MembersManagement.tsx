/* eslint-disable no-nested-ternary */
import { Typography } from '@material-ui/core';
import { debounce } from 'lodash';
import { useSnackbar } from 'notistack';
import queryString from 'query-string';
import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../../../../configs/API';
import { ROUTES } from '../../../../../../configs/routes';
import { some, SUCCESS_CODE } from '../../../../../../constants';
import { defaultPaginationFilter } from '../../../../../../models/pagination';
import { AppState } from '../../../../../../redux/reducers';
import { ReactComponent as AddFillIcon } from '../../../../../../svg/ic_addIcon.svg';
import { ReactComponent as EmptyIcon } from '../../../../../../svg/ic_emptyIcon.svg';
import { Col, Row, snackbarSetting } from '../../../../../common/components/elements';
import Link from '../../../../../common/components/Link';
import LoadingButton from '../../../../../common/components/LoadingButton';
import LoadingIcon from '../../../../../common/components/LoadingIcon';
import TableCardCustom from '../../../../../common/components/TableCardCustom';
import { fetchThunk } from '../../../../../common/redux/thunk';
import { defaultMemberManagementFilter, IMemberManagementFilter } from '../../../constants';
import AddNewMemberDialog from '../components/AddNewMemberDialog';
import Filters from '../components/Filters';
import MemberCard from '../components/MemberCard';
import { ROLES } from '../../../../../../layout/constants';

interface Props {}

const MembersManagement = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [dataAccounts, setDataAccounts] = React.useState<some | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [filter, setFilter] = React.useState<IMemberManagementFilter>(
    defaultMemberManagementFilter,
  );
  const [listOperator, setListOperator] = React.useState<some[]>([]);
  const match: any = useRouteMatch();
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleParams = (values: IMemberManagementFilter) => {
    return queryString.stringify({
      term: values.term,
      pageSize: values.pageSize,
      pageOffset: values.pageOffset,
    });
  };

  const hotelId = match.params?.hotelId;

  const getRoute = (id: string) => {
    if (hotelId) {
      return ROUTES.managerHotels.hotelInfo.memberManagement.listMember.detail
        .replace(':hotelId', hotelId)
        .replace(':userId', id);
    }
    return ROUTES.managerUsers.member.detail.replace(':userId', id);
  };

  const fetchListOperator = React.useCallback(
    debounce(
      async (role: string) => {
        try {
          const json = await dispatch(fetchThunk(API_PATHS.getGroupOperator(role)));
          if (json?.code === SUCCESS_CODE) {
            setListOperator(json.data?.items);
          }
        } catch (error) {}
      },
      200,
      {
        trailing: true,
        leading: false,
      },
    ),
    [],
  );

  const accountMembers = useCallback(
    async (params: IMemberManagementFilter) => {
      setLoading(true);
      const json = await dispatch(
        fetchThunk(
          hotelId
            ? `${API_PATHS.accountByHotelId(hotelId)}`
            : `${API_PATHS.accountMembers}?${handleParams(params)}`,
          'post',
          JSON.stringify({
            ...params,
            roleType: params.roleType,
            provinceIds: params.provinceIds ? [params.provinceIds] : undefined,
          }),
        ),
      );

      if (json?.code === SUCCESS_CODE) {
        setDataAccounts(json.data);
      } else {
        enqueueSnackbar(
          json.message,
          snackbarSetting(key => closeSnackbar(key), {
            color: 'error',
          }),
        );
      }
      setLoading(false);
    },
    [closeSnackbar, dispatch, enqueueSnackbar, hotelId],
  );

  React.useEffect(() => {
    accountMembers(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  React.useEffect(() => {
    fetchListOperator(ROLES.HMS_PRE_PROVIDER);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && hotelId) {
    return <LoadingIcon />;
  }

  if (hotelId && filter === defaultMemberManagementFilter && dataAccounts?.items?.length === 0) {
    return (
      <Col style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <EmptyIcon />
        <Typography variant="body2" color="textSecondary" style={{ margin: '8px 0px 24px 0px' }}>
          <FormattedMessage id="IDS_HMS_MEMBER_NO_MEMBER_TEXT" />
        </Typography>
        <LoadingButton
          loading={loading}
          variant="contained"
          color="secondary"
          style={{ minWidth: 210 }}
          disableElevation
          onClick={() => setOpenDialog(true)}
        >
          <Row>
            <AddFillIcon />
            <Typography variant="body2">
              <FormattedMessage id="addMember" />
            </Typography>
          </Row>
        </LoadingButton>
        <AddNewMemberDialog
          hotelId={hotelId}
          listOperator={listOperator}
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        />
      </Col>
    );
  }
  return (
    <Col style={{ width: '100%' }}>
      <Row style={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Filters
          filter={filter}
          accountMembers={value =>
            setFilter({
              ...value,
              pageOffset: defaultPaginationFilter.pageOffset,
              pageSize: defaultPaginationFilter.pageSize,
            })
          }
        />
        <LoadingButton
          loading={loading}
          variant="contained"
          color="secondary"
          style={{ minWidth: 210 }}
          disableElevation
          onClick={() => setOpenDialog(!openDialog)}
        >
          <Row>
            <AddFillIcon />
            <Typography variant="body2">
              <FormattedMessage id="addMember" />
            </Typography>
          </Row>
        </LoadingButton>
      </Row>
      <div style={{ flex: 1 }}>
        <TableCardCustom
          dataSource={dataAccounts?.items}
          renderItem={(v: any, index: number) => (
            <Link to={{ pathname: getRoute(v.id) }}>
              <MemberCard key={index} dataAccount={v} />
            </Link>
          )}
          loading={loading}
          styleTable={{ width: '100%', flex: 1 }}
          paginationProps={{
            count: dataAccounts?.total || 0,
            page: filter.pageOffset || 0,
            rowsPerPage: filter.pageSize || 10,
            onChangePage: (event: unknown, newPage: number) => {
              setFilter({ ...filter, pageOffset: newPage });
            },
            onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => {
              setFilter({ ...filter, pageSize: parseInt(event.target.value, 10), pageOffset: 0 });
            },
          }}
        />
      </div>
      <AddNewMemberDialog
        hotelId={hotelId}
        listOperator={listOperator}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </Col>
  );
};

export default MembersManagement;
