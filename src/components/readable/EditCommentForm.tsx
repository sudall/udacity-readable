import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import TextField from "material-ui/TextField";
import CategoryData from "src/data/models/CategoryData";
import MenuItem from "material-ui/Menu/MenuItem"
import CommentData from "src/data/models/CommentData";
import FormUtils from "src/utilities/FormUtils";

// props that are provided as parameters
interface IOwnProps {
    comment: CommentData,
    onChange: (comment: CommentData) => void;
    disabled: boolean;
}

// props that are provided via injection
interface IInjectedProps {
    // someAction: () => any;
}

type IAllProps = IOwnProps & IInjectedProps;

// internal state of the component
class State {

}

class EditCommentForm extends React.Component<IAllProps, State> {
    readonly state = new State();

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    private getOnTextFieldChangeCallback(dataPropertyName: keyof CommentData) {
        return FormUtils.getOnTextFieldChangeCallback(this.props.comment, dataPropertyName, this.props.onChange);
    };

    render() {
        const {comment, disabled} = this.props;
        const {} = this.state;

        return (
            <div>
                <TextField
                    autoFocus
                    label="Body"
                    fullWidth
                    multiline
                    value={comment.body}
                    onChange={this.getOnTextFieldChangeCallback("body")}
                    disabled={disabled}
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
)(EditCommentForm);