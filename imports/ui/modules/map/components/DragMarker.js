import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';

const DragMarker = (props) => {
  const [draggable, setDraggable] = useState(false);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
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
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={props.markerPosition}
      ref={markerRef}
      onClick={toggleDraggable}
    >
      <Popup>
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
