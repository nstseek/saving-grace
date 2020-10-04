import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './configureStore';
import { Provider } from 'react-redux';
import { LinkContext, routeLinks } from './routes';
import Api from './api/api';
import { LoadingState, updateLoading } from './stores/system';
import SystemActionTypes from './stores/system/system.action-types';

const store = configureStore();

Api.interceptors.request.use(config => {
  store.dispatch(updateLoading(SystemActionTypes.UPDATE_LOADING, {loading: LoadingState.Loading}));
  return config
}, err => Promise.reject(err));

Api.interceptors.response.use(config => {
  store.dispatch(updateLoading(SystemActionTypes.UPDATE_LOADING, {loading: LoadingState.Success}));
  return config    
}, err => {
  store.dispatch(updateLoading(SystemActionTypes.UPDATE_LOADING, {loading: LoadingState.Failed}));
  return Promise.reject(err);
});

ReactDOM.render(
  <Provider store={store}>
    <LinkContext.Provider value={routeLinks}>
      <App />
    </LinkContext.Provider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
