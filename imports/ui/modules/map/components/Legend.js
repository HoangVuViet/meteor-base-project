import L from 'leaflet';
import { useEffect } from 'react';
import { useLeaflet } from 'react-leaflet';
import { getLegend } from '../constant';
const Legend = (props) => {
  const { map } = useLeaflet();
  const { layerName } = props;

  useEffect(() => {
    const legendWindSpeed = L.control({ position: 'bottomright' });
    legendWindSpeed.onAdd = () => {
      const div = L.DomUtil.create('div');
      div.innerHTML = getLegend();
      return div;
    };
    legendWindSpeed.addTo(map);

    const legendTemp = L.control({ position: 'bottomright' });
    legendTemp.onAdd = () => {
      const div = L.DomUtil.create('div');
      div.innerHTML = getLegend(
        `Nhiệt độ, °C`,
        `<div>-40</div> <div>-30</div> <div>-20</div> <div>-10</div> <div>0</div> <div>10</div> <div>20</div> <div>30</div> <div>40</div>`,
        `<div class="horizontal-gradient-line" style=" background-image: linear-gradient( to right, rgb(159, 85, 181) 0%, rgb(44, 106, 187) 8.75%, rgb(82, 139, 213) 12.5%, rgb(103, 163, 222) 18.75%, rgb(142, 202, 240) 25%, rgb(155, 213, 244) 31.25%, rgb(172, 225, 253) 37.5%, rgb(194, 234, 255) 43.75%, rgb(255, 255, 208) 50%, rgb(254, 248, 174) 56.25%, rgb(254, 232, 146) 62.5%, rgb(254, 226, 112) 68.75%, rgb(253, 212, 97) 75%, rgb(244, 168, 94) 82.5%, rgb(244, 129, 89) 87.5%, rgb(244, 104, 89) 93.75%, rgb(244, 76, 73) 100% ); " ></div>`,
      );
      return div;
    };

    const legendAtm = L.control({ position: 'bottomright' });
    legendAtm.onAdd = () => {
      const div = L.DomUtil.create('div');
      div.innerHTML = getLegend(
        `Áp suất, hPa`,
        `<div>940</div> <div>960</div> <div>980</div> <div>1000</div> <div>1020</div> <div>1040</div> <div>1060</div>`,
        ` <div class="horizontal-gradient-line" style="background-image: linear-gradient(to right, rgb(0, 115, 255) 0%, rgb(0, 170, 255) 8.35059%, rgb(75, 208, 214) 24.9192%, rgb(141, 231, 199) 41.4879%, rgb(176, 247, 32) 49.7722%, rgb(240, 184, 0) 58.0565%, rgb(251, 85, 21) 74.6251%, rgb(243, 54, 59) 91.1938%, rgb(198, 0, 0) 100% ); " ></div>`,
      );
      return div;
    };

    const legendpm25 = L.control({ position: 'bottomright' });
    legendpm25.onAdd = () => {
      const div = L.DomUtil.create('div');
      div.innerHTML = getLegend(
        `pm2.5, µg/m³`,
        `<div>0</div><div>10</div><div>20</div><div>50</div><div>100</div><div>200</div><div>300</div>`,
        `<div class="horizontal-gradient-line" style="background-image: linear-gradient(to right, rgb(0, 115, 255) 0%, rgb(0, 170, 255) 8.35059%, rgb(75, 208, 214) 24.9192%, rgb(141, 231, 199) 41.4879%, rgb(176, 247, 32) 49.7722%, rgb(240, 184, 0) 58.0565%, rgb(251, 85, 21) 74.6251%, rgb(243, 54, 59) 91.1938%, rgb(198, 0, 0) 100% ); " ></div>`,
      );
      return div;
    };

    map.on('baselayerchange', (e) => {
      if (e.name === 'Gió') {
        map.removeControl(legendTemp);
        map.removeControl(legendAtm);
        map.removeControl(legendpm25);
        legendWindSpeed.addTo(map);
      } else if (e.name === 'Áp suất khí quyển(2m)') {
        map.removeControl(legendTemp);
        map.removeControl(legendWindSpeed);
        map.removeControl(legendpm25);
        legendAtm.addTo(map);
      } else if (e.name === 'Nhiệt độ') {
        map.removeControl(legendAtm);
        map.removeControl(legendWindSpeed);
        map.removeControl(legendpm25);
        legendTemp.addTo(map);
      } else {
        map.removeControl(legendTemp);
        map.removeControl(legendWindSpeed);
        map.removeControl(legendAtm);
        legendpm25.addTo(map);
      }
    });
  }, []);

  return null;
};

export default Legend;
