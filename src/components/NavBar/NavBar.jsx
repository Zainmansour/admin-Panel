import React from "react";
import "../Edit/Edit.css";
import UserNavBar from "./UserNavBar";
import AdminNavBar from "./AdminNavBar";

const NavBar = (props) => {
  const role = props.role || 1;
  console.log(role);
  const handelRender = () => {
    if (role === "user") {
      return <UserNavBar />;
    } else {
      return <AdminNavBar />;
    }
  };
  return <>{handelRender()}</>;
};

export default NavBar;
