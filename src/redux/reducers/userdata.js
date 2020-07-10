import * as actionTypes from '../../actionTypes';
import { externalStreamEpic } from './external-stream-pattern';
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
