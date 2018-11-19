import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/index';
import { logger } from 'redux-logger';
import axios from 'axios';
import { PARAMS } from './api/params';
import App from './containers/App';
import reducers from './reducers';

axios.defaults.baseURL = PARAMS.baseUrl;
axios.defaults.headers.common['apiToken'] = PARAMS.apiToken;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
