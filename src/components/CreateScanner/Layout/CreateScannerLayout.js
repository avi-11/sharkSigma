import { useState, useMemo, useEffect } from "react";
import axios from "axios";

import "./CreateScannerLayout.css";
import "../../../App.css";

import ScannerForm from "../Form/ScannerForm";
import { COLUMNS } from "../Table/columns.js";
import CreateScannerPaginationTable from "../Table/CreateScannerTable";

import * as BsIcon from "react-icons/bs";

let userId = 1000;

function CreateScannerLayout() {
  const columns = useMemo(() => COLUMNS, []);
  const [newData, setNewData] = useState([]);
  const [currentRow, setCurrentRow] = useState("");
  const [editActive, setEditActive] = useState(false);
  const [scannerId, setScannerId] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://o0j508lnig.execute-api.us-east-2.amazonaws.com/V1/scannerfunction/all?userId=",
        { params: { userId: userId } }
      )
      .then((res) => {
        const defaultScanner = res.data.map((scanner) => {
          return {
            scannerid: scanner.scanner_id,
            scannername: scanner.scanner_name,
            lastupdated: scanner.last_edited,
          };
        });
        setNewData(defaultScanner);
      })
      .catch((err) => console.log(err));
  }, []);

  function fetchData() {
    axios
      .get(
        "https://o0j508lnig.execute-api.us-east-2.amazonaws.com/V1/scannerfunction/all?userId=",
        { params: { userId: userId } }
      )
      .then((res) => {
        const defaultScanner = res.data.map((scanner) => {
          return {
            scannerid: scanner.scanner_id,
            scannername: scanner.scanner_name,
            lastupdated: scanner.last_edited,
          };
        });
        setNewData(defaultScanner);
      });
  }

  const handleNewRow = (newRow) => {
    console.log("scannercode" + newRow.scannercode);
    axios
      .post(
        `https://o0j508lnig.execute-api.us-east-2.amazonaws.com/V1/scannerfunction?userId=${userId}`,
        {
          code: newRow.scannercode,
          name: newRow.scannername,
        }
      )
      .then((res) => {
        console.log(res);
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  const editActiveHandler = (value) => {
    setEditActive(value);
  };

  const dataEditorHandler = (newRow) => {
    axios
      .post(
        `https://o0j508lnig.execute-api.us-east-2.amazonaws.com/V1/scannerfunction/edit?userId=${userId}&scannerId=${scannerId}`,
        {
          code: newRow.scannercode,
          name: newRow.scannername,
        }
      )
      .then((res) => {
        console.log(res);
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  const editNdelete = (row) => {
    setCurrentRow(row);
    return (
      <>
        <div
          className="edit_delete_button"
          style={{ float: "right", marginRight: "1rem" }}
        >
          <button
            className="edit"
            onClick={() => {
              console.log("row");
              console.log(row);
              console.log(row.values.scannername);
              setEditActive(true);
              setScannerId(row.values.scannerid);
              document.getElementById("scanner name").value =
                row.values.scannername;
            }}
          >
            EDIT
          </button>
          <button
            className="delete"
            onClick={(e) => {
              axios
                .delete(
                  "https://o0j508lnig.execute-api.us-east-2.amazonaws.com/V1/scannerfunction/delete?userId=1000&scannerId=",
                  { params: { scannerId: row.values.scannerid } }
                )
                .then((res) => {
                  fetchData();
                })
                .catch((err) => console.log(err));
              setEditActive(false);
              document.getElementById("scanner name").value = "";
              document.getElementById("scanner file").value = "";
              document.getElementById("Baskets").value = "";
              document.getElementById("timeframe").value = "";
            }}
          >
            DELETE
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="create_scanner_page">
      <div>
        <h3>Create Scanners</h3>
        <p>
          You can now create scanners in two ways: upload your code or use our
          IDE to code your scanner{" "}
        </p>
      </div>
      <div className="card mb-4">
        <a href="/scanner">
          View Scanners{" "}
          <BsIcon.BsArrowRightShort
            style={{ position: "relative", top: "5px" }}
          />
        </a>
        <ScannerForm
          addRow={handleNewRow}
          Row={currentRow}
          IsEditActive={editActive}
          editActiveSetter={editActiveHandler}
          data={newData}
          dataEditor={dataEditorHandler}
          fetchData={fetchData}
        />
      </div>
      <div>
        <div className="scanner_data">
          <h5 className="mb-4">My Scanners</h5>
          <p>15 scanners</p>
          <p>Updated 12 Sep,2021 at 11:30 AM</p>
          <CreateScannerPaginationTable
            columns={columns}
            data={newData}
            editNdelete={editNdelete}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateScannerLayout;
