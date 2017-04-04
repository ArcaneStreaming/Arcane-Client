import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise'
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from '../reducers';
import * as types from '../constants/ActionTypes'
const debugware = [];

export default function configureStore(initialState) {

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, routerMiddleware(browserHistory), promise, ...debugware),
   ),
  );

  return store;
}
