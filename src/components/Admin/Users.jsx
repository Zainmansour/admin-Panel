import React, { useState, useEffect, useRef } from "react";
import AdminNavBar from "../NavBar/AdminNavBar";
import UsersTable from "./UsersTable";
import { CreateUser } from "./CreateUser";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
function Users() {
  useEffect(() => {}, []);

  return (
    <div>
      <AdminNavBar />
      <Tabs
        defaultActiveKey="Add-User"
        id="fill-tab-example"
        className="mb-3 mt-1"
        fill
      >
        <Tab eventKey="Add-User" title="Add User" id="mainRef">
          <CreateUser />
        </Tab>
        <Tab eventKey="Users-List" title="Users List">
          <UsersTable />
        </Tab>
      </Tabs>
    </div>
  );
}

export default Users;
