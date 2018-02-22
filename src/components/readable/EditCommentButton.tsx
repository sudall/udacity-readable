import * as React from "react";
import IconButton from "material-ui/IconButton";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import CommentData from "src/data/models/CommentData";
import Tooltip from "material-ui/Tooltip";
import ModeEdit from "material-ui-icons/ModeEdit";
import EditCommentDialog from "src/components/readable/EditCommentDialog";

// props that are provided as parameters
interface IOwnProps {
    comment: CommentData;
    onSave: (editedComment: CommentData) => void;
}

// props that are provided via injection
interface IInjectedProps {
    // someAction: () => any;
}

type IAllProps = IOwnProps & IInjectedProps;

// internal state of the component
class State {
    editCommentDialogOpen: boolean;
    editedComment: CommentData;
}

class EditCommentButton extends React.Component<IAllProps, State> {
    readonly state: State = {
        editCommentDialogOpen: false,
        editedComment: this.props.comment
    };

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

    private onEditCommentFormChange = (comment: CommentData) => {
        this.setState({
            editedComment: comment
        });
    };

    private onSave = () => {
        this.props.onSave(this.state.editedComment);
    };

    render() {
        const {} = this.props;
        const {editCommentDialogOpen, editedComment} = this.state;

        return (
            <div>
                <Tooltip title="Edit">
                    <IconButton onClick={this.openEditDialog}>
                        <ModeEdit />
                    </IconButton>
                </Tooltip>
                <EditCommentDialog open={editCommentDialogOpen}
                                   onClose={this.closeEditDialog}
                                   onSave={this.onSave}
                                   title="Edit Comment"
                                   comment={editedComment}
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
    return {
        // Add mapped properties here
        // someAction: bindActionCreators(actionCreator, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCommentButton);