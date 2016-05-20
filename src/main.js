import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import stateReducers from './reducers';
import actions from './actions';
import {HlsTestAppView} from './views/hls-test-app-view';

const loggerMiddleware = createLogger()

const store = createStore(stateReducers, applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware // neat middleware that logs actions
));

store.dispatch(actions.updateMasterM3u8UrlToStore('https://example.com/master.m3u8'));
const rootEl = document.getElementById('appHolder');

const wrapWithStoreProvider = (View) => {
  return (
    <Provider store={store}>
      <View/>
    </Provider>
  )
}

const renderApp = (AppView)  => {
  const wrappedAppView = wrapWithStoreProvider(AppView);
  ReactDOM.render(wrappedAppView, rootEl);
}

renderApp(HlsTestAppView);

if (module.hot) {
  module.hot.accept('./views/hls-test-app-view', function () {
    var NextHlsTestAppView = require('./views/hls-test-app-view')
    renderApp(NextHlsTestAppView);
  })
}