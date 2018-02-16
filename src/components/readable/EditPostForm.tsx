import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import TextField from "material-ui/TextField";
import CategoryData from "src/data/models/CategoryData";
import MenuItem from "material-ui/Menu/MenuItem"
import PostData from "src/data/models/PostData";

// props that are provided as parameters
interface IOwnProps {
    post: PostData,
    onChange: (post: PostData) => void;
}

// props that are provided via injection
interface IInjectedProps {
    // someAction: () => any;
    categories: CategoryData[];
}

type IAllProps = IOwnProps & IInjectedProps;

// internal state of the component
class State {

}

class EditPostForm extends React.Component<IAllProps, State> {
    readonly state = new State();

    constructor(props: IAllProps) {
        super(props);
    }

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    private onTextFieldChange = (dataPropertyName: string) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            let newPost = new PostData();

            Object.assign(newPost, this.props.post, {
                [dataPropertyName]: event.target.value
            });

            this.props.onChange(newPost);
        };
    };

    render() {
        const {categories, post} = this.props;
        const {} = this.state;

        return (
            <div>
                <TextField
                    autoFocus
                    label="Title"
                    fullWidth
                    value={post.title}
                    onChange={this.onTextFieldChange("title")}
                />
                <TextField
                    label="Body"
                    fullWidth
                    multiline
                    value={post.body}
                    onChange={this.onTextFieldChange("body")}
                />
                <TextField
                    label="Author"
                    fullWidth
                    value={post.author}
                    onChange={this.onTextFieldChange("author")}
                />
                <TextField
                    label="Category"
                    fullWidth
                    select
                    value={post.category}
                    onChange={this.onTextFieldChange("category")}
                >
                    {
                        categories.map((category) => {
                            return (
                                <MenuItem value={category.name}>
                                    {category.name}
                                </MenuItem>
                            )
                        })
                    }
                </TextField>
            </div>
        );
    }
}

const mapStateToProps = (state: ApplicationState, ownProps: IOwnProps) => {
    return {
        // Add mapped properties here
        categories: state.categories
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