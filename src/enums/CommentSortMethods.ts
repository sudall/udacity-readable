import Enum from "src/enums/Enum";
import CommentData from "src/data/models/CommentData";
import SortMethod from "src/enums/SortMethod";

class CommentSortMethod extends Enum<CommentSortMethod> {
    constructor(public readonly sortCompareFunction: (a: CommentData, b: CommentData) => number) {
        super();
    }

    static readonly VoteScoreHighestToLowest = new CommentSortMethod((a, b) => {
        return SortMethod.NumberHighestToLowest.sortCompareFunction(a.voteScore, b.voteScore);
    });
}

export default CommentSortMethod;