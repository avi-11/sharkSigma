import React, { useState } from "react";
import { Redirect } from "react-router";
import { NavLink, Link } from "react-router-dom";
import * as Io5Icon from "react-icons/io5";
import * as IoIcon from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";

import { logout, reset } from "../../loginModules/service/slices/authSlice";

import topbarStyles from "./Topbar.module.css";

import hamburgerMenu from "./assets/hamburgerMenu.svg";
import brandImage from "../../assets/Images/topbarLogo.svg";
import downIcon from "./assets/downIcon.svg";
import NotificationIcon from "../../assets/Images/notificationIcon.svg";

const Topbar = ({ sidebarOpen, setSidebarOpen }) => {
  const [profileDropdown, setProfileDropdown] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  function logoutHandler() {
    dispatch(logout());
    dispatch(reset());
  }

  return (
    <div className={topbarStyles.topbar}>
      <div className={topbarStyles.topbar__brand}>
        <img
          src={hamburgerMenu}
          alt=""
          className={topbarStyles.topbar__brand__hamburgerMenu}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        />

        <NavLink to="/dashboard">
          <img
            src={brandImage}
            alt=""
            className={topbarStyles.topbar__brand__logo}
          />
        </NavLink>
      </div>

      <div className={topbarStyles.topbar__links}>
        <div className={topbarStyles.topbarLinks__link}>
          <ul>
            <li>
              <NavLink
                exact
                className={topbarStyles.Link}
                activeClassName={topbarStyles.activeLink}
                to="/baskets"
              >
                Baskets
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                className={topbarStyles.Link}
                activeClassName={topbarStyles.activeLink}
                to="/backtesting"
              >
                Strategies
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                className={topbarStyles.Link}
                activeClassName={topbarStyles.activeLink}
                to="/strategies/strategyVault"
              >
                Strategy Vault
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                className={topbarStyles.Link}
                activeClassName={topbarStyles.activeLink}
                to="/"
              >
                Performance
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                className={topbarStyles.Link}
                activeClassName={topbarStyles.activeLink}
                to="/orderbook"
              >
                Orderbook
              </NavLink>
            </li>
          </ul>
        </div>

        <div className={topbarStyles.topbar__notificationIcon}>
          <img src={NotificationIcon} alt="" />
        </div>

        <div
          onMouseEnter={() => {
            setProfileDropdown(true);
          }}
          onMouseLeave={() => {
            setProfileDropdown(false);
          }}
        >
          <div className={topbarStyles.topbar__useProfile}>
            <p>
              {user?.username ? user.username?.substring(0, 10) : ""}
              {user?.username?.length > 10 ? "..." : ""}
            </p>
            <img
              src={downIcon}
              alt=""
              className={topbarStyles.topbar__userProfile__downArrow}
            />
          </div>

          <div
            style={{ display: profileDropdown ? "" : "none" }}
            className={topbarStyles.topbar__dropdown}
          >
            <Link to="/profile">
              <div>
                <IoIcon.IoMdSettings />
                <li>Account</li>
              </div>
            </Link>
            <div>
              <Io5Icon.IoLogOutOutline />
              <li onClick={logoutHandler} style={{ cursor: "pointer" }}>
                Logout
              </li>
            </div>
          </div>
        </div>
      </div>

      {!document.cookie ? <Redirect to="/login" /> : null}
    </div>
  );
};

export default Topbar;
