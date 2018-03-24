import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import TextField from "material-ui/TextField";
import CategoryData from "src/data/models/CategoryData";
import MenuItem from "material-ui/Menu/MenuItem"
import CommentData from "src/data/models/CommentData";
import FormUtils from "src/utilities/FormUtils";
import CommentUtils from "src/utilities/CommentUtils";
import PostData from "src/data/models/PostData";

// props that are provided as parameters
interface IOwnProps {
    comment: CommentData,
    onChange: (comment: CommentData) => void;
    disabled: boolean;
    fieldsToEdit: (keyof CommentData)[];
}

// props that are provided via injection
interface IInjectedProps {
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

    private fieldsToShowContains(field: keyof CommentData) {
        return this.props.fieldsToEdit.some((fieldToEdit) => {
            return fieldToEdit === field;
        });
    }

    private getBodyField() {
        const fieldName = "body";

        if (!this.fieldsToShowContains(fieldName)) {
            return null;
        }

        return (<TextField
            autoFocus
            label="Body"
            fullWidth
            multiline
            rowsMax={5}
            required={CommentUtils.requiredCommentFieldsContains(fieldName)}
            value={this.props.comment[fieldName]}
            onChange={this.getOnTextFieldChangeCallback(fieldName)}
            disabled={this.props.disabled}
            InputProps={{
                inputProps: {
                    maxLength: 100
                }
            }}
        />);
    }

    private getAuthorField() {
        const fieldName = "author";

        if (!this.fieldsToShowContains(fieldName)) {
            return null;
        }

        return (<TextField
            label="Author"
            fullWidth
            required={CommentUtils.requiredCommentFieldsContains(fieldName)}
            value={this.props.comment[fieldName]}
            onChange={this.getOnTextFieldChangeCallback(fieldName)}
            disabled={this.props.disabled}
            InputProps={{
                inputProps: {
                    maxLength: 15
                }
            }}
        />);
    }

    render() {
        const {} = this.props;
        const {} = this.state;

        return (
            <div>
                {this.getBodyField()}
                {this.getAuthorField()}
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
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCommentForm);