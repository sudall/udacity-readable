import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import PostData from "src/data/models/PostData";
import Post from "src/components/readable/Post";
import {Link} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import Typography from "material-ui/Typography";
import CommentData from "src/data/models/CommentData";
import Comment from "src/components/readable/Comment";
import PostAndCommentList from "src/components/readable/PostAndCommentList";
import Paper from "material-ui/Paper";
import Card from "material-ui/Card";
import CardContent from "material-ui/Card/CardContent";

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

    private getPostById(postId: string) {
        return this.props.posts.find((post) => {
           return postId === post.id;
        });
    }

    private getPostComments(post: PostData): CommentData[] {
        return this.props.comments.filter((comment) => {
           return comment.parentId === post.id;
        });
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

        return (
            <div style={{marginLeft: 16}}>
                {
                    comments.map((comment) =>
                        (
                            <Comment comment={comment}/>
                        )
                    )
                }
            </div>
        )
    }

    render() {
        const {match} = this.props;

        const postId = match.params.id;

        const post = this.getPostById(postId);

        if (post == null) {
            return (<Typography>{`No post with id "${postId}" found.`}</Typography>);
        }

        const comments = this.getPostComments(post);

        return (
            <PostAndCommentList>
                <Post post={post}/>
                {PostPage.getCommentElements(comments)}
            </PostAndCommentList>
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
        posts: state.posts,
        comments: state.comments
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