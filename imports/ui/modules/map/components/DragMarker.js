import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Circle, LayerGroup, Marker, Popup, useLeaflet } from 'react-leaflet';

const DragMarker = (props) => {
  const [draggable, setDraggable] = useState(false);
  const { map } = useLeaflet();

  const markerRef = useRef(null);
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
