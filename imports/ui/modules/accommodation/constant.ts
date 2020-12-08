import { some } from '../../constants';
import { PaginationFilter, defaultPaginationFilter } from '../../models/pagination';

export const FETCH_ROOM_TYPES = 'FETCH_ROOM_TYPES';
export const FETCH_ROOM_CLASS = 'FETCH_ROOM_CLASS';
export const FETCH_ROOM_VIEW = 'FETCH_ROOM_VIEW';
export const FETCH_BED_TYPES = 'FETCH_BED_TYPES';
export const FETCH_INFO_PHOTO = 'FETCH_INFO_PHOTO';
export const FETCH_RATE_TYPE = 'FETCH_RATE_TYPE';
export const FETCH_ROOM_LIST = 'FETCH_ROOM_LIST';
export const FETCH_FEATURE = 'FETCH_FEATURE';
export const FETCH_FEATURE_TYPE = 'FETCH_FEATURE_TYPE';
export const UPDATE_DRAG = 'UPDATE_DRAG';
export const UPDATE_CALENDAR_VIEW = 'UPDATE_CALENDAR_VIEW';
export const UPDATE_GENERAL_HOTEL = 'UPDATE_GENERAL_HOTEL';
export const UPDATE_RANGE_TIME = 'UPDATE_RANGE_TIME';
export const UPDATE_ROOM_ALLOTMENT = 'UPDATE_ROOM_ALLOTMENT';
export const UPDATE_ROOM_RATE_LIST = 'UPDATE_ROOM_RATE_LIST';
export const UPDATE_INFO_SELECTED = 'UPDATE_INFO_SELECTED';
export const UPDATE_DAY_WEEK = 'UPDATE_DAY_WEEK';

export interface createHotelProps {
  categoryId: number;
  subCategoryId: number;
}
export interface hotelProps {
  hotelId: number;
}
export interface saveDataLocalStorageProps {
  GENERAL: string;
  FACILITY: string;
  SETUP_ROOM: string;
  PAYMENT: string;
  GALLERY: string;
  POLICY: string;
  NEAR_BY: string;
  GUIDE: string;
}

export interface ResultAccommodationFilter extends PaginationFilter {
  term?: string;
  provinceIds?: number;
  starNumbers?: number[];
  status: number[];
}

export const defaultResultAccommodationFilter = {
  status: [-2],
  ...defaultPaginationFilter,
};

export const SAVE_DATA_LOCAL_STORAGE: saveDataLocalStorageProps = {
  GENERAL: 'general',
  FACILITY: 'facility',
  SETUP_ROOM: 'setup_room',
  PAYMENT: 'payment',
  GALLERY: 'gallery',
  POLICY: 'policy',
  NEAR_BY: 'near_by',
  GUIDE: 'guide',
};
export const STAR_LIST = [
  { name: '1 Sao', id: 1 },
  { name: '2 Sao', id: 2 },
  { name: '3 Sao', id: 3 },
  { name: '4 Sao', id: 4 },
  { name: '5 Sao', id: 5 },
];
export const STATUS_LIST = [
  { name: 'IDS_HMS_DRAFT_STATUS', id: 0 },
  { name: 'IDS_HMS_PENDING_STATUS', id: -2 },
  { name: 'IDS_HMS_REJECT_STATUS', id: -3 },
];
export const STATUS_LIST_APPROVED = [
  { name: 'IDS_HMS_CLOSED_STATUS', id: -1 },
  { name: 'IDS_HMS_OPEN_STATUS', id: 1 },
  { name: 'IDS_HMS_PAUSED_STATUS', id: 2 },
];

export const LIST_LINK_PHOTO_SUGGEST = [
  'https://admindev.mytour.vn/assets/mytour/images/1_1.jpg',
  'https://admindev.mytour.vn/assets/mytour/images/1_2.jpg',
  'https://admindev.mytour.vn/assets/mytour/images/1_3.jpg',
  'https://admindev.mytour.vn/assets/mytour/images/2_1.jpg',
  'https://admindev.mytour.vn/assets/mytour/images/2_2.jpg',
  'https://admindev.mytour.vn/assets/mytour/images/2_3.jpg',
  'https://admindev.mytour.vn/assets/mytour/images/3_1.jpg',
  'https://admindev.mytour.vn/assets/mytour/images/3_2.jpg',
  'https://admindev.mytour.vn/assets/mytour/images/3_3.jpg',
  'https://admindev.mytour.vn/assets/mytour/images/4_1.jpg',
  'https://admindev.mytour.vn/assets/mytour/images/4_2.jpg',
  'https://admindev.mytour.vn/assets/mytour/images/4_3.jpg',
];

