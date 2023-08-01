function PredefinedBasketTiles({ id, title, icon, handleClick }) {
  var tileBackground;
  if (id % 3 === 1) {
    tileBackground =
      "linear-gradient(118.19deg, #37546B -33.92%, #164545 41.68%, #062E4E 143.1%)";
  } else if (id % 3 === 2) {
    tileBackground =
      "linear-gradient(124.37deg, #4B4B9D -13.94%, #414168 50.99%, #030B12 139.91%)";
  } else {
    tileBackground =
      "linear-gradient(115.3deg, #542B3E -27.83%, #261632 54.53%, #051937 126.46%)";
  }

  return (
    <button className="shadow-focus">
      <div
        className="predefinedBasketTiles"
        style={{
          background: tileBackground,
          padding: "2rem",
          borderRadius: "10px",
          textAlign: "center",
          cursor: "pointer",
          width: "200px",
          height: "200px",
        }}
        onClick={() => {
          handleClick({ title: title });
        }}
      >
        <img src={icon} alt={icon} style={{ marginBottom: "0.75rem" }} />
        <h4 style={{ color: "#FFF", fontSize: "calc(0.75rem + 0.5vw)" }}>
          {title}
        </h4>
      </div>
    </button>
  );
}

export default PredefinedBasketTiles;
