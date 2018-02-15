import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import PostData from "src/data/models/PostData";
import PostAndCommentList from "src/components/readable/PostAndCommentList";
import Post from "src/components/readable/Post";
import AddNewPostButton from "src/components/readable/AddNewPostButton";
import CategoryData from "src/data/models/CategoryData";
import {RouteComponentProps} from "react-router";
import Typography from "material-ui/Typography";

interface IRoutePathParameters {
    urlPath: string;
}

// props that are provided as parameters
interface IOwnProps extends RouteComponentProps<IRoutePathParameters> {

}

// props that are provided via injection
interface IInjectedProps {
    // someAction: () => any;
    posts: PostData[];
    categories: CategoryData[];
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

    private getCategoryByUrlPath(urlPath: string) {
        return this.props.categories.find((category) => {
            return category.urlPath === urlPath;
        });
    }

    private getPostsByCategory(category: CategoryData) {
        return this.props.posts.filter((post) => {
            return post.category === category.name;
        });
    }

    render() {
        const {posts, match} = this.props;

        let postsToShow = posts;

        const categoryUrlPathParameter = match.params.urlPath;

        if (categoryUrlPathParameter != null) {
            const category = this.getCategoryByUrlPath(categoryUrlPathParameter);

            if (category != null) {
                postsToShow = this.getPostsByCategory(category);
            } else {
                return (
                    <Typography>{`Could not find category "${categoryUrlPathParameter}"`}</Typography>
                );
            }
        }

        return (
            <div>
                <PostAndCommentList>
                    {
                        postsToShow.map((post) => {
                            return <Post post={post}/>;
                        })
                    }
                </PostAndCommentList>

                <AddNewPostButton />
            </div>
        );
    }
}

export class PostListPageUtils {
    static getRoutePath() {
        return "/category/:urlPath";
    }

    static getLinkPath(category: CategoryData) {
        return `/category/${category.urlPath}`;
    }
}

const mapStateToProps = (state: ApplicationState, ownProps: IOwnProps) => {
    return {
        // Add mapped properties here
        posts: state.posts,
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
)(PostListPage);