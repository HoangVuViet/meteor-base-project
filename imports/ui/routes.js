import React from 'react';
import { ROUTES } from './configs/routes';

const ArcMapLandsat = React.lazy(() => import('./modules/map/pages/ArcMapLandsat'));

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

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: ArcMapLandsat },
  { path: ROUTES.landsatDownload, name: 'Landsat AOD', component: LandsatDownload },
  { path: ROUTES.calipsoDownload, name: 'CALIPSO AOD', component: CalipsoDownload },
  { path: ROUTES.modisDownload, name: 'MODIS AOD', component: ModisDownload },
  { path: ROUTES.viirsDownload, name: 'VIIRS AOD', component: ViirsDownload },
  { path: ROUTES.aeronetDownload, name: 'AERONET AOD', component: AeronetDownload },

  { path: ROUTES.landsatProcess, name: 'Landsat AOD', component: LandsatProcess },
  { path: ROUTES.calipsoProcess, name: 'CALIPSO AOD', component: CalipsoProcess },
  { path: ROUTES.modisProcess, name: 'MODIS AOD', component: ModisProcess },
  { path: ROUTES.viirsProcess, name: 'VIIRS AOD', component: ViirsProcess },
  { path: ROUTES.aeronetProcess, name: 'AERONET AOD', component: AeronetProcess },
];

export default routes;
