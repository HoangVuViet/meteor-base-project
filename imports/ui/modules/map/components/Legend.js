import { useLeaflet } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';
import { dataText, getColor, getLegend } from '../constant';
import { stringSlug } from '../../../constants';
const Legend = (props) => {
  const { map } = useLeaflet();
  const { layerName } = props;

  useEffect(() => {
    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = () => {
      const div = L.DomUtil.create('div');

      console.log(layerName);
      div.innerHTML =
        layerName === 'Gió'
          ? getLegend(
              `Wind speed, m/s`,
              `<div>0</div>
          <div>2</div>
          <div>3</div>
          <div>6</div>
          <div>12</div>
          <div>25</div>
          <div>50</div>
          <div>100</div>`,
              `<div
          class="horizontal-gradient-line"
          style="
            width: 260px;
            background: linear-gradient(
              to left,
              rgb(158, 128, 177),
              rgba(116, 76, 172, 0.9),
              rgb(164, 123, 170),
              rgba(170, 128, 177, 0.84),
              rgba(176, 128, 177, 0.71),
              rgba(170, 128, 177, 0.54),
              rgba(170, 128, 177, 0.44),
              rgba(255, 255, 0, 0)
            );
          "
        ></div>`,
            )
          : getLegend();

      return div;
    };

    legend.addTo(map);
  }, [layerName]);

  return null;
};

export default Legend;
