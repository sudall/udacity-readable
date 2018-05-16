import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "src/components/readable/ReadableApplication";
import ReactSelectClass from "react-select";
import "react-select/dist/react-select.css";
import {Checkbox} from "material-ui";
import CustomOption from "src/components/experiments/CustomOption";

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

class DropDownSelectMultiple extends React.Component<IAllProps, IState> {
    private options: IOption[] = [
        { value: 'all', label: 'All' },
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

    private symmetricDifference<TItem>(array1: TItem[], array2: TItem[]): TItem[] {
        return array1
            .filter(item => !array2.includes(item))
            .concat(array2.filter(item => !array1.includes(item)));
    }

    private onSelectedOptionsChange = (selectedOptions: IOption[]) => {

        // this.setState((previousState) => {
        //
        //     const difference = this.symmetricDifference(previousState.selectedOptions, selectedOptions);
        //     const selectedOption = difference[0];
        //     const wasAdded = selectedOptions.includes(selectedOption);
        //
        //     if (selectedOption.value === "all") {
        //         let selectedOptions = this.options;
        //
        //         if (!wasAdded) {
        //             selectedOptions = []
        //         }
        //
        //         return {
        //             selectedOptions
        //         };
        //     } else {
        //         const newSelectedOptions = [
        //             ...selectedOptions,
        //         ];
        //
        //         if (!wasAdded) {
        //             const allOptionIndex = newSelectedOptions.findIndex(
        //                 selectedOption => selectedOption.value === "all")
        //             if (allOptionIndex !== -1) {
        //                 newSelectedOptions.splice(allOptionIndex, 1);
        //             }
        //         } else {
        //             // if (this.option)
        //         }
        //
        //         // const currentOptionIndex = newSelectedOptions.findIndex(selectedOption => selectedOption.value === selectedOption.value);
        //         // if (currentOptionIndex !== -1) {
        //         //     // remove it
        //         //     newSelectedOptions.splice(currentOptionIndex, 1);
        //         // } else {
        //         //     // add it
        //         //     newSelectedOptions.push(selectedOption as IOption);
        //         // }
        //
        //         return {
        //             selectedOptions: newSelectedOptions
        //         };
        //     }
        // });

        this.setState({
            selectedOptions
        })
    };

    private selectOption = (option: IOption, isSelected: boolean) => {
        if (option.value === "all") {
            let selectedOptions = this.options;

            if (isSelected) {
                selectedOptions = []
            }

            this.setState({
                selectedOptions
            });
        } else {
            this.setState((previousState) => {
                const newSelectedOptions = [
                    ...previousState.selectedOptions,
                ];

                const allOptionIndex = newSelectedOptions.findIndex(selectedOption => selectedOption.value === "all")
                if (allOptionIndex !== -1) {
                    newSelectedOptions.splice(allOptionIndex, 1);
                }

                const currentOptionIndex = newSelectedOptions.findIndex(selectedOption => selectedOption.value === option.value);
                if (currentOptionIndex !== -1) {
                    // remove it
                    newSelectedOptions.splice(currentOptionIndex, 1);
                } else {
                    // add it
                    newSelectedOptions.push(option as IOption);
                }

                return {
                    selectedOptions: newSelectedOptions
                };
            });

            // onSelect!(option, event);
        }
    };

    private focusOption = (option: IOption) => {

    };

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
                    // inputRenderer={(props) => {
                    //     let selectedOptionsString = "";
                    //     selectedOptions.forEach((selectedOption) => {
                    //         selectedOptionsString += `${selectedOption.label},`
                    //     });
                    //
                    //     return <>{selectedOptionsString}</>
                    //     // return <input {...props} value={selectedOptionsString}/>
                    // }}
                    multi
                    tabSelectsValue={false}
                    onSelectResetsInput={true}
                    valueRenderer={(option) => {
                        if (option.value === "all") {
                            return null;
                        }

                        let separator = ", ";
                        if (this.state.selectedOptions.indexOf(option as IOption) === this.state.selectedOptions.length - 1) {
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
                    // optionComponent={CustomOption}
                    onInputKeyDown={(event) => {
                        if (event.key === "Enter") {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    }}

                    optionComponent={({option, isSelected, onSelect, onFocus, isFocused, }) => {
                        return <>
                            <div
                                style={isFocused ? {backgroundColor: "lightblue"} : {}}
                                onMouseDown={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();

                                    this.selectOption(option as IOption, isSelected!);
                                    // if (option.value === "all") {
                                    //     let selectedOptions = this.options;
                                    //
                                    //     if (isSelected) {
                                    //         selectedOptions = []
                                    //     }
                                    //
                                    //     this.setState({
                                    //         selectedOptions
                                    //     });
                                    // } else {
                                    //     this.setState((previousState) => {
                                    //         const newSelectedOptions = [
                                    //             ...previousState.selectedOptions,
                                    //         ];
                                    //
                                    //         const allOptionIndex = newSelectedOptions.findIndex(selectedOption => selectedOption.value === "all")
                                    //         if (allOptionIndex !== -1) {
                                    //             newSelectedOptions.splice(allOptionIndex, 1);
                                    //         }
                                    //
                                    //         const currentOptionIndex = newSelectedOptions.findIndex(selectedOption => selectedOption.value === option.value);
                                    //         if (currentOptionIndex !== -1) {
                                    //             // remove it
                                    //             newSelectedOptions.splice(currentOptionIndex, 1);
                                    //         } else {
                                    //             // add it
                                    //             newSelectedOptions.push(option as IOption);
                                    //         }
                                    //
                                    //         return {
                                    //             selectedOptions: newSelectedOptions
                                    //         };
                                    //     });
                                    //
                                    //     // onSelect!(option, event);
                                    // }
                                }}
                                onMouseEnter={(event) => {
                                    onFocus!(option, event);
                                }}
                                onMouseMove={(event) => {
                                    if (isFocused) return;
                                    onFocus!(option, event);
                                }}
                            >
                                <Checkbox checked={isSelected}/>
                                {option.label}
                            </div>
                        </>
                    }}
                    scrollMenuIntoView={false}
                    removeSelected={false}
                    // valueComponent={CustomOptionValue}
                    valueComponent={(configuration) => {
                        return <>{configuration.children}</>;
                    }}
                />
            </>
        );
    }

    // render() {
    //     const {options, onSelectedOptionsChange} = this;
    //     const {} = this.props;
    //     const {selectedOptions} = this.state;
    //
    //     return (
    //         <>
    //             <ReactSelectClass
    //                 value={selectedOptions}
    //                 onChange={onSelectedOptionsChange}
    //                 searchable={false}
    //                 options={options}
    //                 closeOnSelect={false}
    //                 inputRenderer={(props) => {
    //                     let selectedOptionsString = "";
    //                     selectedOptions.forEach((selectedOption) => {
    //                         selectedOptionsString += `${selectedOption.label},`
    //                     });
    //
    //                     return <input {...props} value={selectedOptionsString}/>
    //                 }}
    //                 multi
    //                 valueRenderer={(option) => {
    //                     return <div>{option.label}</div>;
    //                 }}
    //                 optionRenderer={(option) => {
    //                     const checked = selectedOptions.some((selectedOption) => {
    //                         return selectedOption.value === option.value;
    //                     });
    //                     return <>
    //                         <Checkbox checked={checked}/>
    //                         {option.label}
    //                     </>
    //                 }}
    //                 removeSelected={false}
    //             />
    //         </>
    //     );
    // }
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