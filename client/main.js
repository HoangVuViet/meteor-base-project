import { ConnectedRouter } from 'connected-react-router';
import { Meteor } from 'meteor/meteor';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { icons } from '../imports/ui/assets/icons';
import App from '../imports/ui/App';
// import { MUI_THEME, THEME } from '/imports/ui/configs/setupTheme';
import ConnectedIntlProvider from '/imports/ui/modules/intl/components/ConnectedIntlProvider';
import configureStore, { history } from '/imports/ui/redux/configureStore';
import { createStore } from 'redux';
import { MuiThemeProvider, ThemeProvider } from '@material-ui/core';
import { MUI_THEME, THEME } from '/imports/ui/configs/setupTheme';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import 'leaflet-timedimension/dist/leaflet.timedimension.min.js';

const initialState = {
  sidebarShow: 'responsive',
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest };
    default:
      return state;
  }
};

const store = configureStore({});
const persistor = persistStore(store);
React.icons = icons;

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedIntlProvider>
            <ThemeProvider theme={THEME}>
              <MuiThemeProvider theme={MUI_THEME}>
                <SnackbarProvider maxSnack={3}>
                  <App />
                </SnackbarProvider>
              </MuiThemeProvider>
            </ThemeProvider>
          </ConnectedIntlProvider>
        </PersistGate>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app'),
  );
});
