import { useState } from "react";
import { useTable, usePagination } from "react-table";

import "./Table.css";

const CustomStrategyTable = (props) => {
  const pageNumbers = [];

  const [pageNumber, setPageNumber] = useState(1);
  const [postsPerPage] = useState(
    10 < props.data.length ? 10 : props.data.length
  );
  const [pageNumberLimit, setpageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const columns = props.columns;
  const data = props.data;
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state,
    gotoPage,
    pageCount,
  } = tableInstance;
  const { pageIndex } = state;

  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }
  const indexOfLastPost =
    data.length > postsPerPage ? (pageIndex + 1) * postsPerPage : data.length;
  const indexOfFirstPost =
    data.length < postsPerPage ? 0 : indexOfLastPost - postsPerPage;

  const renderPageNumbers = pageNumbers.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <button
          className="page-link"
          onClick={() => {
            setPageNumber(number);
            gotoPage(number - 1);
          }}
          style={{
            backgroundColor: number - 1 === pageIndex ? "#5A697D" : "#131419",
            color:
              number - 1 === pageIndex ? "#FFFFFF" : "rgba(187, 175, 175, 1)",
          }}
        >
          {number}
        </button>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setPageNumber(pageNumber + 1);
    if (pageNumber + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setPageNumber(pageNumber - 1);
    if ((pageNumber - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pageNumbers.length > maxPageNumberLimit) {
    pageIncrementBtn = <button onClick={handleNextbtn}> &hellip; </button>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <button onClick={handlePrevbtn}> &hellip; </button>;
  }

  const changeLength = (length, page) => {
    for (let i = length + 1; i <= postsPerPage; i++) {
      page.push("");
    }
  };

  return (
    <>
      <table {...getTableProps()} className="createScanner_pagination_table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {data.length === 0 ? (
            <div style={{ width: "200%" }}>
              {/* Show Empty Table Loader Here */}
            </div>
          ) : (
            ""
          )}
          {page.length < 10 && data.length !== 0
            ? changeLength(page.length, page)
            : ""}
          {page.map((row) => {
            // console.log(row)
            if (row === "") return <tr></tr>;
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  return (
                    <td key={index} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                      {/* {console.log(cell)} */}
                    </td>
                  );
                })}
                {props.editNdelete(row)}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        className="pagination_content"
        style={{ display: data.length === 0 ? "none" : "block" }}
      >
        <div className="pageNumber">
          <span>
            Showing
            <strong>{indexOfFirstPost + 1}</strong> to
            <strong>
              {" "}
              {indexOfLastPost <= data.length
                ? indexOfLastPost
                : data.length}{" "}
            </strong>
            of {""}
            {data.length}{" "}
          </span>
        </div>
        <div className="pagination_buttons" style={{ marginTop: "10px" }}>
          <button
            onClick={() => {
              gotoPage(0);
              if (pageNumberLimit < data.length)
                setmaxPageNumberLimit(pageNumberLimit);
              setminPageNumberLimit(0);
            }}
            disabled={!canPreviousPage}
          >
            First
          </button>
          <button
            onClick={() => {
              previousPage();
              handlePrevbtn();
            }}
            disabled={!canPreviousPage}
          >
            Previous
          </button>
          {pageDecrementBtn}
          {renderPageNumbers}
          {pageIncrementBtn}
          <button
            onClick={() => {
              nextPage();
              handleNextbtn();
            }}
            disabled={!canNextPage}
          >
            Next
          </button>
          <button
            onClick={() => {
              gotoPage(pageCount - 1);
              setmaxPageNumberLimit(pageNumbers.length);
              setminPageNumberLimit(pageNumbers.length - pageNumberLimit);
            }}
            disabled={!canNextPage}
          >
            Last
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomStrategyTable;
