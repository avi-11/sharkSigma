import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const OrderBadge = ({ data }) => {
  return (
    <Button
      variant="contained"
      style={{
        backgroundColor: "#abdb5e",
        color: "#000",
        padding: "3px 10px",
        borderRadius: "15px",
        textAlign: "center",
        fontSize: "13px",
        fontWeight: "500",
        textTransform: "none",
      }}
    >
      <Link
        to={{
          pathname: "/orderbook",
          state: data,
        }}
        style={{
          textDecoration: "none",
          color: "#000",
        }}
      >
        View Orders
      </Link>
    </Button>
  );
};

export default OrderBadge;
