import { useState } from "react";

import styles from "./Orderbook.module.css";
import {
  StyledTableHeader,
  StyledTableCell,
  StyledTable,
  StyledTableBody,
  StyledTableContainer,
  StyledTableRow,
} from "../Strategies/StrategyVault/StyledTableComponents/StyledTable";

import filterIcon from "../../assets/Images/FilterIcon.svg";

// import OrderBadge from "../Strategies/StrategyVault/StyledTableComponents/OrderBadge";
// import PerformanceBadge from "../Strategies/StrategyVault/StyledTableComponents/PerformanceBadge";
// import Actions from "../Strategies/StrategyVault/StyledTableComponents/Actions";
// import PerformanceInsights from "./PerformanceInsights";
import CustomTablePaginator from "../Strategies/StrategyVault/StyledTableComponents/CustomTablePaginator";
// import TableLoader from "../Strategies/StrategyVault/StyledTableComponents/TableLoader";

const columns = [
  { id: "strategyName", label: "Strategy Name" },
  { id: "strategyId", label: "strategy Id" },
  { id: "brokerage", label: "Brokerage" },
  { id: "Order date", label: "Order date" },
  { id: "Exchange", label: "Exchange" },
  { id: "Type", label: "Type" },
  { id: "Quantity", label: "Quantity" },
  { id: "Entry price", label: "Entry price" },
  { id: "Target", label: "Target" },
  { id: "P/L status", label: "P/L status" },
];

const OrderTable = ({ orderData }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 7;

  console.log(orderData);

  return (
    <>
      <StyledTableContainer filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))">
        <StyledTable padding="10px" textColor="#f1f2f3" fontSize="14px">
          <StyledTableHeader
            bgColor="#363949"
            fontWeight="500"
            borderColor="transparent"
          >
            <StyledTableRow>
              {columns.map((column) => (
                <StyledTableCell key={column.id}>
                  {column.label}
                  {(column.id === "brokerage" ||
                    column.id === "strategyId") && (
                    <img
                      src={filterIcon}
                      alt=""
                      style={{
                        marginLeft: "10px",
                        marginBottom: "3px",
                        width: "12px",
                      }}
                    />
                  )}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </StyledTableHeader>

          <StyledTableBody
            background="#292c3d"
            borderColor="rgba(204, 206, 208, 0.6)"
          >
            {orderData.map((order) => (
              <StyledTableRow key={"1"}>
                <StyledTableCell>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {order.strategy_name}
                    <span
                      className={
                        order.strategy_setting.is_active
                          ? styles.isActive__true
                          : styles.isActive__false
                      }
                      value={false}
                    ></span>
                  </div>
                </StyledTableCell>
                <StyledTableCell>21</StyledTableCell>
                <StyledTableCell>
                  <div className={styles.brokerage}>
                    {order.brokerage_setting_id}
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <div>{order.order_date}</div>
                </StyledTableCell>
                <StyledTableCell>{order.exchange}</StyledTableCell>
                <StyledTableCell>
                  <div
                    style={{
                      backgroundColor: "#abdb5e",
                      padding: "0.15rem 1rem",
                    }}
                    className={styles.strategyType}
                  >
                    {order.type}
                  </div>
                </StyledTableCell>
                <StyledTableCell>{order.quantity}</StyledTableCell>
                <StyledTableCell>{order.entry_price}</StyledTableCell>
                <StyledTableCell>{order.target}</StyledTableCell>
                <StyledTableCell>
                  <div
                    style={{
                      backgroundColor: "#abdb5e",
                      padding: "0.15rem 1rem",
                    }}
                    className={styles.strategyType}
                  >
                    {order.pl_status}
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </StyledTableBody>
        </StyledTable>
      </StyledTableContainer>

      <CustomTablePaginator
        currentPage={page + 1}
        totalPages={Math.ceil(1 / rowsPerPage)}
        changePage={setPage}
      />

      {/* <PerformanceInsights
        open={openPerformanceModal}
        data={selectedStrategy}
        closeModal={setOpenPerformanceModal}
      /> */}
    </>
  );
};

export default OrderTable;
