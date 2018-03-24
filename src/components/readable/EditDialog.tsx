import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import Button from "material-ui/Button";
import Dialog from "material-ui/Dialog";
import DialogTitle from "material-ui/Dialog/DialogTitle";
import DialogActions from "material-ui/Dialog/DialogActions";
import DialogContent from "material-ui/Dialog/DialogContent";

// props that are provided as parameters
interface IOwnProps {
    title: string;
    onSave: () => void;
    open: boolean;
    onClose: () => void;
    disabled: boolean;
}

// props that are provided via injection
interface IInjectedProps {
}

type IAllProps = IOwnProps & IInjectedProps;

// internal state of the component
class State {

}

class EditDialog extends React.Component<IAllProps, State> {
    readonly state = new State();

    constructor(props: IAllProps) {
        super(props);
    }

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    private onClose = () => {
        if (this.props.disabled) {
            return;
        }

        this.props.onClose();
    };

    render() {
        const {onClose} = this;
        const {title, open, onSave, children, disabled} = this.props;
        const {} = this.state;

        return (
            <Dialog open={open}
                    onClose={onClose}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}
                            color="secondary"
                            disabled={disabled}>
                        Cancel
                    </Button>
                    <Button onClick={onSave}
                            color="primary"
                            variant="raised"
                            disabled={disabled}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
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
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditDialog);