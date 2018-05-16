import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import ReactSelectClass from "react-select";
import "react-select/dist/react-select.css";

// props that are provided as parameters
interface IOwnProps {

}

// props that are provided via injection
interface IInjectedProps {
    // someAction: () => void;
}

type IAllProps = IOwnProps & IInjectedProps;

// internal state of the component
interface IState {
    selectedOption: IOption;
}

interface IOption {
    value: string;
    label: string;
}

class DropDownSelect extends React.Component<IAllProps, IState> {
    private options: IOption[] = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
        { value: 'four', label: 'Four' },
    ];

    readonly state: IState = {
        selectedOption: this.options[0]
    };

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    private onSelectedOptionChange = (selectedOption: IOption) => {
        this.setState({
            selectedOption
        })
    };

    render() {
        const {options, onSelectedOptionChange} = this;
        const {} = this.props;
        const {selectedOption} = this.state;

        return (
            <>
                <ReactSelectClass
                    value={selectedOption}
                    onChange={onSelectedOptionChange}
                    searchable={false}
                    options={options}
                    clearable={false}
                    />
            </>
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
        // someAction: SomeActionSet.instance.someAction.bindToDispatch(dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DropDownSelect);