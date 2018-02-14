import * as React from "react";
import Post from "src/components/readable/Post";
import PostData from "src/data/models/PostData";
import {Link} from "react-router-dom";

interface IProps {

}

class State {

}

class PostPage extends React.Component<IProps, State> {
    readonly state = new State();

    static getPostPageRoute(post: PostData) {
        return `post/${post.id}`;
    }

    static getPostLinkComponentFactory(post: PostData) {
        let postPageRoute = PostPage.getPostPageRoute(post);
        return (props: any) => {
            return <Link to={postPageRoute} {...props} />
        };
    };

    render() {
        return (
            <Post/>
        );
    }
}

export default PostPage;