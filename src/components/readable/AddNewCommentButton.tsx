import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import {bindActionCreators} from "redux";

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

class AddNewCommentButton extends React.Component<IAllProps, State> {
    readonly state = new State();

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    render() {
        const {} = this.props;
        const {} = this.state;

        return (
            <div></div>
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
)(AddNewCommentButton);