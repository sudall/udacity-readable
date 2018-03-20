import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import EditPostForm from "src/components/readable/EditPostForm";
import EditDialog from "src/components/readable/EditDialog";
import PostData from "src/data/models/PostData";

// props that are provided as parameters
interface IOwnProps {
    title: string;
    onSave: () => void;
    open: boolean;
    onClose: () => void;
    post: PostData,
    onChange: (post: PostData) => void;
    disabled: boolean;
    fieldsToEdit: (keyof PostData)[];
}

// props that are provided via injection
interface IInjectedProps {
    // someAction: () => any;
}

type IAllProps = IOwnProps & IInjectedProps;

// internal state of the component
class State {

}

class EditPostDialog extends React.Component<IAllProps, State> {
    readonly state = new State();

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    render() {
        const {open, onClose, onSave, onChange, post, title, disabled, fieldsToEdit} = this.props;
        const {} = this.state;

        return (
            <EditDialog open={open}
                        onClose={onClose}
                        onSave={onSave}
                        disabled={disabled}
                        title={title}
            >
                <EditPostForm post={post}
                              onChange={onChange}
                              disabled={disabled}
                              fieldsToEdit={fieldsToEdit}/>
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
)(EditPostDialog);