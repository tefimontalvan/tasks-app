import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#47b39a" },
    secondary: { main: "#eb6a55" },
  },
  overrides: {
    MuiButton: {
      contained: {
        backgroundColor: "#482543",
        "&:hover": {
          backgroundColor: "#361e37",
        },
      },
    },

    MuiFormLabel: {
      root: {
        "&$focused": {
          color: "#b0606d",
        },
        color: "#b0606d",
      },
    },
  },
});

export default theme;
