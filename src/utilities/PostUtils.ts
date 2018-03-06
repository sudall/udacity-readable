import CommentData from "src/data/models/CommentData";

class PostUtils {
    static getPostComments(postId: string, allComments: CommentData[]) {
        return allComments.filter((comment) => {
            return comment.parentId === postId;
        });
    }
}

export default PostUtils;