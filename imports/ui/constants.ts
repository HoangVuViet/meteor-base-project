export type some = { [key: string]: any };

type CA_ID = 1 | 17;

export const CA_ID: CA_ID = 1;

export const MT_ID: CA_ID = 17;

export const DEV = process.env.NODE_ENV === 'development';

export const STAGING = window.location.hostname.startsWith('stage.');

export const SUCCESS_CODE = 200;

export const TOKEN = 'token';

export const START_TIME = '2017';

export const END_TIME = '2020';

export const DATA: string = 'DATA_SAVE';

export const LOGIN: string = 'LOGIN';


export const baseConfigUrl = 'https://HoangVuViet.github.io';


export const PAGE_SIZE = 10;

export const PAGE_SIZE_20 = 20;
export const PAGE_SIZE_8 = 8;

export const convertTime = 24000000;

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
export const URL_CONFIG = 'http://history.openweathermap.org';
export const appToken = '093b90a9af239de17af3339289c83e69'
export const hereCredentials = {
  id: 'yATlKFDZwdLtjHzyTeCK',
  code: '0XXQyxbiCjVU7jN2URXuhg',
};

export const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1Ijoia2F1dG91MXMiLCJhIjoiY2tucnFobzdjMjhyMTJ1cGV0eWdrZWZ4OCJ9._C38VS7x6M3-blvHxLYboA';

export const stringSlug = (string = '') => {
  const separator = '-';
  const includeDot = false;
  let text = string;
  if (!text) text = '';
  text = text.toString().toLowerCase().trim();
  const sets = [
    { to: 'a', from: '[ÀÁÂÃÄÅÆĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶ]' },
    { to: 'c', from: '[ÇĆĈČ]' },
    { to: 'd', from: '[ÐĎĐÞ]' },
    { to: 'e', from: '[ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆ]' },
    { to: 'g', from: '[ĜĞĢǴ]' },
    { to: 'h', from: '[ĤḦ]' },
    { to: 'i', from: '[ÌÍÎÏĨĪĮİỈỊ]' },
    { to: 'j', from: '[Ĵ]' },
    { to: 'ij', from: '[Ĳ]' },
    { to: 'k', from: '[Ķ]' },
    { to: 'l', from: '[ĹĻĽŁ]' },
    { to: 'm', from: '[Ḿ]' },
    { to: 'n', from: '[ÑŃŅŇ]' },
    { to: 'o', from: '[ÒÓÔÕÖØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠ]' },
    { to: 'oe', from: '[Œ]' },
    { to: 'p', from: '[ṕ]' },
    { to: 'r', from: '[ŔŖŘ]' },
    { to: 's', from: '[ßŚŜŞŠ]' },
    { to: 't', from: '[ŢŤ]' },
    { to: 'u', from: '[ÙÚÛÜŨŪŬŮŰŲỤỦỨỪỬỮỰƯ]' },
    { to: 'w', from: '[ẂŴẀẄ]' },
    { to: 'x', from: '[ẍ]' },
    { to: 'y', from: '[ÝŶŸỲỴỶỸ]' },
    { to: 'z', from: '[ŹŻŽ]' },
  ];

  if (includeDot) sets.push({ to: '-', from: "[·/_.,:;']" });
  else sets.push({ to: '-', from: "[·/_,:;']" });

  sets.forEach((set) => {
    text = text.replace(new RegExp(set.from, 'gi'), set.to);
  });

  text = text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text

  if (typeof separator !== 'undefined' && separator !== '-') {
    text = text.replace(/-/g, separator);
  }

  return text ? text : 'a';
};

