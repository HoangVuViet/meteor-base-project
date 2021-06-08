import * as ELG from 'esri-leaflet-geocoder';
import L from 'leaflet';
import 'leaflet-geotiff';
import 'leaflet-geotiff/leaflet-geotiff-plotty';
import 'leaflet-geotiff/leaflet-geotiff-vector-arrows';
import Locate from 'leaflet.locatecontrol';
import React, { Fragment } from 'react';
import { LayerGroup, LayersControl, Map, TileLayer, ZoomControl } from 'react-leaflet';
import FullscreenControl from 'react-leaflet-fullscreen';
import Search from 'react-leaflet-search';
import { isEmpty } from 'voca';
import DragMarker from '../components/DragMarker';
import HightlightArea from '../components/HightlightArea';
import Legend from '../components/Legend';
import TimeDimensionMap from '../components/TimeDimensionMap';
import VelocityLayer from '../components/VelocityLayer';
import {
  defaultMapProperty,
  defaultTimeDimensionProperty,
  defaultWindSpeedProperty,
  hereTileUrl,
  pressLayerUrl,
  rhLayerUrl,
  tempLayerUrl,
  windLayerUrl,
  windUrl,
  defaultGeoUrl,
} from '../constant';
import '../css/index.css';

const LeafletMap = (_props) => {
  const mapRef = React.useRef(null);
  const windSpeedRef = React.useRef();
  const windDirectionRef = React.useRef();

  const [marker, setMarker] = React.useState({ lat: 0, lng: 0 });
  const [address, setAddress] = React.useState('');
  const [layerName, setLayerName] = React.useState('');

  const [geotifURL, setGeotifURL] = React.useState(windLayerUrl);
  const [mapR, setMapR] = React.useState(true);
  const [progress, setProgress] = React.useState(defaultTimeDimensionProperty.min);

  const [isPlay, checkPlay] = React.useState(true);
  const [isBaseMap, checkBaseMap] = React.useState(false);

  React.useEffect(() => {
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
        popup: 'Bạn đang ở độ cao {distance} {unit} so với mực nước biển',
        outsideMapBoundsMsg: 'You seem located outside the boundaries of the map',
      },
    });
    lc.addTo(map);

    if (!map) return;
    map.on('baselayerchange', function (e) {
      setLayerName(e.name);
    });

    const geocoder = L.Control.Geocoder.nominatim();

    map.on('click', (e) => {
      ELG.reverseGeocode()
        .latlng(e.latlng)
        .run(function (error, result, response) {
          if (result) {
            setAddress(result.address.Match_addr);
          }
        });
    });

    if (marker) {
      const m1 = L.marker([marker.lat, marker.lng]).addTo(map);
      m1.openPopup();
    }
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
    map.on('baselayerchange', (e) => {
      if (e.name === 'Gió') {
        setGeotifURL(windLayerUrl);
        checkBaseMap(false);
      } else if (e.name === 'Nhiệt độ') {
        setGeotifURL(tempLayerUrl);
        checkBaseMap(false);
      } else if (e.name === 'Áp suất khí quyển(2m)') {
        setGeotifURL(pressLayerUrl);
        checkBaseMap(false);
      } else if (e.name === 'Độ ẩm') {
        setGeotifURL(rhLayerUrl);
        checkBaseMap(false);
      } else {
        checkBaseMap(true);
        setGeotifURL(undefined);
      }
    });
  }, [geotifURL]);

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
    var windSpeed = new L.leafletGeotiff(
      !isEmpty(geotifURL) ? geotifURL.url[0] : '',
      options,
    ).addTo(map);
  }, [geotifURL]);

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
        if (geotifURL) {
          var windSpeed = new L.leafletGeotiff(
            !isEmpty(geotifURL)
              ? geotifURL.url[progress !== 0 ? progress / defaultTimeDimensionProperty.step - 1 : 0]
              : '',
            options,
          ).addTo(map);
        }
      }
    }, 1500);

    return () => {
      clearInterval(timer);
    };
  }, [isPlay, progress, geotifURL]);

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
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Gió">
            <LayerGroup>
              <TileLayer url={hereTileUrl('reduced.day')} />
              <VelocityLayer url={windUrl}></VelocityLayer>
            </LayerGroup>
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Nhiệt độ">
            <LayerGroup>
              <TileLayer url={hereTileUrl('reduced.day')} />
              <VelocityLayer url={windUrl}></VelocityLayer>
            </LayerGroup>
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Áp suất khí quyển(2m)">
            <LayerGroup>
              <TileLayer url={hereTileUrl('reduced.day')} />
              <VelocityLayer url={windUrl}></VelocityLayer>
            </LayerGroup>
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Độ ẩm">
            <LayerGroup>
              <TileLayer url={hereTileUrl('reduced.day')} />
              <VelocityLayer url={windUrl}></VelocityLayer>
            </LayerGroup>
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Bản đồ nền">
            <LayerGroup>
              <TileLayer url={hereTileUrl('reduced.day')} />
            </LayerGroup>
          </LayersControl.BaseLayer>
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
          />
        </div>
        {marker.lat !== 0 && marker.lng !== 0 && (
          <DragMarker
            markerPosition={[marker.lat, marker.lng]}
            setMarker={setMarker}
            address={address}
            checkPlay={checkPlay}
            progress={progress}
            isPlay={isPlay}
            checkPlay={checkPlay}
            setProgress={setProgress}
            geotifURL={geotifURL}
            setGeotifURL={setGeotifURL}
          ></DragMarker>
        )}
        <HightlightArea />
        <Legend layerName={layerName} />
      </Map>
      {geotifURL && (
        <TimeDimensionMap
          progress={progress}
          isPlay={isPlay}
          checkPlay={checkPlay}
          setProgress={setProgress}
          geotifURL={geotifURL}
          setGeotifURL={setGeotifURL}
        />
      )}
    </Fragment>
  );
};

export default LeafletMap;
