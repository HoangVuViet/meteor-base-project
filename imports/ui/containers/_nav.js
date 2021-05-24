import CIcon from '@coreui/icons-react';
import CallMergeIcon from '@material-ui/icons/CallMerge';
import CategoryIcon from '@material-ui/icons/Category';
import EcoIcon from '@material-ui/icons/Eco';
import GetAppIcon from '@material-ui/icons/GetApp';
import TimelineIcon from '@material-ui/icons/Timeline';
import React from 'react';
import FilterVintageIcon from '@material-ui/icons/FilterVintage';
import { ROUTES } from '../configs/routes';
import AcUnitIcon from '@material-ui/icons/AcUnit';
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
  // {
  //   _tag: 'CSidebarNavTitle',
  //   _children: ['Bản đồ'],
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Nhiệt độ',
  //   to: '/theme/colors',
  //   icon: <FilterVintageIcon style={{ marginRight: 13, padding: 2 }} />,
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Gió',
  //   to: '/theme/typography',
  //   icon: <EcoIcon style={{ marginRight: 13, padding: 2 }}></EcoIcon>,
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Áp suất',
  //   to: '/theme/typography',
  //   icon: <AcUnitIcon style={{ marginRight: 13, padding: 2 }} />,
  // },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Dữ liệu'],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Tải dữ liệu',
    route: '/buttons',
    // icon: 'cil-cursor',
    icon: <GetAppIcon style={{ marginRight: 13, padding: 2 }} />,
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
    icon: <CallMergeIcon style={{ marginRight: 13, padding: 2 }} />,
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
    _tag: 'CSidebarNavItem',
    name: 'Quản lý dữ liệu',
    to: ROUTES.report,
    icon: <CategoryIcon style={{ marginRight: 13, padding: 2 }}> </CategoryIcon>,
  },
  {
    _tag: 'CSidebarNavDivider',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Sản phẩm'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Đánh giá sản phẩm ảnh vệ tinh',
    to: ROUTES.chart,
    icon: <TimelineIcon style={{ marginRight: 13, padding: 2 }}></TimelineIcon>,
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
