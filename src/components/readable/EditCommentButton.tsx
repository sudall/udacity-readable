import * as React from "react";
import IconButton from "material-ui/IconButton";
import {connect, Dispatch} from "react-redux";
import {ApplicationState, OperationStatus} from "src/components/readable/ReadableApplication";
import CommentData from "src/data/models/CommentData";
import Tooltip from "material-ui/Tooltip";
import ModeEdit from "material-ui-icons/ModeEdit";
import EditCommentDialog from "src/components/readable/EditCommentDialog";
import CommentActions from "src/redux-actions/CommentActions";
import IdUtils from "src/utilities/IdUtils";
import OperationStatusProvider from "src/components/readable/OperationStatusProvider";

// props that are provided as parameters
interface IOwnProps {
    comment: CommentData;
}

// props that are provided via injection
interface IInjectedProps {
    // someAction: () => any;
    updateComment: (params: CommentActions.UpdateParams, operationId: string) => void;
}

type IAllProps = IOwnProps & IInjectedProps;

// internal state of the component
class State {
    editCommentDialogOpen: boolean;
    editedComment: CommentData;
    updateOperationId: string;
    updateOperationStatus?: OperationStatus;
}

class EditCommentButton extends React.Component<IAllProps, State> {
    private get freshState() {
        return {
            editCommentDialogOpen: false,
            editedComment: this.props.comment,
            updateOperationId: ""
        };
    }

    readonly state: State = this.freshState;

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
        // create an operation ID so that we can look up the status in the state
        const operationId = IdUtils.getUniqueId();
        this.setState({
            updateOperationId: operationId
        });

        const {body, id} = this.state.editedComment;
        this.props.updateComment({
                body,
                commentId: id
            },
            operationId);
    };

    private resetState() {
        this.setState(this.freshState);
    }

    private onUpdateOperationStatusChange = (operationStatus: OperationStatus) => {
        if (operationStatus.hasCompleted) {
            this.resetState();
        } else {
            this.setState({
                updateOperationStatus: operationStatus
            });
        }
    };

    render() {
        const {closeEditDialog, onSave, onEditCommentFormChange} = this;
        const {} = this.props;
        const {editCommentDialogOpen, editedComment, updateOperationId, updateOperationStatus} = this.state;

        const isSavingComment = updateOperationStatus != null && updateOperationStatus.isPending;

        return (
            <div>
                <OperationStatusProvider operationId={updateOperationId} onOperationStatusChange={this.onUpdateOperationStatusChange}/>
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
    }
};

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>, ownProps: IOwnProps) => {
    const updateComment = CommentActions.instance.update.bindToDispatch(dispatch);

    return {
        // Add mapped properties here
        // someAction: bindActionCreators(actionCreator, dispatch)
        updateComment
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCommentButton);