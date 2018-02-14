import * as React from "react";
import Reboot from "material-ui/Reboot";
import Button from "material-ui/Button";
import createMuiTheme from "material-ui/styles/createMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Typography from "material-ui/Typography";
import Toolbar from "material-ui/Toolbar";
import AppBar from "material-ui/AppBar";
import Grid from "material-ui/Grid";
import PostData from "src/data/models/PostData";
import Add from "material-ui-icons/Add";
import IconButton from "material-ui/IconButton";
import deepPurple from "material-ui/colors/deepPurple";
import lime from "material-ui/colors/lime"
import List from "material-ui/List";
import Drawer from "material-ui/Drawer";
import ListItem from "material-ui/List/ListItem";
import ListItemText from "material-ui/List/ListItemText";
import Menu from "material-ui-icons/Menu";
import CategoryData from "src/data/models/CategoryData";
import {Link} from "react-router-dom";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplicationBootstrapper";
import PostPage from "src/components/readable/PostPage";
import PostSummary from "src/components/readable/PostSummary";

interface IProps {

}

class State {
    drawerOpen = false
}

class ReadableApplication extends React.Component<IProps, State> {
    readonly state = new State();

    theme = createMuiTheme({
        palette: {
            type: 'dark',
            primary: deepPurple,
            secondary: lime
        },
    });

    static categories: CategoryData[] = [
        {
            name: "Category 1",
            urlPath: "Category 1"
        },
        {
            name: "Category 2",
            urlPath: "Category 2"
        },
        {
            name: "Category 3",
            urlPath: "Category 3"
        }
    ];

    static posts: PostData[] = [
        {
            author: "Some author",
            body: "Some body",
            category: "Some category",
            deleted: false,
            id: "someUniqueId",
            timestamp: 123412312,
            title: "Some Title",
            voteScore: 1
        },
        {
            author: "Some author 2",
            body: "Some body 2",
            category: "Some category",
            deleted: false,
            id: "someUniqueId2",
            timestamp: 123412313,
            title: "Some Title 2",
            voteScore: 10
        },
        {
            author: "Some author 3",
            body: "Some body 3",
            category: "Some category 2",
            deleted: false,
            id: "someUniqueId3",
            timestamp: 123412314,
            title: "Some Title 3",
            voteScore: 100
        }
    ];

    toggleDrawer = () => {
        this.setState((previousState) => {
            return {
                drawerOpen: !previousState.drawerOpen
            };
        });
    };

    static getPostLinkComponentFactory(post: PostData) {
        let postPageRoute = PostPage.getPostPageRoute(post);
        return (props: any) => {
            return <Link to={postPageRoute} {...props} />
        };
    };

    render() {
        return (
            <MuiThemeProvider theme={this.theme}>
                <Reboot/>

                <AppBar position="sticky">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.toggleDrawer}>
                            <Menu/>
                        </IconButton>
                        <Typography variant="title">
                            Readable
                        </Typography>
                    </Toolbar>
                </AppBar>


                <Drawer open={this.state.drawerOpen}
                        onClose={this.toggleDrawer}
                        anchor="left">
                    <List>
                        {
                            ReadableApplication.categories.map((category) => (
                                <ListItem button component={props => <Link to={category.urlPath} {...props}/>}>
                                    <ListItemText primary={category.name} />
                                </ListItem>
                            ))
                        }
                    </List>
                </Drawer>
                <div style={{margin: "16px"}}>
                    <Grid container
                          direction="column"
                          justify="flex-start"
                          alignItems="stretch">
                        {
                            Array.of(1,2,3,4,5,6).map(() => {
                                return ReadableApplication.posts.map((post) => {
                                    return (
                                        <Grid item>
                                            <PostSummary post={post} />
                                        </Grid>
                                    );
                                })
                            })
                        }
                    </Grid>
                </div>
                <Button variant="fab" color="primary" style={{position: "fixed",
                    bottom: 16,
                    right: 16}}>
                    <Add />
                </Button>

            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state: ApplicationState, ownProps: IProps) => {
    return {
    };
};

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>, ownProps: IProps) => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReadableApplication);