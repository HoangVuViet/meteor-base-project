import Locate from 'leaflet.locatecontrol';
import React, { useEffect, useRef, useState } from 'react';
import { Map, Marker, Popup, ZoomControl } from 'react-leaflet';
import Search from 'react-leaflet-search';
// import './leaflet.css';
import './css/index.css';
import MapBoxLayer from './MapBoxLayer';
const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1Ijoia2F1dG91MXMiLCJhIjoiY2tucnFobzdjMjhyMTJ1cGV0eWdrZWZ4OCJ9._C38VS7x6M3-blvHxLYboA';

const LeafletMap = (_props) => {
  const mapRef = useRef();
  const [marker, setMarker] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    const lc = new Locate({
      position: 'topright',
      drawCircles: false,
    });
    console.log(lc);
    lc.addTo(map);
  }, []);

  return (
    <div style={{ height: 610, width: 1400 }}>
      <Map
        ref={mapRef}
        fullscreenControl={true}
        center={[21.027763, 105.83416]}
        zoom={11}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{ height: 610, width: 1400 }}
        attributionControl={false}
        onClick={(e) => {
          let { lat, lng } = e.latlng;
          console.info('Lat:', lat);
          console.info('Lng: ', lng);
          setMarker(e.latlng);
        }}
      >
        <ZoomControl position="topright"></ZoomControl>
        <MapBoxLayer
          accessToken={MAPBOX_ACCESS_TOKEN}
          style="mapbox://styles/mapbox/streets-v11"
          maxZoom={15}
        />
        <div style={{ minHeight: 28, width: 32 }}>
          <Search
            style={{ minHeight: 28, width: 32 }}
            // customProvider={this.provider}
            onChange={(info) => {
              console.log('FROM onChange: ', info);
              let { lat, lng } = info.latlng;
              console.info('Lat:', lat);
              console.info('Lng: ', lng);
              setMarker(info.latlng);
            }}
            position="topleft"
            inputPlaceholder="TÌm kiếm địa điểm..."
            search={[marker.lat, marker.lng]}
            showMarker={false}
            zoom={8}
            closeResultsOnClick={true}
            openSearchOnLoad={false}
            // these searchbounds would limit results to only Turkey.
            // providerOptions={{
            //   searchBounds: [
            //     new LatLng(33.100745405144245, 46.48315429687501),
            //     new LatLng(44.55916341529184, 24.510498046875),
            //   ],
            //   region: 'tr',
            // }}
          >
            {(info) => (
              <Marker position={info?.latLng}>
                <Popup>
                  <div>
                    <p>I am a custom popUp</p>
                    <p>
                      latitude and longitude from search component:
                      {info?.latLng?.toString()?.replace(',', ' , ')}
                    </p>
                    <p>Info from search component: {info?.info}</p>
                  </div>
                </Popup>
              </Marker>
            )}
          </Search>
        </div>
        {marker.lat !== 0 && marker.lng !== 0 && (
          <Marker position={[marker.lat, marker.lng]}>
            <Popup>
              <div>
                <p>
                  latitude and longitude from search component:
                  {marker.toString()?.replace(',', ' , ')}
                </p>
              </div>
            </Popup>
          </Marker>
        )}
      </Map>
    </div>
  );
};

export default LeafletMap;
