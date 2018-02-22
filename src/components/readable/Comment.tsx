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
import CommentData from "src/data/models/CommentData";
import CommentActions from "src/redux-actions/CommentActions";
import Divider from "material-ui/Divider";
import Tooltip from "material-ui/Tooltip";
import ModeEdit from "material-ui-icons/ModeEdit";
import EditDialog from "src/components/readable/EditDialog";
import EditCommentForm from "src/components/readable/EditCommentForm";
import EditCommentDialog from "src/components/readable/EditCommentDialog";
import DeleteButton from "src/components/readable/DeleteButton";

// props that are provided as parameters
interface IOwnProps {
    comment: CommentData;
}

// props that are provided via injection
interface IInjectedProps {
    // someAction: () => any;
    upvote: () => void;
}

type IAllProps = IOwnProps & IInjectedProps;

// internal state of the component
class State {
    editCommentDialogOpen: boolean = false;
    editedComment: CommentData;
}

class Comment extends React.Component<IAllProps, State> {
    readonly state = new State();

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
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
                editCommentDialogOpen: value,
                editedComment: props.comment
            }
        });
    }

    private saveEditedComment = () => {
        // TODO dispatch save comment action
    };

    private onEditCommentFormChange = (comment: CommentData) => {
        this.setState({
            editedComment: comment
        });
    };

    private deleteComment() {

    }

    render() {
        const {comment, upvote} = this.props;
        const {editCommentDialogOpen, editedComment} = this.state;

        return (
            <div>
                <Card>
                    <CardContent>
                        <Typography>
                            {comment.body}
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
                                {comment.voteScore}
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
                        <DeleteButton onDelete={this.deleteComment}/>
                        <Tooltip title="Author">
                            <Typography>
                                {comment.author}
                            </Typography>
                        </Tooltip>
                    </CardActions>
                </Card>
                <EditCommentDialog open={editCommentDialogOpen}
                                   onClose={this.closeEditDialog}
                                   onSave={this.saveEditedComment}
                                   title="Edit Comment"
                                   comment={comment}
                                   onChange={this.onEditCommentFormChange}/>
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
    const upvote = CommentActions.upvote.bind(CommentActions);
    return {
        // Add mapped properties here
        // someAction: bindActionCreators(actionCreator, dispatch)
        upvote
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comment);