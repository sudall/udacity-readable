import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import Typography from "material-ui/Typography";

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

class PageNotFoundPage extends React.Component<IAllProps, State> {
    readonly state = new State();

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    render() {
        const {} = this.props;

        return (
            <Typography>
                Page not found.
            </Typography>
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
)(PageNotFoundPage);