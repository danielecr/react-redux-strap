import { ofType } from 'redux-observable';
import { mergeMap, switchMap, catchError, takeUntil} from 'rxjs/operators';

export const externalStreamEpic = (actionType, streamFn, resultHandler, errorHandler) => (action$, ...args) => action$.pipe(
    ofType(actionType),
    mergeMap((action) => streamFn(action, ...args).pipe(
        switchMap(result=>resultHandler(result, action, ...args)),
        catchError(error=> errorHandler(error, action, ...args))
    ))
);

export const externalStreamCancelEpic = (actionType, cancelType, streamFn, resultHandler, errorHandler) => (action$, ...args) => action$.pipe(
    ofType(actionType),
    mergeMap((action) => streamFn(action, ...args).pipe(
        switchMap(result=>resultHandler(result, action, ...args)),
        takeUntil(action$.pipe(ofType(cancelType))),
        catchError(error=> errorHandler(error, action, ...args))
    ))
);
