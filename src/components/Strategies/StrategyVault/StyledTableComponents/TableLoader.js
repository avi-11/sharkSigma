import { Skeleton, TableRow, TableCell } from "@mui/material";

const TableLoader = ({ column }) => {
  return (
    <>
      {[...Array(column)].map((item) => (
        <TableRow key={item}>
          {[...Array(column)].map((item, index) => (
            <TableCell key={index}>
              <Skeleton variant="text" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default TableLoader;
