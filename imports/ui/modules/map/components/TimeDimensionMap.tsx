import L from 'leaflet';
import React, { Children, cloneElement, Fragment, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { MapControl, useLeaflet } from 'react-leaflet';
import '../css/timeDimension.css';
import RightAside from './RightAside';

interface Props extends MapControl {
  layerName: string;
  target: Element;
}
const TimeDimensionMap: React.FC<Props> = (props) => {
  const { map } = useLeaflet();
  const { layerName, target } = props;
  console.log(target);
  // useEffect(() => {
  //   const timePros = L.control({ position: 'bottomleft' });
  //   timePros.onAdd = () => {
  //     const div = L.DomUtil.create('div');
  //     div.innerHTML =
  //       '<div class="leaflet-bar leaflet-bar-horizontal leaflet-bar-timecontrol leaflet-control"><a class="leaflet-control-timecontrol timecontrol-backward" href="#" title="Backward"></a><a class="leaflet-control-timecontrol timecontrol-play play" href="#" title="Play"></a><a class="leaflet-control-timecontrol timecontrol-forward" href="#" title="Forward"></a><a class="leaflet-control-timecontrol timecontrol-date" href="#" title="Date">2021-04-26T17:00:00.000Z</a><div class="leaflet-control-timecontrol timecontrol-slider timecontrol-dateslider"><div class="slider"><div class="knob main" style="transform: translate3d(134.167px, 0px, 0px);"></div></div></div><div class="leaflet-control-timecontrol timecontrol-slider timecontrol-speed"><span class="speed">1fps</span><div class="slider"><div class="knob" style="transform: translate3d(0px, 0px, 0px);"></div></div></div></div>';
  //     return div;
  //   };
  //   timePros.addTo(map);
  // }, []);

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div style={{ left: 16, top: 240, position: 'fixed' }}>
          <RightAside></RightAside>
        </div>,
        target,
      )}
      {React.Children.map(props.children, (child: any, _i: number) => {
        // props
        return React.cloneElement(child, { ...props });
      })}
    </Fragment>
  );
};

export default TimeDimensionMap;
