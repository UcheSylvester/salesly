import * as React from 'react';
import {
  SelectProps as MSelectProps,
  Select as MSelect,
  createStyles,
} from '@mantine/core';

const useStyles = createStyles(() => ({
  label: {
    fontWeight: 400,
  },
}));

export interface SelectProps extends MSelectProps {}

export const Select = ({ ...rest }: SelectProps) => {
  const { classes } = useStyles();

  return (
    <MSelect nothingFound={<>Nothing Found</>} classNames={classes} {...rest} />
  );
};
