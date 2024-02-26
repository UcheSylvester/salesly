import { FormikErrors, FormikTouched, FormikValues, getIn } from 'formik';

export const getFieldError = (
  fieldName: string,
  errors: FormikErrors<FormikValues>,
  touched: FormikTouched<FormikValues>,
  errorWithoutTouched?: boolean
): string | null => {
  const fieldError = getIn(errors, fieldName);
  const showError = getIn(touched, fieldName) && Boolean(fieldError);

  return showError || errorWithoutTouched ? fieldError : null;
};
