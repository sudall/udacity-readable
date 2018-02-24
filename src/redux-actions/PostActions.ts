import {Action, ActionCreator} from "redux";
import PostData from "src/data/models/PostData";
import {actionCreator, default as ActionGenerator} from "src/redux-actions/ActionGenerator";
import PayloadAction from "src/redux-actions/PayloadAction";

class PostActions extends ActionGenerator {
    @actionCreator
    upvote(post: PostData): PayloadAction<PostData> {
        return this.createAction(this.upvote, post);
    }

    @actionCreator
    downvote(post: PostData): PayloadAction<PostData> {
        return this.createAction(this.downvote, post);
    }
}

export default new PostActions("POST");