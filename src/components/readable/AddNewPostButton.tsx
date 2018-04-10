import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {
    ApplicationState, OperationStatus
} from "src/components/readable/ReadableApplication";
import Button from "material-ui/Button";
import Add from "material-ui-icons/Add";
import PostData from "src/data/models/PostData";
import EditPostDialog from "src/components/readable/EditPostDialog";
import Tooltip from "material-ui/Tooltip";
import PostActions from "src/redux-actions/PostActions";
import IdUtils from "src/utilities/IdUtils";
import OperationStatusProvider from "src/components/readable/OperationStatusProvider";
import PostUtils from "src/utilities/PostUtils";

// props that are provided as parameters
interface IOwnProps {

}

// props that are provided via injection
interface IInjectedProps {
    createPost: (createPostParams: PostActions.CreateParams, operationId: string) => void;
}

type IAllProps = IOwnProps & IInjectedProps;

// internal state of the component
interface IState {
    dialogOpen: boolean;
    newPost: PostData;
    savingOperationId: string;
}

class AddNewPostButton extends React.Component<IAllProps, IState> {
    readonly state: IState = AddNewPostButton.freshState;

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    private static get freshState() {
        return {
            dialogOpen: false,
            newPost: new PostData(),
            savingOperationId: ""
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
        if (!PostUtils.isValidPostData(this.state.newPost)) {
            return;
        }

        const {title, author, body, category} = this.state.newPost;

        // create an operation ID so that we can look up the status in the state
        const operationId = IdUtils.getUniqueId();
        this.setState({
            savingOperationId: operationId
        });

        this.props.createPost(
            {
                title,
                author,
                body,
                category
            },
            operationId);
    };

    private resetState() {
        this.setState(AddNewPostButton.freshState);
    }

    private onSavingOperationStatusChange = (operationStatus: OperationStatus) => {
        const hasCompletedSavingPost = operationStatus.hasCompleted;
        if (hasCompletedSavingPost) {
            this.resetState();
        }
    };

    private renderWithSavingOperationStatus(operationStatus: OperationStatus) {
        const isSavingPost = operationStatus.isPending;
        const {dialogOpen, newPost} = this.state;

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
                        <Add/>
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

    render() {
        const {} = this.props;
        const {savingOperationId} = this.state;

        return (
            <OperationStatusProvider operationId={savingOperationId}
                                     onOperationStatusChange={this.onSavingOperationStatusChange}
                                     render={(operationStatus) => {
                                         return this.renderWithSavingOperationStatus(operationStatus);
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
    const createPost = PostActions.instance.create.bindToDispatch(dispatch);

    return {
        // Add mapped properties here
        createPost
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddNewPostButton);