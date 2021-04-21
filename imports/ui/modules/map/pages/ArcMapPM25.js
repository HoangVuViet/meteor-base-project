import React from 'react';
import ReactDOM from 'react-dom';

import { Map } from '@esri/react-arcgis';
import MyFeatureLayer from '../components/MapLayer';
import { MapContainer, LayersControl, TileLayer, Marker, Popup } from 'react-leaflet';

const ArcMap = (props) => {
  return (
    <div style={{ height: 610, width: 1400 }}>
      <MapContainer
        center={[21.027763, 105.83416]}
        zoom={11}
        scrollWheelZoom={true}
        style={{ height: 610, width: 1400 }}
      >
        <TileLayer
          attribution='<a href="http://osm.org/copyright"></a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[21.027763, 105.83416]}>
          <Popup>
            I am a custom popUp latitude and longitude from search component: 21.0294498 ,
            105.8544441 Info from search component: Hà Nội, Việt Nam{' '}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
export default ArcMap;
