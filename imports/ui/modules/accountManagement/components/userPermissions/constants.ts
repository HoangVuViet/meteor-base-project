export interface PermissionItem {
  name: string;
  viewable?: { status: number; role: string[] };
  editable?: { status: number; role: string[] };
  listRole?: PermissionItem[];
}
export const fakePermission: PermissionItem[] = [
  {
    name: 'Trang giới thiệu chung về website',
  },
  {
    name: 'Admin dashboard',
  },
  {
    name: 'Provider dashboard',
  },
  {
    name: 'Marketing dashboard',
  },
  {
    name: 'Quản lý thông tin cá nhân',
    listRole: [
      {
        name: 'Thông tin chung',
        viewable: { status: 1, role: ['hms-pre:account:view'] },
        editable: { status: 0, role: ['hms-pre:account:edit'] },
      },
      {
        name: 'Quản lý thành viên',
        viewable: { status: 1, role: ['hms-pre:account:sub-account:view'] },
        editable: { status: 1, role: [] },
      },
    ],
  },
  {
    name: 'Quản lý người dùng',
    listRole: [
      {
        name: 'Danh sách người dùng',
        viewable: { status: 1, role: ['hms-pre:users:search'] },
        editable: { status: 1, role: [] },
      },
      {
        name: 'Quản lý phân quyền',
        viewable: {
          status: 1,
          role: ['hms-pre:group-operators:all-group', 'hms-pre:group-operators:detail-group'],
        },
        editable: {
          status: 1,
          role: [
            'hms-pre:group-operators:init-group',
            'hms-pre:group-operators:create-group',
            'hms-pre:group-operators:update-group',
            'hms-pre:group-operators:delete-group',
          ],
        },
      },
    ],
  },
  {
    name: 'Quản lý thông tin nhà cung cấp',
  },
  {
    name: 'Cập nhật thông tin chỗ nghỉ chưa được duyệt',
  },

  {
    name: 'Hồ sơ chỗ nghỉ',
    listRole: [
      {
        name: 'Thông tin chung',
      },
      {
        name: 'Thông tin liên hệ',
      },
    ],
  },
];
