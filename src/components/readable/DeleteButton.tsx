import * as React from "react";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import DeleteForever from "material-ui-icons/DeleteForever";
import Tooltip from "material-ui/Tooltip";
import Dialog from "material-ui/Dialog";
import DialogTitle from "material-ui/Dialog/DialogTitle";
import DialogActions from "material-ui/Dialog/DialogActions";
import DialogContent from "material-ui/Dialog/DialogContent";
import Button from "material-ui/Button";

// props that are provided as parameters
interface IOwnProps {
    onDelete: () => void;
    text?: string;
}

// props that are provided via injection
interface IInjectedProps {
    // someAction: () => any;
}

type IAllProps = IOwnProps & IInjectedProps;

// internal state of the component
class State {
    deleteConfirmationDialogOpen: boolean = false;
}

class DeleteButton extends React.Component<IAllProps, State> {
    readonly state = new State();

    static defaultProps = {
        text: "Are you sure you want to delete this?"
    };

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    private openDeleteConfirmationDialog = () => {
        this.setDeleteConfirmationDialogOpen(true);
    };

    private closeDeleteConfirmationDialog = () => {
        this.setDeleteConfirmationDialogOpen(false);
    };

    private setDeleteConfirmationDialogOpen = (value: boolean) => {
        this.setState({
            deleteConfirmationDialogOpen: value
        });
    };

    render() {
        const {onDelete, text} = this.props;
        const {deleteConfirmationDialogOpen} = this.state;

        return (
            <div>
                <IconButton onClick={this.openDeleteConfirmationDialog}>
                    <Tooltip title="Delete">
                        <DeleteForever />
                    </Tooltip>
                </IconButton>
                <Dialog open={deleteConfirmationDialogOpen} onClose={this.closeDeleteConfirmationDialog}>
                    <DialogTitle>Delete</DialogTitle>
                    <DialogContent>
                        <Typography>
                            {text}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeDeleteConfirmationDialog} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={onDelete} color="primary" variant="raised">
                            Delete
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
)(DeleteButton);