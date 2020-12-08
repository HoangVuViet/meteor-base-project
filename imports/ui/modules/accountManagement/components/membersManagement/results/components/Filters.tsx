import React from 'react';
import { useLocation } from 'react-router';
import { Row } from '../../../../../common/components/elements';
import { IMemberManagementFilter } from '../../../constants';
import AdminMemberFilterBox from './AdminMemberFilterBox';
import { ROUTES } from '../../../../../../configs/routes';
import MemberFilterBox from './MemberFilterBox';

interface Props {
  accountMembers(info: IMemberManagementFilter): void;
  filter: IMemberManagementFilter;
}

const Filters: React.FC<Props> = props => {
  const { accountMembers, filter } = props;
  const location = useLocation();
  const isAdmin = location.pathname === ROUTES.managerUsers.member.result;
  return (
    <Row style={{ alignItems: 'flex-start' }}>
      {isAdmin ? (
        <AdminMemberFilterBox filter={filter} onUpdateFilter={values => accountMembers(values)} />
      ) : (
        <MemberFilterBox filter={filter} onUpdateFilter={value => accountMembers(value)} />
      )}

      {/* <Row style={{ paddingLeft: 16 }}>
        <Typography variant="body2" style={{ minWidth: 100, marginBottom: 20 }}>
          <FormattedMessage id="IDS_HMS_SHOW" />
        </Typography>
        <SingleSelect
          value=""
          formControlStyle={{}}
          onSelectOption={(value: any) => {}}
          getOptionLabel={value => ''}
          options={[]}
          errorMessage=""
        />
      </Row> */}
    </Row>
  );
};

export default Filters;
