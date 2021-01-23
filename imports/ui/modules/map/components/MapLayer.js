import { loadModules } from 'esri-loader';
import React from 'react';
import { Row } from '../../common/components/elements';
import '../pages/styles';
const styles = {
  mapDiv: {
    height: '100%',
    width: '100%',
  },
};

const BaseMap = (props) => {
  const [state, setState] = React.useState({ status: 'loading' });

  React.useEffect(() => {
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
    ]).then(
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
        var layer = new MapImageLayer({
          url: props.featureLayerProperties.url,
          opacity: 0.5,
        });
        var map = new Map({
          basemap: 'streets-relief-vector',
          layers: [layer],
        });
        const view = new MapView({
          container: 'viewDiv',
          map,
          zoom: props.isLandsat ? 9 : 5,
          center: props.isLandsat ? [105.83416, 21.027763] : [107.590866, 16.463713],
        });

        var toggle = new BasemapToggle({
          view: view,
          nextBasemap: 'satellite',
        });

        var legend = new Legend({
          view: view,
          layerInfos: [
            {
              layer: layer,
              opacity: 1.0,
              title: 'Chỉ số PM 2.5',
            },
          ],
        });
        console.log(layer)
        var searchWidget = new Search({
          view: view,
        });

        view.ui.add(searchWidget, {
          position: 'top-right',
        });

        view.ui.add(toggle, 'top-left');

        view.ui.add(legend, 'bottom-right');

        var featureLayer = !props.isLandsat ? new FeatureLayer({
          url: props.featureLayerProperties.featureUrl,
          opacity: 0.5,
          timeInfo: {
            startField: 'time',
            interval: {
              unit: 'days',
              value: 1,
            },
            fullTimeExtent: {
              start: new Date(2017, 0, 1),
              end: new Date(2017, 0, 10),
            },
          },
        }) : new FeatureLayer({
          //   url: "http://113.175.118.161:6080/arcgis/rest/services/PM25_time/MapServer/0",
          url: props.featureLayerProperties.featureUrl,
          opacity: 0.5,
          timeInfo: {
            startField: "time", // name of the date field
            interval: {
              // set time interval to one day
              unit: "days",
              value: 1
            },
            fullTimeExtent: {
              start: new Date(2019, 0, 1),
              end: new Date(2019, 0, 6)
            }
          }
        });;

        featureLayer.popupTemplate = {
          content: [
            {
              type: 'fields',
              fieldInfos: [
                {
                  fieldName: 'GRID_CODE',
                  label: 'Chỉ số PM2.5',
                  format: {
                    places: 0,
                    digitSeparator: true,
                  },
                },
              ],
            },
          ],
        };

        const locatorTask = new Locator({
          url: 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer',
        });

        view.on('click', function (event) {
          var lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
          var lon = Math.round(event.mapPoint.longitude * 1000) / 1000;

          var params = {
            location: event.mapPoint,
          };

          locatorTask
            .locationToAddress(params)
            .then(function (response) {
              console.log(response);
              featureLayer.popupTemplate.title =
                '<table><tr><th>Toạ độ địa lý: </th><td>[' +
                lon +
                ', ' +
                lat +
                ']</td></tr><tr><th>Địa điểm: </th><td>' +
                response.address +
                '</td></tr></table>';
            })
            .catch(function (error) {
              featureLayer.popupTemplate.title = 'Không có địa danh nào cho vị trí này';
            });
        });

        map.add(featureLayer);

        var timeSlider = !props.isLandsat
          ? new TimeSlider({
            container: 'timeSlider',
            view: view,
            mode: 'cumulative-from-start',
            loop: true,
            tickConfigs: [
              {
                mode: 'position',
                values: [
                  new Date(2017, 0, 1),
                  new Date(2017, 0, 2),
                  new Date(2017, 0, 3),
                  new Date(2017, 0, 4),
                  new Date(2017, 0, 5),
                  new Date(2017, 0, 6),
                  new Date(2017, 0, 7),
                  new Date(2017, 0, 8),
                  new Date(2017, 0, 9),
                  new Date(2017, 0, 10),
                ].map((date) => date.getTime()),
                labelsVisible: true,
                labelFormatFunction: (value) => {
                  const date = new Date(value);
                  return `${date.getDate() + '/1'}`;
                },
                tickCreatedFunction: (value, tickElement, labelElement) => {
                  tickElement.classList.add('custom-ticks');
                  labelElement.classList.add('custom-labels');
                },
              },
            ],
          })
          : new TimeSlider({
            container: "timeSlider",
            view: view,
            loop: true,
            mode: "cumulative-from-start",
            tickConfigs: [{
              mode: "position",
              values: [
                new Date(2019, 0, 1), new Date(2019, 0, 2), new Date(2019, 0, 3),
                new Date(2019, 0, 4), new Date(2019, 0, 5), new Date(2019, 0, 6)
              ].map((date) => date.getTime()),
              labelsVisible: true,
              labelFormatFunction: (value) => { // get the full year from the date
                const date = new Date(value);
                return `${date.getDate() + "/1"}`; // only display the last two digits of the year
              },
              tickCreatedFunction: (value, tickElement, labelElement) => { // callback for the ticks
                tickElement.classList.add("custom-ticks");  // assign a custom css for the ticks 
                labelElement.classList.add("custom-labels"); // assign a custom css for the labels
              }
            }]

          });

        featureLayer.when(function () {
          timeSlider.fullTimeExtent = featureLayer.timeInfo.fullTimeExtent;
          timeSlider.stops = {
            interval: featureLayer.timeInfo.interval,
          };
        });
        view.ui.add(timeSlider, 'bottom-left');

        view.then(() => {
          setState({
            map,
            view,
            status: 'loaded',
          });
        });
      },
    );
  }, []);

  renderMap = () => {
    if (state.status === 'loading') {
      return <div></div>;
    }
  };
  return (
    <Row style={{ height: 500 }}>
      <div id="viewDiv" style={styles.mapDiv}>
        {this.renderMap()}
      </div>
      <div id="timeSlider"></div>
    </Row>
  );
};

export default BaseMap;
