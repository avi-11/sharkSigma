import { useState } from "react";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";

import styles from "./StrategyVault.module.css";
import {
  StyledTableHeader,
  StyledTableCell,
  StyledTable,
  StyledTableBody,
  StyledTableContainer,
  StyledTableRow,
} from "./StyledTableComponents/StyledTable";

import filterIcon from "../../../assets/Images/FilterIcon.svg";

import OrderBadge from "./StyledTableComponents/OrderBadge";
import PerformanceBadge from "./StyledTableComponents/PerformanceBadge";
import Actions from "./StyledTableComponents/Actions";
import PerformanceInsights from "./PerformanceInsights";
import CustomTablePaginator from "./StyledTableComponents/CustomTablePaginator";
import TableLoader from "./StyledTableComponents/TableLoader";
import TableSelectCell from "./StyledTableComponents/TableSelectCell";

const columns = [
  { id: "strategy_name", label: "Strategy Name" },
  { id: "strategy_id", label: "Id" },
  { id: "brokerage_setting_id", label: "Brokerage" },
  { id: "strategy_type", label: "Strategy Type" },
  { id: "initial_capitial", label: "Initial Capital" },
  { id: "signal_start_date", label: "Start Date" },
  { id: "signal_end_date", label: "End Date" },
  { id: "orderStatus", label: "OrderStatus" },
  { id: "logs", label: "Performance & Trade Log" },
  { id: "actions", label: "" },
];

const StrategyVaultTable = ({ strategyData }) => {
  const [orderBy, setOrderBy] = useState("strategy_id");
  const [order, setOrder] = useState("desc");
  const [openPerformanceModal, setOpenPerformanceModal] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState({});
  const [page, setPage] = useState(0);
  const rowsPerPage = 7;

  const handlePerformanceModalOpen = (data) => {
    setOpenPerformanceModal(true);
    setSelectedStrategy(data);
  };

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (orderBy === "initial_capitial") {
      if (b.strategy_setting[orderBy] < a.strategy_setting[orderBy]) {
        return -1;
      }
      if (b.strategy_setting[orderBy] > a.strategy_setting[orderBy]) {
        return 1;
      }
    } else if (
      orderBy === "signal_start_date" ||
      orderBy === "signal_end_date"
    ) {
      let Date1 = new Date(a.strategy_setting[orderBy]);
      let Date2 = new Date(b.strategy_setting[orderBy]);
      if (Date1 < Date2) {
        return -1;
      }
      if (Date1 > Date2) {
        return 1;
      }
    }

    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function handleSorting(column) {
    if (
      column.id === "brokerage_setting_id" ||
      column.id === "logs" ||
      column.id === "actions" ||
      column.id === "orderStatus"
    )
      return;

    if (column.id === orderBy) {
      setOrder(order === "desc" ? "asc" : "desc");
    } else {
      setOrderBy(column.id);
      setOrder("desc");
    }
  }

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
                <StyledTableCell
                  key={column.id}
                  onClick={() => handleSorting(column)}
                >
                  {column.label}
                  {column.id === "brokerage_setting_id" && (
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
                  {column.id === orderBy ? (
                    order === "desc" ? (
                      <ArrowUpwardOutlinedIcon
                        sx={{
                          color: "#f1f2f3",
                          fontSize: "20px",
                          marginLeft: "3px",
                        }}
                      />
                    ) : (
                      <ArrowDownwardOutlinedIcon
                        sx={{
                          color: "#f1f2f3",
                          fontSize: "20px",
                          marginLeft: "3px",
                        }}
                      />
                    )
                  ) : (
                    ""
                  )}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </StyledTableHeader>

          <StyledTableBody
            background="#292c3d"
            borderColor="rgba(204, 206, 208, 0.6)"
          >
            {strategyData.length ? (
              stableSort(strategyData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <StyledTableRow key={item.strategy_id}>
                    <StyledTableCell>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {item.strategy_name}
                        <span
                          className={
                            item.strategy_setting.is_active
                              ? styles.isActive__true
                              : styles.isActive__false
                          }
                          value={item.strategy_setting.is_active ? true : false}
                        ></span>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell>{item.strategy_id}</StyledTableCell>
                    <StyledTableCell>
                      <TableSelectCell
                        value={item.brokerage_setting_id}
                        index={index}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <div className={styles.strategyType}>
                        {item.strategy_type}
                      </div>
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.strategy_setting.initial_capitial}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.strategy_setting.signal_start_date}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.strategy_setting.signal_end_date}
                    </StyledTableCell>
                    <StyledTableCell>
                      <OrderBadge data={item} />
                    </StyledTableCell>
                    <StyledTableCell>
                      <PerformanceBadge
                        openModal={handlePerformanceModalOpen}
                        data={item}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Actions strategy={item} />
                    </StyledTableCell>
                  </StyledTableRow>
                ))
            ) : (
              <TableLoader column={10} />
            )}
          </StyledTableBody>
        </StyledTable>
      </StyledTableContainer>

      <CustomTablePaginator
        currentPage={page + 1}
        totalPages={Math.ceil(strategyData.length / rowsPerPage)}
        changePage={setPage}
      />

      <PerformanceInsights
        open={openPerformanceModal}
        data={selectedStrategy}
        closeModal={setOpenPerformanceModal}
      />
    </>
  );
};

export default StrategyVaultTable;
