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

const store = createStore(changeState);

React.icons = icons;

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app'),
  );
});
