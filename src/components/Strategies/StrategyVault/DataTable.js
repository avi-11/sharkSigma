import {
  StyledTableCell,
  StyledTable,
  StyledTableBody,
  StyledTableContainer,
  StyledTableRow,
} from "./StyledTableComponents/StyledTable";

const DataTable = ({ heading, tableData }) => {
  return (
    <div
      style={{
        width: "50%",
      }}
    >
      <h3>{heading}</h3>
      <StyledTableContainer
        background="#292C3D"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        padding="10px"
        width="100%"
        overflow="scroll"
      >
        <StyledTable
          size="small"
          textColor="#f1f2f3"
          width="100%"
          overflow="scroll"
        >
          <StyledTableBody>
            {tableData.map((item, index) => (
              <StyledTableRow
                key={item[0]}
                background={index % 2 === 0 ? "#202037" : "#363949"}
              >
                <StyledTableCell>{item[0]}</StyledTableCell>
                <StyledTableCell>
                  {item[0] === "strategy_link" ? item[1].slice(0, 20) : item[1]}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </StyledTableBody>
        </StyledTable>
      </StyledTableContainer>
    </div>
  );
};

export default DataTable;
