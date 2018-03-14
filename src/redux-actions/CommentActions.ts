import CommentData from "src/data/models/CommentData";
import {ApplicationState, CommentIdToCommentDataMap} from "src/components/readable/ReadableApplication";
import PayloadAction from "src/redux-actions/framework/PayloadAction";
import {Observable} from "rxjs/Rx";
import CommentConnector from "src/data/connectors/CommentConnector";
import ReduxStateUtils from "src/utilities/ReduxStateUtils";
import ActionMeta, {FilteredEpic} from "src/redux-actions/framework/ActionMeta";
import ActionSet from "src/redux-actions/framework/ActionSet";

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

            return action$
                .mergeMap((action) => {
                    const comment = action.payload;

                    return commentConnector.vote(comment.id, "upVote")
                        .map((result) => {
                            return instance.upvoteCompleted.factory(result);
                        });
                });
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

        return action$
            .mergeMap((action) => {
                const postId = action.payload;

                return commentConnector.getForPost(postId)
                    .map((result) => {
                        return instance.getForPostCompleted.factory(result);
                    });
            });
    };
}

class GetForPostCompleted extends ActionMeta<CommentData[], CommentsState> {
    reducer(state: CommentsState, action: PayloadAction<CommentData[]>): CommentsState {
        const comments = action.payload;
        return ReduxStateUtils.updateItemsInStateByIdKey(comments, state);
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