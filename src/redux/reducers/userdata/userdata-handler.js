import { merge, of } from 'rxjs';
import * as actionTypes from '../../../actionTypes';

export const userdataHandler = (of) => (result, action, state$, ...args) => {
    return of({type: actionTypes.USERDATA_LOAD_SUCCESS, payload: result.response});
}

export const mapUserdataResult = userdataHandler(of);

export const errorHandler = (err, action, state$) => {
    return of({type: actionTypes.USERDATA_LOAD_ERROR, error: err})
}
