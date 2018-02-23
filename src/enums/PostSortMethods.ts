import Enum from "src/enums/Enum";
import PostData from "src/data/models/PostData";

class PostSortMethod extends Enum<PostSortMethod> {
    constructor(public readonly displayText: string,
        public readonly sortCompareFunction: (a: PostData, b: PostData) => number) {
        super();
    }

    static readonly VoteScoreLowestToHighest = new PostSortMethod("Vote Score - Lowest To Highest",
        (a: PostData, b: PostData) => {
            return a.voteScore - b.voteScore;
        }
    );

    static readonly VoteScoreHighestToLowest = new PostSortMethod("Vote Score - Highest To Lowest",
        (a: PostData, b: PostData) => {
            return b.voteScore - a.voteScore;
        }
    );

    static readonly TimestampNewestFirst = new PostSortMethod("Timestamp - Newest First",
        (a: PostData, b: PostData) => {
            return b.timestamp - a.timestamp;
        }
    );

    static readonly TimestampOldestFirst = new PostSortMethod("Timestamp - Oldest First",
        (a: PostData, b: PostData) => {
            return a.timestamp - b.timestamp;
        }
    );
}

export default PostSortMethod;