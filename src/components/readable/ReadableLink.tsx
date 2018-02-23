import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import {bindActionCreators} from "redux";
import {Link, LinkProps} from "react-router-dom";

// props that are provided as parameters
interface IOwnProps {

}

// props that are provided via injection
interface IInjectedProps {
    // someAction: () => any;
}

type IAllProps = IOwnProps & IInjectedProps & LinkProps;

// internal state of the component
class State {

}

class ReadableLink extends React.Component<IAllProps, State> {
    readonly state: State = {};

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    render() {
        const {} = this.props;
        const {} = this.state;

        const decodedPathname = decodeURI(window.location.pathname);
        const linkPointsToCurrentLocation = decodedPathname === this.props.to;

        return (<Link replace={linkPointsToCurrentLocation} {...this.props}/>);
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
)(ReadableLink);