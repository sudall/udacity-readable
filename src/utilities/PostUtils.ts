import CommentData from "src/data/models/CommentData";
import PostData from "src/data/models/PostData";
import FormUtils from "src/utilities/FormUtils";

class PostUtils {
    static readonly requiredPostFields: (keyof PostData)[] = ["title", "category"];
    static requiredPostFieldsContains(field: keyof PostData): boolean {
        return this.requiredPostFields.some((requiredField) => {
            return field === requiredField;
        });
    }

    static getPostComments(postId: string, allComments: CommentData[]) {
        return allComments.filter((comment) => {
            return comment.parentId === postId;
        });
    }

    static isValidPostData(post: PostData): boolean {
        const isAnyRequiredFormFieldMissing = FormUtils.isAnyRequiredFormFieldMissing(post, this.requiredPostFields);

        // valid if nothing is missing
        return !isAnyRequiredFormFieldMissing;
    }
}

export default PostUtils;