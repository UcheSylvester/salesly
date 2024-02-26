import {
  createStyles,
  NumberInput as MNumberInput,
  NumberInputProps as MNumberInputProps,
} from '@mantine/core';

const useStyles = createStyles(() => ({
  label: {
    fontWeight: 400,
  },
}));

export interface NumberInputProps extends MNumberInputProps {}

export function NumberInput({ ...rest }: NumberInputProps) {
  const { classes } = useStyles();

  return <MNumberInput classNames={classes} {...rest} />;
}
