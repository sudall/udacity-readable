import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import ReadableToolbar from "src/components/readable/ReadableToolbar";

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

class ReadablePageContainer extends React.Component<IAllProps, State> {
    readonly state = new State();

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    render() {
        const {children} = this.props;

        return (
            <div>
                <ReadableToolbar />

                <div style={{margin: "16px"}}>
                    {children}
                </div>
            </div>
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
)(ReadablePageContainer);