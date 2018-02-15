import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import PostSummary from "src/components/readable/Post";
import Grid from "material-ui/Grid";
import CustomComponentValidators from "src/CustomComponentValidators";

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

class PostList extends React.Component<IAllProps, State> {
    readonly state = new State();

    static propTypes = {
        children: CustomComponentValidators.createChildrenTypesValidator([PostSummary])
    };

    mapChildrenToGridItems() {
        return React.Children.map(this.props.children, (child) => {
            return (
                <Grid item>
                    {child}
                </Grid>
            );
        });
    }

    render() {
        const {} = this.props;

        return (
            <Grid container
                  direction="column"
                  justify="flex-start"
                  alignItems="stretch">
                {
                    Array.of(1,2,3,4,5,6).map(() => {
                        return this.mapChildrenToGridItems();
                    })
                }
            </Grid>
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
)(PostList);