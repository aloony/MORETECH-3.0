import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { createBrowserHistory } from 'history';

import './css/style.sass';
import 'babel-polyfill';
import 'react-toastify/dist/ReactToastify.css';

import createStore from './store/createStore';
import AppLayout from './components/AppLayout';

const history = createBrowserHistory();
const { store, persistor } = createStore(history);
const App = () => {

  // persistor.purge()

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConnectedRouter history={history}>
          <AppLayout />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}


render(<App />, document.getElementById('app'));