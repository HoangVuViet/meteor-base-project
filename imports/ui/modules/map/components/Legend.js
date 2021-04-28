import L from 'leaflet';
import { useEffect } from 'react';
import { useLeaflet } from 'react-leaflet';
import { getLegend } from '../constant';
const Legend = (props) => {
  const { map } = useLeaflet();
  const { layerName } = props;

  useEffect(() => {
    const legendTem = L.control({ position: 'bottomright' });
    legendTem.onAdd = () => {
      const div = L.DomUtil.create('div');
      div.innerHTML = getLegend();
      return div;
    };
    legendTem.addTo(map);

    const legendWind = L.control({ position: 'bottomright' });
    legendWind.onAdd = () => {
      const div = L.DomUtil.create('div');
      div.innerHTML = getLegend(
        `Tốc độ gió, m/s`,
        `<div>0</div> <div>2</div> <div>3</div> <div>6</div> <div>12</div> <div>25</div> <div>50</div> <div>100</div>`,
        `<div class="horizontal-gradient-line" style=" width: 260px; background: linear-gradient(to left, rgb(158, 128, 177), rgba(116, 76, 172, 0.9), rgb(164, 123, 170), rgba(170, 128, 177, 0.84), rgba(176, 128, 177, 0.71), rgba(170, 128, 177, 0.54), rgba(170, 128, 177, 0.44), rgba(255, 255, 0, 0) ); " ></div>`,
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

    map.on('baselayerchange', (e) => {
      if (e.name === 'Gió') {
        map.removeControl(legendTem);
        map.removeControl(legendAtm);
        legendWind.addTo(map);
      } else if (e.name === 'Áp suất khí quyển') {
        map.removeControl(legendWind);
        map.removeControl(legendTem);
        legendAtm.addTo(map);
      } else {
        map.removeControl(legendAtm);
        map.removeControl(legendWind);
        legendTem.addTo(map);
      }
    });
  }, []);

  return null;
};

export default Legend;
