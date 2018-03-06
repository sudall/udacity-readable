import CommentData from "src/data/models/CommentData";
import {ActionMeta, ActionSet} from "src/redux-actions/PostActions2";
import {CommentIdToCommentDataMap} from "src/components/readable/ReadableApplication";
import {ActionsObservable} from "redux-observable";
import PayloadAction from "src/redux-actions/PayloadAction";
import {Observable} from "rxjs/Rx";
import CommentConnector from "src/data/connectors/CommentConnector";

// class CommentActions extends ActionGenerator {
//     @actionCreator
//     upvote(comment: CommentData): PayloadAction<CommentData> {
//         return this.createAction(this.upvote, comment);
//     }
// }

class Upvote extends ActionMeta<CommentData, CommentsState> {
    // epic = (action$: ActionsObservable<PayloadAction<CommentData>>): Observable<PayloadAction<any>> => {
    //     return action$
    //         .mergeMap((action) => {
    //             return CommentConnector.
    //         });
    // };
}

class GetForPost extends ActionMeta<string, CommentsState> {
    epic = (action$: ActionsObservable<PayloadAction<string>>): Observable<PayloadAction<any>> => {
        return action$
            .mergeMap((action) => {
                const postId = action.payload;

                return CommentConnector.getForPost(postId)
                    .map((result) => {
                        return instance.getForPostCompleted.factory(result);
                    });
            });
    };
}

class GetForPostCompleted extends ActionMeta<CommentData[], CommentsState> {
    reducer(state: CommentsState, action: PayloadAction<CommentData[]>): CommentsState {
        const result = {
            ...state
        };

        const comments = action.payload;

        comments.forEach((comment) => {
            result[comment.id] = comment;
        });

        return result;
    }
}

type CommentsState = CommentIdToCommentDataMap;

class CommentActions extends ActionSet<"comments", CommentsState> {
    upvote = new Upvote(this);

    getForPost = new GetForPost(this);
    getForPostCompleted = new GetForPostCompleted(this);
}

const instance = new CommentActions("comments");

export default instance;