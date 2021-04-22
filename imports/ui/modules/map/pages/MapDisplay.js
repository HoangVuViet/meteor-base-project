import Locate from 'leaflet.locatecontrol';
import React, { useEffect, useRef, useState } from 'react';
import { Map, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import Search from 'react-leaflet-search';
import DragMarker from '../components/DragMarker';
import { hereTileUrl } from './constant';
import L from 'leaflet';

// import './leaflet.css';
import './css/index.css';
import MapBoxLayer from '../components/MapBoxLayer';

// const MAPBOX_ACCESS_TOKEN =
//   'pk.eyJ1Ijoia2F1dG91MXMiLCJhIjoiY2tucnFobzdjMjhyMTJ1cGV0eWdrZWZ4OCJ9._C38VS7x6M3-blvHxLYboA';

const LeafletMap = (_props) => {
  const mapRef = useRef();
  const [marker, setMarker] = useState({ lat: 0, lng: 0 });
  const [address, setAddress] = useState('');

  useEffect(() => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    const lc = new Locate({
      position: 'topright',
      drawCircles: true,
      locateOptions: { maxZoom: 8 },
    });
    lc.addTo(map);

    if (!map) return;

    const geocoder = L.Control.Geocoder.nominatim();
    let marker;

    map.on('click', (e) => {
      geocoder.reverse(e.latlng, map.options.crs.scale(map.getZoom()), (results) => {
        var r = results[0];
        console.log(r);
        if (r) {
          setAddress(r.name);
          setMarker({ lat: r.center.lat, lng: r.center.lng });
        }
      });
    });
  }, []);

  useEffect(() => {
    if (document.querySelector('input[name=SearchInput]') && address !== '') {
      document.querySelector('input[name=SearchInput]').value = address;
    }
  }, [address]);
  console.log(marker);
  return (
    <Map
      ref={mapRef}
      fullscreenControl={true}
      center={[21.238, 105.83416]}
      zoom={7}
      scrollWheelZoom={true}
      zoomControl={false}
      maxZoom={11}
      style={{ height: 1000, width: '100%' }}
      attributionControl={false}
      onClick={(e) => {
        let { lat, lng } = e.latlng;
        setMarker(e.latlng);
      }}
    >
      <ZoomControl position="topright"></ZoomControl>
      <TileLayer url={hereTileUrl('reduced.day')} />
      {/* <MapBoxLayer
          accessToken={MAPBOX_ACCESS_TOKEN}
          style="mapbox://styles/mapbox/streets-v11"
          maxZoom={15}
        /> */}
      <div style={{ minHeight: 28, width: 32 }}>
        <Search
          style={{ minHeight: 28, width: 32 }}
          onChange={(info) => {
            setAddress(info.info);
            let { lat, lng } = info.latLng;
            setMarker(info.latLng);
          }}
          position="topleft"
          inputPlaceholder="TÌm kiếm địa điểm..."
          closeResultsOnClick={true}
          openSearchOnLoad={true}
          showMarker={false}
          zoom={9}
          // these searchbounds would limit results to only Turkey.
          // providerOptions={{
          //   searchBounds: [
          //     new LatLng(33.100745405144245, 46.48315429687501),
          //     new LatLng(44.55916341529184, 24.510498046875),
          //   ],
          //   region: 'tr',
          // }}
        ></Search>
      </div>
      {marker.lat !== 0 && marker.lng !== 0 && (
        <DragMarker
          markerPosition={[marker.lat, marker.lng]}
          setMarker={setMarker}
          address={address}
        ></DragMarker>
      )}
    </Map>
  );
};

export default LeafletMap;
