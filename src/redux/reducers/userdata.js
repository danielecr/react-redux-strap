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
    mergeMap((action) => streamFn(action, ...args).pipe(
        switchMap(result=>resultHandler(result, action, ...args)),
        catchError(error=> errorHandler(error, action, ...args))
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

const streamFn = (action, state$, {simulGetWithError}) => {
    console.log(action);
    return simulGetWithError('httpurl', aFalsePayload);
};

const resultHandler = (of) => (result, action, state$, ...args) => {
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
resultHandler(ofspy.of)({response:{unexpectedkey:"value"}}, {type:'actiontype'}, {value:{userdata:"value"}});
console.log(ofspy.getCallsN(), ofspy.getDetails());
// end of test

const errorHandler = (err, action, state$) => {
    return of({type: actionTypes.USERDATA_LOAD_ERROR, error: err})
}

export const loadUserdata = externalStreamEpic(actionTypes.USERDATA_LOAD, streamFn, resultHandler(of), errorHandler);
