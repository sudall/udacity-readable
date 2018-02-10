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
import Comment from "material-ui-icons/Comment";
import ArrowUpward from "material-ui-icons/ArrowUpward";
import ArrowDownward from "material-ui-icons/ArrowDownward";
import Card from "material-ui/Card";
import CardContent from "material-ui/Card/CardContent";
import CardActions from "material-ui/Card/CardActions";
import IconButton from "material-ui/IconButton";
import Badge from "material-ui/Badge";
import deepPurple from "material-ui/colors/deepPurple";
import lime from "material-ui/colors/lime"
import List from "material-ui/List";
import Drawer from "material-ui/Drawer";
import ListItem from "material-ui/List/ListItem";
import ListItemText from "material-ui/List/ListItemText";
import Menu from "material-ui-icons/Menu";
import CategoryData from "src/data/models/CategoryData";
import {Link, LinkProps} from "react-router-dom";

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

    getPostPageRoute(post: PostData) {
        return `post/${post.id}`;
    }

    getPostLinkComponentFactory(post: PostData) {
        let postPageRoute = this.getPostPageRoute(post);
        return (props: any) => {
            return <Link to={postPageRoute} {...props} />
        };
    };

    render() {
        const drawerWidth = 240;
        return (
            <MuiThemeProvider theme={this.theme}>
                <Reboot/>

                <AppBar position="static">
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
                                const postPageRoute = this.getPostPageRoute(post);

                                return (
                                    <Grid item>
                                        <Card>
                                            <CardContent>
                                                <Button component={this.getPostLinkComponentFactory(post)}>
                                                    <Typography variant="headline">
                                                        {post.title}
                                                    </Typography>
                                                </Button>
                                                <Typography>
                                                    {post.body}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <IconButton>
                                                    <ArrowUpward/>
                                                </IconButton>
                                                <IconButton>
                                                    <ArrowDownward/>
                                                </IconButton>
                                                <IconButton component={this.getPostLinkComponentFactory(post)}>
                                                    <Badge badgeContent={4} color="primary">
                                                        <Comment/>
                                                    </Badge>
                                                </IconButton>
                                            </CardActions>
                                        </Card>
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

export default ReadableApplication;