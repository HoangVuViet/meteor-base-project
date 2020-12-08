import { PaginationFilter } from '../../models/pagination';
import { Gender } from '../common/components/utils';

export interface UserManagementInfo {
  name: string;
  email: string;
  dateOfBirth: string;
  gender: Gender;
  phone: string;
  id?: number;
  profilePhoto: string;
  recommender?: Recommender;
  createdTime?: string;
  updatedTime?: string;
  status?: number;
  updateBy?: Recommender;
}

export interface Recommender {
  id: number;
  name: string;
}
export interface AdminPermissions {
  provinceIds?: number[];
  groupOperatorId?: string;
}
export interface ProviderPermissions {
  hotelId?: number;
  groupOperatorId?: number;
  hotelName?: string;
}

export interface Decentralization {
  roleType?: string;
  admins: AdminPermissions[];
  providers: ProviderPermissions[];
}
export const defaultPermissions: ProviderPermissions | AdminPermissions = {
  groupOperatorId: undefined,
};

export const defaultDecentralization: Decentralization = {
  admins: [],
  providers: [],
};

export const defaultUserManagementInfo: UserManagementInfo = {
  name: '',
  email: '',
  dateOfBirth: '',
  gender: 'M',
  phone: '',
  profilePhoto: '',
};
export interface AddNewMember {
  email: string;
  name?: string;
  phone?: string;
  groupId?: number;
}
export const defaultAddNewMember: AddNewMember = {
  email: '',
  name: '',
  phone: '',
};

export interface AccountMembers extends PaginationFilter {
  field?: string;
  roleIds?: Number[];
  status?: number;
  emailValidated?: number;
}

export const defaultAccountMembers: AccountMembers = {
  pageOffset: 0,
  pageSize: 10,
  field: '',
};

export interface DataAccount {
  id: number;
  name: string;
  email: string;
  phone: string;
  profilePhoto: string | null;
  status?: number;
  emailValidated?: number;
}

export const defaultDataAccount: DataAccount = {
  id: 0,
  name: '',
  email: '',
  phone: '',
  profilePhoto: '',
};
