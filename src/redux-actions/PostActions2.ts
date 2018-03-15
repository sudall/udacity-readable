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

export interface CreateParams {
    title: string;
    body: string;
    author: string;
    category: string;
    onCompleted: () => void;
}

class Create extends ActionMeta<CreateParams, PostsState> {
    epic: FilteredEpic<PayloadAction<CreateParams>, ApplicationState, Dependencies> =
        (filteredAction$,
            store,
            {postConnector},
            allAction$): Observable<PayloadAction<any>> => {
            return EpicUtils.restEpicConcurrentCalls(filteredAction$,
                    (params) => {
                        return postConnector.create(params.title, params.body, params.author, params.category)
                            .map((post) => {
                                const onCompleted = params.onCompleted;
                                return {
                                    onCompleted,
                                    post
                                }
                            });
                    },
                    instance.createCompleted
                )
        };
}

interface CreateCompletedParams {
    onCompleted: () => void;
    post: PostData;
}

class CreateCompleted extends ActionMeta<CreateCompletedParams, PostsState> {
    reducer(state: PostsState, action: PayloadAction<CreateCompletedParams>): PostsState {
        const params = action.payload;

        params.onCompleted();

        return ReduxStateUtils.updateItemInStateByIdKey(params.post, state);
    }
}

interface UpdateParams {
    postId: string;
    title: string;
    body: string;
}

class Update extends ActionMeta<UpdateParams, PostsState> {
    epic: FilteredEpic<PayloadAction<UpdateParams>, ApplicationState, Dependencies> =
        (filteredAction$,
            store,
            {postConnector},
            allAction$): Observable<PayloadAction<any>> => {
            return EpicUtils.restEpicConcurrentCalls(filteredAction$,
                params => postConnector.update(params.postId, params.title, params.body),
                instance.updateCompleted);
        };
}

class UpdateCompleted extends ActionMeta<PostData, PostsState> {
    reducer(state: PostsState, action: PayloadAction<PostData>): PostsState {
        const post = action.payload;
        return ReduxStateUtils.updateItemInStateByIdKey(post, state);
    }
}

class Delete extends ActionMeta<string, PostsState> {
    epic: FilteredEpic<PayloadAction<string>, ApplicationState, Dependencies> =
        (filteredAction$,
            store,
            {postConnector},
            allAction$): Observable<PayloadAction<any>> => {
            return EpicUtils.restEpicConcurrentCalls(filteredAction$,
                postConnector.delete,
                instance.deleteCompleted);
        };
}

class DeleteCompleted extends ActionMeta<any, PostsState> {

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

    create = new Create(this);
    createCompleted = new CreateCompleted(this);

    update = new Update(this);
    updateCompleted = new UpdateCompleted(this);

    delete = new Delete(this);
    deleteCompleted = new DeleteCompleted(this);
}

const instance = new PostActions2("posts");

export default instance;