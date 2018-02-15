import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import PostData from "src/data/models/PostData";
import {bindActionCreators} from "redux";
import PostActions from "src/redux-actions/PostActions";
import ReadableToolbar from "src/components/readable/ReadableToolbar";
import PostSummaryList from "src/components/readable/PostSummaryList";
import PostSummary from "src/components/readable/PostSummary";
import AddNewPostButton from "src/components/readable/AddNewPostButton";
import ReadablePageContainer from "src/components/readable/ReadablePageContainer";

// props that are provided as parameters
interface IOwnProps {

}

// props that are provided via injection
interface IInjectedProps {
    // someAction: () => any;
    posts: PostData[];
}

type IAllProps = IOwnProps & IInjectedProps;

// internal state of the component
class State {

}

class PostListPage extends React.Component<IAllProps, State> {
    readonly state = new State();

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    render() {
        const {posts} = this.props;

        return (
            <div>
                <PostSummaryList>
                    {
                        posts.map((post) => {
                            return <PostSummary post={post}/>;
                        })
                    }
                </PostSummaryList>

                <AddNewPostButton />
            </div>
        );
    }
}

const mapStateToProps = (state: ApplicationState, ownProps: IOwnProps) => {
    return {
        // Add mapped properties here
        posts: state.posts
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
)(PostListPage);