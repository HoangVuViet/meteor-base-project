import { IconButton, makeStyles, Slider } from '@material-ui/core';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import React from 'react';
import { MapControl, useLeaflet } from 'react-leaflet';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import '../css/timeDimension.css';
const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}°C`;
}

interface Props extends MapControl {
  layerName: string;
  target: Element;
}
const TimeDimensionMap: React.FC<Props> = (props) => {
  const { map } = useLeaflet();
  const { layerName, target } = props;
  const classes = useStyles();

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
    <>
      <div style={{ left: 16, bottom: 8, position: 'fixed', zIndex: 3000 }}>
        <div className="play-control leaflet-control">
          <div>
            <IconButton id="play-back-faster" style={{ padding: 4 }}>
              <FastRewindIcon></FastRewindIcon>
            </IconButton>
            <IconButton id="play-back" style={{ padding: 4 }}>
              <ArrowLeftIcon></ArrowLeftIcon>
            </IconButton>
            <button id="stop" style={{ display: 'none' }}>
              <img src="/themes/openweathermap/assets/img/owm_icons/icon_pause_black.png" />
            </button>
            <IconButton id="play" style={{ padding: 3, color: 'white' }}>
              <PlayArrowIcon></PlayArrowIcon>
            </IconButton>
            <IconButton id="play-back" style={{ padding: 4 }}>
              <ArrowRightIcon></ArrowRightIcon>
            </IconButton>
            <IconButton id="play-forward-faster" style={{ padding: 4 }}>
              <FastForwardIcon></FastForwardIcon>
            </IconButton>
          </div>
          <div>
            <span id="current-moment">May 01, 9:10</span>
          </div>
          <div>
            <Slider
              defaultValue={30}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={10}
              marks
              min={10}
              max={110}
              color="primary"
            />
          </div>
          <div>
            <span id="min-date">Apr 24</span>
            <span id="max-date">May 08</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeDimensionMap;
