import * as types from '../constants/ActionTypes';

const host = "/api/genres";
export function getGenres() {
  return fetch(host).then(response => response.json()).then(json => ({
            type:types.GET_GENRES,
            genres: json
          }));
        };
