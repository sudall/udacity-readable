import CommentData from "src/data/models/CommentData";
import {
    ApplicationState, CommentIdToCommentDataMap, CommentState} from "src/components/readable/ReadableApplication";
import PayloadAction from "src/redux-actions/framework/PayloadAction";
import {Observable} from "rxjs/Rx";
import CommentConnector from "src/data/connectors/CommentConnector";
import ReduxStateUtils from "src/utilities/ReduxStateUtils";
import ActionMeta, {FilteredEpic} from "src/redux-actions/framework/ActionMeta";
import ActionSet from "src/redux-actions/framework/ActionSet";
import EpicUtils from "src/utilities/EpicUtils";
import {Operation} from "src/redux-actions/OperationActions";

type Dependencies = {commentConnector: CommentConnector};

class CommentStateUtils {
    static setComments(comments: CommentIdToCommentDataMap, state: CommentState) {
        return {
            ...state,
            comments
        }
    }

    static setIsSaving(isSaving: boolean, state: CommentState): CommentState {
        return {
            ...state,
            isSaving
        }
    }
}

class Upvote extends ActionMeta<CommentData, CommentState> {
    epic: FilteredEpic<PayloadAction<CommentData>, ApplicationState, Dependencies> =
        (action$, store, {commentConnector}, allAction$): Observable<PayloadAction<any>> => {
            return EpicUtils.restEpicConcurrentCalls(action$,
                (payload) => commentConnector.vote(payload.id, "upVote"),
                CommentActions.instance.upvoteCompleted);
    };
}

class UpvoteCompleted extends ActionMeta<CommentData, CommentState> {
    reducer(state: CommentState, action: PayloadAction<CommentData>): CommentState {
        const newCommentData = action.payload;

        const comments = ReduxStateUtils.updateItemInStateByIdKey(newCommentData, state.comments);

        return CommentStateUtils.setComments(comments, state);
    }
}

class GetForPost extends ActionMeta<string, CommentState> {
    epic: FilteredEpic<PayloadAction<string>, ApplicationState, Dependencies> =
        (action$, store, {commentConnector}, allAction$): Observable<PayloadAction<any>> => {
        return EpicUtils.restEpicLatestCallOnly(action$,
            (postId) => {
                return commentConnector.getForPost(postId)
                    .map((comments) => {
                        return {
                            postId,
                            comments
                        }
                    });
            },
            CommentActions.instance.getForPostCompleted);
    };
}

class GetForPostCompleted extends ActionMeta<{postId: string, comments: CommentData[]}, CommentState> {
    reducer(state: CommentState, action: PayloadAction<{postId: string, comments: CommentData[]}>): CommentState {
        const payload = action.payload;

        const comments = ReduxStateUtils.updateItemsInStateByIdKey(payload.comments,
            state.comments,
            comment => comment.parentId !== payload.postId);

        return CommentStateUtils.setComments(comments, state);
    }
}

module CommentActions {
    export interface CreateParams {
        parentPostId: string,
        body: string,
        author: string
    }
}

class Create extends ActionMeta<CommentActions.CreateParams, CommentState> {
    epic: FilteredEpic<PayloadAction<CommentActions.CreateParams>, ApplicationState, Dependencies> =
        (action$, store, {commentConnector}, allAction$): Observable<PayloadAction<any>> => {
            return EpicUtils.restEpicConcurrentCalls(action$,
                (payload) => {
                    const {parentPostId, author, body} = payload;
                    return commentConnector.create(body, author, parentPostId);
                },
                CommentActions.instance.createCompleted);
        };
}

class CreateCompleted extends ActionMeta<CommentData, CommentState> {
    reducer(state: CommentState, action: PayloadAction<CommentData>): CommentState {
        const commentData = action.payload;

        const comments = ReduxStateUtils.updateItemInStateByIdKey(commentData, state.comments);

        return CommentStateUtils.setComments(comments, state);
    }
}

class CreateOperation extends Operation {
}

class CommentActions extends ActionSet<"commentState", CommentState> {
    public static readonly instance = new CommentActions("commentState");

    upvote = new Upvote(this);
    upvoteCompleted = new UpvoteCompleted(this);

    getForPost = new GetForPost(this);
    getForPostCompleted = new GetForPostCompleted(this);

    create = new Create(this);
    createCompleted = new CreateCompleted(this);
    private createOperation = new CreateOperation(this, this.create, this.createCompleted);
}

export default CommentActions;