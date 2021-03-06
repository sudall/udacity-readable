import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import Grid from "material-ui/Grid";

// props that are provided as parameters
interface IOwnProps {

}

// props that are provided via injection
interface IInjectedProps {
}

type IAllProps = IOwnProps & IInjectedProps;

// internal state of the component
class State {

}

class PostAndCommentList extends React.Component<IAllProps, State> {
    readonly state = new State();

    // static propTypes = {
    //     children: CustomComponentValidators.createChildrenTypesValidator([Post, Comment])
    // };

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
                    this.mapChildrenToGridItems()
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
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostAndCommentList);