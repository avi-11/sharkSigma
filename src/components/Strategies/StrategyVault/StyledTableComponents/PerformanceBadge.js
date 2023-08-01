import { IconButton, Button } from "@mui/material";
import downloadIcon from "../../../../assets/Images/downloadIcon.svg";

const PerformanceBadge = ({ openModal, data }) => {
  return (
    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
      <Button
        variant="contained"
        style={{
          backgroundColor: "#b6aaff",
          color: "#000",
          padding: "3px 20px",
          borderRadius: "20px",
          textAlign: "center",
          fontSize: "13px",
          fontWeight: "500",
          textTransform: "none",
        }}
        onClick={() => openModal(data)}
      >
        View Performance
      </Button>
      <IconButton>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#B6AAFF",
            padding: "3px",
            borderRadius: "50%",
          }}
        >
          <img
            style={{ width: "18px", height: "18px" }}
            src={downloadIcon}
            alt=""
          />
        </div>
      </IconButton>
    </div>
  );
};

export default PerformanceBadge;
