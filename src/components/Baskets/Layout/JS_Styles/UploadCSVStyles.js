import { lightenDarkenColor } from "react-papaparse";

const GREY = "#CCC";
const DEFAULT_REMOVE_HOVER_COLOR = "#A01919";
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
);
const GREY_DIM = "#686868";

const styles = {
  zone: {
    alignItems: "center",
    border: `2px dashed ${GREY}`,
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    padding: 20,
  },
  file: {
    background: "transparent",
    border: "1px solid #A8A8A8",
    display: "flex",
    height: 100,
    width: "90%",
    position: "relative",
    zIndex: 10,
    flexDirection: "column",
    justifyContent: "center",
  },
  info: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    width: 100,
    paddingLeft: 10,
    paddingRight: 10,
  },
  size: {
    borderRadius: 3,
    margin: "0rem 0.75em",
    justifyContent: "center",
    display: "flex",
  },
  name: {
    borderRadius: 3,
    fontSize: 14,
    marginBottom: "0.5em",
    marginRight: "1rem",
  },
  progressBar: {
    bottom: 14,
    position: "absolute",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  zoneHover: {
    borderColor: GREY_DIM,
  },
  default: {
    borderColor: GREY,
  },
  remove: {
    position: "absolute",
    right: 5,
  },
};

export { styles, REMOVE_HOVER_COLOR_LIGHT, DEFAULT_REMOVE_HOVER_COLOR };
