import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import Button from "material-ui/Button";
import Add from "material-ui-icons/Add";
import Tooltip from "material-ui/Tooltip";
import CommentData from "src/data/models/CommentData";
import EditCommentDialog from "src/components/readable/EditCommentDialog";

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
    newComment: CommentData;
    dialogOpen: boolean;
}

class AddNewCommentButton extends React.Component<IAllProps, State> {
    readonly state: State = {
        dialogOpen: false,
        newComment: new CommentData()
    };

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
        // TODO dispatch save comment action
    };

    render() {
        const {} = this.props;
        const {dialogOpen, newComment} = this.state;

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
    return {
        // Add mapped properties here
        // someAction: bindActionCreators(actionCreator, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddNewCommentButton);