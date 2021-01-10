import React, { useState, useEffect } from 'react';
import { loadModules } from 'esri-loader';

const MyFeatureLayer = (props) => {
  const [myFeatureLayer, setMyFeatureLayer] = useState(null);
  useEffect(() => {
    loadModules([
      'esri/Map',
      'esri/widgets/BasemapToggle',
      'esri/widgets/Legend',
      'esri/layers/FeatureLayer',
      'esri/widgets/TimeSlider',
      'esri/widgets/Search',
      'esri/views/MapView',
      'esri/layers/MapImageLayer',
      'esri/tasks/Locator',
      'dojo/domReady!',
    ])
      .then(
        ([
          Map,
          BasemapToggle,
          Legend,
          FeatureLayer,
          TimeSlider,
          Search,
          MapView,
          MapImageLayer,
          Locator,
        ]) => {
          const myFeatureLayer = new FeatureLayer({
            url: props.featureLayerProperties.url,
          });

          setMyFeatureLayer(myFeatureLayer);
          props.map.add(myFeatureLayer);
        },
      )
      .catch((err) => console.error(err));

    return function cleanup() {
      props.map.remove(myFeatureLayer);
    };
  }, [props]);

  return (
    <template name="map">
      <main>
        <section>
          <div className="overlay">
            <div id="viewDiv"></div>
            <div id="timeSlider"></div>
          </div>
        </section>
      </main>
      <div className="scrollbar" id="style-1">
        <div className="force-overflow"></div>
      </div>
    </template>
  );
};

export default MyFeatureLayer;
