import CIcon from '@coreui/icons-react';
import CallMergeIcon from '@material-ui/icons/CallMerge';
import EcoIcon from '@material-ui/icons/Eco';
import GetAppIcon from '@material-ui/icons/GetApp';
import React from 'react';
import { ROUTES } from '../configs/routes';
const _nav = [
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Dashboard',
  //   to: '/dashboard',
  //   // icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  //   badge: {
  //     color: 'info',
  //   },
  // },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Bản đồ'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Nhiệt độ',
    to: '/theme/colors',
    icon: <CIcon name="cil-drop" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Gió',
    to: '/theme/typography',
    icon: <EcoIcon style={{ marginRight: 15, padding: 2 }}></EcoIcon>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Áp suất',
    to: '/theme/typography',
    icon: <CIcon name="cil-globe-alt" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Dữ liệu'],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Tải dữ liệu',
    route: '/buttons',
    // icon: 'cil-cursor',
    icon: <GetAppIcon style={{ marginRight: 15, padding: 2 }} />,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Landsat AOD',
        to: '/download/Landsat',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'CALIPSO AOD',
        to: ROUTES.calipsoDownload,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'MODIS AOD',
        to: ROUTES.modisDownload,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'VIIRS AOD',
        to: ROUTES.viirsDownload,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'AERONET AOD',
        to: ROUTES.aeronetDownload,
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Xử lý dữ liệu',
    route: '/notifications',
    // icon: 'cil-bell',
    icon: <CallMergeIcon style={{ marginRight: 15, padding: 2 }} />,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Landsat AOD',
        to: ROUTES.landsatProcess,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'CALIPSO AOD',
        to: ROUTES.calipsoProcess,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'MODIS AOD',
        to: ROUTES.modisProcess,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'VIIRS AOD',
        to: ROUTES.viirsProcess,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'AERONET AOD',
        to: ROUTES.aeronetProcess,
      },
    ],
  },
  {
    _tag: 'CSidebarNavDivider',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Extras'],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Pages',
    route: '/pages',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Login',
        to: '/login',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Register',
        to: '/register',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Error 404',
        to: '/404',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2',
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2',
  },
];

export default _nav;
