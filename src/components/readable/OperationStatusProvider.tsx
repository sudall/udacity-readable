import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState, OperationStatus} from "src/components/readable/ReadableApplication";
import OperationUtils from "src/utilities/OperationUtils";
import {ReactNode} from "react";

// props that are provided as parameters
interface IOwnProps {
    operationId: string;
    render?: (operationStatus: OperationStatus) => ReactNode;
    onOperationStatusChange?: (operationStatus: OperationStatus) => void;
}

// TODO was trying to force default implementation of optional props
// type OptionalPropNames<T> = { [P in keyof T]: undefined extends T[P] ? P : never }[keyof T];
// type RequiredPropNames<T> = { [P in keyof T]: undefined extends T[P] ? never : P }[keyof T];
//
// type OptionalProps<T> = { [P in OptionalPropNames<T>]: T[P] };
// type RequiredProps<T> = { [P in RequiredPropNames<T>]: T[P] };
//
// type IOptionalOwnProps = Required<OptionalProps<IOwnProps>>;
// type IRequiredOwnProps = RequiredProps<IOwnProps>;

// props that are provided via injection
interface IInjectedProps {
    // someAction: () => void;
    getOperationStatus: () => OperationStatus;
}

type IAllProps = IOwnProps & IInjectedProps;

// internal state of the component
interface IState {
    operationStatus: OperationStatus;
}

class OperationStatusProvider extends React.Component<IAllProps, IState> {
    readonly state: IState = {
        operationStatus: this.props.getOperationStatus()
    };

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    componentDidMount() {
        OperationStatusProvider.onOperationStatusChange(this.props, this.state.operationStatus)
    }

    componentWillReceiveProps(nextProps: IAllProps) {
        const newOperationStatus = nextProps.getOperationStatus();

        OperationStatusProvider.onOperationStatusChange(nextProps, newOperationStatus);

        this.setState({
            operationStatus: newOperationStatus
        });
    }

    private static onOperationStatusChange(props: IOwnProps, newOperationStatus: OperationStatus) {
        const {onOperationStatusChange} = props;

        if (onOperationStatusChange != null) {
            onOperationStatusChange(newOperationStatus);
        }
    }

    render() {
        const {} = this;
        const {render} = this.props;
        const {operationStatus} = this.state;

        if (render != null) {
            return render(operationStatus);
        } else {
            return null;
        }
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