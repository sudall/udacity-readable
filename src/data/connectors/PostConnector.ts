import PostData from "src/data/models/PostData";
import IdUtils from "src/utilities/IdUtils";
import * as moment from "moment";
import ReadableAjaxUtils from "src/utilities/ReadableAjaxUtils";
import {Observable} from "rxjs/Observable";

class PostConnector {
    // GET /:category/posts
    // Get all of the posts for a particular category.
    getForCategory(categoryName: string): Observable<PostData[]> {
        return ReadableAjaxUtils.get(`/${categoryName}/posts`);
    }

    // GET /posts
    // Get all of the posts. Useful for the main page when no category is selected.
    getAll(): Observable<PostData[]> {
        return ReadableAjaxUtils.get("/posts");
    }

    // POST /posts	Add a new post.
    // id - UUID should be fine, but any unique id will work
    // timestamp - [Timestamp] Can in whatever format you like, you can use Date.now() if you like.
    // title - [String]
    // body - [String]
    // author - [String]
    // category - Any of the categories listed in categories.js. Feel free to extend this list as you desire.
    create(title: string,
        body: string,
        author: string,
        category: string) {

        const id = IdUtils.getUniqueId();
        const timestamp = moment().unix();

        return ReadableAjaxUtils.post("/posts", {
            id,
            timestamp,
            title,
            body,
            author,
            category
        });
    }

    // GET /posts/:id
    // Get the details of a single post.
    get(postId: string): Observable<PostData> {
        return ReadableAjaxUtils.get(`/posts/${postId}`);
    }

    // POST /posts/:id
    // Used for voting on a post.
    // option - [String]: Either "upVote" or "downVote".
    vote(postId: string, option: "upVote" | "downVote"): Observable<PostData> {
        return ReadableAjaxUtils.post(`/posts/${postId}`, {
            option
        });
    }

    // PUT /posts/:id
    // Edit the details of an existing post.
    // title - [String]
    // body - [String]
    update(postId: string,
        title: string,
        body: string) {
        return ReadableAjaxUtils.put(`/posts/${postId}`, {
            title,
            body
        });
    }

    // DELETE /posts/:id
    // Sets the deleted flag for a post to 'true'.
    // Sets the parentDeleted flag for all child comments to 'true'.
    delete(postId: string) {
        return ReadableAjaxUtils.delete(`/posts/${postId}`);
    }
}

export default new PostConnector();