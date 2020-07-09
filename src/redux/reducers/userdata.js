import { ofType } from 'redux-observable';
import { mergeMap, switchMap, catchError} from 'rxjs/operators';
import { merge, of } from 'rxjs';
import * as actionTypes from '../../actionTypes';

const initialState = {name:""};
export const userdata = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.USERDATA_LOAD_SUCCESS:
            return {...state, ...action.payload}
    }
    return state;
}

const aFalsePayload = {
    name: "Middle",
    surname: "Intheman"
}

const externalStreamEpic = (actionType, streamFn, resultHandler, errorHandler) => (action$, ...args) => action$.pipe(
    ofType(actionType),
    mergeMap((action) => streamFn(...args).pipe(
        switchMap(resultHandler(action, ...args)),
        catchError(errorHandler(action, ...args))
    ))
);


/*
It looks interesting ...
but there must something more, or I think so.

Every handler should work, and so that means:
every handler must be testable.

How can I get testability from here:
inject the dependencies

*/

const streamFn = (state$, {simulGetWithError}) => {
    return simulGetWithError('httpurl', aFalsePayload);
};

const resultHandler = (action, state$) => (result) => {
    console.log(state$.value.userdata)
    return of({type: actionTypes.USERDATA_LOAD_SUCCESS, payload: result.response});
}

const errorHandler = (action, state$) => (err) => {
    return of({type: actionTypes.USERDATA_LOAD_ERROR, error: err})
}

export const loadUserdata = externalStreamEpic(actionTypes.USERDATA_LOAD, streamFn, resultHandler, errorHandler);
