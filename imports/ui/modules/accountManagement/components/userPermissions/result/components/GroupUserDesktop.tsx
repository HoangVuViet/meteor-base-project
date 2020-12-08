import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router';
import { ROUTES } from '../../../../../../configs/routes';
import { some } from '../../../../../../constants';
import { Col, Row } from '../../../../../common/components/elements';
import LoadingButton from '../../../../../common/components/LoadingButton';
import TableCustom, { Column } from '../../../../../common/components/TableCustom';
import { ReactComponent as AddIcon } from '../../../../../../svg/ic_addIcon.svg';
import { ReactComponent as EditIcon } from '../../../../../../svg/ic_edit.svg';
import { IGroupUserFilter } from '../../../constants';
import Filter from './Filter';
import { GREY_600 } from '../../../../../../configs/colors';

interface Props {
  loading: boolean;
  data?: some;
  filter: IGroupUserFilter;
  onUpdateFilter(values: IGroupUserFilter): void;
}
const GroupUserDesktop: React.FC<Props> = props => {
  const { loading, data, filter, onUpdateFilter } = props;
  const history = useHistory();

  const columns = React.useMemo(() => {
    return [
      {
        title: 'id',
        dataIndex: 'id',
        styleHeader: { color: GREY_600, textAlign: 'center' },
        style: { textAlign: 'center' },
      },
      {
        title: 'accManagement.groupUsers',
        dataIndex: 'name',
        styleHeader: { width: 120, color: GREY_600 },
      },
      {
        title: 'accManagement.groupPermissions',
        dataIndex: 'type',
        styleHeader: { width: 120, color: GREY_600 },
      },
      {
        title: 'accManagement.UserNumber',
        dataIndex: 'numberUser',
        styleHeader: { width: 120, color: GREY_600 },
      },
      {
        render: (record: some, index: number) => (
          <Button style={{ padding: 4 }}>
            <EditIcon />
          </Button>
        ),
      },
    ] as Column[];
  }, []);

  return (
    <Col>
      <Filter loading={loading} filter={filter} onUpdateFilter={onUpdateFilter} />
      <TableCustom
        dataSource={data?.items}
        loading={loading}
        columns={columns}
        style={{ marginTop: 24, maxWidth: 836, borderRadius: '12px' }}
        header={
          <Row style={{ padding: '16px 12px', justifyContent: 'space-between' }}>
            <Typography variant="subtitle1">
              <FormattedMessage id="accManagement.listPermissions" />
            </Typography>
            <LoadingButton
              variant="contained"
              color="secondary"
              disableElevation
              loading={loading}
              style={{ height: 36, minWidth: 240 }}
              onClick={() =>
                history.replace({ pathname: ROUTES.accountInfo.groupUsers.create.generalInfo })
              }
            >
              <Row>
                <AddIcon style={{ marginRight: 10 }} />
                <FormattedMessage id="accManagement.addNewGroupUser" />
              </Row>
            </LoadingButton>
          </Row>
        }
        noColumnIndex
        paginationProps={{
          count: data?.total || 0,
          page: data?.total ? filter.pageOffset : 0,
          rowsPerPage: data?.total ? filter?.pageSize : 1,
          onChangePage: (event: unknown, newPage: number) => {
            onUpdateFilter({ ...filter, pageOffset: newPage });
          },
          onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => {
            onUpdateFilter({
              ...filter,
              pageSize: parseInt(event.target.value, 10),
              pageOffset: 0,
            });
          },
        }}
      />
    </Col>
  );
};

export default GroupUserDesktop;
