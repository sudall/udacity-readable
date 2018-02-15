import * as React from "react";
import Typography from "material-ui/Typography";
import ArrowUpward from "material-ui-icons/ArrowUpward";
import ArrowDownward from "material-ui-icons/ArrowDownward";
import Card from "material-ui/Card";
import CardContent from "material-ui/Card/CardContent";
import CardActions from "material-ui/Card/CardActions";
import IconButton from "material-ui/IconButton";
import {Link} from "react-router-dom";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import {PostPageUtils} from "src/components/readable/PostPage";
import PostData from "src/data/models/PostData";
import {bindActionCreators} from "redux";
import PostActions from "src/redux-actions/PostActions";

// props that are provided as parameters
interface IOwnProps {
    post: PostData;
}

// props that are provided via injection
interface IInjectedProps {
    upvote: () => any;
}

type IAllProps = IOwnProps & IInjectedProps;

class State {

}

class Post extends React.Component<IAllProps, State> {
    readonly state = new State();

    render() {
        const {post, upvote} = this.props;

        return (
            <Card>
                <CardContent>
                    <Link to={PostPageUtils.getLinkPath(post)}>
                        <Typography variant="title">
                            {post.title}
                        </Typography>
                    </Link>
                    <Typography>
                        {post.body}
                    </Typography>
                    <Typography>
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton onClick={upvote}>
                        <ArrowUpward/>
                    </IconButton>
                    <Typography>
                        {post.voteScore}
                    </Typography>
                    <IconButton>
                        <ArrowDownward/>
                    </IconButton>
                    <Typography>
                        Category: {post.category}
                    </Typography>
                    <Typography>
                        Author: {post.author}
                    </Typography>
                    <Typography>
                        {/*TODO use moment to get the formatted time*/}
                        Date: {post.timestamp}
                    </Typography>
                </CardActions>
            </Card>
        );
    }
}

const mapStateToProps = (state: ApplicationState, ownProps: IOwnProps) => {
    return {
        // Add mapped properties here
    }
};

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>, ownProps: IOwnProps) => {
    const upvote = PostActions.upvote.bind(PostActions);

    return {
        upvote: bindActionCreators(upvote, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post);