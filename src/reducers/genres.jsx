import {GET_GENRES} from '../constants/ActionTypes';

const initialState = {};

export default function genres(state = initialState, action) {
  switch (action.type){
    case GET_GENRES:
       return { ...action.genres};
    default:
       return state;
  }
}
