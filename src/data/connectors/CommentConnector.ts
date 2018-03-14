import {Observable} from "rxjs/Observable";
import CommentData from "src/data/models/CommentData";
import ReadableAjaxUtils from "src/utilities/ReadableAjaxUtils";
import IdUtils from "src/utilities/IdUtils";
import * as moment from "moment";

class CommentConnector {
    static readonly instance = new CommentConnector();

    // GET /posts/:id/comments
    // Get all the comments for a single post.
    getForPost(postId: string): Observable<CommentData[]> {
        return ReadableAjaxUtils.get(`/posts/${postId}/comments`);
    }

    // POST /comments
    // Add a comment to a post.
    // id - Any unique ID. As with posts, UUID is probably the best here.
    // timestamp - [Timestamp] Get this however you want.
    // body - [String]
    // author - [String]
    // parentId - Should match a post id in the database.
    create(body: string,
        author: string,
        parentId: string) {

        const id = IdUtils.getUniqueId();
        const timestamp = moment().unix();

        return ReadableAjaxUtils.post(`/comments`, {
            id,
            timestamp,
            body,
            author,
            parentId
        })
    }

    // GET /comments/:id
    // Get the details for a single comment.
    get(commentId: string): Observable<CommentData> {
        return ReadableAjaxUtils.get(`/comments/${commentId}`);
    }

    // POST /comments/:id
    // Used for voting on a comment.
    // option - [String]: Either "upVote" or "downVote".
    vote(commentId: string, option: "upVote" | "downVote"): Observable<CommentData> {
        return ReadableAjaxUtils.post(`/comments/${commentId}`, {
            option
        });
    }

    // PUT /comments/:id
    // Edit the details of an existing comment.
    // timestamp - timestamp. Get this however you want.
    // body - [String]
    update(commentId: string,
        body: string) {

        const timestamp = moment().unix();

        return ReadableAjaxUtils.put(`/comments/${commentId}`, {
            timestamp,
            body
        });
    }

    // DELETE /comments/:id
    // Sets a comment's deleted flag to true.
    delete(commentId: string) {
        return ReadableAjaxUtils.delete(`/comments/${commentId}`);
    }
}

export default CommentConnector;