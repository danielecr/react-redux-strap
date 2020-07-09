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

export const loadUserdata = (action$, state$, {simulGet, simulGetWithError}) => action$.pipe(
    ofType(actionTypes.USERDATA_LOAD),
    switchMap((action) =>
        simulGetWithError('httpurl', aFalsePayload).pipe(
            switchMap(result=> {
                return of({type: actionTypes.USERDATA_LOAD_SUCCESS, payload: result.response});
            }),
            catchError(err=> {
                return of({type: actionTypes.USERDATA_LOAD_ERROR, error: err})
            })
        )
    ),
);
