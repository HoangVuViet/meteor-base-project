import React from 'react';
import ReactDOM from 'react-dom';

import { Map } from '@esri/react-arcgis';
import MyFeatureLayer from '../components/MapLayer';
import { Scene } from '@esri/react-arcgis/dist/esm/components/MapComposites';

const ArcMap = (props) => {
  return (
    <div style={{ height: 500 }}>
      <Map
        mapProperties={{ basemap: 'streets', ground: 'world-elevation' }}
        viewProperties={{
          center: [107.590866, 16.463713],
          zoom: 5,
        }}
      >
        <MyFeatureLayer
          featureLayerProperties={{
            url: 'http://113.175.118.161:6080/arcgis/rest/services/PM25_MYD/MapServer',
          }}
        ></MyFeatureLayer>
      </Map>
    </div>
  );
};
export default ArcMap;
