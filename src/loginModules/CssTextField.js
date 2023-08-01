import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

export const CssTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        transition: "all 0.2s ease-in-out",
      },
      "&:hover fieldset": {
        borderColor: "#7962fa",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#7962fa",
      },
    },
  },
})(TextField);
