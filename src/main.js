import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import masterReducer from './reducers';
import actions from './actions';
import { AppView } from './views/app-view';

const loggerMiddleware = createLogger();

/*
state = {
  testVideos,
  idxOfVideoToEvaluate,
  presentationOrder,
  presentationPhase,
  testerId,
}
*/

const testVideos = [
  {
    inputFileName: '9news',
    width: 1280,
    height: 720,
    averageBitRate: 2800000,
  },
  {
    inputFileName: '9news',
    width: 640,
    height: 360,
    averageBitRate: 730000,
  },
  {
    inputFileName: 'footy',
    width: 640,
    height: 360,
    averageBitRate: 730000,
  },
];

const middlewares = [
  thunkMiddleware, // lets us dispatch() functions
//  loggerMiddleware, // neat middleware that logs actions
];

const store = createStore(masterReducer, {
  testVideos,
}, applyMiddleware(...middlewares));


store.dispatch(actions.newSession);

const rootEl = document.getElementById('appHolder');

const wrapWithStoreProvider = (View) => (
  <Provider store={store}>
    <View />
  </Provider>
);


const renderApp = (_AppView) => {
  const wrappedAppView = wrapWithStoreProvider(_AppView);
  ReactDOM.render(wrappedAppView, rootEl);
};

renderApp(AppView);

if (module.hot) {
  module.hot.accept('./views/app-view', () => {
    const appViewModule = require('./views/app-view'); // eslint-disable-line global-require
    renderApp(appViewModule.AppView);
  });
}
