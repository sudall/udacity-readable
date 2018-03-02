import CommentData from "src/data/models/CommentData";
import {ActionMeta, ActionSet} from "src/redux-actions/PostActions2";

// class CommentActions extends ActionGenerator {
//     @actionCreator
//     upvote(comment: CommentData): PayloadAction<CommentData> {
//         return this.createAction(this.upvote, comment);
//     }
// }

class Upvote extends ActionMeta<CommentData> {

}

class CommentActions extends ActionSet {
    upvote = new Upvote(this);
}

export default new CommentActions();