import L from 'leaflet';
import Locate from 'leaflet.locatecontrol';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import {
  LayerGroup,
  LayersControl,
  Map,
  Marker,
  Popup,
  TileLayer,
  withLeaflet,
  ZoomControl,
} from 'react-leaflet';
import FullscreenControl from 'react-leaflet-fullscreen';
import Search from 'react-leaflet-search';
import DragMarker from '../components/DragMarker';
import { PlottyGeotiffLayer, VectorArrowsGeotiffLayer } from '../components/GeotiffLayer';
import HightlightArea from '../components/HightlightArea';
import Legend from '../components/Legend';
import MapBoxLayer from '../components/MapBoxLayer';
import TimeDimensionMap from '../components/TimeDimensionMap';
import VelocityLayer from '../components/VelocityLayer';
import {
  defaultMapProperty,
  defaultTimeDimensionProperty,
  defaultWindSpeedProperty,
  MAPBOX_ACCESS_TOKEN,
  openWeatherAtmosphericTileURL,
  openWeatherTemperatureURL,
  openWeatherWindTileURL,
  OPEN_WEATHER_APP_ID,
  defaultWindDirectionProperty,
  hereTileUrl,
  defaultGeoUrl,
} from '../constant';
import '../css/index.css';
import 'leaflet-geotiff';
import 'leaflet-geotiff/leaflet-geotiff-plotty';
import 'leaflet-geotiff/leaflet-geotiff-vector-arrows';
const LeafletMap = (_props) => {
  const mapRef = useRef(null);
  const windSpeedRef = React.useRef();
  const windDirectionRef = React.useRef();

  const [marker, setMarker] = useState({ lat: 0, lng: 0 });
  const [address, setAddress] = useState('');
  const [layerName, setLayerName] = useState('');

  const [geotifURL, setGeotifURL] = useState(defaultGeoUrl);

  const [mapR, setMapR] = useState(true);
  const [progress, setProgress] = React.useState(defaultTimeDimensionProperty.min);
  const [isPlay, checkPlay] = React.useState(true);
  useEffect(() => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    setMapR(map.getContainer());
    const lc = new Locate({
      position: 'topleft',
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
    lc.addTo(map);

    if (!map) return;
    map.on('baselayerchange', function (e) {
      setLayerName(e.name);
    });

    const geocoder = L.Control.Geocoder.nominatim();

    if (marker) {
      const m1 = L.marker([marker.lat, marker.lng]).addTo(map);
      m1.openPopup();
    }

    map.on('click', (e) => {
      geocoder.reverse(e.latlng, map.options.crs.scale(map.getZoom()), (results) => {
        var r = results[0];
        if (r) {
          setAddress(r.name);
          // setMarker({ lat: r.center.lat, lng: r.center.lng });
        }
      });
    });
  }, []);

  // useEffect(() => {
  //   if (document.querySelector('input[name=SearchInput]') && address !== '') {
  //     document.querySelector('input[name=SearchInput]').value = address;
  //   }
  //   if (
  //     document.querySelector('input[name=SearchInput]') &&
  //     !document.querySelector('input[name=SearchInput]').value
  //   ) {
  //     setMarker({ lat: 0, lng: 0 });
  //   }
  // }, [address]);

  React.useEffect(() => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    const renderer = L.LeafletGeotiff.plotty(defaultWindSpeedProperty.options);
    const options = {
      rBand: 0,
      gBand: 1,
      bBand: 2,
      alphaBand: 0,
      transpValue: 0,
      renderer: renderer,
    };
    var windSpeed = new L.leafletGeotiff(geotifURL.url[0], options).addTo(map);
  }, []);

  React.useEffect(() => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    const timer = setInterval(() => {
      if (!isPlay) {
        const renderer = L.LeafletGeotiff.plotty(defaultWindSpeedProperty.options);
        const options = {
          rBand: 0,
          gBand: 1,
          bBand: 2,
          alphaBand: 0,
          transpValue: 0,
          renderer: renderer,
        };
        setProgress((oldProgress) => {
          if (oldProgress === defaultTimeDimensionProperty.max) {
            return 0;
          }
          return Math.min(
            oldProgress + defaultTimeDimensionProperty.step,
            defaultTimeDimensionProperty.max,
          );
        });
        var windSpeed = new L.leafletGeotiff(
          geotifURL.url[progress !== 0 ? progress / defaultTimeDimensionProperty.step - 1 : 0],
          options,
        ).addTo(map);
        console.log(progress / defaultTimeDimensionProperty.step - 1);
      }
    }, 1500);

    return () => {
      clearInterval(timer);
    };
  }, [isPlay, progress]);

  return (
    <Fragment>
      <Map
        ref={mapRef}
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
      >
        <FullscreenControl position="topright" />
        <ZoomControl position="topright"></ZoomControl>
        {/* <LocationMarker /> */}
        {/* <TileLayer url={hereTileUrl('reduced.day')} />
      <TileLayer
        url={
          'http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?appid=c906da2e232618595258cadf371704f'
        }
      /> */}
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Pm2.5">
            <LayerGroup>
              <TileLayer url={hereTileUrl('reduced.day')} />
              {/* <MapBoxLayer
                accessToken={MAPBOX_ACCESS_TOKEN}
                style="mapbox://styles/mapbox/streets-v9"
              /> */}
              {/* <PlottyGeotiffLayer
                layerRef={mapRef}
                url={tiffUrl}
                options={defaultWindSpeedProperty.options}
              /> */}

              {/* <VectorArrowsGeotiffLayer
                layerRef={windDirectionRef}
                url={defaultWindDirectionProperty.url}
                options={defaultWindDirectionProperty.options}
              /> */}
              <VelocityLayer url={'../../../../../json/wind.json'}></VelocityLayer>
              {/* <TileLayer url={openWeatherTemperatureURL(OPEN_WEATHER_APP_ID)} /> */}
            </LayerGroup>
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Nhiệt độ">
            <LayerGroup>
              {/* <TileLayer url={hereTileUrl('reduced.day')} /> */}
              <MapBoxLayer
                accessToken={MAPBOX_ACCESS_TOKEN}
                style="mapbox://styles/mapbox/streets-v9"
              />
              <TileLayer url={openWeatherTemperatureURL(OPEN_WEATHER_APP_ID)} />
              <VelocityLayer url={'https://HoangVuViet.github.io/wind/wind.json'}></VelocityLayer>
            </LayerGroup>
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Gió">
            <LayerGroup>
              <MapBoxLayer
                accessToken={MAPBOX_ACCESS_TOKEN}
                style="mapbox://styles/mapbox/dark-v10"
              />
              <TileLayer url={openWeatherWindTileURL(OPEN_WEATHER_APP_ID)} />
            </LayerGroup>
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Áp suất khí quyển">
            <LayerGroup>
              <MapBoxLayer
                accessToken={MAPBOX_ACCESS_TOKEN}
                style="mapbox://styles/mapbox/streets-v9"
              />
              <TileLayer url={openWeatherAtmosphericTileURL(OPEN_WEATHER_APP_ID)} />
            </LayerGroup>
          </LayersControl.BaseLayer>
          {/* <LayersControl.Overlay name="Test">
            <Marker position={defaultMapProperty.center}>
              <Popup>popup.</Popup>
            </Marker>
          </LayersControl.Overlay> */}
        </LayersControl>
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
        <HightlightArea></HightlightArea>
        <Legend layerName={layerName}></Legend>
      </Map>
      <TimeDimensionMap
        progress={progress}
        isPlay={isPlay}
        checkPlay={checkPlay}
        setProgress={setProgress}
        geotifURL={geotifURL}
        setGeotifURL={setGeotifURL}
      ></TimeDimensionMap>
    </Fragment>
  );
};

export default LeafletMap;
