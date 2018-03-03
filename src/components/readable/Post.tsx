import * as React from "react";
import Typography from "material-ui/Typography";
import ArrowUpward from "material-ui-icons/ArrowUpward";
import ArrowDownward from "material-ui-icons/ArrowDownward";
import Card from "material-ui/Card";
import CardContent from "material-ui/Card/CardContent";
import CardActions from "material-ui/Card/CardActions";
import IconButton from "material-ui/IconButton";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import {PostPageUtils} from "src/components/readable/PostPage";
import PostData from "src/data/models/PostData";
import Divider from "material-ui/Divider";
import Tooltip from "material-ui/Tooltip";
import DeleteButton from "src/components/readable/DeleteButton";
import EditPostButton from "src/components/readable/EditPostButton";
import * as moment from "moment";
import CommentData from "src/data/models/CommentData";
import PostUtils from "src/utilities/PostUtils";
import Comment from "material-ui-icons/Comment";
import Badge from "material-ui/Badge";
import ReadableLink from "src/components/readable/ReadableLink";
import PostActions2 from "src/redux-actions/PostActions2";

// props that are provided as parameters
interface IOwnProps {
    post: PostData;
}

// props that are provided via injection
interface IInjectedProps {
    upvote: (post: PostData) => void;
    downvote: (post: PostData) => void;
    comments: CommentData[];
}

type IAllProps = IOwnProps & IInjectedProps;

class State {

}

class Post extends React.Component<IAllProps, State> {
    private saveEditedPost = (editedPost: PostData) => {
        // TODO dispatch save post action
    };

    private deletePost = () => {
        // TODO dispatch delete post action
    };

    private getPostComments(post: PostData): CommentData[] {
        return PostUtils.getPostComments(post, this.props.comments);
    }

    private upvote = () => {
        this.props.upvote(this.props.post);
    };

    render() {
        const {post} = this.props;
        const {} = this.state;

        const commentCount = this.getPostComments(post).length;

        return (
            <div>
                <Card>
                    <CardContent>
                        <ReadableLink to={PostPageUtils.getLinkPath(post)} style={{display: "inline-block"}}>
                            <Typography variant="title">
                                {post.title}
                            </Typography>
                        </ReadableLink>
                        <Typography>
                            {post.body}
                        </Typography>
                    </CardContent>
                    <Divider/>
                    <CardActions>
                        <IconButton onClick={this.upvote}>
                            <Tooltip title="Upvote">
                                <ArrowUpward/>
                            </Tooltip>
                        </IconButton>
                        <Tooltip title="Vote Score">
                            <Typography>
                                {post.voteScore}
                            </Typography>
                        </Tooltip>
                        <IconButton>
                            <Tooltip title="Downvote">
                                <ArrowDownward/>
                            </Tooltip>
                        </IconButton>
                        <IconButton component={PostPageUtils.getPostPageLinkComponentFactory(post)}>
                            <Tooltip title={`${commentCount} Comment${commentCount === 1 ? "" : "s"}`}>
                                <Badge badgeContent={commentCount} color="primary">
                                    <Comment/>
                                </Badge>
                            </Tooltip>
                        </IconButton>
                        <EditPostButton post={post} onSave={this.saveEditedPost} />
                        <DeleteButton onDelete={this.deletePost}/>
                        <Tooltip title="Category">
                            <Typography>
                                {post.category}
                            </Typography>
                        </Tooltip>
                        <Tooltip title="Author">
                            <Typography>
                                {post.author}
                            </Typography>
                        </Tooltip>
                        <Tooltip title="Timestamp">
                            <Typography>
                                {moment(post.timestamp).format("l h:mm a")}
                            </Typography>
                        </Tooltip>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state: ApplicationState, ownProps: IOwnProps) => {
    return {
        // Add mapped properties here
        comments: state.comments
    }
};

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>, ownProps: IOwnProps) => {
    return {
        upvote: PostActions2.upvote.bindToDispatch(dispatch),
        downvote: PostActions2.downvote.bindToDispatch(dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post);