import PayloadAction from "src/redux-actions/framework/PayloadAction";
import {ApplicationState, PostIdToPostDataMap} from "src/components/readable/ReadableApplication";
import PostData from "src/data/models/PostData";
import {Observable} from "rxjs/Rx";
import PostConnector from "src/data/connectors/PostConnector";
import ReduxStateUtils from "src/utilities/ReduxStateUtils";
import ActionMeta, {FilteredEpic} from "src/redux-actions/framework/ActionMeta";
import ActionSet from "src/redux-actions/framework/ActionSet";
import EpicUtils from "src/utilities/EpicUtils";

type Dependencies = {postConnector: PostConnector};

class GetAll extends ActionMeta<void, PostsState> {
    epic: FilteredEpic<PayloadAction<void>, ApplicationState, Dependencies> =
        (action$, state, {postConnector}): Observable<PayloadAction<any>> => {
            return EpicUtils.restEpicLatestCallOnly(action$,
                postConnector.getAll,
                instance.getAllCompleted);
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
        return EpicUtils.restEpicConcurrentCalls(action$,
            (payload) => postConnector.vote(payload.id, "upVote"),
            instance.upvoteCompleted);
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
        return EpicUtils.restEpicConcurrentCalls(action$,
            (payload) => postConnector.vote(payload.id, "downVote"),
            instance.downvoteCompleted);
    }
}

class DownvoteCompleted extends ActionMeta<PostData, PostsState> {
    reducer(state: PostsState, action: PayloadAction<PostData>): PostsState {
        const newPostData = action.payload;
        return ReduxStateUtils.updateItemInStateByIdKey(newPostData, state);
    }
}

class Get extends ActionMeta<string, PostsState> {
    epic: FilteredEpic<PayloadAction<string>, ApplicationState, Dependencies> =
        (action$, state, {postConnector}): Observable<PayloadAction<any>> => {
        return EpicUtils.restEpicConcurrentCalls(action$,
            postConnector.get,
            instance.getCompleted);
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
        return EpicUtils.restEpicLatestCallOnly(action$,
            (category) => {
                return postConnector.getForCategory(category)
                    .map((posts) => {
                        return {
                            category,
                            posts
                        };
                    });
            },
            instance.getForCategoryCompleted);
    }
}

class GetForCategoryCompleted extends ActionMeta<{category: string, posts: PostData[]}, PostsState> {
    reducer(state: PostsState, action: PayloadAction<{category: string, posts: PostData[]}>): PostsState {
        const payload = action.payload;

        return ReduxStateUtils.updateItemsInStateByIdKey(payload.posts,
            state,
            post => post.category !== payload.category);
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