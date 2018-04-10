import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState, OperationStatus} from "src/components/readable/ReadableApplication";
import Button from "material-ui/Button";
import Add from "material-ui-icons/Add";
import Tooltip from "material-ui/Tooltip";
import CommentData from "src/data/models/CommentData";
import EditCommentDialog from "src/components/readable/EditCommentDialog";
import CommentActions from "src/redux-actions/CommentActions";
import IdUtils from "src/utilities/IdUtils";
import OperationStatusProvider from "src/components/readable/OperationStatusProvider";
import PostData from "src/data/models/PostData";
import CommentUtils from "src/utilities/CommentUtils";

// props that are provided as parameters
interface IOwnProps {
    parentPost: PostData;
}

// props that are provided via injection
interface IInjectedProps {
    createComment: (comment: CommentActions.CreateParams, operationId: string) => void;
}

type IAllProps = IOwnProps & IInjectedProps;

// internal state of the component
class State {
    newComment: CommentData;
    dialogOpen: boolean;
    createOperationId: string;
}

class AddNewCommentButton extends React.Component<IAllProps, State> {
    private get freshState() {
        const newComment = new CommentData();
        newComment.parentId = this.props.parentPost.id;
        return {
            dialogOpen: false,
            newComment,
            createOperationId: ""
        }
    }

    readonly state: State = this.freshState;

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    private setDialogOpen(value: boolean) {
        this.setState({
            dialogOpen: value
        });
    };

    private openDialog = () => {
        this.setDialogOpen(true);
    };

    private closeDialog = () => {
        this.setDialogOpen(false);
    };

    private onEditCommentFormChange = (newComment: CommentData) => {
        this.setState({
            newComment
        });
    };

    private saveNewComment = () => {
        if (!CommentUtils.isValidCommentData(this.state.newComment)) {
            return;
        }

        const operationId = IdUtils.getUniqueId();

        this.setState({
            createOperationId: operationId
        });

        const {parentId, body, author} = this.state.newComment;
        this.props.createComment({
                body,
                author,
                parentPostId: parentId
            },
            operationId);
    };

    private resetState() {
        this.setState(this.freshState);
    }

    private onCreateOperationStatusChange = (operationStatus: OperationStatus) => {
        if (operationStatus.hasCompleted) {
            this.resetState();
        }
    };

    renderWithCreateOperationStatus(operationStatus: OperationStatus) {
        const {} = this;
        const {} = this.props;
        const {dialogOpen, newComment} = this.state;

        const isSavingComment = operationStatus.isPending;

        return (
            <div>
                <Tooltip title="Add a New Comment">
                    <Button variant="fab"
                            color="secondary"
                            style={{
                                position: "fixed",
                                bottom: 16,
                                right: 16
                            }}
                            onClick={this.openDialog}
                    >
                        <Add />
                    </Button>
                </Tooltip>
                <EditCommentDialog comment={newComment}
                                open={dialogOpen}
                                onChange={this.onEditCommentFormChange}
                                onClose={this.closeDialog}
                                onSave={this.saveNewComment}
                                title="Add a New Comment"
                                disabled={isSavingComment}
                                fieldsToEdit={["body", "author"]}
                />
            </div>
        );
    }

    render() {
        const {} = this.props;
        const {createOperationId} = this.state;

        return (
            <OperationStatusProvider operationId={createOperationId}
                                     onOperationStatusChange={this.onCreateOperationStatusChange}
                                     render={(operationStatus) => {
                                         return this.renderWithCreateOperationStatus(operationStatus);
                                     }}
            />
        );
    }
}

const mapStateToProps = (state: ApplicationState, ownProps: IOwnProps) => {
    return {
        // Add mapped properties here
    }
};

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>, ownProps: IOwnProps) => {
    const createComment = CommentActions.instance.create.bindToDispatch(dispatch);

    return {
        // Add mapped properties here
        createComment
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddNewCommentButton);