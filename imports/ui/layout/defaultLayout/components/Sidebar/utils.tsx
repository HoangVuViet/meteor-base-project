import ExploreIcon from '@material-ui/icons/Explore';
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';
import React from 'react';
import { DATA_EVALUATION_ROUTES, MAP_DISPLAY_ROUTES,DOWNLOAD_DATA_ROUTES,PROCESS_DATA_ROUTES } from '/imports/ui/configs/routes';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import PollIcon from '@material-ui/icons/Poll';
export const LIST_ITEMS = [
  {
    title: 'Tải dữ liệu',
    icon: <CloudDownloadIcon></CloudDownloadIcon>,
    routes: DOWNLOAD_DATA_ROUTES,
  },
  {
    title: 'Xử lý dữ liệu',
    icon: <PermDataSettingIcon></PermDataSettingIcon>,
    routes: PROCESS_DATA_ROUTES,
  },
  {
    title: 'Đánh giá số liệu',
    icon: <PollIcon></PollIcon>,
    routes: DATA_EVALUATION_ROUTES,
  },
  {
    title: 'Hiển thị bản đồ',
    icon: <ExploreIcon />,
    routes: MAP_DISPLAY_ROUTES,
  },
];
