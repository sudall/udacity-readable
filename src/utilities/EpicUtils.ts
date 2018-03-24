import {ActionsObservable} from "redux-observable";
import ActionMeta from "src/redux-actions/framework/ActionMeta";
import PayloadAction from "src/redux-actions/framework/PayloadAction";
import {Observable} from "rxjs/Rx";

class EpicUtils {
    static restEpicConcurrentCalls<TActionPayload, TCompletedActionPayload>(action$: ActionsObservable<PayloadAction<TActionPayload>>,
        call: (payload: TActionPayload) => Observable<TCompletedActionPayload>,
        completedAction: ActionMeta<TCompletedActionPayload, any>): Observable<PayloadAction<any>> {

        return action$
            .mergeMap((action: PayloadAction<TActionPayload>) => {
                const payload = action.payload;
                return call(payload)
                    .map((result) => {
                        return completedAction.factory(result, action.operationId);
                    })
                    .catch((error) => {
                        // Normally this would return the failed action, but for the sake of time, I'm just doing this
                        console.warn(`Rest call error: ${error}`);
                        return Observable.empty<PayloadAction<any>>();
                    });
            });
    };

    static restEpicLatestCallOnly<TActionPayload, TCompletedActionPayload>(action$: ActionsObservable<PayloadAction<TActionPayload>>,
        call: (payload: TActionPayload) => Observable<TCompletedActionPayload>,
        completedAction: ActionMeta<TCompletedActionPayload, any>): Observable<PayloadAction<any>> {

        return action$
            .debounceTime(100)
            .switchMap((action: PayloadAction<TActionPayload>) => {
                const payload = action.payload;
                return call(payload)
                    .map((result) => {
                        return completedAction.factory(result, action.operationId);
                    })
                    .catch((error) => {
                        // Normally this would return the failed action, but for the sake of time, I'm just doing this
                        console.warn(`Rest call error: ${error}`);
                        return Observable.empty<PayloadAction<any>>();
                    });
            });
    };
}

export default EpicUtils;