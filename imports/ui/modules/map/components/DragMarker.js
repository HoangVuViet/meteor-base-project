import { Button, makeStyles, SwipeableDrawer, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Circle, LayerGroup, Marker, Popup, useLeaflet } from 'react-leaflet';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import clsx from 'clsx';
import Statistical from '../../statistical/pages/Statistical';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Col, Row } from '../../common/components/elements';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const DragMarker = (props) => {
  const [draggable, setDraggable] = useState(false);
  const { map } = useLeaflet();
  const anchor = 'right';
  const markerRef = useRef(null);

  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
  });

  const initMarker = (ref) => {
    if (ref) {
      ref.leafletElement.openPopup();
    }
    return ref;
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    props.checkPlay(true);
    setState({ ...state, [anchor]: open });
  };

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = initMarker(markerRef).current;
        if (marker != null) {
          props.setMarker(marker.getLatLng());
        }
      },
      onclick() {
        const marker = initMarker(markerRef).current;
        if (marker != null) {
          props.setMarker(marker.getLatLng());
        }
      },
      ondblclick() {
        const marker = initMarker(markerRef).current;
        if (marker != null) {
          props.setMarker(marker.getLatLng());
        }
      },
      ondrag() {
        const marker = initMarker(markerRef).current;
        if (marker != null) {
          props.setMarker(marker.getLatLng());
        }
      },
    }),
    [],
  );

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);
  return (
    <>
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        icon={L.icon({
          iconSize: [25, 41],
          iconAnchor: [10, 41],
          popupAnchor: [2, -40],
          iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
        })}
        position={props.markerPosition}
        ref={initMarker}
        onClick={toggleDraggable}
        onDragEnd={toggleDraggable}
        // onDoubleClick={() => {
        //   props.setMarker({ lat: 0, lng: 0 });
        // }}
        // onPopupClose={() => {
        //   props.setMarker({ lat: 0, lng: 0 });
        // }}
        {...props}
      >
        <Popup>
          <Col style={{ padding: '8px' }}>
            <Row>
              <Typography variant="body2">
                <span style={{ fontWeight: 'bold' }}>Địa điểm:</span>
                {`${props.address}`}
              </Typography>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Typography variant="caption">
                <span>Vĩ độ:&nbsp;{props?.markerPosition[0].toFixed(5)}</span>
              </Typography>
              <span>&nbsp;/&nbsp;</span>
              <Typography variant="caption">
                <span>Kinh độ:&nbsp;{props?.markerPosition[1].toFixed(5)}</span>
              </Typography>
            </Row>{' '}
            <Button
              // variant="outlined"
              onClick={toggleDrawer(anchor, true)}
              style={{ padding: 0, height: 20, width: 100 }}
            >
              <Typography variant="body2">
                <span>{`Xem chi tiết >>`}</span>
              </Typography>
            </Button>
          </Col>
        </Popup>
      </Marker>
      <SwipeableDrawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
        onOpen={toggleDrawer(anchor, true)}
      >
        <div style={{ width: 680 }}>
          <Statistical
            progress={props.progress}
            position={props.markerPosition}
            address={props.address}
          />
        </div>
      </SwipeableDrawer>
    </>
  );
};

export default DragMarker;
