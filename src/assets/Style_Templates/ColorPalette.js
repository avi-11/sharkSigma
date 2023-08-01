import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    alertError: {
      main: "#fa7070",
      light: "#fa7070",
      dark: "#fa7070",
      contrastText: "fff",
      text: "#fff",
      color: "#fff",
    },
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        outlinedError: {
          color: "#fa7070",
        },
      },
    },
  },
});
