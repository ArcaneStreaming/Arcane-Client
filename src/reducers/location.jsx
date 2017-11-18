import { Map, fromJS } from 'immutable';
import { GET_LOCATIONS } from '../constants/ActionTypes';

export default function locations(state = new Map(), action) {
	switch (action.type) {
		case GET_LOCATIONS:
			return fromJS(action.payload);
		default:
			return state;
	}
}
