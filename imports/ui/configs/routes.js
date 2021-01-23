
// @material-ui/icons
import Chart from '../modules/chart/pages/Chart';
import HelloWorld from '../modules/chart/pages/HelloWorld';
import NotFoundBox from '../modules/common/components/NotFoundBox';
import ArcMapLandsat from '../modules/map/pages/ArcMapLandsat';
import ArcMap from '../modules/map/pages/ArcMapPM25';
export const ROUTES = {
  login: '/login',
  forgotPass: '/forgot-password',
  // firstLogin: '/firstLogin',
  register: '/register',
  resetPassword: '/reset-password',
  setPassword: '/set-password',
  landingPage: '/landing-page',
  notFound: '/404',

  homeDashboard: '/dashboard',
  chart: '/chart',

  pm25: '/pm25Map',
  pm25Landsat: '/pm25Landsat',

  landsatDownload: '/download/Landsat',
  calipsoDownload: '/download/CALIPSO',
  modisDownload: '/download/MODIS',
  viirsDownload: '/download/VIIRS',
  aeronetDownload: '/download/AERONET',

  landsatProcess: '/process/landsat',
  calipsoProcess: '/process/CALIPSO',
  modisProcess: '/process/MODIS',
  viirsProcess: '/process/VIIRS',
  aeronetProcess: '/process/AERONET',
};

export const DOWNLOAD_DATA_ROUTES = [
  {
    name: 'Landsat AOD',
    isModule: true,
    path: ROUTES.landsatDownload,
    exact: true,
    component: NotFoundBox,
    hidden: false,
    disableBreadcrumb: true,
    layout: '/admin',
    iconName: 'dashboard',
  },
  {
    name: 'CALIPSO AOD',
    isModule: true,
    path: ROUTES.calipsoDownload,
    exact: true,
    component: NotFoundBox,
    hidden: false,
    disableBreadcrumb: true,
    layout: '/admin',
    iconName: 'callSplit',
  },
  {
    name: 'MODIS AOD',
    isModule: true,
    path: ROUTES.modisDownload,
    exact: true,
    component: NotFoundBox,
    hidden: false,
    disableBreadcrumb: true,
    layout: '/admin',
    iconName: 'category',
  },
  {
    name: 'VIIRS AOD',
    isModule: true,
    path: ROUTES.viirsDownload,
    exact: true,
    component: NotFoundBox,
    hidden: false,
    disableBreadcrumb: true,
    layout: '/admin',
    iconName: 'dataUsage',
  },
  {
    name: 'AERONET AOD',
    isModule: true,
    path: ROUTES.aeronetDownload,
    exact: true,
    component: NotFoundBox,
    hidden: false,
    disableBreadcrumb: true,
    layout: '/admin',
    iconName: 'deviceHub',
  },
]

export const PROCESS_DATA_ROUTES = [
  {
    name: 'MODIS',
    isModule: true,
    path: ROUTES.landsatProcess,
    exact: true,
    component: NotFoundBox,
    hidden: false,
    disableBreadcrumb: true,
    layout: '/admin',
    iconName: 'dashboard',
  },
  {
    name: 'CALIPSO AOD',
    isModule: true,
    path: ROUTES.calipsoProcess,
    exact: true,
    component: NotFoundBox,
    hidden: false,
    disableBreadcrumb: true,
    layout: '/admin',
    iconName: 'callSplit',
  },
  {
    name: 'MODIS AOD',
    isModule: true,
    path: ROUTES.modisProcess,
    exact: true,
    component: NotFoundBox,
    hidden: false,
    disableBreadcrumb: true,
    layout: '/admin',
    iconName: 'category',
  },
  {
    name: 'VIIRS AOD',
    isModule: true,
    path: ROUTES.viirsProcess,
    exact: true,
    component: NotFoundBox,
    hidden: false,
    disableBreadcrumb: true,
    layout: '/admin',
    iconName: 'dataUsage',
  },
  {
    name: 'AERONET AOD',
    isModule: true,
    path: ROUTES.aeronetProcess,
    exact: true,
    component: NotFoundBox,
    hidden: false,
    disableBreadcrumb: true,
    layout: '/admin',
    iconName: 'deviceHub',
  },
]


export const DATA_EVALUATION_ROUTES = [
  {
    path: ROUTES.chart,
    name: 'Đánh giá sản phẩm ảnh vệ tinh',
    iconName: 'timeLine',
    component: Chart,
    layout: '/admin',
    hidden: false,

  },
  {
    path: '/typography',
    name: 'Tìm kiếm, thống kê',
    iconName: 'library',
    component: HelloWorld,
    layout: '/admin',
    hidden: false,

  },
]

export const MAP_DISPLAY_ROUTES = [
  {
    name: 'PM2.5 MODIS',
    isModule: true,
    path: ROUTES.pm25,
    exact: true,
    component: ArcMap,
    hidden: false,
    disableBreadcrumb: true,
    layout: '/admin',
    iconName: 'tree',
  },
  {
    name: 'PM2.5 Landsat',
    isModule: true,
    path: ROUTES.pm25Landsat,
    exact: true,
    component: ArcMapLandsat,
    hidden: false,
    disableBreadcrumb: true,
    layout: '/admin',
    iconName: 'map',
  },
  {
    name: 'notFound404',
    isModule: true,
    path: ROUTES.notFound,
    component: NotFoundBox,
    disableBreadcrumb: true,
    hidden: true,
  },
];


export const APP_ROUTES = [...DOWNLOAD_DATA_ROUTES, ...PROCESS_DATA_ROUTES, ...MAP_DISPLAY_ROUTES, ...DATA_EVALUATION_ROUTES]