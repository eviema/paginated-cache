import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import App from './containers/App';

import axios from 'axios';
import { PARAMS } from './api/params';


axios.defaults.baseURL = PARAMS.baseUrl;
axios.defaults.headers.common['apiToken'] = PARAMS.apiToken;

ReactDOM.render(
  <Root>
    <App />
  </Root>
  , document.getElementById('root'));
