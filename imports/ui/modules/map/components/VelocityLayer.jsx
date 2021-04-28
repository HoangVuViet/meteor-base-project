import L from 'leaflet';
import 'leaflet-velocity';
import { MapLayer, withLeaflet } from 'react-leaflet';

class VelocityLayer extends MapLayer {
  createLeafletElement(props) {
    let velocityLayer = L.velocityLayer({
      displayValues: false,
      displayOptions: {
        velocityType: 'Global Wind',
        position: 'bottomleft',
        emptyString: 'No velocity data',
        angleConvention: 'bearingCW',
        displayPosition: 'bottomleft',
        displayEmptyString: 'No velocity data',
        speedUnit: 'm/s',
      },
      // OPTIONAL
      minVelocity: 0,
      maxVelocity: 10,
      velocityScale: 0.01,
      //colorScale: []
    });

    this.leafletElement = velocityLayer;

    this.loadData(props.url);

    return this.leafletElement;
  }

  loadData(url) {
    let request = fetch(url);
    request
      .then((r) => r.json())
      .then((data) => {
        if (this.leafletElement) {
          this.leafletElement.setData(data);
        }
      });
  }
}

export default withLeaflet(VelocityLayer);
