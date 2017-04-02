import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise'
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from '../reducers';
import * as types from '../constants/ActionTypes'
const debugware = [];
if (process.env.NODE_ENV !== 'production') {
  const createLogger = require('redux-logger');
  debugware.push(createLogger({
    collapsed: true,
    predicate: (getState, action) => (
      action.type !== types.SET_TIME
      && action.type !== types.SET_PROGRESS
      && action.type !== types.UPDATE_VOLUME
      && action.type !== types.INITIALIZE

    )

  }));
}

export default function configureStore(initialState) {
  // const store = createStore(
  //   rootReducer,
  //   initialState,
  //   window.devToolsExtension ? window.devToolsExtension() : undefined
  // );
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, routerMiddleware(browserHistory), promise, ...debugware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
   ),
  );
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
