import PayloadAction from "src/redux-actions/PayloadAction";
import {ApplicationState, PostIdToPostDataMap} from "src/components/readable/ReadableApplication";
import PostData from "src/data/models/PostData";
import {Dispatch} from "react-redux";
import {bindActionCreators, MiddlewareAPI} from "redux";
import {ActionsObservable, Epic} from "redux-observable";
import {Observable} from "rxjs/Rx";
import PostConnector from "src/data/connectors/PostConnector";

export class ActionSet<TReducerStateKey extends keyof ApplicationState, TReducerState extends ApplicationState[TReducerStateKey]> {
    private static readonly TakenNamespaces = new Set<string>();

    readonly namespace = this.constructor.name;

    // this is only used to enforce the reducer state type. TypeScript seems to ignore type parameters if they aren't used
    private readonly reducerStateType: TReducerState;

    constructor(public readonly reducerStateKey: TReducerStateKey) {
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

interface FilteredEpic<TAction extends PayloadAction<any>, TStore, TDependencies = any, TOutputAction extends TAction = TAction> {
    (filteredAction$: ActionsObservable<TAction>,
        store: MiddlewareAPI<TStore>,
        dependencies: TDependencies,
        allAction$: ActionsObservable<PayloadAction<any>>): Observable<TOutputAction>;
}

export abstract class ActionMeta<TActionPayload, TReducerState = ApplicationState> {
    private static TypeToActionMetaMap = new Map<string, ActionMeta<any, any>>();

    readonly type: string;
    readonly reducerStateKey: keyof ApplicationState;

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

    private rootEpic: Epic<PayloadAction<any>, ApplicationState> = (action$: ActionsObservable<PayloadAction<any>>, store, dependencies): Observable<PayloadAction<any>> => {
        const filteredAction$ = action$
            .ofType(this.type);

        return this.epic(filteredAction$, store, dependencies, action$);
    };

    epic: FilteredEpic<PayloadAction<TActionPayload>, ApplicationState> = (filteredAction$: ActionsObservable<PayloadAction<TActionPayload>>,
        store,
        dependencies,
        allAction$): Observable<PayloadAction<any>> => {
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

const updatePostInState = (newPostData: PostData, state: PostsState): PostsState => {
    return {
        ...state,
        [newPostData.id]: newPostData
    };
};

class GetAll extends ActionMeta<void, PostsState> {
    epic = (action$: ActionsObservable<PayloadAction<void>>): Observable<PayloadAction<any>> => {
        return action$
            .mergeMap((action) => {
                return PostConnector.getAll()
                    .map((result) => {
                        return instance.getAllCompleted.factory(result);
                    });
            });
    };
}

class GetAllCompleted extends ActionMeta<PostData[], PostsState> {
    reducer(state: PostsState, action: PayloadAction<PostData[]>): PostsState {
        const postsArray = action.payload;

        const posts: PostsState = {};
        Object.values(postsArray).forEach((post) => {
            posts[post.id] = post;
        });

        return posts;
    }
}

class Upvote extends ActionMeta<PostData, PostsState> {
    epic = (action$: ActionsObservable<PayloadAction<PostData>>): Observable<PayloadAction<any>> => {
        return action$
            .mergeMap((action: PayloadAction<PostData>) => {
                const postId = action.payload.id;
                return PostConnector.vote(postId, "upVote")
                    .map((result) => {
                        return instance.upvoteCompleted.factory(result);
                    });
            });
    }
}

class UpvoteCompleted extends ActionMeta<PostData, PostsState> {
    reducer(state: PostsState, action: PayloadAction<PostData>): PostsState {
        const newPostData = action.payload;

        return updatePostInState(newPostData, state);
    }
}

class Downvote extends ActionMeta<PostData, PostsState> {
    epic = (action$: ActionsObservable<PayloadAction<PostData>>): Observable<PayloadAction<any>> => {
        return action$
            .mergeMap((action: PayloadAction<PostData>) => {
                const postId = action.payload.id;
                return PostConnector.vote(postId, "downVote")
                    .map((result) => {
                        return instance.downvoteCompleted.factory(result);
                    });
            });
    }
}

class DownvoteCompleted extends ActionMeta<PostData, PostsState> {
    reducer(state: PostsState, action: PayloadAction<PostData>): PostsState {
        const newPostData = action.payload;

        return updatePostInState(newPostData, state);
    }
}

class Get extends ActionMeta<string, PostsState> {
    epic = (action$: ActionsObservable<PayloadAction<string>>): Observable<PayloadAction<any>> => {
        return action$
            .mergeMap((action: PayloadAction<string>) => {
                const postId = action.payload;
                return PostConnector.get(postId)
                    .map((result) => {
                        return instance.getCompleted.factory(result);
                    });
            });
    }
}

class GetCompleted extends ActionMeta<PostData, PostsState> {
    reducer(state: PostsState, action: PayloadAction<PostData>): PostsState {
        const newPostData = action.payload;

        return updatePostInState(newPostData, state);
    }
}

class GetForCategory extends ActionMeta<string, PostsState> {
    epic = (action$: ActionsObservable<PayloadAction<string>>): Observable<PayloadAction<any>> => {
        return action$
            .mergeMap((action: PayloadAction<string>) => {
                const categoryPath = action.payload;
                return PostConnector.getForCategory(categoryPath)
                    .map((result) => {
                        return instance.getForCategoryCompleted.factory(result);
                    });
            });
    }
}

class GetForCategoryCompleted extends ActionMeta<PostData[], PostsState> {
    reducer(state: PostsState, action: PayloadAction<PostData[]>): PostsState {
        const result = <PostsState>{
            ...state,
        };

        const posts = action.payload;

        posts.forEach((post) => {
            result[post.id] = post;
        });

        return result;
    }
}

class GetForCategoryOrAll extends ActionMeta<string, PostsState> {
    epic = (action$: ActionsObservable<PayloadAction<string>>): Observable<PayloadAction<any>> => {
        return action$
            .map((action) => {
                const categoryPath = action.payload;
                if (categoryPath == "") {
                    return instance.getAll.factory(undefined);
                }

                return instance.getForCategory.factory(categoryPath);
            });
    }
}

type PostsState = PostIdToPostDataMap;

class PostActions2 extends ActionSet<"posts", PostsState> {
    getAll = new GetAll(this);
    getAllCompleted = new GetAllCompleted(this);

    get = new Get(this);
    getCompleted = new GetCompleted(this);

    getForCategory = new GetForCategory(this);
    getForCategoryCompleted = new GetForCategoryCompleted(this);

    upvote = new Upvote(this);
    upvoteCompleted = new UpvoteCompleted(this);

    downvote = new Downvote(this);
    downvoteCompleted = new DownvoteCompleted(this);
}

const instance = new PostActions2("posts");

export default instance;