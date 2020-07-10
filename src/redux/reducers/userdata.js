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
    mergeMap((action) => streamFn(...args)(action).pipe(
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

// (little fix while going on)
const streamFn = (state$, {simulGetWithError}) => (action) => {
    console.log(action);
    return simulGetWithError('httpurl', aFalsePayload);
};

const resultHandler = (of) => (action, state$, ...args) => (result) => {
    console.log(state$.value.userdata)
    return of({type: actionTypes.USERDATA_LOAD_SUCCESS, payload: result.response});
}

// this test resultHandler by injection of `of` as a spy fun
const ofSpy = function() {
    this.calls = [];
    this.of = (...args) => this.calls.push(args);
    this.getCallsN = ()=> this.calls.length
    this.getDetails = ()=> this.calls;
}

let ofspy = new ofSpy();
resultHandler(ofspy.of)({type:'actiontype'}, {value:{userdata:"value"}}) ({response:{unexpectedkey:"value"}});
console.log(ofspy.getCallsN(), ofspy.getDetails());
// end of test

const errorHandler = (action, state$) => (err) => {
    return of({type: actionTypes.USERDATA_LOAD_ERROR, error: err})
}

export const loadUserdata = externalStreamEpic(actionTypes.USERDATA_LOAD, streamFn, resultHandler(of), errorHandler);
