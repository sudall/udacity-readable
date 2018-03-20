import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {
    ApplicationState, OperationIdToOperationStatusMap, OperationState,
    OperationStatus
} from "src/components/readable/ReadableApplication";
import Button from "material-ui/Button";
import Add from "material-ui-icons/Add";
import PostData from "src/data/models/PostData";
import EditPostDialog from "src/components/readable/EditPostDialog";
import Tooltip from "material-ui/Tooltip";
import PostActions2, {CreateParams} from "src/redux-actions/PostActions";
import IdUtils from "src/utilities/IdUtils";
import OperationUtils from "src/utilities/OperationUtils";

// props that are provided as parameters
interface IOwnProps {

}

// props that are provided via injection
interface IInjectedProps {
    // someAction: () => any;
    createPost: (createPostParams: CreateParams) => void;
    operationState: OperationState;
}

type IAllProps = IOwnProps & IInjectedProps;

// internal state of the component
class State {
    dialogOpen: boolean;
    newPost: PostData;
    savingOperationId: string;
}

class AddNewPostButton extends React.Component<IAllProps, State> {
    readonly state: State = this.freshState;

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    private get freshState() {
        return {
            dialogOpen: false,
            newPost: new PostData(),
            savingOperationId: IdUtils.getUniqueId()
        };
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

    private onEditPostFormChange = (newPost: PostData) => {
        this.setState({
            newPost
        });
    };

    private saveNewPost = () => {
        const {title, author, body, category} = this.state.newPost;

        // create an operation ID so that we can look up the status in the state
        const operationId = IdUtils.getUniqueId();
        this.setState({
            savingOperationId: operationId
        });

        this.props.createPost({
            title,
            author,
            body,
            category,
            operationId
        });
    };

    private getSavingOperationStatus(): OperationStatus {
        return OperationUtils.getOperationStatus(this.state.savingOperationId, this.props.operationState);
    }

    private resetState() {
        this.setState(this.freshState);
    }

    render() {
        const {} = this.props;
        const {dialogOpen, newPost} = this.state;

        const savingOperationStatus = this.getSavingOperationStatus();

        const isSavingPost = savingOperationStatus.isPending;

        const hasCompletedSavingPost = savingOperationStatus.hasCompleted;
        if (hasCompletedSavingPost) {
            this.resetState();
        }

        return (
            <div>
                <Tooltip title="Add a New Post">
                    <Button variant="fab"
                            color="primary"
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
                <EditPostDialog post={newPost}
                                open={dialogOpen}
                                onChange={this.onEditPostFormChange}
                                onClose={this.closeDialog}
                                onSave={this.saveNewPost}
                                disabled={isSavingPost}
                                fieldsToEdit={["title", "body", "author", "category"]}
                                title="Add a New Post"
                />
            </div>
        );
    }
}

const mapStateToProps = (state: ApplicationState, ownProps: IOwnProps) => {
    return {
        // Add mapped properties here
        operationState: state.operationState
    }
};

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>, ownProps: IOwnProps) => {
    const createPost = PostActions2.create.bindToDispatch(dispatch);

    return {
        // Add mapped properties here
        // someAction: bindActionCreators(actionCreator, dispatch)
        createPost
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddNewPostButton);