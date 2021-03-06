import PayloadAction from "src/redux-actions/framework/PayloadAction";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import {Dispatch} from "react-redux";
import {bindActionCreators, MiddlewareAPI} from "redux";
import {ActionsObservable, Epic} from "redux-observable";
import {Observable} from "rxjs/Rx";
import ActionSet from "src/redux-actions/framework/ActionSet";

export interface FilteredEpic<TAction extends PayloadAction<any>, TStore, TDependencies = {}, TOutputAction extends TAction = TAction> {
    (filteredAction$: ActionsObservable<TAction>,
        store: MiddlewareAPI<TStore>,
        dependencies: TDependencies,
        allAction$: ActionsObservable<PayloadAction<any>>): Observable<TOutputAction>;
}

class ReducerRegistration<TActionSetReducerStateKey extends keyof ApplicationState,
    TActionSetReducerState extends ApplicationState[TActionSetReducerStateKey],
    TActionPayload> {
    reducerStateKey: TActionSetReducerStateKey;
    reducer: (state: TActionSetReducerState, action: PayloadAction<TActionPayload>) => TActionSetReducerState
}

abstract class ActionMeta<TActionPayload, TReducerState = ApplicationState> {
    private static TypeToActionMetaMap = new Map<string, ActionMeta<any, any>>();

    readonly type: string;
    readonly reducerStateKey: keyof ApplicationState;

    public readonly registeredReducers: ReducerRegistration<keyof ApplicationState, any, TActionPayload>[] = [];

    constructor(readonly actionSet: ActionSet<any, TReducerState>) {
        const type = this.type = `${this.actionSet.namespace}.${this.constructor.name}`;
        this.reducerStateKey = actionSet.reducerStateKey;

        if (ActionMeta.TypeToActionMetaMap.has(type)) {
            throw new Error(`An action with this type already exists: ${type}`);
        }

        ActionMeta.TypeToActionMetaMap.set(type, this);
    }

    static getActionMetaByType(type: string) {
        return ActionMeta.TypeToActionMetaMap.get(type);
    }

    static getAllRootEpics() {
        return Array.from(ActionMeta.TypeToActionMetaMap.values())
            .map((actionMeta) => {
                return actionMeta.rootEpic;
            });
    }

    reducer(state: TReducerState, action: PayloadAction<TActionPayload>): TReducerState {
        return state;
    }

    registerReducer<TActionSetReducerStateKey extends keyof ApplicationState,
        TActionSetReducerState extends ApplicationState[TActionSetReducerStateKey]>
        (reducerStateKey: TActionSetReducerStateKey, reducer: (state: TActionSetReducerState, action: PayloadAction<TActionPayload>) => TActionSetReducerState) {

        this.registeredReducers.push({
            reducerStateKey,
            reducer
        });
    }

    private rootEpic: Epic<PayloadAction<any>, ApplicationState> = (action$: ActionsObservable<PayloadAction<any>>, store, dependencies): Observable<PayloadAction<any>> => {
        const filteredAction$ = action$
            .ofType(this.type);

        return this.epic(filteredAction$, store, dependencies, action$);
    };

    epic: FilteredEpic<PayloadAction<TActionPayload>, ApplicationState> =
        (filteredAction$,
            store,
            dependencies,
            allAction$): Observable<PayloadAction<any>> => {
            return Observable.empty<PayloadAction<any>>();
        };

    factory = (payload: TActionPayload, operationId?: string) => {
        const type = this.type;

        const action = <PayloadAction<TActionPayload>>{
            type,
            payload,
            operationId
        };

        return action;
    };

    bindToDispatch(dispatch: Dispatch<ApplicationState>): (payload: TActionPayload, operationId?: string) => void {
        return bindActionCreators(this.factory, dispatch);
    }
}

export default ActionMeta;