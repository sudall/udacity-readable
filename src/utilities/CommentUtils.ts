import CommentData from "src/data/models/CommentData";
import FormUtils from "src/utilities/FormUtils";

class CommentUtils {
    static readonly requiredCommentFields: (keyof CommentData)[] = ["body", "author"];
    static requiredCommentFieldsContains(field: keyof CommentData): boolean {
        return this.requiredCommentFields.some((requiredField) => {
            return field === requiredField;
        });
    }

    static isValidCommentData(comment: CommentData): boolean {
        const isAnyRequiredFormFieldMissing = FormUtils.isAnyRequiredFormFieldMissing(comment, this.requiredCommentFields);

        // valid if nothing is missing
        return !isAnyRequiredFormFieldMissing;
    }
}

export default CommentUtils;