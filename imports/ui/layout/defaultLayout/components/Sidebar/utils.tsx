import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';
import PollIcon from '@material-ui/icons/Poll';
import React from 'react';
import { DATA_EVALUATION_ROUTES, DOWNLOAD_DATA_ROUTES, PROCESS_DATA_ROUTES } from '/imports/ui/configs/routes';
  DOWNLOAD_DATA_ROUTES,
  PROCESS_DATA_ROUTES,
} from '/imports/ui/configs/routes';
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
  // {
  //   title: 'Hiển thị bản đồ',
  //   icon: <ExploreIcon />,
  //   routes: MAP_DISPLAY_ROUTES,
  // },
];
