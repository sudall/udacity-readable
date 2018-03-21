import PayloadAction from "src/redux-actions/framework/PayloadAction";
import {
    ApplicationState, PostIdToPostDataMap,
    PostState
} from "src/components/readable/ReadableApplication";
import PostData from "src/data/models/PostData";
import {Observable} from "rxjs/Rx";
import PostConnector from "src/data/connectors/PostConnector";
import ReduxStateUtils from "src/utilities/ReduxStateUtils";
import ActionMeta, {FilteredEpic} from "src/redux-actions/framework/ActionMeta";
import ActionSet from "src/redux-actions/framework/ActionSet";
import EpicUtils from "src/utilities/EpicUtils";
import {Operation} from "src/redux-actions/OperationActions";

type Dependencies = {postConnector: PostConnector};

class PostStateUtils {
    static setPosts(posts: PostIdToPostDataMap, state: PostState): PostState {
        return {
            ...state,
            posts
        }
    }
}

class GetAll extends ActionMeta<void, PostState> {
    epic: FilteredEpic<PayloadAction<void>, ApplicationState, Dependencies> =
        (action$, state, {postConnector}): Observable<PayloadAction<any>> => {
            return EpicUtils.restEpicLatestCallOnly(action$,
                postConnector.getAll,
                instance.getAllCompleted);
        };
}

class GetAllCompleted extends ActionMeta<PostData[], PostState> {
    reducer(state: PostState, action: PayloadAction<PostData[]>): PostState {
        const postsArray = action.payload;

        const posts = ReduxStateUtils.createNewStateMapByIdKey(postsArray);

        return PostStateUtils.setPosts(posts, state);
    }
}

class Upvote extends ActionMeta<PostData, PostState> {
    epic: FilteredEpic<PayloadAction<PostData>, ApplicationState, Dependencies> =
        (action$, state, {postConnector}): Observable<PayloadAction<any>> => {
        return EpicUtils.restEpicConcurrentCalls(action$,
            (payload) => postConnector.vote(payload.id, "upVote"),
            instance.upvoteCompleted);
    }
}

class UpvoteCompleted extends ActionMeta<PostData, PostState> {
    reducer(state: PostState, action: PayloadAction<PostData>): PostState {
        const newPostData = action.payload;

        const posts = ReduxStateUtils.updateItemInStateByIdKey(newPostData, state.posts);

        return PostStateUtils.setPosts(posts, state);
    }
}

class Downvote extends ActionMeta<PostData, PostState> {
    epic: FilteredEpic<PayloadAction<PostData>, ApplicationState, Dependencies> =
        (action$, state, {postConnector}): Observable<PayloadAction<any>> => {
        return EpicUtils.restEpicConcurrentCalls(action$,
            (payload) => postConnector.vote(payload.id, "downVote"),
            instance.downvoteCompleted);
    }
}

class DownvoteCompleted extends ActionMeta<PostData, PostState> {
    reducer(state: PostState, action: PayloadAction<PostData>): PostState {
        const newPostData = action.payload;

        const posts = ReduxStateUtils.updateItemInStateByIdKey(newPostData, state.posts);

        return PostStateUtils.setPosts(posts, state);
    }
}

class Get extends ActionMeta<string, PostState> {
    epic: FilteredEpic<PayloadAction<string>, ApplicationState, Dependencies> =
        (action$, state, {postConnector}): Observable<PayloadAction<any>> => {
        return EpicUtils.restEpicConcurrentCalls(action$,
            postConnector.get,
            instance.getCompleted);
    }
}

class GetCompleted extends ActionMeta<PostData, PostState> {
    reducer(state: PostState, action: PayloadAction<PostData>): PostState {
        const newPostData = action.payload;

        const posts = ReduxStateUtils.updateItemInStateByIdKey(newPostData, state.posts);

        return PostStateUtils.setPosts(posts, state);
    }
}

class GetForCategory extends ActionMeta<string, PostState> {
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

class GetForCategoryCompleted extends ActionMeta<{category: string, posts: PostData[]}, PostState> {
    reducer(state: PostState, action: PayloadAction<{category: string, posts: PostData[]}>): PostState {
        const payload = action.payload;

        const posts = ReduxStateUtils.updateItemsInStateByIdKey(payload.posts,
            state.posts,
            post => post.category !== payload.category);

        return PostStateUtils.setPosts(posts, state);
    }
}

export interface CreateParams {
    title: string;
    body: string;
    author: string;
    category: string;
}

class Create extends ActionMeta<CreateParams, PostState> {
    epic: FilteredEpic<PayloadAction<CreateParams>, ApplicationState, Dependencies> =
        (filteredAction$,
            store,
            {postConnector},
            allAction$): Observable<PayloadAction<any>> => {

            const restEpic = EpicUtils.restEpicConcurrentCalls(filteredAction$,
                    (params) => {
                        return postConnector.create(params.title, params.body, params.author, params.category)
                    },
                    instance.createCompleted
                );

            return restEpic;
        };
}

class CreateCompleted extends ActionMeta<PostData, PostState> {
    reducer(state: PostState, action: PayloadAction<PostData>): PostState {
        const post = action.payload;

        const posts = ReduxStateUtils.updateItemInStateByIdKey(post, state.posts);

        return PostStateUtils.setPosts(posts, state);
    }
}

export interface UpdateParams {
    postId: string;
    title: string;
    body: string;
}

class Update extends ActionMeta<UpdateParams, PostState> {
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

class UpdateCompleted extends ActionMeta<PostData, PostState> {
    reducer(state: PostState, action: PayloadAction<PostData>): PostState {
        const post = action.payload;

        const posts = ReduxStateUtils.updateItemInStateByIdKey(post, state.posts);

        return PostStateUtils.setPosts(posts, state);
    }
}

class Delete extends ActionMeta<PostData, PostState> {
    epic: FilteredEpic<PayloadAction<PostData>, ApplicationState, Dependencies> =
        (filteredAction$,
            store,
            {postConnector},
            allAction$): Observable<PayloadAction<any>> => {
            return EpicUtils.restEpicConcurrentCalls(filteredAction$,
                (payload) => {
                    return postConnector.delete(payload.id)
                        .map((result) => {
                            return payload;
                        });
                },
                instance.deleteCompleted);
        };
}

class DeleteCompleted extends ActionMeta<PostData, PostState> {
    reducer(state: PostState, action: PayloadAction<PostData>): PostState {
        const post = action.payload;

        const newPosts = {
            ...state.posts
        };

        delete newPosts[post.id];

        return PostStateUtils.setPosts(newPosts, state);
    }
}

class CreateOperation extends Operation {
}

class UpdateOperation extends Operation {
}

class PostActions extends ActionSet<"postState", PostState> {
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
    private createOperation = new CreateOperation(this, this.create, this.createCompleted);

    update = new Update(this);
    updateCompleted = new UpdateCompleted(this);
    private updateOperation = new UpdateOperation(this, this.update, this.updateCompleted);

    delete = new Delete(this);
    deleteCompleted = new DeleteCompleted(this);
}

const instance = new PostActions("postState");

export default instance;