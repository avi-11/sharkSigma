import "./activities_icons.css";
import * as HiIcons from "react-icons/hi";
import * as IoTsIcons from "react-icons/io";
import { Link } from "react-router-dom";

const Activites_icons = (props) => {
  return (
    <div className="box_three">
      <div>
        <Link className="activity_icon">
          <HiIcons.HiOutlineRefresh />
          <p>Refresh</p>
        </Link>
      </div>
      <div>
        <Link className="activity_icon">
          <IoTsIcons.IoIosNotifications />
          <p>Set Alert</p>
        </Link>
      </div>
    </div>
  );
};

export default Activites_icons;
