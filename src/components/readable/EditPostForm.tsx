import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import TextField from "material-ui/TextField";
import PostData from "src/data/models/PostData";
import FormUtils from "src/utilities/FormUtils";
import CategoryData from "src/data/models/CategoryData";
import MenuItem from "material-ui/Menu/MenuItem"
import PostUtils from "src/utilities/PostUtils";

// props that are provided as parameters
interface IOwnProps {
    post: PostData,
    onChange: (post: PostData) => void;
    fieldsToEdit: (keyof PostData)[];
    disabled: boolean;
}

// props that are provided via injection
interface IInjectedProps {
    categories: CategoryData[];
}

type IAllProps = IOwnProps & IInjectedProps;

// internal state of the component
class State {

}

class EditPostForm extends React.Component<IAllProps, State> {
    readonly state = new State();

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    private getOnTextFieldChangeCallback(dataPropertyName: keyof PostData) {
        return FormUtils.getOnTextFieldChangeCallback(this.props.post, dataPropertyName, this.props.onChange);
    };

    private fieldsToShowContains(field: keyof PostData) {
        return this.props.fieldsToEdit.some((fieldToEdit) => {
            return fieldToEdit === field;
        });
    }

    private getTitleField() {
        if (!this.fieldsToShowContains("title")) {
            return null;
        }

        return (<TextField
            autoFocus
            label="Title"
            fullWidth
            required={PostUtils.requiredPostFieldsContains("title")}
            value={this.props.post.title}
            onChange={this.getOnTextFieldChangeCallback("title")}
            disabled={this.props.disabled}
            InputProps={{
                inputProps: {
                    maxLength: 50
                }
            }}
        />);
    }

    private getBodyField() {
        if (!this.fieldsToShowContains("body")) {
            return null;
        }

        return (
            <TextField
                label="Body"
                fullWidth
                multiline
                rowsMax={5}
                required={PostUtils.requiredPostFieldsContains("body")}
                value={this.props.post.body}
                onChange={this.getOnTextFieldChangeCallback("body")}
                disabled={this.props.disabled}
                InputProps={{
                    inputProps: {
                        maxLength: 100
                    }
                }}
            />
        );
    }

    private getAuthorField() {
        if (!this.fieldsToShowContains("author")) {
            return null;
        }

        return (
            <TextField
                label="Author"
                fullWidth
                required={PostUtils.requiredPostFieldsContains("author")}
                value={this.props.post.author}
                onChange={this.getOnTextFieldChangeCallback("author")}
                disabled={this.props.disabled}
                InputProps={{
                    inputProps: {
                        maxLength: 15
                    }
                }}
            />
        );
    }

    private getCategoryField() {
        if (!this.fieldsToShowContains("category")) {
            return null;
        }

        return (
            <TextField
                label="Category"
                fullWidth
                select
                required={PostUtils.requiredPostFieldsContains("category")}
                value={this.props.post.category}
                onChange={this.getOnTextFieldChangeCallback("category")}
                disabled={this.props.disabled}
            >
                {
                    this.props.categories.map((category) => {
                        return (
                            <MenuItem key={category.path} value={category.name}>
                                {category.name}
                            </MenuItem>
                        )
                    })
                }
            </TextField>
        );
    }

    render() {
        const {} = this.props;
        const {} = this.state;

        return (
            <div>
                {this.getTitleField()}
                {this.getBodyField()}
                {this.getAuthorField()}
                {this.getCategoryField()}
            </div>
        );
    }
}

const mapStateToProps = (state: ApplicationState, ownProps: IOwnProps) => {
    return {
        // Add mapped properties here
        categories: Object.values(state.categories)
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
)(EditPostForm);