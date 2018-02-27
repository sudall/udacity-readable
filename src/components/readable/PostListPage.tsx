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
import CardContent from "material-ui/Card/CardContent";
import PostSortMethod from "src/enums/PostSortMethods";
import TextField from "material-ui/TextField";
import MenuItem from "material-ui/Menu/MenuItem";
import * as QueryString from "query-string";

interface IQueryStringParameters {
    sortMethodId: string;
}

interface IRoutePathParameters {
    categoryUrlPath: string;
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
    readonly state: State = {

    };

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    private getCategoryByUrlPath(urlPath: string) {
        return this.selectableCategories.find((category) => {
            return category.urlPath === urlPath;
        });
    }

    private getPostsByCategory(category: CategoryData) {
        return this.props.posts.filter((post) => {
            return post.category === category.name;
        });
    }

    private static readonly DefaultSortMethod = PostSortMethod.TimestampNewestFirst;

    private onSortMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const sortMethodId = event.target.value;
        const newSortMethod = PostListPage.getSortMethodById(sortMethodId);

        const oldQueryStringParameters = this.getQueryStringParameters();
        const oldSortMethod = PostListPage.getSortMethodById(oldQueryStringParameters.sortMethodId);

        const newQueryStringParameters = Object.assign({}, oldQueryStringParameters);
        newQueryStringParameters.sortMethodId = newSortMethod.id.toString();

        const newQueryString = QueryString.stringify(newQueryStringParameters);

        // if the new sort method is different from the old one...
        if (oldQueryStringParameters.sortMethodId !== newQueryStringParameters.sortMethodId) {
            const newHistory = {
                search: newQueryString
            };

            // if the sort methods are still the same... (which can happen with the default sort method)
            if (newSortMethod === oldSortMethod) {
                // do a replace instead
                this.props.history.replace(newHistory);
            } else {
                this.props.history.push(newHistory);
            }
        }
    };

    private readonly selectableCategories = [PostListPageUtils.AllCategory].concat(this.props.categories);

    private onSelectedCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSelectedCategoryName = event.target.value;

        let selectedCategory = this.selectableCategories.find((category) => {
            return category.name === newSelectedCategoryName;
        });

        selectedCategory = selectedCategory || PostListPageUtils.AllCategory;

        const newCategoryLinkPath = PostListPageUtils.getLinkPath(selectedCategory);

        const oldCategory = this.getCategoryByUrlPath(this.getUrlPathParameters().categoryUrlPath);

        if (selectedCategory !== oldCategory) {
            this.props.history.push({
                pathname: newCategoryLinkPath,
                search: this.props.location.search
            });
        }
    };

    private static getNoPostsMessageElements() {
        return (
            <Card>
                <CardContent>
                    <Typography>
                        No posts matching this filter.
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    private getQueryStringParameters(): IQueryStringParameters {
        let queryString = this.props.location.search;
        return QueryString.parse(queryString);
    }

    private static getAllSortMethods() {
        return PostSortMethod.getEnumValues() as PostSortMethod[];
    }

    private static getSortMethodById(id: number | string): PostSortMethod {
        if (typeof(id) === "string") {
            id = parseInt(id);
        }

        let result = PostSortMethod.getEnumValueById(id) as PostSortMethod;

        if (result == null) {
            result = PostListPage.DefaultSortMethod;
        }

        return result;
    }

    private getSelectedSortMethod(): PostSortMethod {
        const selectedSortMethodId = this.getQueryStringParameters().sortMethodId;

        return PostListPage.getSortMethodById(selectedSortMethodId);
    }

    private getUrlPathParameters() {
        return this.props.match.params;
    }

    render() {
        const {posts} = this.props;
        const {} = this.state;

        let postsToShow = posts;

        const categoryUrlPathParameter = this.getUrlPathParameters().categoryUrlPath;

        const selectedCategory = this.getCategoryByUrlPath(categoryUrlPathParameter) || PostListPageUtils.AllCategory;
        if (categoryUrlPathParameter != null) {
            if (selectedCategory != null) {
                postsToShow = this.getPostsByCategory(selectedCategory);
            } else {
                return (
                    <Typography>{`Could not find category "${categoryUrlPathParameter}"`}</Typography>
                );
            }
        }

        const sortMethod = this.getSelectedSortMethod();
        const postElements = postsToShow
            .slice()
            .sort(sortMethod.sortCompareFunction)
            .map((post) => {
                return <Post post={post}/>;
            });

        return (
            <div>
                <PostAndCommentList>
                    <Card>
                        <CardContent>
                            <TextField
                                label="Category"
                                select
                                value={selectedCategory.name}
                                onChange={this.onSelectedCategoryChange}
                            >
                                {
                                    this.selectableCategories.map((category) => {
                                        return (
                                            <MenuItem value={category.name}>
                                                {category.name}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </TextField>
                            <span style={{marginLeft: 15}}/>
                            <TextField
                                label="Sort By"
                                select
                                value={sortMethod.id.toString()}
                                onChange={this.onSortMethodChange}
                            >
                                {
                                    PostListPage.getAllSortMethods().map((sortMethod) => {
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
                        postsToShow.length !== 0 ? postElements : PostListPage.getNoPostsMessageElements()
                    }
                </PostAndCommentList>

                <AddNewPostButton />
            </div>
        );
    }
}

export class PostListPageUtils {
    static getRoutePath() {
        return "/category/:categoryUrlPath";
    }

    public static readonly AllCategory: CategoryData = {
        name: "All",
        urlPath: ""
    };

    static getLinkPath(category: CategoryData) {
        if (category === PostListPageUtils.AllCategory) {
            return "/";
        }

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