import CommentData from "src/data/models/CommentData";
import {ApplicationState, CommentIdToCommentDataMap, CommentState} from "src/components/readable/ReadableApplication";
import PayloadAction from "src/redux-actions/framework/PayloadAction";
import {Observable} from "rxjs/Rx";
import CommentConnector from "src/data/connectors/CommentConnector";
import ReduxStateUtils from "src/utilities/ReduxStateUtils";
import ActionMeta, {FilteredEpic} from "src/redux-actions/framework/ActionMeta";
import ActionSet from "src/redux-actions/framework/ActionSet";
import EpicUtils from "src/utilities/EpicUtils";

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
                instance.upvoteCompleted);
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
            instance.getForPostCompleted);
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

class CommentActions extends ActionSet<"commentState", CommentState> {
    upvote = new Upvote(this);
    upvoteCompleted = new UpvoteCompleted(this);

    getForPost = new GetForPost(this);
    getForPostCompleted = new GetForPostCompleted(this);
}

const instance = new CommentActions("commentState");

export default instance;