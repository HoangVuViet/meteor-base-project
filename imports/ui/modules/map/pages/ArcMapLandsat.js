import React from 'react';
import ReactDOM from 'react-dom';

import { Map } from '@esri/react-arcgis';
import MyFeatureLayer from '../components/MapLayer';
import './styles.css';
const ArcMap = (props) => {
  const [mapState, setMapState] = React.useState({ view: null, map: null });

  const handleMapLoad = React.useCallback((map, view) => {
    setMapState({ map, view });
  }, []);
  return (
    <div style={{ height: 900, width: '105%', padding: 0, margin: 0, marginLeft: -10 }}>
      <MyFeatureLayer
        featureLayerProperties={{
          url: 'http://localhost:6080/arcgis/rest/services/PM25Landsat120m/MapServer',
          featureUrl: 'http://localhost:6080/arcgis/rest/services/PM25Landsat120m/MapServer/0',
        }}
        mapState={mapState}
        isLandsat={true}
      ></MyFeatureLayer>
    </div>
  );
};
export default ArcMap;
