import { useMemo } from "react";
import styles from "./AccountManagement.module.css";
import Checkbox from "@mui/material/Checkbox";

import searchIcon from "../assets/images/searchIcon.svg";
import editUser from "../assets/images/editUser.svg";
import deleteUser from "../assets/images/deleteUser.svg";

import PaginationTable from "../../Table/pagination_table";

function AccountManagement() {
  const data = useMemo(
    () => [
      {
        check: (
          <Checkbox
            className={styles.AccountManagementTable__body__selectUser}
          />
        ),
        uid: "CU143",
        username: "cbowie2",
        email: "nbowie2@ebay.com",
        phone: "937-185-3485",
        role: "Architect",
        action: (
          <div className={styles.AccountManagementTable__body__editUserBtns}>
            <img src={editUser} alt="" />
            <img src={deleteUser} alt="" />
          </div>
        ),
      },
      {
        check: (
          <Checkbox
            className={styles.AccountManagementTable__body__selectUser}
          />
        ),
        uid: "CU144",
        username: "mstuffins0",
        email: "astuffins0@typepad.com",
        phone: "594-396-5850",
        role: "Surveyor",
        action: (
          <div className={styles.AccountManagementTable__body__editUserBtns}>
            <img src={editUser} alt="" />
            <img src={deleteUser} alt="" />
          </div>
        ),
      },
      {
        check: (
          <Checkbox
            className={styles.AccountManagementTable__body__selectUser}
          />
        ),
        uid: "CU145",
        username: "cquogan1",
        email: "nquogan1@desdev.cn",
        phone: "849-399-5657",
        role: "Electrician",
        action: (
          <div className={styles.AccountManagementTable__body__editUserBtns}>
            <img src={editUser} alt="" />
            <img src={deleteUser} alt="" />
          </div>
        ),
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: (
          <Checkbox
            className={styles.AccountManagementTable__body__selectUser}
          />
        ),
        accessor: "check", // accessor is the "key" in the data
      },
      {
        Header: "User ID",
        accessor: "uid", // accessor is the "key" in the data
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone No.",
        accessor: "phone",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Action",
        accessor: "action",
      },
    ],
    []
  );

  return (
    <div className={styles.accountManagement}>
      <div className={styles.accountManagement__header}>
        <h3>Account Management</h3>
      </div>

      <div className={styles.accountManagement__filterMenu}>
        <div className={styles.accountManagement__filterMenu_Search}>
          <img src={searchIcon} alt="" />
          <input type="text" placeholder="Search userid, User or abc ..." />
        </div>

        <div className={styles.accountManagement__filterMenu_Btns}>
          <button className={styles.accountManagement__filterMenu_addUserBtn}>
            Add User
          </button>
          <button className={styles.accountManagement__filterMenu_exportBtn}>
            Export
          </button>
        </div>
      </div>

      <div className={styles.accountManagement__paginationTable}>
        <PaginationTable columns={columns} data={data} />
      </div>
    </div>
  );
}

export default AccountManagement;
