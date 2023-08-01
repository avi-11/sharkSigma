import { useState } from "react";
import { CSVLink } from "react-csv";

import styles from "./ExportBasketData.module.css";

const ExportBasketData = ({data, fileName, downloadXlsx, headers}) => {
  const [exportAsDropdown, setExportAsDropdown] = useState(false);

  return (
    <div
      className={styles.exportBasketDropdown}
      onMouseEnter={() => setExportAsDropdown(true)}
      onMouseLeave={() => setExportAsDropdown(false)}
    >
      <p>Export</p>

      <div style={{ display: `${exportAsDropdown ? "" : "none"}` }}>
        <CSVLink
          data={data}
          filename={fileName.toUpperCase()}
          headers={headers}
          style={{ cursor: "pointer" }}
        >
          Export as CSV
        </CSVLink>

        <div onClick={downloadXlsx}>Export as XLSX</div>
      </div>
    </div>
  );
};

export default ExportBasketData;
