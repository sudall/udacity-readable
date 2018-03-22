import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import PostData from "src/data/models/PostData";
import Post from "src/components/readable/Post";
import {RouteComponentProps} from "react-router";
import Typography from "material-ui/Typography";
import CommentData from "src/data/models/CommentData";
import Comment from "src/components/readable/Comment";
import PostAndCommentList from "src/components/readable/PostAndCommentList";
import Card from "material-ui/Card";
import CardContent from "material-ui/Card/CardContent";
import AddNewCommentButton from "src/components/readable/AddNewCommentButton";
import PostUtils from "src/utilities/PostUtils";
import ReadableLink from "src/components/readable/ReadableLink";
import PostActions from "src/redux-actions/PostActions";
import CommentActions from "src/redux-actions/CommentActions";
import CommentSortMethod from "src/enums/CommentSortMethods";

interface IRoutePathParameters {
    id: string;
}

// props that are provided as parameters
interface IOwnProps extends RouteComponentProps<IRoutePathParameters> {

}

// props that are provided via injection
interface IInjectedProps {
    // someAction: () => any;
    getPost: () => void;
    post: PostData;

    getComments: () => void;
    comments: CommentData[];
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

    componentDidMount() {
        this.props.getPost();
        this.props.getComments();
    }

    private static getCommentElements(comments: CommentData[]) {
        const noCommentsYetMessage = (
            <Card>
                <CardContent>
                    <Typography>
                        No comments yet.
                    </Typography>
                </CardContent>
            </Card>
        );

        if (comments.length === 0) {
            return noCommentsYetMessage;
        }

        return comments.map((comment) => (
            <div style={{marginLeft: 16}}>
                <Comment comment={comment}/>
            </div>
        ));
    }

    static getPostIdParameter(props: IOwnProps) {
        return props.match.params.id;
    }

    render() {
        const {match, post, comments} = this.props;

        const postId = match.params.id;

        if (post == null) {
            return (<Typography>{`No post with id "${postId}" found.`}</Typography>);
        }

        return (
            <div>
                <PostAndCommentList>
                    <Post post={post}/>
                    {PostPage.getCommentElements(comments)}
                </PostAndCommentList>
                <AddNewCommentButton/>
            </div>
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
            return <ReadableLink to={postPageRoute} {...props} />
        };
    };
}


const mapStateToProps = (state: ApplicationState, ownProps: IOwnProps) => {
    const postId = PostPage.getPostIdParameter(ownProps);
    const post = state.postState.posts[postId];

    let comments = PostUtils.getPostComments(postId, Object.values(state.commentState.comments));

    comments = comments
        .slice()
        .sort(CommentSortMethod.VoteScoreHighestToLowest.sortCompareFunction);

    return {
        // Add mapped properties here
        comments,
        post
    }
};

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>, ownProps: IOwnProps) => {
    const postId = PostPage.getPostIdParameter(ownProps);

    const getPostById = PostActions.instance.get.bindToDispatch(dispatch);
    const getPost = () => {
        return getPostById(postId);
    };

    const getCommentsForPost = CommentActions.instance.getForPost.bindToDispatch(dispatch);
    const getComments = () => {
        return getCommentsForPost(postId);
    };

    return {
        // Add mapped properties here
        // someAction: bindActionCreators(actionCreator, dispatch)
        getPost,
        getComments
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostPage);