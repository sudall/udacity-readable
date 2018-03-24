class CommentData {
    id: string = ""; // Unique identifier
    parentId: string = ""; // id of the parent post
    timestamp: number; // Time created - default data tracks this in Unix time. You can use Date.now() to get this number
    body: string = ""; // Comment body
    author: string = ""; // Comment author
    voteScore: number; // Net votes the comment has received (default: 1)
    deleted: boolean; // Flag if comment has been 'deleted' (inaccessible by the front end), (default: false)
    parentDeleted: boolean; // Flag for when the the parent post was deleted, but the comment itself was not.
}

export default CommentData;