import React from "react";
import { FieldProps } from "formik";
import { Field, FieldBaseProps } from "./FieldBase";
import { TextInput, TextInputProps } from "../TextInput";
import { getFieldError } from "./_utils";

interface TextInputFieldProps
  extends Omit<FieldBaseProps, "children" | "component" | "as" | "type">,
    Omit<TextInputProps, "value" | "type" | "name"> {
  errorWithoutTouched?: boolean;
}

export interface FieldToTextInputProps
  extends Omit<FieldProps, "type">,
    Omit<TextInputProps, "form"> {
  errorWithoutTouched?: boolean;
}

function fieldToTextInput({
  field: { onBlur: onFieldBlur, ...field },
  form: { touched, errors },
  onBlur,
  errorWithoutTouched,
  ...props
}: FieldToTextInputProps): TextInputProps {
  return {
    onBlur:
      onBlur ??
      function handleBlur(e) {
        onFieldBlur(e ?? field.name);
      },
    ...field,
    ...props,
    error: getFieldError(field.name, errors, touched, errorWithoutTouched),
  };
}

function FieldToTextTextInput({
  ...props
}: FieldToTextInputProps): JSX.Element {
  return <TextInput {...fieldToTextInput(props)} />;
}

export function TextInputField({ ...props }: TextInputFieldProps): JSX.Element {
  return <Field {...props} component={FieldToTextTextInput} />;
}
