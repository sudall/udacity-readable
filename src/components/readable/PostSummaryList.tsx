import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import PostData from "src/data/models/PostData";
import {bindActionCreators} from "redux";
import PostActions from "src/redux-actions/PostActions";
import PostSummary from "src/components/readable/PostSummary";
import Grid from "material-ui/Grid";
import ReadableApplication from "src/components/readable/ReadableApplication";
import CustomComponentValidators from "src/CustomComponentValidators";
import Book from "src/components/myReads/Book";

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

class PostSummaryList extends React.Component<IAllProps, State> {
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
)(PostSummaryList);