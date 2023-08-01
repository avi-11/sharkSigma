import { useState } from "react";
import "./UserProfile.css";
import { Alert } from "@mui/material";
import { changeUserPassword } from "./api/api";

function Settings() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({ value: false, message: "" });
  const [success, setSuccess] = useState({ value: false, message: "" });

  const url =
    "https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01/change-password";

  const changePassword = async () => {
    const userName = document.cookie.split(";")[0].split("=")[1];

    if (confirmPassword !== newPassword) {
      setError({ value: true, message: "Passwords do not match" });
      return;
    }

    const responseMessage = await changeUserPassword(
      userName,
      oldPassword,
      newPassword,
      confirmPassword
    );

    if (responseMessage === "password changed") {
      setSuccess({ value: true, message: responseMessage });
    } else {
      setError({ value: true, message: responseMessage });
    }

    resetForm();
    setTimeout(removeAlert, 5000);
  };

  const removeAlert = () => {
    setError({ value: false, message: "" });
    setSuccess({ value: false, message: "" });
  };

  const resetForm = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="profile main_profile">
      <div>
        <div>
          <h6 className="mb-5">Change Password</h6>

          <div className="errorMessageDiv">
            {error.value ? (
              <Alert variant="filled" severity="error">
                {error.message}
              </Alert>
            ) : (
              ""
            )}
          </div>

          <div className="successMessageDiv">
            {success.value ? (
              <Alert variant="filled" severity="success">
                {success.message}
              </Alert>
            ) : (
              ""
            )}
          </div>

          <form>
            <div>
              <label>Old Password</label>
              <input
                type="password"
                placeholder="Old Password"
                onChange={(e) => {
                  setOldPassword(e.target.value);
                  setError({ value: false, message: "" });
                  setSuccess({ value: false, message: "" });
                }}
                value={oldPassword}
              />
            </div>
            <div>
              <label>New Password</label>
              <input
                type="password"
                placeholder="New Password"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setError({ value: false, message: "" });
                  setSuccess({ value: false, message: "" });
                }}
                value={newPassword}
              />
            </div>
            <div>
              <label>Re-Enter New Password</label>
              <input
                type="password"
                placeholder="ReEnter Password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError({ value: false, message: "" });
                  setSuccess({ value: false, message: "" });
                }}
                value={confirmPassword}
              />
            </div>
          </form>
        </div>
        <div className="profile_buttons">
          <button className="cancel" onClick={resetForm}>
            Cancel
          </button>
          <button className="save" onClick={changePassword}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
