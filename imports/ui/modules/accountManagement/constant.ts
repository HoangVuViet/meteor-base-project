export const fakeNotification = {
  code: 200,
  message: 'Success',
  data: {},
};
export const fakeNotificationDialog = {};

export const fakeUserData = {};

export const DEFAULT_LINK_PHOTO =
  'https://www.googleapis.com/download/storage/v1/b/tourcdn/o/photos%2Fthumb_VPXSB76O6G_not-found-image.png?generation=1600350049551161&alt=media';

export interface GroupUserStep {
  action: string;
}

export const defaultGroupUserStep = [
  { action: 'set-general-info' },
  { action: 'add-hotel-and-member' },
];

export const LIST_STATUS = [
  {
    name: 'all',
    id: undefined,
  },
  {
    name: 'inactivate',
    id: -1,
  },
  {
    name: 'activated',
    id: 1,
  },
  {
    name: 'stopped',
    id: 0,
  },
];
