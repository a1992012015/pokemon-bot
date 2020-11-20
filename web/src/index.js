import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router/immutable';

import App from './App';
import { history, persists, store } from './redux';
import reportWebVitals from './reportWebVitals';

import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persists}>
      <ConnectedRouter history={history}>
        <Route component={App}/>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
