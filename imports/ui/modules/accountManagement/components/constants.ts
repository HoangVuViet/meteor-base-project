import { defaultPaginationFilter, PaginationFilter } from '../../../models/pagination';

export interface IGroupUserFilter extends PaginationFilter {
  name: string;
  type: string;
}
export interface IMemberManagementFilter extends PaginationFilter {
  status?: number;
  roleType?: string;
  hotelId?: number;
  groupOperatorId?: number;
  provinceIds?: number;
  term: string;
}

export const defaultMemberManagementFilter: IMemberManagementFilter = {
  term: '',
  ...defaultPaginationFilter,
};

export const defaultGroupUserFilter: IGroupUserFilter = {
  name: '',
  type: '',
  ...defaultPaginationFilter,
};

export const listPermissions = [
  { type: undefined, name: 'all' },
  { type: 'HMS_PRE_ADMIN', name: 'accManagement.admin' },
  { type: 'HMS_PRE_PROVIDER', name: 'accManagement.provider' },
  // { type: 'HMS_PRE_MARKETING', name: 'accManagement.marketing' },
];
