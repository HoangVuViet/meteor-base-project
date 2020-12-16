/* eslint-disable no-unused-vars */
import { RoutesTabType, ServiceType } from '../models/permission';
import NotFoundBox from '../modules/common/components/NotFoundBox';
import { HelloWorld } from './../HelloWorld';

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
  accountInfo: {
    // result: buildRoutePath('accountInfo', ''),
    value: buildRoutePath('accountInfo', '/:tabIndex'),
    generalInfo: buildRoutePath('accountInfo', '/general-info'),
    hotelInfo: buildRoutePath('accountInfo', '/hotel-info'),
    memberManagement: buildRoutePath('accountInfo', '/member-management'),
    groupUsers: {
      result: buildRoutePath('accountInfo', '/group-users'),
      create: {
        generalInfo: buildRoutePath('accountInfo', '/group-users/create/general-info'),
        hotelInfo: buildRoutePath('accountInfo', '/group-users/create/hotel-info'),
      },
    },
  },

  landingPage: '/landing-page',
  notFound: '/404',
  homeDashboard: '/',
};

export const ROUTES_TAB: RoutesTabType[] = [
  {
    name: 'homeDashboard',
    isModule: true,
    path: ROUTES.homeDashboard,
    exact: true,
    component: HelloWorld,
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
