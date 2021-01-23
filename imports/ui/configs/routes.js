
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
};

const dashboardRoutes = [
  {
    name: 'Bản đồ PM2.5 MODIS',
    isModule: true,
    path: ROUTES.pm25,
    exact: true,
    component: ArcMap,
    hidden: false,
    disableBreadcrumb: true,
    layout: '/admin',
    iconName: 'dashboard',
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
    iconName: 'map',
  },
  {
    path: ROUTES.chart,
    name: 'Biểu đồ đánh giá dữ liệu',
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
  // {
  //   path: '/icons',
  //   name: 'Icons',
  //   icon: BubbleChart,
  //   component: HelloWorld,
  //   layout: '/admin',
  // },
  // {
  //   path: '/maps',
  //   name: 'Maps',
  //   icon: LocationOn,
  //   component: HelloWorld,
  //   layout: '/admin',
  // },
  // {
  //   path: '/notifications',
  //   name: 'Notifications',
  //   icon: Notifications,
  //   component: HelloWorld,
  //   layout: '/admin',
  // },
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
