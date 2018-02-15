import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import {PostPageUtils} from "src/components/readable/PostPage";
import PostPage from "src/components/readable/PostPage";
import PostListPage, {PostListPageUtils} from "src/components/readable/PostListPage";
import PageNotFoundPage from "src/components/readable/PageNotFoundPage";
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import ReadablePageContainer from "src/components/readable/ReadablePageContainer";

// props that are provided as parameters
interface IOwnProps {

}

// props that are provided via injection
interface IInjectedProps {
    // someAction: () => any;
}

type IAllProps = IOwnProps & IInjectedProps;

// internal state of the component
class State {

}

class ReadableApplicationRouter extends React.Component<IAllProps, State> {
    readonly state = new State();

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    private getRouteRender(component: React.ComponentType) {
        return (props: any) => {
            component.defaultProps = props;
            return (
                <ReadablePageContainer>
                    {React.createElement(component)}
                </ReadablePageContainer>
            )
        };
    }

    render() {
        const {} = this.props;

        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact render={this.getRouteRender(PostListPage)} />
                    <Route path={PostListPageUtils.getRoutePath()} exact render={this.getRouteRender(PostListPage)} />
                    <Route path={PostPageUtils.getRoutePath()} exact render={this.getRouteRender(PostPage)} />
                    <Route render={this.getRouteRender(PageNotFoundPage)} />
                </Switch>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state: ApplicationState, ownProps: IOwnProps) => {
    return {
        // Add mapped properties here
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
)(ReadableApplicationRouter);