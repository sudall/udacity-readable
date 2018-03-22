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

// props that are provided as parameters
interface IOwnProps {

}

// props that are provided via injection
interface IInjectedProps {
    // someAction: () => any;
    createPost: (createPostParams: PostActions.CreateParams, operationId: string) => void;
}

type IAllProps = IOwnProps & IInjectedProps;

// internal state of the component
class State {
    dialogOpen: boolean;
    newPost: PostData;
    savingOperationId: string;
    savingOperationStatus?: OperationStatus;
}

class AddNewPostButton extends React.Component<IAllProps, State> {
    readonly state: State = AddNewPostButton.freshState;

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
        } else {
            this.setState({
                savingOperationStatus: operationStatus
            });
        }
    };

    render() {
        const {} = this.props;
        const {dialogOpen, newPost, savingOperationId, savingOperationStatus} = this.state;

        const isSavingPost = savingOperationStatus != null && savingOperationStatus.isPending;

        return (
            <div>
                <OperationStatusProvider operationId={savingOperationId}
                                         onOperationStatusChange={this.onSavingOperationStatusChange}/>
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
    }
};

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>, ownProps: IOwnProps) => {
    const createPost = PostActions.instance.create.bindToDispatch(dispatch);

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