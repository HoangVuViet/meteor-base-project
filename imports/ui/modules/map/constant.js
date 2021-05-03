import L from 'leaflet';

export const hereIsolineUrl = (coords, options) =>
  `https://isoline.route.api.here.com/routing/7.2/calculateisoline.json?app_id=${hereCredentials.id}&app_code=${hereCredentials.code}&mode=shortest;${options.mode};traffic:${options.traffic}&start=geo!${coords[0]},${coords[1]}&range=${options.range}&rangetype=${options.type}`;

export const hereTileUrl = (style) =>
  `https://2.base.maps.api.here.com/maptile/2.1/maptile/newest/${style}/{z}/{x}/{y}/512/png8?app_id=${hereCredentials.id}&app_code=${hereCredentials.code}&ppi=320`;

export const openWeatherTemperatureURL = (appID) =>
  `http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?appid=${appID}&fill_bound=true&opacity=0.6&palette=-65:821692;-55:821692;-45:821692;-40:821692;-30:8257db;-20:208cec;-10:20c4e8;0:23dddd;10:c2ff28;20:fff028;25:ffc228;30:fc8014`;

export const openWeatherWindTileURL = (appID) =>
  `http://maps.openweathermap.org/maps/2.0/weather/WND/{z}/{x}/{y}?date=1618973169&use_norm=true&opacity=0.6&arrow_step=16&appid=093b90a9af239de17af3339289c83e69`;

export const openWeatherAtmosphericTileURL = (appID) =>
  `http://maps.openweathermap.org/maps/2.0/weather/APM/{z}/{x}/{y}?date=1618973169&appid=093b90a9af239de17af3339289c83e69`;

export const hereCredentials = {
  id: 'yATlKFDZwdLtjHzyTeCK',
  code: '0XXQyxbiCjVU7jN2URXuhg',
};

export const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1Ijoia2F1dG91MXMiLCJhIjoiY2tucnFobzdjMjhyMTJ1cGV0eWdrZWZ4OCJ9._C38VS7x6M3-blvHxLYboA';

export const OPEN_WEATHER_APP_ID = 'c906da2e2326185115258cadf371704f';

export const maxIsolineRangeLookup = {
  time: 20000,
  distance: 400000,
};

export const defaultMapProperty = {
  fullscreenControl: true,
  center: [18.35452552912665, 105.73242187500001],
  zoom: 6,
  scrollWheelZoom: true,
  zoomControl: false,
  maxZoom: 9,
  minZoom: 6,
  style: { height: 610, width: '100%' },
};

export const defaultTimeDimensionProperty = {
  step: 10,
  min: 10,
  max: 90,
  defaultValue: 10,
};

export const defaultWindDirectionProperty = {
  url: 'https://HoangVuViet.github.io/tif/wind_direction.tif',
  options: {
    band: 0,
    name: 'Wind direction',
    arrowSize: 40,
  },
};

export const defaultWindSpeedProperty = {
  url: 'https://HoangVuViet.github.io/tif/PM25_20170101_3km.tif',
  options: {
    band: 0,
    displayMin: 0,
    displayMax: 30,
    name: 'Wind speed',
    colorScale: 'viridis',
    clampLow: false,
    clampHigh: true,
    //vector:true
  },
};

export const style = (feature) => {
  return {
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.1,
    // fillColor: getColor(feature && feature.properties.density),
  };
};

export const getLegend = (
  title = `Nhiệt độ, °C`,
  progress = `<div>-40</div> <div>-30</div> <div>-20</div> <div>-10</div> <div>0</div> <div>10</div> <div>20</div> <div>30</div> <div>40</div>`,
  colorT = `<div class="horizontal-gradient-line" style=" background-image: linear-gradient( to right, rgb(159, 85, 181) 0%, rgb(44, 106, 187) 8.75%, rgb(82, 139, 213) 12.5%, rgb(103, 163, 222) 18.75%, rgb(142, 202, 240) 25%, rgb(155, 213, 244) 31.25%, rgb(172, 225, 253) 37.5%, rgb(194, 234, 255) 43.75%, rgb(255, 255, 208) 50%, rgb(254, 248, 174) 56.25%, rgb(254, 232, 146) 62.5%, rgb(254, 226, 112) 68.75%, rgb(253, 212, 97) 75%, rgb(244, 168, 94) 82.5%, rgb(244, 129, 89) 87.5%, rgb(244, 104, 89) 93.75%, rgb(244, 76, 73) 100% ); " ></div>`,
) => {
  return `<div class="leaflet-control-color-scale leaflet-control" style=" display: block; background: none; box-shadow: none; border-width: 0px; margin-right: -1px; width: 345px; height: 20px; "  > <div class="leaflet-control-color-scale-line" style="background-image: none; position: relative; border-width: 0px; margin: 0px" > <div class="scale-details"> <div>${title}</div> <div class="scale-gradient" style="width: 260px"> <div class="scale-dividers"> ${progress} </div> ${colorT} </div> </div> </div>  </div>`;
};

export default L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
});
