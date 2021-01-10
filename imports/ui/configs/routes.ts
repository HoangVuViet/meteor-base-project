/* eslint-disable no-unused-vars */
import { RoutesTabType, ServiceType } from '../models/permission';
import Chart from '../modules/chart/pages/Chart';
import NotFoundBox from '../modules/common/components/NotFoundBox';
import ArcMap from '../modules/map/pages/ArcMap';
export const URL_PATH = '/';
function buildRoutePath(moduleName: ServiceType, path: string) {
  return `/${moduleName}${path}`;
}

export const ROUTES = {
  login: '/login',
  forgotPass: '/forgot-password',
  // firstLogin: '/firstLogin',
  register: '/register',
  resetPassword: '/reset-password',
  setPassword: '/set-password',
  landingPage: '/landing-page',
  notFound: '/404',
  homeDashboard: '/',
  chart: '/chart',
};

export const ROUTES_TAB: RoutesTabType[] = [
  {
    name: 'homeDashboard',
    isModule: true,
    path: ROUTES.homeDashboard,
    exact: true,
    component: ArcMap,
    hidden: true,
    disableBreadcrumb: true,
  },
  {
    name: 'chart',
    isModule: true,
    path: ROUTES.chart,
    exact: true,
    component: Chart,
    hidden: true,
    disableBreadcrumb: true,
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

export const ROUTES_ALL: RoutesTabType[] = [...ROUTES_TAB];
