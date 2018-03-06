import CommentData from "src/data/models/CommentData";
import {ActionMeta, ActionSet} from "src/redux-actions/PostActions2";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import {ActionsObservable, Epic} from "redux-observable";
import PayloadAction from "src/redux-actions/PayloadAction";
import {Observable} from "rxjs/Rx";
import PostConnector from "src/data/connectors/PostConnector";

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

type CommentsState = CommentData[];

class CommentActions extends ActionSet<"comments", CommentsState> {
    upvote = new Upvote(this);
}

export default new CommentActions("comments");