'use client';
import { createTheme } from '@mui/material/styles';

/**
 * Custom Material UI theme configuration.
 *
 * This theme overrides the default typography to use the Roboto font
 * defined via a CSS variable (`--font-roboto`). It ensures consistent
 * font styling across the application by injecting this theme into
 * the MUI ThemeProvider.
 *
 * You can extend this theme further with custom colors, breakpoints, spacing, etc.
 *
 * @see https://mui.com/material-ui/customization/theming/
 */
const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
});

export default theme;
