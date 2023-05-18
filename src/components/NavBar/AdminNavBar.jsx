import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../Edit/Edit.css";

const AdminNavBar = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/auth/edit">
          <strong>Dashboard</strong>
        </Navbar.Brand>
        <Nav className="me-auto ">
          <Nav.Link href="/admin/users" className="color-white">
            Users List
          </Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link href="/auth/logout" className="color-white">
            Logout
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavBar;
