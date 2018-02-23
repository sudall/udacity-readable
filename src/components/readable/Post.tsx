import * as React from "react";
import Typography from "material-ui/Typography";
import ArrowUpward from "material-ui-icons/ArrowUpward";
import ArrowDownward from "material-ui-icons/ArrowDownward";
import Card from "material-ui/Card";
import CardContent from "material-ui/Card/CardContent";
import CardActions from "material-ui/Card/CardActions";
import IconButton from "material-ui/IconButton";
import {Link} from "react-router-dom";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import {PostPageUtils} from "src/components/readable/PostPage";
import PostData from "src/data/models/PostData";
import {bindActionCreators} from "redux";
import PostActions from "src/redux-actions/PostActions";
import Divider from "material-ui/Divider";
import Tooltip from "material-ui/Tooltip";
import DeleteButton from "src/components/readable/DeleteButton";
import EditPostButton from "src/components/readable/EditPostButton";

// props that are provided as parameters
interface IOwnProps {
    post: PostData;
}

// props that are provided via injection
interface IInjectedProps {
    upvote: () => any;
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

    render() {
        const {post, upvote} = this.props;
        const {} = this.state;

        return (
            <div>
                <Card>
                    <CardContent>
                        <Link to={PostPageUtils.getLinkPath(post)} style={{display: "inline-block"}}>
                            <Typography variant="title">
                                {post.title}
                            </Typography>
                        </Link>
                        <Typography>
                            {post.body}
                        </Typography>
                    </CardContent>
                    <Divider/>
                    <CardActions>
                        <Tooltip title="Upvote">
                            <IconButton onClick={upvote}>
                                <ArrowUpward/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Vote Score">
                            <Typography>
                                {post.voteScore}
                            </Typography>
                        </Tooltip>
                        <Tooltip title="Downvote">
                            <IconButton>
                                <ArrowDownward/>
                            </IconButton>
                        </Tooltip>
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
                                {/*TODO use moment to get the formatted time*/}
                                {post.timestamp}
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
    }
};

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>, ownProps: IOwnProps) => {
    const upvote = PostActions.upvote.bind(PostActions);

    return {
        upvote: bindActionCreators(upvote, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post);