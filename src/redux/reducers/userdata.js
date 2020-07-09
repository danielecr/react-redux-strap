import { ofType } from 'redux-observable';
import { mergeMap, switchMap, catchError} from 'rxjs/operators';
import { merge, of } from 'rxjs';
import * as actionTypes from '../../actionTypes';

const initialState = {name:""};
export const userdata = (state=initialState, action) => {
    return state;
}

export const loadUserdata = (action$, state$, {getViaAjax}) => action$.pipe(
    ofType('NOEXISTENT')
);
