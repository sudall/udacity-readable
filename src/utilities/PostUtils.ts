import PostData from "src/data/models/PostData";
import CommentData from "src/data/models/CommentData";

class PostUtils {
    static getPostComments(post: PostData, allComments: CommentData[]) {
        return allComments.filter((comment) => {
            return comment.parentId === post.id;
        });
    }
}

export default PostUtils;