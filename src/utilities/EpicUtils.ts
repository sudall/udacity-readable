import {ActionsObservable} from "redux-observable";
import ActionMeta from "src/redux-actions/framework/ActionMeta";
import PayloadAction from "src/redux-actions/framework/PayloadAction";
import {Observable} from "rxjs/Rx";

class EpicUtils {
    static restEpicConcurrentCalls<TActionPayload, TCompletedActionPayload>(action$: ActionsObservable<PayloadAction<TActionPayload>>,
        call: (payload: TActionPayload) => Observable<TCompletedActionPayload>,
        completedAction: ActionMeta<TCompletedActionPayload, any>) {

        return action$
            .mergeMap((action: PayloadAction<TActionPayload>) => {
                const payload = action.payload;
                return call(payload)
                    .map((result) => {
                        return completedAction.factory(result);
                    });
            });
    };

    static restEpicLatestCallOnly<TActionPayload, TCompletedActionPayload>(action$: ActionsObservable<PayloadAction<TActionPayload>>,
        call: (payload: TActionPayload) => Observable<TCompletedActionPayload>,
        completedAction: ActionMeta<TCompletedActionPayload, any>) {

        return action$
            .debounceTime(100)
            .switchMap((action: PayloadAction<TActionPayload>) => {
                const payload = action.payload;
                return call(payload)
                    .map((result) => {
                        return completedAction.factory(result);
                    });
            });
    };

    //TODO
    // static startOperationEpic
}

export default EpicUtils;