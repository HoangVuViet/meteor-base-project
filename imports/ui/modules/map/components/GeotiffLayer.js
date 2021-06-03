import L from 'leaflet';
import 'leaflet-geotiff';
import 'leaflet-geotiff/leaflet-geotiff-plotty';
import 'leaflet-geotiff/leaflet-geotiff-vector-arrows';
import React from 'react';
import { MapLayer, withLeaflet } from 'react-leaflet';

class GeotiffLayer extends MapLayer {
  createLeafletElement(props) {
    const { url, options } = props;
    return new L.leafletGeotiff(url, options);
  }

  componentDidMount() {
    const { map } = this.props.leaflet;
    this.leafletElement.addTo(map);
  }
}

export default GeotiffLayer;

export const PlottyGeotiffLayer = withLeaflet((props) => {
  const { options, layerRef } = props;
  options.renderer = new L.LeafletGeotiff.Plotty(options);
  return <GeotiffLayer ref={layerRef} {...props} />;
});

export const VectorArrowsGeotiffLayer = withLeaflet((props) => {
  const { options, layerRef } = props;
  options.renderer = new L.LeafletGeotiff.VectorArrows(options);
  return <GeotiffLayer ref={layerRef} {...props} />;
});
