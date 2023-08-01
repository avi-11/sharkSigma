import empty_box from "./empty_box.png";
import "./EmptyTable.css";

function EmptyTable(props) {
  return (
    <div className="empty_table mt-5 mb-5">
      <img src={empty_box} alt=""></img>
      <p>{props.text}</p>
    </div>
  );
}

export default EmptyTable;
