import * as React from "react";

class FormUtils {
    static getOnTextFieldChangeCallback<TFormData, TFormDataKey extends keyof TFormData>(formDataObject: TFormData,
        formDataPropertyName: TFormDataKey,
        onFormDataChange: (newFormData: TFormData) => void) {

        return (event: React.ChangeEvent<HTMLInputElement>) => {
            let newObject = <TFormData>{};

            Object.assign(newObject, formDataObject, {
                [formDataPropertyName]: event.target.value
            });

            onFormDataChange(newObject);
        };
    };
}

export default FormUtils;