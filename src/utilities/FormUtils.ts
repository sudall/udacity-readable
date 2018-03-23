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

    static isAnyRequiredFormFieldMissing<TFormData>(formData: TFormData, requiredFormFields: (keyof TFormData)[]) {
        const isAnyRequiredFieldMissing = requiredFormFields.some((requiredField) => {
            const fieldValue = formData[requiredField];

            let isMissing = fieldValue == null;

            if (typeof fieldValue === "string") {
                isMissing = isMissing || fieldValue === "";
            }

            return isMissing;
        });

        return isAnyRequiredFieldMissing;
    }
}

export default FormUtils;