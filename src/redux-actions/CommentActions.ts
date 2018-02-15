import PayloadAction from "src/redux-actions/PayloadAction";
import {actionCreator, default as ActionGenerator} from "src/redux-actions/ActionGenerator";
import CommentData from "src/data/models/CommentData";

class CommentActions extends ActionGenerator {
    @actionCreator
    upvote(comment: CommentData): PayloadAction<CommentData> {
        return this.createAction(this.upvote, comment);
    }
}

export default new CommentActions("COMMENT");