import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import Button from "material-ui/Button";
import Add from "material-ui-icons/Add";
import Dialog from "material-ui/Dialog";
import DialogTitle from "material-ui/Dialog/DialogTitle";
import DialogActions from "material-ui/Dialog/DialogActions";
import DialogContent from "material-ui/Dialog/DialogContent";
import EditPostForm from "src/components/readable/EditPostForm";
import PostData from "src/data/models/PostData";

// props that are provided as parameters
interface IOwnProps {

}

// props that are provided via injection
interface IInjectedProps {
    // someAction: () => any;
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

    private onAddEditPostFormChange = (newPost: PostData) => {
        this.setState({
            newPost
        });
    };

    private submitNewPost = () => {
        //TODO
    };

    render() {
        const {} = this.props;
        const {dialogOpen, newPost} = this.state;

        return (
            <div>
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
                <Dialog open={dialogOpen}
                    onClose={this.closeDialog}
                >
                    <DialogTitle>Add a New Post</DialogTitle>
                    <DialogContent>
                        <EditPostForm post={newPost} onChange={this.onAddEditPostFormChange} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeDialog} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.submitNewPost} color="primary" variant="raised">
                            Post
                        </Button>
                    </DialogActions>
                </Dialog>
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
)(AddNewPostButton);