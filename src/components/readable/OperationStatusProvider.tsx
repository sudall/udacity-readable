import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState, OperationStatus} from "src/components/readable/ReadableApplication";
import {bindActionCreators} from "redux";
import OperationUtils from "src/utilities/OperationUtils";

// props that are provided as parameters
interface IOwnProps {
    operationId: string;
    onOperationStatusChange: (operationStatus: OperationStatus) => void;
}

// props that are provided via injection
interface IInjectedProps {
    // someAction: () => void;
    getOperationStatus: () => OperationStatus;
}

type IAllProps = IOwnProps & IInjectedProps;

// internal state of the component
class State {

}

class OperationStatusProvider extends React.Component<IAllProps, State> {
    readonly state: State = {};

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    componentDidMount() {
        const operationStatus = this.props.getOperationStatus();
        this.props.onOperationStatusChange(operationStatus);
    }

    componentWillReceiveProps(nextProps: IAllProps) {
        const newOperationStatus = nextProps.getOperationStatus();
        nextProps.onOperationStatusChange(newOperationStatus);
    }

    render() {
        const {} = this;
        const {} = this.props;
        const {} = this.state;

        return null;
    }
}

const mapStateToProps = (state: ApplicationState, ownProps: IOwnProps) => {
    const getOperationStatus = () => {
        return OperationUtils.getOperationStatus(ownProps.operationId, state.operationState);
    };

    return {
        // Add mapped properties here
        getOperationStatus
    }
};

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>, ownProps: IOwnProps) => {
    return {
        // Add mapped properties here
        // someAction: SomeActionSet.instance.someAction.bindToDispatch(dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OperationStatusProvider);