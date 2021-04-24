import L from 'leaflet';
import Locate from 'leaflet.locatecontrol';
import React, { useEffect, useRef, useState } from 'react';
import {
  LayersControl,
  Map,
  TileLayer,
  ZoomControl,
  Circle,
  FeatureGroup,
  LayerGroup,
  Marker,
  Popup,
  Rectangle,
} from 'react-leaflet';
import Search from 'react-leaflet-search';
import DragMarker from '../components/DragMarker';
import MapBoxLayer from '../components/MapBoxLayer';
import {
  defaultMapProperty,
  hereTileUrl,
  openWeatherTemperatureURL,
  openWeatherWindTileURL,
  openWeatherAtmosphericTileURL,
  OPEN_WEATHER_APP_ID,
  MAPBOX_ACCESS_TOKEN,
} from './constant';
// import './leaflet.css';
import './css/index.css';

const center = [15.220589019578128, 107.77587890625];
const rectangle = [
  [51.49, -0.08],
  [51.5, -0.06],
];

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
        title: 'Show me where I am',
        metersUnit: 'meters',
        feetUnit: 'feet',
        popup: 'You are within {distance} {unit} from this point',
        outsideMapBoundsMsg: 'You seem located outside the boundaries of the map',
      },
    });
    console.log(lc);
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
    if (
      document.querySelector('input[name=SearchInput]') &&
      !document.querySelector('input[name=SearchInput]').value
    ) {
      setMarker({ lat: 0, lng: 0 });
    }
  }, [address]);
  console.log(marker);
  return (
    <Map
      ref={mapRef}
      fullscreenControl={defaultMapProperty.fullscreenControl}
      center={defaultMapProperty.center}
      zoom={defaultMapProperty.zoom}
      scrollWheelZoom={defaultMapProperty.scrollWheelZoom}
      zoomControl={defaultMapProperty.zoomControl}
      maxZoom={defaultMapProperty.maxZoom}
      minZoom={defaultMapProperty.minZoom}
      style={defaultMapProperty.style}
      attributionControl={false}
      onClick={(e) => {
        let { lat, lng } = e.latlng;
        setMarker(e.latlng);
      }}
      fullscreenControl={true}
      timeDimension={true}
      timeDimensionControl={true}
    >
      <ZoomControl position="topright" fullscreenControl={true}></ZoomControl>
      {/* <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Nhiệt độ">
          <LayerGroup>
            <MapBoxLayer
              accessToken={MAPBOX_ACCESS_TOKEN}
              style="mapbox://styles/kautou1s/cknvy1y6320rx17p81loldel6"
              maxZoom={11}
            />
            <TileLayer url={openWeatherTemperatureURL(OPEN_WEATHER_APP_ID)} />
          </LayerGroup>
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Gió">
          <LayerGroup>
            <MapBoxLayer
              accessToken={MAPBOX_ACCESS_TOKEN}
              style="mapbox://styles/mapbox/streets-v9"
              maxZoom={11}
            />
            <TileLayer url={openWeatherWindTileURL(OPEN_WEATHER_APP_ID)} />
          </LayerGroup>
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Áp suất">
          <LayerGroup>
            <MapBoxLayer
              accessToken={MAPBOX_ACCESS_TOKEN}
              style="mapbox://styles/mapbox/streets-v9"
              maxZoom={11}
            />{' '}
            <TileLayer url={openWeatherAtmosphericTileURL(OPEN_WEATHER_APP_ID)} />
          </LayerGroup>
        </LayersControl.BaseLayer>
        <LayersControl.Overlay name="Test">
          <Marker position={center}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </LayersControl.Overlay>
      </LayersControl> */}
      <MapBoxLayer
        accessToken={MAPBOX_ACCESS_TOKEN}
        style="mapbox://styles/mapbox/streets-v9"
        maxZoom={11}
      />
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
          zoom={7}
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
