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
    isSavingComment: boolean;
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
        const {closeEditDialog, onSave, onEditCommentFormChange} = this;
        const {isSavingComment} = this.props;
        const {editCommentDialogOpen, editedComment} = this.state;

        return (
            <div>
                <IconButton onClick={this.openEditDialog}>
                    <Tooltip title="Edit">
                        <ModeEdit />
                    </Tooltip>
                </IconButton>
                <EditCommentDialog open={editCommentDialogOpen}
                                   onClose={closeEditDialog}
                                   onSave={onSave}
                                   title="Edit Comment"
                                   comment={editedComment}
                                   onChange={onEditCommentFormChange}
                                   disabled={isSavingComment}/>
            </div>
        );
    }
}

const mapStateToProps = (state: ApplicationState, ownProps: IOwnProps) => {
    return {
        // Add mapped properties here
        isSavingComment: state.commentState.isSaving
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