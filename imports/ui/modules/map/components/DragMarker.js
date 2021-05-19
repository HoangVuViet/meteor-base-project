import { Button, makeStyles, SwipeableDrawer } from '@material-ui/core';
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

    setState({ ...state, [anchor]: open });
  };

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = initMarker(markerRef).current;
        if (marker != null) {
          props.setMarker(marker.getLatLng());
          marker.leafletElement.openPopup();
        }
      },
      onclick() {
        const marker = initMarker(markerRef).current;
        if (marker != null) {
          props.setMarker(marker.getLatLng());
          marker.leafletElement.openPopup();
          map.flyTo(marker.getLatLng(), map.getZoom());
          const radius = marker.accuracy;
          const circle = L.circle(marker.getLatLng(), radius);
          circle.addTo(map);
        }
      },
      ondblclick() {
        const marker = initMarker(markerRef).current;
        if (marker != null) {
          props.setMarker(marker.getLatLng());
          marker.leafletElement.openPopup();
        }
      },
      ondrag() {
        const marker = initMarker(markerRef).current;
        if (marker != null) {
          props.setMarker(marker.getLatLng());
          marker.leafletElement.openPopup();
          map.flyTo(marker.getLatLng(), map.getZoom());
          const radius = marker.accuracy;
          const circle = L.circle(marker.getLatLng(), radius);
          circle.addTo(map);
        }
      },
    }),
    [],
  );

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
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
      onDoubleClick={() => {
        props.setMarker({ lat: 0, lng: 0 });
      }}
      onPopupClose={() => {
        props.setMarker({ lat: 0, lng: 0 });
      }}
      {...props}
    >
      <Popup {...props}>
        <div>
          <p>{props.address}</p>
          <p>
            latitude and longitude from search component:
            {props?.markerPosition?.toString()?.replace(',', ' , ')}
          </p>
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>Xem chi tiết địa điểm</Button>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              <div style={{ width: 800 }}>
                <Statistical position={props?.markerPosition} address={props.address}></Statistical>
              </div>
            </SwipeableDrawer>
          </React.Fragment>
        </div>
      </Popup>
    </Marker>
  );
};

export default DragMarker;
{
  /* <Circle
        center={props.markerPosition}
        pathOptions={{ fillColor: 'blue', color: 'blue' }}
        radius={400}
      /> */
}
