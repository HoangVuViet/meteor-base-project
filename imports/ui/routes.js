import React from 'react';
import { ROUTES } from './configs/routes';

const ArcMapLandsat = React.lazy(() => import('./modules/map/pages/ArcMapLandsat'));
const ArcMap = React.lazy(() => import('./modules/map/pages/MapDisplay.js'));
const Statistical = React.lazy(() => import('./modules/statistical/pages/Statistical'));
const DataManagement = React.lazy(() => import('./modules/statistical/pages/DataManagement'));
const TmpManagement = React.lazy(() => import('./modules/statistical/pages/TmpManagement'));
const HudManagement = React.lazy(() => import('./modules/statistical/pages/HudManagement'));
const PressManagement = React.lazy(() => import('./modules/statistical/pages/PressManagement'));

const LandsatDownload = React.lazy(() => import('./modules/download/pages/LandsatDownload'));
const AeronetDownload = React.lazy(() => import('./modules/download/pages/AeronetDownload'));
const ModisDownload = React.lazy(() => import('./modules/download/pages/ModisDownload'));
const ViirsDownload = React.lazy(() => import('./modules/download/pages/ViirsDownload'));
const CalipsoDownload = React.lazy(() => import('./modules/download/pages/CalipsoDownload'));

const LandsatProcess = React.lazy(() => import('./modules/process/pages/LandsatProcess'));
const AeronetProcess = React.lazy(() => import('./modules/process/pages/AeronetProcess'));
const ModisProcess = React.lazy(() => import('./modules/process/pages/ModisProcess'));
const ViirsProcess = React.lazy(() => import('./modules/process/pages/ViirsProcess'));
const CalipsoProcess = React.lazy(() => import('./modules/process/pages/CalipsoProcess'));

const Chart = React.lazy(() => import('./modules/chart/pages/Chart'));

const routes = [
  { path: '/', exact: true, name: 'ArcMapLandsat', component: ArcMap },
  { path: '/dashboard', name: 'Dashboard', component: ArcMap },
  { path: ROUTES.pm25, name: 'ArcMapLandsat', component: ArcMap },
  { path: ROUTES.pm25Landsat, name: 'Dashboard', component: ArcMapLandsat },
  { path: ROUTES.landsatDownload, name: 'Gió', component: LandsatDownload },
  { path: ROUTES.calipsoDownload, name: 'Nhiệt độ', component: CalipsoDownload },
  { path: ROUTES.modisDownload, name: 'Độ ẩm', component: ModisDownload },
  { path: ROUTES.viirsDownload, name: 'Áp suất', component: ViirsDownload },
  // { path: ROUTES.aeronetDownload, name: 'AERONET AOD', component: AeronetDownload },

  { path: ROUTES.landsatProcess, name: 'Gió', component: LandsatProcess },
  { path: ROUTES.calipsoProcess, name: 'Nhiệt độ', component: CalipsoProcess },
  { path: ROUTES.modisProcess, name: 'Độ ẩm', component: ModisProcess },
  { path: ROUTES.viirsProcess, name: 'Áp suất', component: ViirsProcess },
  // { path: ROUTES.aeronetProcess, name: 'AERONET AOD', component: AeronetProcess },

  { path: ROUTES.chart, name: 'Đánh giá sản phẩm ảnh vệ tinh', component: Chart },
  { path: ROUTES.report, name: 'Gió', component: DataManagement },
  { path: ROUTES.reportTMP, name: 'Nhiệt độ', component: TmpManagement },
  { path: ROUTES.reportHUD, name: 'Độ ẩm', component: HudManagement },
  { path: ROUTES.reportPRESS, name: 'Áp suất', component: PressManagement },
];

export default routes;
