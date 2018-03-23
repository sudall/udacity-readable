import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import EditDialog from "src/components/readable/EditDialog";
import EditCommentForm from "src/components/readable/EditCommentForm";
import CommentData from "src/data/models/CommentData";

// props that are provided as parameters
interface IOwnProps {
    title: string;
    onSave: () => void;
    open: boolean;
    onClose: () => void;
    comment: CommentData,
    onChange: (comment: CommentData) => void;
    disabled: boolean;
    fieldsToEdit: (keyof CommentData)[];
}

// props that are provided via injection
interface IInjectedProps {
    // someAction: () => any;
}

type IAllProps = IOwnProps & IInjectedProps;

// internal state of the component
class State {

}

class EditCommentDialog extends React.Component<IAllProps, State> {
    readonly state = new State();

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    render() {
        const {open, onClose, onSave, onChange, comment, title, disabled, fieldsToEdit} = this.props;
        const {} = this.state;

        return (
            <EditDialog open={open}
                        onClose={onClose}
                        onSave={onSave}
                        title={title}
                        disabled={disabled}
            >
                <EditCommentForm comment={comment}
                                 onChange={onChange}
                                 disabled={disabled}
                                 fieldsToEdit={fieldsToEdit} />
            </EditDialog>
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
)(EditCommentDialog);