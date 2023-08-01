import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./navbar.css";

function NavbarLink({ icon, userRole, to, toName = "", label, onClick }) {
  const { country } = useSelector((state) => state.region);
  return (
    <NavLink
      to={to}
      className="active_link"
      exact
      activeClassName="myactivetext"
      onClick={onClick}
    >
      <li
        title={label}
        style={{
          backgroundColor:
            country.country === toName && "rgba(199, 200, 204, 0.1)",
          color: country.country === toName && "#fff",
        }}
      >
        <img src={icon} alt="" />
        {toName !== "" ? (
          <h5>
            {toName !== "Dashboard" || toName !== "Market Overview"
              ? toName
              : userRole === "enterprise"
              ? "Dashboard"
              : "Market Overview"}
          </h5>
        ) : (
          <></>
        )}
      </li>
    </NavLink>
  );
}

export default NavbarLink;
