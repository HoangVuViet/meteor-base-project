import { useTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

const DEFAULT_LATITUDE = 20.98369839999999;
const DEFAULT_LONGITUDE = 105.86362570000006;

export const HelloWorld = () => {
  return (
    <div>
      <MapContainer
        center={[DEFAULT_LATITUDE, DEFAULT_LONGITUDE]}
        zoom={12}
        style={{ width: '100%', height: '100vh' }}
      >
        <TileLayer
          attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};
