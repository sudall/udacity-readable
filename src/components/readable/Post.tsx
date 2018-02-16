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
import ModeEdit from "material-ui-icons/ModeEdit";
import DeleteForever from "material-ui-icons/DeleteForever";
import EditPostDialog from "src/components/readable/EditPostDialog";
import Divider from "material-ui/Divider";
import Tooltip from "material-ui/Tooltip";
import Dialog from "material-ui/Dialog";
import DialogTitle from "material-ui/Dialog/DialogTitle";
import DialogActions from "material-ui/Dialog/DialogActions";
import DialogContent from "material-ui/Dialog/DialogContent";
import Button from "material-ui/Button";

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
    editPostDialogOpen: boolean = false;
    editedPost: PostData;
    deletePostConfirmationDialogOpen: boolean = false;
}

class Post extends React.Component<IAllProps, State> {
    readonly state = new State();

    constructor(props: IAllProps) {
        super(props);

        this.state.editedPost = props.post;
    }

    private onEditPostFormChange = (post: PostData) => {
        this.setState({
            editedPost: post
        });
    };

    private openEditDialog = () => {
        this.setEditDialogOpen(true);
    };

    private closeEditDialog = () => {
        this.setEditDialogOpen(false);
    };

    private setEditDialogOpen(value: boolean) {
        this.setState((previousState, props) => {
            return {
                editPostDialogOpen: value,
                editedPost: props.post
            }
        });
    }

    private saveEditedPost = () => {
        // TODO dispatch save post action
    };

    private openDeletePostConfirmationDialog = () => {
        this.setDeletePostConfirmationDialogOpen(true);
    };

    private closeDeletePostConfirmationDialog = () => {
        this.setDeletePostConfirmationDialogOpen(false);
    };

    private setDeletePostConfirmationDialogOpen = (value: boolean) => {
        this.setState({
            deletePostConfirmationDialogOpen: value
        });
    };

    private deletePost = () => {
        // TODO dispatch delete post action
    };

    render() {
        const {post, upvote} = this.props;
        const {editPostDialogOpen, editedPost, deletePostConfirmationDialogOpen} = this.state;

        return (
            <div>
                <Card>
                    <CardContent>
                        <Link to={PostPageUtils.getLinkPath(post)}>
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
                        <Tooltip title="Edit">
                            <IconButton onClick={this.openEditDialog}>
                                <ModeEdit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton onClick={this.openDeletePostConfirmationDialog}>
                                <DeleteForever />
                            </IconButton>
                        </Tooltip>
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
                <EditPostDialog post={editedPost}
                                open={editPostDialogOpen}
                                onChange={this.onEditPostFormChange}
                                onClose={this.closeEditDialog}
                                onSave={this.saveEditedPost}
                                title="Edit Post"
                />
                <Dialog open={deletePostConfirmationDialogOpen} onClose={this.closeDeletePostConfirmationDialog}>
                    <DialogTitle>Delete</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to delete this post?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeDeletePostConfirmationDialog} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.deletePost} color="primary" variant="raised">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
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