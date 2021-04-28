import L from 'leaflet';
import Locate from 'leaflet.locatecontrol';
import React, { useEffect, useRef, useState } from 'react';
import {
  LayerGroup,
  LayersControl,
  Map,
  Marker,
  Popup,
  TileLayer,
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
  MAPBOX_ACCESS_TOKEN,
  openWeatherAtmosphericTileURL,
  openWeatherTemperatureURL,
  openWeatherWindTileURL,
  OPEN_WEATHER_APP_ID,
} from '../constant';
// import './leaflet.css';
import '../css/index.css';

const LeafletMap = (_props) => {
  const mapRef = useRef(null);
  const windSpeedRef = React.createRef();
  const windDirectionRef = React.createRef();

  const [marker, setMarker] = useState({ lat: 0, lng: 0 });
  const [address, setAddress] = useState('');
  const [layerName, setLayerName] = useState('');

  const [data, setData] = React.useState({});
  const [refReady, setRefReady] = useState(true);
  const [mapR, setMapR] = useState(true);

  const windSpeedUrl = 'https://HoangVuViet.github.io/tif/PM25_20170101_3km.tif';
  const windSpeedOptions = {
    band: 0,
    displayMin: 0,
    displayMax: 30,
    name: 'Wind speed',
    colorScale: 'rainbow',
    clampLow: false,
    clampHigh: true,
    //vector:true
  };

  const windDirectionUrl = 'https://HoangVuViet.github.io/tif/wind_direction.tif';
  const windDirectionOptions = {
    band: 0,
    name: 'Wind direction',
    arrowSize: 40,
  };

  // function LocationMarker() {
  //   const [position, setPosition] = useState(null);
  //   const [bbox, setBbox] = useState([]);

  //   const { map } = useLeaflet();

  //   useEffect(() => {
  //     map.locate().on('locationfound', function (e) {
  //       setPosition(e.latlng);
  //       map.flyTo(e.latlng, map.getZoom());
  //       const radius = e.accuracy;
  //       const circle = L.circle(e.latlng, radius);
  //       circle.addTo(map);
  //       setBbox(e.bounds.toBBoxString().split(','));
  //     });
  //   }, [map]);

  //   return position === null ? null : (
  //     <Marker position={position} icon={icon}>
  //       <Popup>
  //         You are here. <br />
  //         Map bbox: <br />
  //         <b>Southwest lng</b>: {bbox[0]} <br />
  //         <b>Southwest lat</b>: {bbox[1]} <br />
  //         <b>Northeast lng</b>: {bbox[2]} <br />
  //         <b>Northeast lat</b>: {bbox[3]}
  //       </Popup>
  //     </Marker>
  //   );
  // }

  useEffect(() => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    setMapR(map.getContainer());
    console.log(current);
    console.log('map', map.getContainer()); // create Locate
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
    //

    // Create and add a TimeDimension Layer to the map
    // var wmsUrl =
    //   'https://thredds.socib.es/thredds/wms/observational/satellite/altimetry/aviso/madt/sealevel_med_phy_nrt_L4_agg/sealevel_med_phy_nrt_L4_agg_best.ncd';
    // var wmsLayer = L.tileLayer.wms(wmsUrl, {
    //   layers: 'sea_water_velocity',
    //   format: 'image/png',
    //   transparent: true,
    //   attribution: 'SOCIB HF RADAR | sea_water_velocity',
    // });

    // var tdWmsLayer = L.timeDimension.layer.wms(wmsLayer);
    // tdWmsLayer.addTo(map);
    //

    if (!map) return;
    map.on('baselayerchange', function (e) {
      setLayerName(e.name);
    });

    const geocoder = L.Control.Geocoder.nominatim();

    if (marker) {
      const m1 = L.marker([marker.lat, marker.lng]).addTo(map);
      m1.openPopup();
    }

    // map.on('click', (e) => {
    //   geocoder.reverse(e.latlng, map.options.crs.scale(map.getZoom()), (results) => {
    //     var r = results[0];
    //     if (r) {
    //       setAddress(r.name);
    //       // setMarker({ lat: r.center.lat, lng: r.center.lng });
    //     }
    //   });
    // });
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

  useEffect(() => {
    setRefReady(true);
    console.log(mapRef);
  }, [mapRef]);
  return (
    <Map
      ref={mapRef}
      // fullscreenControl={defaultMapProperty.fullscreenControl}
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
      timeDimension={true}
      timeDimensionControl={true}
      timeDimensionControlOptions={{
        position: 'bottomleft',
        timeInterval: '2021-04-20/2021-04-30',
        autoPlay: false,
        timeSlider: true,
        loopButton: false,
        minSpeed: 1,
        speedStep: 0.5,
        maxSpeed: 20,
        timeSliderDragUpdate: true,
        // playerOptions: {
        //   transitionTime: 100,
        //   loop: false,
        //   startOver: true,
        // },
      }}
      timeDimensionOptions={{
        timeInterval: '2021-04-20/2021-04-30',
        period: 'PT1H',
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
        <LayersControl.BaseLayer checked name="DefaultMap">
          <LayerGroup>
            {/* <TileLayer url={hereTileUrl('reduced.day')} /> */}
            <MapBoxLayer
              accessToken={MAPBOX_ACCESS_TOKEN}
              style="mapbox://styles/mapbox/dark-v10"
            />{' '}
            <PlottyGeotiffLayer
              layerRef={windSpeedRef}
              url={windSpeedUrl}
              options={windSpeedOptions}
            />
            <VectorArrowsGeotiffLayer
              layerRef={windDirectionRef}
              url={windDirectionUrl}
              options={windDirectionOptions}
            />
            <VelocityLayer url={'https://HoangVuViet.github.io/wind/wind.json'}></VelocityLayer>
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
            />{' '}
            <TileLayer url={openWeatherAtmosphericTileURL(OPEN_WEATHER_APP_ID)} />
          </LayerGroup>
        </LayersControl.BaseLayer>
        <LayersControl.Overlay name="Test">
          <Marker position={defaultMapProperty.center}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </LayersControl.Overlay>
      </LayersControl>
      {/* <MapBoxLayer
        accessToken={MAPBOX_ACCESS_TOKEN}
        style="mapbox://styles/mapbox/streets-v9"
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
      {refReady && <TimeDimensionMap target={mapR} position="bottomleft"></TimeDimensionMap>}
    </Map>
  );
};

export default LeafletMap;
