import {
  createStyles,
  TextInput as MTextInput,
  TextInputProps as MTextInputProps,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  label: {
    fontWeight: 400,
  },
  error: {
    fontSize: theme.fontSizes.sm,
  },
  description: {
    fontSize: theme.fontSizes.sm,
  },
}));

export interface TextInputProps extends MTextInputProps {}

export function TextInput({ ...rest }: TextInputProps) {
  const { classes } = useStyles();

  return <MTextInput classNames={classes} {...rest} />;
}
