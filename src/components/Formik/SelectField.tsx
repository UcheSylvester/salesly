import React from 'react';
import { FieldProps } from 'formik';
import { Field, FieldBaseProps } from './FieldBase';
import { Select, SelectProps } from '../Select';
import { getFieldError } from './_utils';

interface SelectFieldProps
  extends Omit<FieldBaseProps, 'children' | 'type'>,
    Omit<SelectProps, 'value' | 'name'> {}

export interface FieldToSelectProps
  extends Omit<SelectProps, 'form'>,
    FieldProps {}

function fieldToSelect({
  field: { onBlur: onFieldBlur, ...field },
  form: { touched, errors, ...form },
  meta,
  ...props
}: FieldToSelectProps): SelectFieldProps {
  return {
    ...field,
    onChange: (value: string) => {
      form.setFieldValue(field.name, value);
    },
    ...props,
    error: getFieldError(field.name, errors, touched),
  };
}

function FieldToSelect({ ...props }: FieldToSelectProps) {
  return <Select {...fieldToSelect(props)} />;
}

export function SelectField({ name, ...props }: SelectFieldProps): JSX.Element {
  // @ts-expect-error Should be fixed.
  return <Field name={name} {...props} component={FieldToSelect} />;
}
