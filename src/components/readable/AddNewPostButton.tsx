import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import Button from "material-ui/Button";
import Add from "material-ui-icons/Add";
import PostData from "src/data/models/PostData";
import EditPostDialog from "src/components/readable/EditPostDialog";
import Tooltip from "material-ui/Tooltip";
import PostActions2, {CreateParams} from "src/redux-actions/PostActions2";

// props that are provided as parameters
interface IOwnProps {

}

// props that are provided via injection
interface IInjectedProps {
    // someAction: () => any;
    createPost: (createPostParams: CreateParams) => void;
}

type IAllProps = IOwnProps & IInjectedProps;

// internal state of the component
class State {
    dialogOpen: boolean = false;
    newPost: PostData = new PostData();
}

class AddNewPostButton extends React.Component<IAllProps, State> {
    readonly state = new State();

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

    private onEditPostFormChange = (newPost: PostData) => {
        this.setState({
            newPost
        });
    };

    private saveNewPost = () => {
        const {title, author, body, category} = this.state.newPost;

        const onCreateCompleted = () => {
            this.closeDialog();
        };

        this.props.createPost({
            title,
            author,
            body,
            category,
            onCompleted: onCreateCompleted
        });
    };

    render() {
        const {} = this.props;
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
                        <Add />
                    </Button>
                </Tooltip>
                <EditPostDialog post={newPost}
                                open={dialogOpen}
                                onChange={this.onEditPostFormChange}
                                onClose={this.closeDialog}
                                onSave={this.saveNewPost}
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