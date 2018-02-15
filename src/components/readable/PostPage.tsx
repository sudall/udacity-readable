import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import PostData from "src/data/models/PostData";
import {bindActionCreators} from "redux";
import PostActions from "src/redux-actions/PostActions";
import Post from "src/components/readable/Post";
import {Link} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import Typography from "material-ui/Typography";
import ReadablePageContainer from "src/components/readable/ReadablePageContainer";

interface IRoutePathParameters {
    id: string;
}

// props that are provided as parameters
interface IOwnProps extends RouteComponentProps<IRoutePathParameters> {

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

class PostPage extends React.Component<IAllProps, State> {
    readonly state = new State();

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    private getPostById(postId: string) {
        return this.props.posts.find((post) => {
           return postId === post.id;
        });
    }

    render() {
        const {match} = this.props;

        const postId = match.params.id;

        const post = this.getPostById(postId);

        let body = (<Typography>{`No post with id "${postId}" found.`}</Typography>);

        if (post != null) {
            body = (<Post post={post}/>);
        }

        return (
            body
        );
    }
}

export class PostPageUtils {
    static getLinkPath(post: PostData) {
        return `/post/${post.id}`;
    }

    static getRoutePath() {
        return "/post/:id";
    }

    static getPostPageLinkComponentFactory(post: PostData) {
        let postPageRoute = PostPageUtils.getLinkPath(post);
        return (props: any) => {
            return <Link to={postPageRoute} {...props} />
        };
    };
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
)(PostPage);