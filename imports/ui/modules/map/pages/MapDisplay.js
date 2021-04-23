import L from 'leaflet';
import Locate from 'leaflet.locatecontrol';
import React, { useEffect, useRef, useState } from 'react';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import Search from 'react-leaflet-search';
import DragMarker from '../components/DragMarker';
import { hereTileUrl } from './constant';
// import './leaflet.css';
import './css/index.css';

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1Ijoia2F1dG91MXMiLCJhIjoiY2tucnFobzdjMjhyMTJ1cGV0eWdrZWZ4OCJ9._C38VS7x6M3-blvHxLYboA';

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
      strings: {
        title: 'Show me where I am', // title of the locate control
        popup: 'You are within {location} {unit} from this point11111', // text to appear if user clicks on circle
        outsideMapBoundsMsg: 'You seem located outside the boundaries of the map', // default message for onLocationOutsideMapBounds
      },
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
          // setMarker({ lat: r.center.lat, lng: r.center.lng });
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
      center={[15.220589019578128, 107.77587890625]}
      zoom={5.8}
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
      <TileLayer
        url={
          'http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?appid=c906da2e2326185115258cadf371704f'
        }
      />
      {/* <MapBoxLayer
        accessToken={MAPBOX_ACCESS_TOKEN}
        style="mapbox://styles/mapbox/streets-v9"
        maxZoom={11}
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
          inputPlaceholder="Tìm kiếm địa điểm..."
          closeResultsOnClick={true}
          openSearchOnLoad={true}
          showMarker={false}
          zoom={9}
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
