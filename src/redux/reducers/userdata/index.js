import * as actionTypes from 'actionTypes';
import { externalStreamEpic } from 'epicPatterns';

import { mapUserdataResult, errorHandler } from './userdata-handler';

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

const streamFn = (action, state$, {simulGetWithError}) => {
    console.log(action);
    return simulGetWithError('httpurl', aFalsePayload);
};


export const loadUserdata = externalStreamEpic(actionTypes.USERDATA_LOAD, streamFn, mapUserdataResult, errorHandler);

import { from } from 'rxjs';

const streamUp = (action, state$, {postViaAjax}) => {
    console.log('action', action)
    return postViaAjax('token','https',action)
    return from(new Promise((resolve,reject)=> {
        setTimeout(()=> {
            resolve({response: {data: {affectedRow: 1}}});
        }, 2000);
    }))
}

const updateResult = (result, action) => {
    console.log(result);
    return of({type:actionTypes.USERDATA_UPDATE_SUCCESS});
}

export const postUpdates = externalStreamEpic(actionTypes.USERDATA_UPDATE,
streamUp, updateResult, errorHandler);
