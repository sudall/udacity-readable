import CommentData from "src/data/models/CommentData";
import {ApplicationState, CommentIdToCommentDataMap} from "src/components/readable/ReadableApplication";
import PayloadAction from "src/redux-actions/framework/PayloadAction";
import {Observable} from "rxjs/Rx";
import CommentConnector from "src/data/connectors/CommentConnector";
import ReduxStateUtils from "src/utilities/ReduxStateUtils";
import ActionMeta, {FilteredEpic} from "src/redux-actions/framework/ActionMeta";
import ActionSet from "src/redux-actions/framework/ActionSet";
import EpicUtils from "src/utilities/EpicUtils";

type Dependencies = {commentConnector: CommentConnector};

// class CommentActions extends ActionGenerator {
//     @actionCreator
//     upvote(comment: CommentData): PayloadAction<CommentData> {
//         return this.createAction(this.upvote, comment);
//     }
// }



class Upvote extends ActionMeta<CommentData, CommentsState> {
    epic: FilteredEpic<PayloadAction<CommentData>, ApplicationState, Dependencies> =
        (action$, store, {commentConnector}, allAction$): Observable<PayloadAction<any>> => {
            return EpicUtils.restEpicConcurrentCalls(action$,
                (payload) => commentConnector.vote(payload.id, "upVote"),
                instance.upvoteCompleted);
    };
}

class UpvoteCompleted extends ActionMeta<CommentData, CommentsState> {
    reducer(state: CommentsState, action: PayloadAction<CommentData>): CommentsState {
        const newCommentData = action.payload;
        return ReduxStateUtils.updateItemInStateByIdKey(newCommentData, state);
    }
}

class GetForPost extends ActionMeta<string, CommentsState> {
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

class GetForPostCompleted extends ActionMeta<{postId: string, comments: CommentData[]}, CommentsState> {
    reducer(state: CommentsState, action: PayloadAction<{postId: string, comments: CommentData[]}>): CommentsState {
        const payload = action.payload;

        return ReduxStateUtils.updateItemsInStateByIdKey(payload.comments,
            state,
            comment => comment.parentId !== payload.postId);
    }
}

type CommentsState = CommentIdToCommentDataMap;

class CommentActions extends ActionSet<"comments", CommentsState> {
    upvote = new Upvote(this);
    upvoteCompleted = new UpvoteCompleted(this);

    getForPost = new GetForPost(this);
    getForPostCompleted = new GetForPostCompleted(this);
}

const instance = new CommentActions("comments");

export default instance;