import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../Edit/Edit.css";

const UserNavBar = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand className="mr-6" href="/auth/edit">
          Dashboard
        </Navbar.Brand>
        <Nav className="ml-3">
          <Nav.Link href="/auth/logout" className="color-white">
            Logout
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default UserNavBar;
