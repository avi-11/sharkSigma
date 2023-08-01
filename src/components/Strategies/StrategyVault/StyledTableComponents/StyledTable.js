import {
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
  styled,
} from "@mui/material";

export const StyledTableHeader = styled(TableHead)((props) => ({
  backgroundColor: props.bgColor,
  "& th": {
    fontWeight: props.fontWeight,
    borderColor: props.borderColor,
  },
}));

export const StyledTable = styled(Table)((props) => ({
  width: props.width,
  "& th": {
    color: props.textColor,
    fontSize: props.fontSize,
    padding: props.padding,
  },
  "& td": {
    color: props.textColor,
    fontSize: props.fontSize,
    padding: props.padding,
  },
}));

export const StyledTableRow = styled(TableRow)((props) => ({
  backgroundColor: props.background,
  "& td": {},
  ":hover": {
    backgroundColor: "#232334",
    cursor: "pointer",
  },
}));

export const StyledTableCell = styled(TableCell)((props) => ({}));

export const StyledTableBody = styled(TableBody)((props) => ({
  backgroundColor: props.background,
  "& td": {
    borderColor: props.borderColor,
  },
}));

export const StyledTableContainer = styled(TableContainer)((props) => ({
  filter: props.filter,
  backgroundColor: props.background,
  boxShadow: props.boxShadow,
  padding: props.padding,
  width: props.width,
}));
