import { CSSObject, MantineThemeOverride } from '@mantine/core';

const fontFamily =
  'Open Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji';

export const themeOverride: MantineThemeOverride = {
  defaultRadius: 0,
  primaryColor: 'black',
  fontFamily,
  headings: {
    fontFamily,
  },
  colors: {
    black: [
      '#d5d7e0',
      '#acaebf',
      '#8c8fa3',
      '#666980',
      '#4d4f66',
      '#34354a',
      '#2b2c3d',
      '#1d1e30',
      '#0c0d21',
      '#01010a',
    ],
  },
  primaryShade: 9,
  other: {
    letterSpacing: {
      sm: 0.5,
      md: 1,
      lg: 2,
    },
  },
};

export const globalStyles: CSSObject = {
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },
  body: {
    margin: 0,
    padding: 0,
  },
};
