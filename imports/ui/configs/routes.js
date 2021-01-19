/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import BubbleChart from '@material-ui/icons/BubbleChart';
import Dashboard from '@material-ui/icons/Dashboard';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import LocationOn from '@material-ui/icons/LocationOn';
import MapIcon from '@material-ui/icons/Map';
import Notifications from '@material-ui/icons/Notifications';
import TimelineIcon from '@material-ui/icons/Timeline';
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
};

const dashboardRoutes = [
  {
    name: 'Bản đồ PM2.5',
    isModule: true,
    path: ROUTES.pm25,
    exact: true,
    component: ArcMap,
    hidden: false,
    disableBreadcrumb: true,
    layout: '/admin',
    icon: Dashboard,
  },
  {
    name: 'Bản đồ PM2.5 Landsat',
    isModule: true,
    path: ROUTES.pm25Landsat,
    exact: true,
    component: ArcMapLandsat,
    hidden: false,
    disableBreadcrumb: true,
    layout: '/admin',
    icon: MapIcon,
  },
  {
    path: '/chart',
    name: 'Biểu đồ đánh giá dữ liệu',
    icon: TimelineIcon,
    component: Chart,
    layout: '/admin',
  },
  {
    path: '/typography',
    name: 'Typography',
    icon: LibraryBooks,
    component: HelloWorld,
    layout: '/admin',
  },
  {
    path: '/icons',
    name: 'Icons',
    icon: BubbleChart,
    component: HelloWorld,
    layout: '/admin',
  },
  {
    path: '/maps',
    name: 'Maps',
    icon: LocationOn,
    component: HelloWorld,
    layout: '/admin',
  },
  {
    path: '/notifications',
    name: 'Notifications',
    icon: Notifications,
    component: HelloWorld,
    layout: '/admin',
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

export default dashboardRoutes;
