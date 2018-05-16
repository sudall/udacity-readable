import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import {bindActionCreators} from "redux";
import {Checkbox} from "material-ui";
import {OptionComponentProps} from "react-select";
import {MouseEvent} from "react";

// props that are provided as parameters
interface IOwnProps {
    // className: string;
    // isDisabled: boolean;
    // isFocused: boolean;
    // isSelected
}

// props that are provided via injection
interface IInjectedProps {
    // someAction: () => void;
}

type IAllProps = IOwnProps & IInjectedProps & OptionComponentProps;

// internal state of the component
interface IState {

}

class CustomOption extends React.Component<IAllProps, IState> {
    readonly state: IState = {};

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    private onMouseDown = (event: MouseEvent<any>) => {
        event.preventDefault();
        event.stopPropagation();
        this.props.onSelect!(this.props.option, event);
    };

    render() {
        const {} = this;
        const {isSelected, option} = this.props;
        const {} = this.state;

        return <>
            <div onMouseDown={this.onMouseDown}>
                <Checkbox checked={isSelected}/>
                {option.label}
            </div>
        </>;
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
        // someAction: SomeActionSet.instance.someAction.bindToDispatch(dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomOption);