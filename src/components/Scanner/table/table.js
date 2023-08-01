import React, { useMemo } from "react";
import "./table.css";

import * as IoIosIcon from "react-icons/io";
import Pagination_Table from "../../Table/pagination_table";
import { COLUMNS } from "./columns.js";

const Table_content = ({ strategy_detail_view, data }) => {
  const formatData = () => {
    let formattedData = data.map((item) => {
      return {
        strategyId: item.strategy_id,
        signalId: item["signal-id"],
        orderSide: item["order side"],
        createdAt: getDate(item["created at "]),
      };
    });
    return formattedData;
  };

  function getDate(date) {
    const newDate = new Date(date);
    return newDate.toLocaleString();
  }

  const columns = useMemo(() => COLUMNS, []);
  const newData = useMemo(formatData, [data]);

  return (
    <div
      className="mytable"
      style={{
        top: strategy_detail_view ? "-200px" : "0px",
        zIndex: strategy_detail_view ? "-1" : "1",
      }}
    >
      <div className="id_nd_updates mb-3 mt-5">
        <div className="id_deatail">
          <h6>Strategy Outcome</h6>
        </div>
        <div className="filters">
          <p>Long Only</p>
          <p>
            <IoIosIcon.IoIosArrowDown style={{ marginLeft: "0.2rem" }} />
          </p>
        </div>
      </div>
      <div className="pagination_table">
        <Pagination_Table columns={columns} data={newData} />
      </div>
    </div>
  );
};

export default Table_content;
