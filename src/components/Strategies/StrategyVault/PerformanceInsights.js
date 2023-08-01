import { useEffect, useState } from "react";
import { Modal, Backdrop, Fade, Box, Button } from "@mui/material";

import DataTable from "./DataTable";

import exportIcon from "../../../assets/Images/ExportIcon.svg";

const PerformanceInsights = ({ open, data, closeModal }) => {
  const [performanceMetrics, setPerformanceMetrics] = useState([]);

  useEffect(() => {
    const convertToArray = (data) => {
      let newData = [];
      for (let i in data) {
        if (typeof data[i] !== "object") {
          newData.push([i, data[i]]);
        }
      }
      setPerformanceMetrics(newData);
    };

    if (data && typeof data === "object") {
      convertToArray(data);
    }
  }, [data]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    bgcolor: "#232334",
    border: "none",
    borderRadius: "10px",
    color: "#f1f2f3",
    boxShadow: 24,
    p: 4,
    outline: "none",
    overflowX: "scroll",
  };

  return (
    <Modal
      open={open}
      onClose={() => closeModal(false)}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#7962FA",
                borderRadius: "40px",
                textTransform: "none",
                padding: "4.5px 14px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <img src={exportIcon} alt="Export" />
                <span>Export as PDF</span>
              </div>
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "-20px",
              gap: "10px",
            }}
          >
            <DataTable
              heading={"Performance Metrics"}
              tableData={performanceMetrics}
            />
            <DataTable heading={"Trade Log"} tableData={performanceMetrics} />
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default PerformanceInsights;
