import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import ReactSelectClass, {MenuRendererProps} from "react-select";
import "react-select/dist/react-select.css";
import {Checkbox} from "material-ui";
import defaultMenuRenderer from "react-select/lib/utils/defaultMenuRenderer";

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
    selectedOptions: IOption[];
    focusedOption: IOption;
}

interface IOption {
    value: string;
    label: string;
}

// This is a hack to prevent react-select from focusing the next/previous option when removeSelected is false
// I've submitted an issue here: https://github.com/JedWatson/react-select/issues/2621
ReactSelectClass.prototype["addValue"] = function addValue(value: any) {
    var valueArray = (this as any).getValueArray(this.props.value);
    var visibleOptions = (this as any)._visibleOptions.filter(function (val: any) {
        return !val.disabled;
    });
    var lastValueIndex = visibleOptions.indexOf(value);
    this.setValue(valueArray.concat(value));
    if ((this as any).props.removeSelected === true) {
        if (visibleOptions.length - 1 === lastValueIndex) {
            // the last option was selected; focus the second-last one
            (this as any).focusOption(visibleOptions[lastValueIndex - 1]);
        } else if (visibleOptions.length > lastValueIndex) {
            // focus the option below the selected one
            (this as any).focusOption(visibleOptions[lastValueIndex + 1]);
        }
    }
};

class DropDownSelectMultiple extends React.Component<IAllProps, IState> {
    private static readonly AllOption: IOption = { value: 'all', label: 'All' };

    private options: IOption[] = [
        DropDownSelectMultiple.AllOption,
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
        { value: 'four', label: 'Four' },
    ];

    readonly state: IState = {
        selectedOptions: this.options,
        focusedOption: this.options[0]
    };

    static propTypes = {
        // children: CustomComponentValidators.createChildrenTypesValidator([])
    };

    // find items that are in array1 but not array2 and also items that are in array2 but not in array1
    private symmetricDifference<TItem>(array1: TItem[], array2: TItem[]): TItem[] {
        const itemsInArray1ButNotArray2 = array1.filter(item => !array2.includes(item));
        const itemsInArray2ButNotArray1 = array2.filter(item => !array1.includes(item));
        return itemsInArray1ButNotArray2.concat(itemsInArray2ButNotArray1);
    }

    private onSelectedOptionsChange = (selectedOptions: IOption[]) => {
        this.setState((previousState) => {
            const difference = this.symmetricDifference(previousState.selectedOptions, selectedOptions);
            const selectedOption = difference[0];

            const nextSelectedOptions = this.getNextSelectedOptions(selectedOption, previousState.selectedOptions);
            return {
                selectedOptions: nextSelectedOptions
            }
        });
    };

    private getNextSelectedOptions(newSelectedOption: IOption, previousSelectedOptions: IOption[]) {
        let selectedOptions = [
            ...previousSelectedOptions,
        ];

        let optionAdded = true;
        if (selectedOptions.includes(newSelectedOption)) {
            optionAdded = false;
        }

        if (optionAdded) {
            // add it
            selectedOptions.push(newSelectedOption);
        } else {
            // remove it
            selectedOptions.splice(selectedOptions.indexOf(newSelectedOption), 1);
        }

        // if the "all" option was selected...
        if (newSelectedOption.value === DropDownSelectMultiple.AllOption.value) {
            if (optionAdded) {
                selectedOptions = this.options;
            } else {
                selectedOptions = [];
            }
        } else {
            if (!optionAdded) {
                // remove the "all" option
                const indexOfAllOption = selectedOptions.findIndex(selectedOption => selectedOption.value === DropDownSelectMultiple.AllOption.value);
                if (indexOfAllOption !== -1) {
                    selectedOptions.splice(indexOfAllOption, 1);
                }
            }
        }

        // if all of the options except the "all" option are selected...
        const selectedOptionsContainsAllOptions =
            // find the first item in the options list that is not in the selected options list
            !this.options.some(option => {
                // check that selectedOptions contains this option
                return !selectedOptions.some(selectedOption => {
                    return selectedOption.value === option.value
                        || option.value === DropDownSelectMultiple.AllOption.value
                        || selectedOption.value === DropDownSelectMultiple.AllOption.value;
                });
            });

        const selectedOptionsContainsAllOption = selectedOptions.some(option => option.value === DropDownSelectMultiple.AllOption.value);

        if (selectedOptionsContainsAllOptions && !selectedOptionsContainsAllOption) {
            selectedOptions.push(DropDownSelectMultiple.AllOption);
        }

        return selectedOptions;
    }

    render() {
        const {options, onSelectedOptionsChange} = this;
        const {} = this.props;
        const {selectedOptions} = this.state;

        return (
            <>
                <ReactSelectClass
                    value={selectedOptions}
                    onChange={onSelectedOptionsChange}
                    searchable={false}
                    options={options}
                    closeOnSelect={false}
                    multi
                    tabSelectsValue={false}
                    valueRenderer={(option) => {
                        if (option.value === DropDownSelectMultiple.AllOption.value) {
                            return null;
                        }

                        let separator = ", ";
                        const selectedOptions = this.state.selectedOptions.filter(option => option.value !== DropDownSelectMultiple.AllOption.value);
                        if (selectedOptions.indexOf(option as IOption) === selectedOptions.length - 1) {
                            separator = "";
                        }

                        return <>{`${option.label}${separator}`}</>;
                    }}
                    optionRenderer={(option) => {
                        const checked = selectedOptions.some((selectedOption) => {
                            return selectedOption.value === option.value;
                        });
                        return <>
                            <Checkbox checked={checked}/>
                            {option.label}
                        </>
                    }}
                    menuRenderer={(props: MenuRendererProps) => {
                        return <>{defaultMenuRenderer(props)}</>;
                    }}
                    removeSelected={false}
                    valueComponent={(configuration) => {
                        return <>{configuration.children}</>;
                    }}
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
)(DropDownSelectMultiple);