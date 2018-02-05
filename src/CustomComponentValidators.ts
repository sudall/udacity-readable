import {Component, ReactNode, Validator} from "react";
import * as React from "react";

class CustomComponentValidators {
    static createChildrenTypesValidator(validTypes: { prototype: Component} []): Validator<any> {
        validTypes.forEach((validType) => {
            if (validType == null) {
                throw new Error("One of the valid types provided is null/undefined.");
            }
        });

        return (props: Readonly<{ children?: ReactNode }> & Readonly<any>, propName, componentName): Error | null => {
            let result: Error | null = null;

            React.Children.forEach(props.children, (child) => {
                let childTypeIsValid = validTypes.some((type) => {
                    return child["type"] === type;
                });

                if (!childTypeIsValid) {
                    result = new Error(`Type ${child["type"]} is not a valid child type for type ${componentName}. Valid types are: ${validTypes}`);
                }
            });

            return result;
        };
    }
}

export default CustomComponentValidators;