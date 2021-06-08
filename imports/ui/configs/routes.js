// @material-ui/icons
import Chart from '../modules/chart/pages/Chart';
import HelloWorld from '../modules/chart/pages/HelloWorld';
import AeronetDownload from '../modules/download/pages/AeronetDownload';
import CalipsoDownload from '../modules/download/pages/CalipsoDownload';
import LandsatDownload from '../modules/download/pages/LandsatDownload';
import ModisDownload from '../modules/download/pages/ModisDownload';
import ViirsDownload from '../modules/download/pages/ViirsDownload';
import ArcMapLandsat from '../modules/map/pages/ArcMapLandsat';
import ArcMap from '../modules/map/pages/MapDisplay';
import AeronetProcess from '../modules/process/pages/AeronetProcess';
import CalipsoProcess from '../modules/process/pages/CalipsoProcess';
import LandsatProcess from '../modules/process/pages/LandsatProcess';
import ModisProcess from '../modules/process/pages/ModisProcess';
import ViirsProcess from '../modules/process/pages/ViirsProcess';
import Statistical from '../modules/statistical/pages/Statistical';
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
  report: '/management/wind',
  reportTMP: '/management/tmp',
  reportHUD: '/management/hud',
  reportPRESS: '/management/press2m',

  pm25: '/pm25Map',
  pm25Landsat: '/pm25Landsat',

  landsatDownload: '/download/wind',
  calipsoDownload: '/download/tmp',
  modisDownload: '/download/hud',
  viirsDownload: '/download/press2m',
  aeronetDownload: '/download/AERONET',

  landsatProcess: '/process/wind',
  calipsoProcess: '/process/tmp',
  modisProcess: '/process/hud',
  viirsProcess: '/process/press2m',
  aeronetProcess: '/process/AERONET',
};

export const DOWNLOAD_DATA_ROUTES = [
  {
    name: 'Landsat AOD',
    isModule: true,
    path: ROUTES.landsatDownload,
    exact: true,
    component: LandsatDownload,
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
    component: CalipsoDownload,
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
    component: ModisDownload,
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
    component: ViirsDownload,
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
    component: AeronetDownload,
    hidden: false,
    disableBreadcrumb: true,
    layout: '/admin',
    iconName: 'deviceHub',
  },
];

export const PROCESS_DATA_ROUTES = [
  {
    name: 'Landsat AOD',
    isModule: true,
    path: ROUTES.landsatProcess,
    exact: true,
    component: LandsatProcess,
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
    component: CalipsoProcess,
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
    component: ModisProcess,
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
    component: ViirsProcess,
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
    component: AeronetProcess,
    hidden: false,
    disableBreadcrumb: true,
    layout: '/admin',
    iconName: 'deviceHub',
  },
];

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
    name: 'Quản lý dữ liệu',
    iconName: 'library',
    component: Statistical,
    layout: '/admin',
    hidden: false,
  },
];

export const MAP_DISPLAY_ROUTES = [
  {
    name: 'Nhiệt độ',
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
    name: 'Gió',
    isModule: true,
    path: ROUTES.pm25,
    exact: true,
    component: ArcMap,
    hidden: false,
    disableBreadcrumb: true,
    layout: '/admin',
    iconName: 'tree',
  },
];

export const APP_ROUTES = [
  ...DOWNLOAD_DATA_ROUTES,
  ...PROCESS_DATA_ROUTES,
  ...MAP_DISPLAY_ROUTES,
  ...DATA_EVALUATION_ROUTES,
];
