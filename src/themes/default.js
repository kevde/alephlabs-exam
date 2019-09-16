import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
  '@overrides': {
    body: {
      padding: '5px',
    },
  },
  typography: {
    fontFamily: [
      'Arial'
    ],
  },
  MuiTextField: {
    root: {
      backgoundColor: 'white',
    },
  },
});