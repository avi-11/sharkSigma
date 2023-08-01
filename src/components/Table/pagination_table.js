import React, { useState } from "react";
import { useTable, usePagination } from "react-table";
import EmptyTable from "../EmptyTable/EmptyTable";

import "./pagination_table.css";

const PaginationTable = (props) => {
  const pageNumbers = [];

  const [pageNumber, setPageNumber] = useState(1);
  const [postsPerPage] = useState(1);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const pageNumberLimit = 3;

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
    pageOptions,
    state,
    gotoPage,
    pageCount,
  } = tableInstance;
  const { pageIndex } = state;

  // if(props.newData!=null)
  // {
  //   prepareRow(props.newData);
  //   console.log(props.newData);
  // }

  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }
  const indexOfLastPost = (pageIndex + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

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
    // setcurrentPage(currentPage + 1);
    setPageNumber(pageNumber + 1);
    if (pageNumber + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    // setcurrentPage(currentPage - 1);
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
  return (
    <>
      <table {...getTableProps()} className="pagination_table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} style={{ width: "14.28%" }}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {data.length === 0 ? (
            <div style={{ width: "230%" }}>
              <EmptyTable text={"Nothing here..add an Instrument"} />
            </div>
          ) : (
            ""
          )}
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
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
            Showing {/* {pageIndex+1} of {pageOptions.length} */}
            <strong>{indexOfFirstPost + 1}</strong> to
            <strong>
              {" "}
              {indexOfLastPost <= data.length
                ? indexOfLastPost
                : data.length}{" "}
            </strong>
            of {""}
            {postsPerPage * pageOptions.length}{" "}
          </span>
        </div>
        <div className="pagination_buttons">
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

export default PaginationTable;
