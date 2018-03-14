import PayloadAction from "src/redux-actions/framework/PayloadAction";
import {ApplicationState, PostIdToPostDataMap} from "src/components/readable/ReadableApplication";
import PostData from "src/data/models/PostData";
import {ActionsObservable} from "redux-observable";
import {Observable} from "rxjs/Rx";
import PostConnector from "src/data/connectors/PostConnector";
import ReduxStateUtils from "src/utilities/ReduxStateUtils";
import ActionMeta, {FilteredEpic} from "src/redux-actions/framework/ActionMeta";
import ActionSet from "src/redux-actions/framework/ActionSet";

type Dependencies = {postConnector: PostConnector};

class GetAll extends ActionMeta<void, PostsState> {
    epic: FilteredEpic<PayloadAction<void>, ApplicationState, Dependencies> =
        (action$, state, {postConnector}): Observable<PayloadAction<any>> => {
            return action$
                .mergeMap((action) => {
                    return postConnector.getAll()
                        .map((result) => {
                            return instance.getAllCompleted.factory(result);
                        });
                });
        };
}

class GetAllCompleted extends ActionMeta<PostData[], PostsState> {
    reducer(state: PostsState, action: PayloadAction<PostData[]>): PostsState {
        const postsArray = action.payload;
        return ReduxStateUtils.createNewStateMapByIdKey(postsArray);
    }
}

class Upvote extends ActionMeta<PostData, PostsState> {
    epic: FilteredEpic<PayloadAction<PostData>, ApplicationState, Dependencies> =
        (action$, state, {postConnector}): Observable<PayloadAction<any>> => {
        return action$
            .mergeMap((action: PayloadAction<PostData>) => {
                const postId = action.payload.id;
                return postConnector.vote(postId, "upVote")
                    .map((result) => {
                        return instance.upvoteCompleted.factory(result);
                    });
            });
    }
}

class UpvoteCompleted extends ActionMeta<PostData, PostsState> {
    reducer(state: PostsState, action: PayloadAction<PostData>): PostsState {
        const newPostData = action.payload;
        return ReduxStateUtils.updateItemInStateByIdKey(newPostData, state);
    }
}

class Downvote extends ActionMeta<PostData, PostsState> {
    epic: FilteredEpic<PayloadAction<PostData>, ApplicationState, Dependencies> =
        (action$, state, {postConnector}): Observable<PayloadAction<any>> => {
        return action$
            .mergeMap((action: PayloadAction<PostData>) => {
                const postId = action.payload.id;
                return postConnector.vote(postId, "downVote")
                    .map((result) => {
                        return instance.downvoteCompleted.factory(result);
                    });
            });
    }
}

class DownvoteCompleted extends ActionMeta<PostData, PostsState> {
    reducer(state: PostsState, action: PayloadAction<PostData>): PostsState {
        const newPostData = action.payload;
        return ReduxStateUtils.updateItemInStateByIdKey(newPostData, state);
    }
}

//TODO
const getBasicRestEpic = <TActionPayload, TCompletedActionPayload>(action$: ActionsObservable<PayloadAction<TActionPayload>>,
    call: (payload: TActionPayload) => Observable<TCompletedActionPayload>,
    completedAction: ActionMeta<TCompletedActionPayload>) => {

    return action$
        .mergeMap((action: PayloadAction<TActionPayload>) => {
            const payload = action.payload;
            return call(payload)
                .map((result) => {
                    return completedAction.factory(result);
                });
        });
};

class Get extends ActionMeta<string, PostsState> {
    epic: FilteredEpic<PayloadAction<string>, ApplicationState, Dependencies> =
        (action$, state, {postConnector}): Observable<PayloadAction<any>> => {
        return action$
            .mergeMap((action: PayloadAction<string>) => {
                const postId = action.payload;
                return postConnector.get(postId)
                    .map((result) => {
                        return instance.getCompleted.factory(result);
                    });
            });
    }
}

class GetCompleted extends ActionMeta<PostData, PostsState> {
    reducer(state: PostsState, action: PayloadAction<PostData>): PostsState {
        const newPostData = action.payload;
        return ReduxStateUtils.updateItemInStateByIdKey(newPostData, state);
    }
}

class GetForCategory extends ActionMeta<string, PostsState> {
    epic: FilteredEpic<PayloadAction<string>, ApplicationState, Dependencies> =
        (action$, state, {postConnector}): Observable<PayloadAction<any>> => {
        return action$
            .mergeMap((action: PayloadAction<string>) => {
                const categoryPath = action.payload;
                return postConnector.getForCategory(categoryPath)
                    .map((result) => {
                        return instance.getForCategoryCompleted.factory(result);
                    });
            });
    }
}

class GetForCategoryCompleted extends ActionMeta<PostData[], PostsState> {
    reducer(state: PostsState, action: PayloadAction<PostData[]>): PostsState {
        const posts = action.payload;
        return ReduxStateUtils.updateItemsInStateByIdKey(posts, state);
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