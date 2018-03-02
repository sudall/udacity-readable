import PayloadAction from "src/redux-actions/PayloadAction";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import PostData from "src/data/models/PostData";
import {Dispatch} from "react-redux";
import {Action, bindActionCreators} from "redux";
import {ActionsObservable, Epic} from "redux-observable";
import {Observable} from "rxjs/Rx";
import PostConnector from "src/data/connectors/PostConnector";

export abstract class ActionSet implements ActionSet {
    private static readonly TakenNamespaces = new Set<string>();

    readonly namespace = this.constructor.name;

    constructor() {
        const namespace = this.namespace;
        if (ActionSet.isNamespaceTaken(namespace)) {
            throw new Error(`Namespace '${namespace}' is already taken.`);
        } else {
            ActionSet.takeNamespace(namespace);
        }
    }

    private static isNamespaceTaken(namespace: string): boolean {
        return ActionSet.TakenNamespaces.has(namespace);
    }

    private static takeNamespace(namespace: string) {
        this.TakenNamespaces.add(namespace);
    }
}

export abstract class ActionMeta<TActionPayload> {
    private static TypeToActionMetaMap = new Map<string, ActionMeta<any>>();

    readonly type: string;

    constructor(readonly actionSet: ActionSet) {
        const type = this.type = `${this.actionSet.namespace}.${this.constructor.name}`;

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

    reducer(state: ApplicationState, action: PayloadAction<TActionPayload>): ApplicationState {
        return state;
    }

    private rootEpic: Epic<PayloadAction<any>, ApplicationState> = (action$: ActionsObservable<PayloadAction<any>>, store, dependencies): Observable<PayloadAction<any>> => {
        const filteredAction$ = action$
            .ofType(this.type);

        return this.epic(filteredAction$, store, dependencies);
    };

    epic: Epic<PayloadAction<TActionPayload>, ApplicationState> = (action$: ActionsObservable<PayloadAction<TActionPayload>>): Observable<PayloadAction<any>> => {
        return Observable.empty<PayloadAction<any>>();
    };

    factory = (payload: TActionPayload) => {
        const type = this.type;

        const action = <PayloadAction<TActionPayload>>{
            type,
            payload
        };

        return action;
    };

    bindToDispatch(dispatch: Dispatch<ApplicationState>): (payload: TActionPayload) => void {
        return bindActionCreators(this.factory, dispatch);
    }
}

class GetAll extends ActionMeta<void> {
    epic: Epic<PayloadAction<void>, ApplicationState> = (action$: ActionsObservable<PayloadAction<void>>): Observable<PayloadAction<any>> => {
        return action$
            .mergeMap((action) => {
                return PostConnector.getAll()
                    .map((result) => {
                        return instance.getAllCompleted.factory(result);
                    });
            });
    };
}

class GetAllCompleted extends ActionMeta<PostData[]> {
    reducer(state: ApplicationState, action: PayloadAction<PostData[]>): ApplicationState {
        return <ApplicationState>{
            ...state,
            posts: action.payload
        };
    }
}

class Upvote extends ActionMeta<PostData> {
}

class UpvoteCompleted extends ActionMeta<void> {
}

class Downvote extends ActionMeta<PostData> {
}

class PostActions2 extends ActionSet {
    getAll = new GetAll(this);

    getAllCompleted = new GetAllCompleted(this);

    upvote = new Upvote(this);

    upvoteCompleted = new UpvoteCompleted(this);

    downvote = new Downvote(this);
}

const instance = new PostActions2();

export default instance;