export type ServiceType = 'chart' | 'groupAccountInfo';

export type PermissionType =
  | 'view'
  | 'add'
  | 'edit'
  | 'delete'
  | 'viewDetail'
  | 'updateStore'
  | 'active';

export interface Role {
  module: ServiceType;
  role: PermissionType[];
}
export interface RoutesTabType {
  name: ServiceType | string; // key of module
  title?: string; // string id of title breadcrumb sidebar helmet
  path?: string; // path link
  directPath?: string;
  module?: string; // path link
  component?: any;
  isModule?: boolean; // is highest page
  hidden?: boolean;
  hiddenMenu?: RoutesTabType[];
  subMenu?: RoutesTabType[];
  backStep?: number;
  exact?: boolean;
  listRole?: Role[];
  noStickyHeader?: boolean;
  disableInBreadcrumb?: boolean;
  disableBreadcrumb?: boolean;
}
