import React from 'react';
import { FieldProps } from 'formik';
import { Field, FieldBaseProps } from './FieldBase';
import { NumberInput, NumberInputProps } from '../NumberInput';
import { getFieldError } from './_utils';

export interface NumberInputFieldProps
  extends Omit<FieldBaseProps, 'children' | 'component' | 'as' | 'type'>,
    Omit<NumberInputProps, 'value' | 'type' | 'name'> {}

interface FieldToNumberInputProps
  extends Omit<FieldProps, 'type'>,
    Omit<NumberInputProps, 'form'> {}

function fieldToNumberInput({
  field: { onBlur: onFieldBlur, ...field },
  form: { touched, errors, ...form },
  onBlur,
  ...props
}: FieldToNumberInputProps): NumberInputProps {
  return {
    onBlur:
      onBlur ??
      function handleBlur(e) {
        onFieldBlur(e ?? field.name);
      },
    value: !isNaN(field.value) ? Number(field.value) : '',
    onChange: (value: number) => {
      form.setFieldValue(field.name, value);
    },
    error: getFieldError(field.name, errors, touched),
    ...props,
  };
}

function FieldToNumberTextInput({
  ...props
}: FieldToNumberInputProps): JSX.Element {
  return <NumberInput {...fieldToNumberInput(props)} />;
}

export function NumberInputField({
  ...props
}: NumberInputFieldProps): JSX.Element {
  return <Field {...props} component={FieldToNumberTextInput} />;
}
