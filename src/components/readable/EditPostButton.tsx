import * as React from "react";
import IconButton from "material-ui/IconButton";
import {connect, Dispatch} from "react-redux";
import {ApplicationState, OperationStatus} from "src/components/readable/ReadableApplication";
import PostData from "src/data/models/PostData";
import ModeEdit from "material-ui-icons/ModeEdit";
import EditPostDialog from "src/components/readable/EditPostDialog";
import Tooltip from "material-ui/Tooltip";
import PostActions from "src/redux-actions/PostActions";
import IdUtils from "src/utilities/IdUtils";
import OperationStatusProvider from "src/components/readable/OperationStatusProvider";
import PostUtils from "src/utilities/PostUtils";

// props that are provided as parameters
interface IOwnProps {
    post: PostData;
}

// props that are provided via injection
interface IInjectedProps {
    // someAction: () => any;
    updatePost: (params: PostActions.UpdateParams, operationId: string) => void;
}

type IAllProps = IOwnProps & IInjectedProps;

// internal state of the component
class State {
    editPostDialogOpen: boolean;
    editedPost: PostData;
    updateOperationId: string;
    updateOperationStatus?: OperationStatus;
}

class EditPostButton extends React.Component<IAllProps, State> {
    readonly state: State = this.freshState;

    private get freshState(): State {
        return {
            editedPost: this.props.post,
            editPostDialogOpen: false,
            updateOperationId: ""
        }
    }

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    private resetState() {
        this.setState(this.freshState);
    }

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

    private onEditPostFormChange = (post: PostData) => {
        this.setState({
            editedPost: post
        });
    };

    private onSave = () => {
        if (!PostUtils.isValidPostData(this.state.editedPost)) {
            return;
        }

        const {title, body, id} = this.state.editedPost;

        // create an operation ID so that we can look up the status in the state
        const operationId = IdUtils.getUniqueId();
        this.setState({
            updateOperationId: operationId
        });

        this.props.updatePost({
                title,
                body,
                postId: id
            },
            operationId);
    };

    private onUpdateOperationStatusChange = (operationStatus: OperationStatus) => {
        const hasCompletedOperation = operationStatus.hasCompleted;
        if (hasCompletedOperation) {
            this.resetState();
        } else {
            this.setState({
                updateOperationStatus: operationStatus
            });
        }
    };

    render() {
        const {onEditPostFormChange, closeEditDialog, onSave} = this;
        // const {isSavingPost} = this.props;
        const {editedPost, editPostDialogOpen, updateOperationId, updateOperationStatus} = this.state;

        const isSaving = updateOperationStatus != null && updateOperationStatus.isPending;

        return (
            <div>
                <OperationStatusProvider operationId={updateOperationId}
                                         onOperationStatusChange={this.onUpdateOperationStatusChange}/>
                <IconButton onClick={this.openEditDialog}>
                    <Tooltip title="Edit">
                        <ModeEdit />
                    </Tooltip>
                </IconButton>
                <EditPostDialog post={editedPost}
                                open={editPostDialogOpen}
                                onChange={onEditPostFormChange}
                                onClose={closeEditDialog}
                                onSave={onSave}
                                title="Edit Post"
                                disabled={isSaving}
                                fieldsToEdit={["title", "body"]}
                />
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
    const updatePost = PostActions.instance.update.bindToDispatch(dispatch);

    return {
        // Add mapped properties here
        // someAction: bindActionCreators(actionCreator, dispatch)
        updatePost
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPostButton);