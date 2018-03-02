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
import DeleteButton from "src/components/readable/DeleteButton";
import EditCommentButton from "src/components/readable/EditCommentButton";
import * as moment from "moment";

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

}

class Comment extends React.Component<IAllProps, State> {
    readonly state = new State();

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    private saveEditedComment = (editedComment: CommentData) => {
        // TODO dispatch save comment action
    };

    private deleteComment() {

    }

    render() {
        const {comment, upvote} = this.props;

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
                        <IconButton onClick={upvote}>
                            <Tooltip title="Upvote">
                                    <ArrowUpward/>
                            </Tooltip>
                        </IconButton>
                        <Tooltip title="Vote Score">
                            <Typography>
                                {comment.voteScore}
                            </Typography>
                        </Tooltip>
                        <IconButton>
                            <Tooltip title="Downvote">
                                    <ArrowDownward/>
                            </Tooltip>
                        </IconButton>
                        <EditCommentButton comment={comment} onSave={this.saveEditedComment}/>
                        <DeleteButton onDelete={this.deleteComment}/>
                        <Tooltip title="Author">
                            <Typography>
                                {comment.author}
                            </Typography>
                        </Tooltip>
                        <Tooltip title="Timestamp">
                            <Typography>
                                {moment(comment.timestamp).format("l h:mm a")}
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
    return {
        // Add mapped properties here
        // someAction: bindActionCreators(actionCreator, dispatch)
        upvote: CommentActions.upvote.bindToDispatch(dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comment);