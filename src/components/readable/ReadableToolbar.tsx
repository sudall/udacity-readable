import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import Drawer from "material-ui/Drawer";
import List from "material-ui/List";
import {Link} from "react-router-dom";
import Menu from "material-ui-icons/Menu";
import ListItem from "material-ui/List/ListItem";
import ListItemText from "material-ui/List/ListItemText";
import CategoryData from "src/data/models/CategoryData";
import {PostListPageUtils} from "src/components/readable/PostListPage";
import Divider from "material-ui/Divider";

// props that are provided as parameters
interface IOwnProps {

}

// props that are provided via injection
interface IInjectedProps {
    // someAction: () => any;
    categories: CategoryData[];
}

type IAllProps = IOwnProps & IInjectedProps;

// internal state of the component
class State {
    drawerOpen = false;
}

class ReadableToolbar extends React.Component<IAllProps, State> {
    readonly state = new State();

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    toggleDrawer = () => {
        this.setState((previousState) => {
            return {
                drawerOpen: !previousState.drawerOpen
            };
        });
    };

    private getDrawerListItem(name: string, urlPath: string) {
        return (
            <ListItem button onClick={this.toggleDrawer} component={props => <Link to={urlPath} {...props}/>}>
                <ListItemText primary={name} />
            </ListItem>
        );
    }

    render() {
        const {categories} = this.props;

        return (
            <div>
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
                        <ListItem>
                            <ListItemText primary="Categories"/>
                        </ListItem>
                        <Divider />
                        {this.getDrawerListItem("All", "/")}
                        {
                            categories.map((category) => (
                                this.getDrawerListItem(category.name, PostListPageUtils.getLinkPath(category))
                            ))
                        }
                    </List>
                </Drawer>
            </div>
        );
    }
}

const mapStateToProps = (state: ApplicationState, ownProps: IOwnProps) => {
    return {
        // Add mapped properties here
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
)(ReadableToolbar);