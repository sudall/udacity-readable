import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import TextField from "material-ui/TextField";
import PostData from "src/data/models/PostData";
import FormUtils from "src/utilities/FormUtils";

// props that are provided as parameters
interface IOwnProps {
    post: PostData,
    onChange: (post: PostData) => void;
}

// props that are provided via injection
interface IInjectedProps {
    // someAction: () => any;
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

    render() {
        const {post} = this.props;
        const {} = this.state;

        return (
            <div>
                <TextField
                    autoFocus
                    label="Title"
                    fullWidth
                    value={post.title}
                    onChange={this.getOnTextFieldChangeCallback("title")}
                />
                <TextField
                    label="Body"
                    fullWidth
                    multiline
                    value={post.body}
                    onChange={this.getOnTextFieldChangeCallback("body")}
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
)(EditPostForm);