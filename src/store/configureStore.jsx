import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise'
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from '../reducers';
import environment from '../constants/environment.js';
import * as types from '../constants/ActionTypes'
const debugware = [];


export default function configureStore(initialState) {
	let composeEnhancers;
	if (environment == 'production') {
		composeEnhancers = compose;
	} else {
		composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	}

   const store = createStore(
      rootReducer,
      initialState,
      composeEnhancers(
         applyMiddleware(thunk, routerMiddleware(browserHistory), promise, ...debugware),
      ),
   );

   return store;
}
