import Skeleton from "@mui/material/Skeleton";

function Loader() {
  return (
    <div className="loader">
      <Skeleton
        variant="rect"
        width={"100%"}
        height={"70vh"}
        animation="wave"
        sx={{ bgcolor: "#212124" }}
      />
    </div>
  );
}

export default Loader;