export const MAX_AGE = 12;
export const PERIOD_LIST = [
  { name: 'IDS_HMS_BOOKING', id: 'BOOKING' },
  { name: 'IDS_HMS_WEEKLY', id: 'WEEKLY' },
  { name: 'IDS_HMS_MONTHLY', id: 'MONTHLY' },
  { name: 'IDS_HMS_TWICE_MONTHLY', id: 'TWICE_MONTHLY' },
];
export const WEEKLY = [
  { name: 'IDS_HMS_MONDAY', id: 2, alias: 'MONDAY' },
  { name: 'IDS_HMS_TUESDAY', id: 3, alias: 'TUESDAY' },
  { name: 'IDS_HMS_WEDNESDAY', id: 4, alias: 'WEDNESDAY' },
  { name: 'IDS_HMS_THURSDAY', id: 5, alias: 'THURSDAY' },
  { name: 'IDS_HMS_FRIDAY', id: 6, alias: 'FRIDAY' },
  { name: 'IDS_HMS_SATURDAY', id: 7, alias: 'SATURDAY' },
  { name: 'IDS_HMS_SUNDAY', id: 8, alias: 'SUNDAY' },
];
export const CUSTOMER: some = {
  DOMESTIC: 'IDS_HMS_DOMESTIC',
  FOREIGN: 'IDS_HMS_FOREIGN',
  MEMBER: 'IDS_HMS_MEMBER',
  NOT_MEMBER: 'IDS_HMS_NOT_MEMBER',
};
export const COMMUNICATION = [
  { name: 'IDS_HMS_MOBILE', id: 'MOBILE' },
  { name: 'IDS_HMS_WEBSITE', id: 'WEBSITE' },
  { name: 'IDS_HMS_EMAIL_UPPERCASE', id: 'EMAIL' },
];

export const PLATFORM_TYPES = [
  { name: 'IDS_HMS_MOBILE_CAPITALIZE', id: 'MOBILE' },
  { name: 'IDS_HMS_WEBSITE_CAPITALIZE', id: 'WEBSITE' },
  { name: 'email', id: 'EMAIL' },
];
export const CUSTOMER_TYPES = [
  // { name: 'IDS_HMS_DOMESTIC_CAPITALIZE', id: 'DOMESTIC' },
  // { name: 'IDS_HMS_FOREIGN_CAPITALIZE', id: 'FOREIGN' },
  { name: 'IDS_HMS_MEMBER_CAPITALIZE', id: 'MEMBER' },
  { name: 'IDS_HMS_NOT_MEMBER_CAPITALIZE', id: 'NOT_MEMBER' },
];

export const UP_DOWN_OPTION = [
  {
    id: 0,
    name: 'IDS_HMS_UP',
  },
  {
    id: 1,
    name: 'IDS_HMS_DOWN',
  },
];

export const RATIO_OPTION = [
  {
    id: 0,
    name: 'IDS_HMS_MONEY_UNIT',
  },
  {
    id: 1,
    name: 'IDS_HMS_PERCENT',
  },
];

export const VIEWS = [
  { name: 'IDS_HMS_VIEW_LIST', id: 0 },
  { name: 'IDS_HMS_VIEW_CALENDAR', id: 1 },
];

export const DECREASE_OPTION = [
  { id: 0, name: 'VND' },
  { id: 1, name: '%' },
];

export const FEE_OPTION = [
  {
    id: 0,
    name: 'IDS_HMS_FREE',
  },
  {
    id: 1,
    name: 'IDS_HMS_FEE',
  },
];
export const CHILDREN_AGE_OPTION = [
  {
    id: 0,
  },
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
  {
    id: 8,
  },
  {
    id: 9,
  },
  {
    id: 10,
  },
  {
    id: 11,
  },
  {
    id: 12,
  },
];
export const TIME_OPTION = [
  {
    id: 0,
    name: 'IDS_HMS_DAY_CAPITALIZE',
  },
  {
    id: 1,
    name: 'IDS_HMS_HOUR_CAPITALIZE',
  },
];
export const UNIT_OPTION = [
  {
    id: 1,
    name: 'IDS_HMS_POLICY_REFUND_UNIT',
  },
  {
    id: 2,
    name: 'IDS_HMS_CHILDREN_PRICE_NUMBER_FIRST_DAY',
  },
];
export const serviceAttached = [
  {
    id: 16,
    name: 'IDS_HMS_RATE_PLAN_BREAKFAST',
  },
  {
    id: 4,
    name: 'IDS_HMS_RATE_PLAN_AIR_TRANS',
  },
  {
    id: 91,
    name: 'IDS_HMS_RATE_PLAN_SPA',
  },
];
export const dayInWeek = [
  { title: 'Thứ 2', alias: 'Mon', value: 1 },
  { title: 'Thứ 3', alias: 'Tue', value: 2 },
  { title: 'Thứ 4', alias: 'Wed', value: 3 },
  { title: 'Thứ 5', alias: 'Thu', value: 4 },
  { title: 'Thứ 6', alias: 'Fri', value: 5 },
  { title: 'Thứ 7', alias: 'Sat', value: 6 },
  { title: 'Chủ nhật', alias: 'Sun', value: 0 },
];

export const PROMOTION_STATUS = [
  { title: 'Đã kích hoạt', alias: 'activated', id: 1 },
  { title: 'Chưa kích hoạt', alias: 'inactivate', id: 0 },
  { title: 'Đã xóa', alias: 'deleted', id: -1 },
  { title: 'Hết hạn', alias: 'IDS_HMS_EXPIRE', id: -2 },
];

export interface PromotionFilterProps extends PaginationFilter {
  status?: number[];
  promotionTypeIds?: number[];
  from?: string;
  to?: string;
}

export const defaultPromotionFilterProps = {
  pageOffset: 0,
  pageSize: 10,
};

export const TYPE_PRICE = [
  { id: 1, name: 'Giá mua' },
  { id: 2, name: 'Giá bán' },
];

export const CHECK_OPTION = [
  { id: 'CHECKIN_TIME', name: 'Check-in' },
  { id: 'CHECKIN_OUT', name: 'Check-out' },
];

export const DISCOUNTS_OPTION = [
  { id: 'NIGHT', name: 'Đêm' },
  { id: 'ROOM', name: 'Phòng' },
];
