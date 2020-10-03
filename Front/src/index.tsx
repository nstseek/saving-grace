import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { store } from './configureStore';
import { Provider } from 'react-redux';
import { LinkContext, routeLinks } from './routes';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <LinkContext.Provider value={routeLinks}>
        <App />
      </LinkContext.Provider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
