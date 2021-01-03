export type some = { [key: string]: any };

type CA_ID = 1 | 17;

export const CA_ID: CA_ID = 1;

export const MT_ID: CA_ID = 17;

export const DEV = process.env.NODE_ENV === 'development';

export const STAGING = window.location.hostname.startsWith('stage.');

export const SUCCESS_CODE = 200;

export const TOKEN = 'token';

export const PAGE_SIZE = 10;

export const PAGE_SIZE_20 = 20;
export const PAGE_SIZE_8 = 8;

export const ROW_PER_PAGE = [10, 20, 30, 50];

export const TABLET_WIDTH_NUM = 1024;
export const MIN_TABLET_WIDTH_NUM = 750;
export const MOBILE_WIDTH_NUM = 480;
export const DESKTOP_WIDTH_NUM = 1375;

export const ACCESS_TOKEN = 'ACCESS_TOKEN';

const has = Object.prototype.hasOwnProperty;

export const isEmpty = (prop: any) => {
  return (
    prop === null ||
    prop === undefined ||
    (has.call(prop, 'length') && prop.length === 0) ||
    (prop.constructor === Object && Object.keys(prop).length === 0)
  );
};

export const checkRole = (roleExpect: string, roleUser: any) => {
  if (!roleUser || roleUser.length === 0) return false;
  return roleUser.some((v: some) => v.description === roleExpect);
};
export interface ICheckBox extends some {
  platformTypes: some[];
  customerTypes: some[];
  roomsTypes: some[];
  amenitiesTypes: some[];
}

export const URL_BASE = 'http://localhost:3000'