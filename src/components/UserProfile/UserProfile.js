import { useState, useEffect } from "react";
import axios from "axios";

import profile_pic from "../../components/header/profilepic.png";
import "./UserProfile.css";

import Overview from "./Overview";
import Settings from "./Settings";
import { Redirect } from "react-router";

import "../../App.css";
import { getUserData } from "./api/api";
import AccountSettings from "./AccountSettings";

function UserProfile(brokerage) {
  const [currentOption, setCurrentOption] = useState("overView");
  const [profileOptions, setProfileOptions] = useState({
    overView: "block",
    settings: "none",
    security: "none",
    billing: "none",
    statements: "none",
    APIKeys: "none",
    Refferals: "none",
    extra: "none",
  });
  const [userProfileData, setUserProfileData] = useState([]);

  const profileSectionHandler = (prev, current) => {
    document.getElementById(prev).style.color = "rgba(158, 157, 157, 1)";
    document.getElementById(prev).style.borderBottom = "none";
    document.getElementById(current).style.color = "rgba(11, 129, 238, 1)";
    document.getElementById(current).style.borderBottom =
      "2px solid rgba(11, 129, 238, 1)";
    return setProfileOptions({
      ...profileOptions,
      [prev]: "none",
      [current]: "block",
    });
  };

  useEffect(() => {
    if (brokerage) {
      setCurrentOption("settings");
      profileSectionHandler(currentOption, "settings");
    } else {
      setCurrentOption("overView");
      profileSectionHandler(currentOption, "overView");
    }
    console.log(brokerage);
  }, []);

  var cookiePresent = document.cookie;
  let userId;
  if (cookiePresent) {
    var slicedUsername =
      cookiePresent.slice(9, 10).toUpperCase() + cookiePresent.slice(10);

    userId = slicedUsername.split(";")[1].split("=")[1];
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await getUserData(userId);
      setUserProfileData(res);
    };

    fetchUserData();
  }, [userId]);

  return (
    <div>
      <div className="profile profile_menu">
        <div className="profile_head mt-4 mb-4">
          <div className="profile_img " style={{ width: "auto" }}>
            <img src={profile_pic} width="130px" height="130px" alt=""></img>
          </div>
          <div
            className="User_name"
            style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
          >
            <h4>
              {userProfileData["first-name"]} {userProfileData["last-name"]}
            </h4>
            <button>
              <strong>Pro Quant</strong>
            </button>
          </div>
        </div>
        <div>
          <ul className="menu_items">
            <li
              id="overView"
              onClick={() => {
                setCurrentOption("overView");
                profileSectionHandler(currentOption, "overView");
              }}
              style={{
                color: "rgba(11, 129, 238, 1)",
                borderBottom: "1px solid rgba(11, 129, 238, 1)",
              }}
            >
              Overview
            </li>
            <li
              id="settings"
              onClick={() => {
                setCurrentOption("settings");
                profileSectionHandler(currentOption, "settings");
              }}
            >
              Settings
            </li>
            <li
              id="security"
              onClick={() => {
                setCurrentOption("security");
                profileSectionHandler(currentOption, "security");
              }}
            >
              Security
            </li>
            <li>Billing</li>
            <li>Statements</li>
            <li>API Keys</li>
            <li>Referrals</li>
          </ul>
        </div>
      </div>
      {profileOptions.overView === "block" && (
        <Overview userData={userProfileData} />
      )}
      {profileOptions.security === "block" && <Settings />}
      {profileOptions.settings === "block" && <AccountSettings />}

      {!cookiePresent ? <Redirect to="/login" /> : null}
    </div>
  );
}

export default UserProfile;
