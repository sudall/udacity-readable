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
import Card from "material-ui/Card";
import CardActions from "material-ui/Card/CardActions";
import CardContent from "material-ui/Card/CardContent";
import PostSortMethod from "src/enums/PostSortMethods";
import TextField from "material-ui/TextField";
import MenuItem from "material-ui/Menu/MenuItem";

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
    sortMethod: PostSortMethod
}

class PostListPage extends React.Component<IAllProps, State> {
    readonly state: State = {
        sortMethod: PostSortMethod.TimestampNewestFirst
    };

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

    private onSortMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const postSortMethods = PostSortMethod.getEnumValues() as PostSortMethod[];

        let newSortMethod = postSortMethods.find((sortMethod) => {
            return sortMethod.id.toString() === event.target.value;
        });

        if (newSortMethod == null) {
            newSortMethod = PostSortMethod.TimestampNewestFirst;
        }

        this.setState({
            sortMethod: newSortMethod
        });
    };

    render() {
        const {posts, match} = this.props;
        const {sortMethod} = this.state;

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

        const postSortMethods = PostSortMethod.getEnumValues() as PostSortMethod[];

        return (
            <div>
                <PostAndCommentList>
                    <Card>
                        <CardContent>
                            <TextField
                                label="Sort By"
                                select
                                value={sortMethod.id.toString()}
                                onChange={this.onSortMethodChange}
                            >
                                {
                                    postSortMethods.map((sortMethod) => {
                                        return (
                                            <MenuItem value={sortMethod.id.toString()}>
                                                {sortMethod.displayText}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </TextField>
                        </CardContent>
                    </Card>
                    {
                        postsToShow
                            .slice()
                            .sort(sortMethod.sortCompareFunction)
                            .map((post) => {
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