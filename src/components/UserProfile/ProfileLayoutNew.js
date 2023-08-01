import React, { useState } from "react";
import profile_pic from "../../components/header/profilepic.png";
import * as Io5Icon from "react-icons/io5";
import * as IoIcon from "react-icons/io";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import styles from "./ProfileLayout.module.css";

function ProfileLayoutNew() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logout, setLogout] = useState(false);

  var cookiePresent = document.cookie;

  function logoutHandler() {
    setLogout(true);
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }

  return (
    <span
      className={styles.profileLayout}
      onMouseLeave={() => {
        setMenuOpen(false);
      }}
    >
      <img
        className={styles.profileLayout__img}
        src={profile_pic}
        width="30px"
        height="40px"
        alt=""
        onMouseEnter={() => {
          setMenuOpen(true);
        }}
      />

      <div
        id="profile_dropdown"
        style={{ display: menuOpen ? "" : "none" }}
        className={styles.profileLayout__dropdown}
      >
        <Link to="/profile" state={false}>
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

      {!cookiePresent ? <Redirect to="/login" /> : null}
    </span>
  );
}

export default ProfileLayoutNew;
