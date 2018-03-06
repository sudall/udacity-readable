import Enum from "src/enums/Enum";
import PostData from "src/data/models/PostData";
import SortMethod from "src/enums/SortMethod";

class PostSortMethod extends Enum<PostSortMethod> {
    constructor(public readonly displayText: string,
        public readonly sortCompareFunction: (a: PostData, b: PostData) => number) {
        super();
    }

    static readonly VoteScoreLowestToHighest = new PostSortMethod("Vote Score - Lowest To Highest",
        (a: PostData, b: PostData) => {
            return SortMethod.NumberLowestToHighest.sortCompareFunction(a.voteScore, b.voteScore);
        }
    );

    static readonly VoteScoreHighestToLowest = new PostSortMethod("Vote Score - Highest To Lowest",
        (a: PostData, b: PostData) => {
            return SortMethod.NumberHighestToLowest.sortCompareFunction(a.voteScore, b.voteScore);
        }
    );

    static readonly TimestampNewestFirst = new PostSortMethod("Timestamp - Newest First",
        (a: PostData, b: PostData) => {
            return SortMethod.NumberHighestToLowest.sortCompareFunction(a.timestamp, b.timestamp);
        }
    );

    static readonly TimestampOldestFirst = new PostSortMethod("Timestamp - Oldest First",
        (a: PostData, b: PostData) => {
            return SortMethod.NumberLowestToHighest.sortCompareFunction(a.timestamp, b.timestamp);
        }
    );
}

export default PostSortMethod;