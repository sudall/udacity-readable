import * as React from "react";
import IconButton from "material-ui/IconButton";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import PostData from "src/data/models/PostData";
import ModeEdit from "material-ui-icons/ModeEdit";
import EditPostDialog from "src/components/readable/EditPostDialog";
import Tooltip from "material-ui/Tooltip";
import PostActions, {UpdateParams} from "src/redux-actions/PostActions";

// props that are provided as parameters
interface IOwnProps {
    post: PostData;
}

// props that are provided via injection
interface IInjectedProps {
    // someAction: () => any;
    updatePost: (params: UpdateParams) => void;
}

type IAllProps = IOwnProps & IInjectedProps;

// internal state of the component
class State {
    editPostDialogOpen: boolean;
    editedPost: PostData;
}

class EditPostButton extends React.Component<IAllProps, State> {
    readonly state: State = {
        editedPost: this.props.post,
        editPostDialogOpen: false
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
        const {title, body, id} = this.state.editedPost;

        this.props.updatePost({
            title,
            body,
            postId: id
        });
    };

    render() {
        const {onEditPostFormChange, closeEditDialog, onSave} = this;
        // const {isSavingPost} = this.props;
        const {editedPost, editPostDialogOpen} = this.state;

        return (
            <div>
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
                                disabled={false}
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
    const updatePost = PostActions.update.bindToDispatch(dispatch);

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