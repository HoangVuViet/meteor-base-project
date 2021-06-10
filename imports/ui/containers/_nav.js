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
import DataUsageIcon from '@material-ui/icons/DataUsage';
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
    name: 'Thu thập dữ liệu',
    route: '/buttons',
    // icon: 'cil-cursor',
    icon: <GetAppIcon style={{ marginRight: 13, padding: 2 }} />,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Gió',
        to: ROUTES.landsatDownload,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Nhiệt độ',
        to: ROUTES.calipsoDownload,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Độ ẩm',
        to: ROUTES.modisDownload,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Áp suất',
        to: ROUTES.viirsDownload,
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Xử lý dữ liệu',
    route: '/notifications',
    icon: <CallMergeIcon style={{ marginRight: 13, padding: 2 }} />,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Gió',
        to: ROUTES.landsatProcess,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Nhiệt độ',
        to: ROUTES.calipsoProcess,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Độ ẩm',
        to: ROUTES.modisProcess,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Áp suất',
        to: ROUTES.viirsProcess,
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Quản lý dữ liệu',
    route: '/chip',
    icon: <DataUsageIcon style={{ marginRight: 13, padding: 2 }} />,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Gió',
        to: ROUTES.report,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Nhiệt độ',
        to: ROUTES.reportTMP,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Độ ẩm',
        to: ROUTES.reportHUD,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Áp suất',
        to: ROUTES.reportPRESS,
      },
    ],
  },

  {
    _tag: 'CSidebarNavDivider',
  },
  // {
  //   _tag: 'CSidebarNavTitle',
  //   _children: ['Sản phẩm'],
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Đánh giá sản phẩm ảnh vệ tinh',
  //   to: ROUTES.chart,
  //   icon: <TimelineIcon style={{ marginRight: 13, padding: 2 }}></TimelineIcon>,
  // },

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
