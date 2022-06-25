import * as ActionTypes from "./reducers/types";


export const createAction = function<T extends keyof typeof ActionTypes, S>(name: T, payload: S) {
  return {
    type: name,
    payload
  };
};
