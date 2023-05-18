import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../Edit/Edit.css";

const AdminNavBar = (props) => {
  const page = props.page;
  let href = null;
  let label = null;
  if (page === "Login") {
    href = "/auth/signup";
    label = "Signup";
  } else {
    href = "/auth/login";
    label = "Login";
  }
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/auth/edit">
          <strong>{props.page}</strong>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link href={href} className="color-white">
            {label}
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavBar;
