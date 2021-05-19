// import React from 'react';
// import ReactDOM from 'react-dom';

// import { Map } from '@esri/react-arcgis';
// import MyFeatureLayer from '../components/MapLayer';

// const ArcMap = (props) => {
//   const [mapState, setMapState] = React.useState({ view: null, map: null });

//   const handleMapLoad = React.useCallback((map, view) => {
//     setMapState({ map, view });
//   }, []);
//   return (
//     <div style={{ height: 650, width: 1400 }}>
//       <MyFeatureLayer
//         featureLayerProperties={{
//           url: 'http://arcgis70.fimo.edu.vn/arcgis/rest/services/PM25_Landsat/MapServer',
//           featureUrl: 'http://arcgis70.fimo.edu.vn/arcgis/rest/services/PM25_Landsat/MapServer',
//         }}
//         mapState={mapState}
//         isLandsat={true}
//       ></MyFeatureLayer>
//     </div>
//   );
// };
// export default ArcMap;
