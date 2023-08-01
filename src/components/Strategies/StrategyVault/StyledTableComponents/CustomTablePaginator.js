import { Button } from "@mui/material";

const CustomTablePaginator = ({ currentPage, totalPages, changePage }) => {
  const goToFirstPage = () => changePage(0);
  const prevPage = () => changePage((currentPage) => currentPage - 1);
  const nextPage = () => changePage((currentPage) => currentPage + 1);
  const goToLastPage = () => changePage(totalPages - 1);

  const btnStyle = {
    backgroundColor: "#292C3D",
    textTransform: "none",
    width: "max-content",
    padding: "3px",
    ":disabled": {
      backgroundColor: "#292C3D",
      color: "#c7c8cc",
    },
    ":hover": {
      backgroundColor: "#7962fa",
    },
  };

  const pageStyle = {
    ...btnStyle,
    backgroundColor: "#7962FA",
    ":hover": {
      backgroundColor: "#7962fa",
    },
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}
    >
      <div style={{ display: "flex", gap: "5px" }}>
        <Button
          variant="contained"
          onClick={goToFirstPage}
          sx={btnStyle}
          disabled={currentPage === 1}
        >
          First
        </Button>

        <Button
          variant="contained"
          onClick={prevPage}
          sx={btnStyle}
          disabled={currentPage === 1}
        >
          {"<"}
        </Button>

        <Button variant="contained" sx={pageStyle}>
          {currentPage}
        </Button>

        <Button
          variant="contained"
          onClick={nextPage}
          sx={btnStyle}
          disabled={currentPage === totalPages}
        >
          {">"}
        </Button>

        <Button
          variant="contained"
          onClick={goToLastPage}
          sx={btnStyle}
          disabled={currentPage === totalPages}
        >
          Last
        </Button>
      </div>
    </div>
  );
};

export default CustomTablePaginator;
