import { IconButton, Slider } from '@material-ui/core';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import React from 'react';
import { MapControl } from 'react-leaflet';
import '../css/timeDimension.css';
import PauseIcon from '@material-ui/icons/Pause';
import { defaultTimeDimensionProperty } from '../constant';

const TimeDimensionMap = (props) => {
  const { progress, isPlay, checkPlay, setProgress, geotifURL, setGeotifURL } = props;
  const valuetext = (value) => {
    return `${geotifURL.time[progress / defaultTimeDimensionProperty.step - 1]}`;
  };
  return (
    <>
      <div style={{ left: 16, bottom: 8, position: 'fixed' }}>
        <div className="play-control leaflet-control">
          <div>
            <IconButton
              id="play-back-faster"
              style={{ padding: 4 }}
              onClick={() => {
                if (progress === 0) {
                  setProgress(defaultTimeDimensionProperty.min);
                }
                if (progress <= defaultTimeDimensionProperty.min * 1) {
                  setProgress(progress - defaultTimeDimensionProperty.step);
                } else {
                  setProgress(progress - defaultTimeDimensionProperty.step * 2);
                }
              }}
              disabled={progress === defaultTimeDimensionProperty.min || progress === 0}
            >
              <FastRewindIcon></FastRewindIcon>
            </IconButton>
            <IconButton
              id="play-back"
              style={{ padding: 4 }}
              onClick={() => {
                if (progress > defaultTimeDimensionProperty.min) {
                  setProgress(progress - defaultTimeDimensionProperty.step);
                }
              }}
              disabled={progress === defaultTimeDimensionProperty.min || progress === 0}
            >
              <ArrowLeftIcon></ArrowLeftIcon>
            </IconButton>
            {isPlay ? (
              <IconButton
                id="play"
                style={{ padding: 3, color: 'white' }}
                onClick={() => {
                  checkPlay(!isPlay);
                }}
              >
                <PlayArrowIcon></PlayArrowIcon>
              </IconButton>
            ) : (
              <IconButton
                id="stop"
                style={{ padding: 2 }}
                onClick={() => {
                  checkPlay(true);
                }}
              >
                <PauseIcon></PauseIcon>
              </IconButton>
            )}
            <IconButton
              id="play-back"
              style={{ padding: 4 }}
              onClick={() => {
                if (progress < defaultTimeDimensionProperty.max) {
                  setProgress(progress + defaultTimeDimensionProperty.step);
                }
              }}
              disabled={progress === defaultTimeDimensionProperty.max}
            >
              <ArrowRightIcon></ArrowRightIcon>
            </IconButton>
            <IconButton
              id="play-forward-faster"
              style={{ padding: 4 }}
              onClick={() => {
                if (progress < defaultTimeDimensionProperty.max) {
                  setProgress(progress + defaultTimeDimensionProperty.step * 2);
                }
              }}
              disabled={progress === defaultTimeDimensionProperty.max}
            >
              <FastForwardIcon></FastForwardIcon>
            </IconButton>
          </div>
          <div>
            <span id="current-moment">
              {geotifURL.time[progress / defaultTimeDimensionProperty.step - 1]}
            </span>
          </div>
          <div>
            <Slider
              defaultValue={defaultTimeDimensionProperty.defaultValue}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={defaultTimeDimensionProperty.step}
              marks
              min={defaultTimeDimensionProperty.min}
              max={defaultTimeDimensionProperty.max}
              value={progress}
              color="secondary"
              onChangeCommitted={(event, value) => {
                setProgress(value);
              }}
            />
          </div>
          <div>
            <span id="min-date">{geotifURL.time[0]}</span>
            <span id="max-date"> {geotifURL.time[geotifURL.time.length - 1]}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeDimensionMap;
