import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import {userdata, loadUserdata, postUpdates} from './reducers/userdata';

export const mainReducer = combineReducers({
  userdata
});

export const epics = (injected) => (...args) =>
  combineEpics(
    loadUserdata,
    postUpdates
  )(...args, injected);
