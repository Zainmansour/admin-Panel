import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const UserForm = (props) => {
  const data = props.data;
  const newPass1 = useRef();
  const newPass2 = useRef();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  let redirectTo = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      redirectTo("/auth/login");
    }
  }, []);
  const sendRequset = (e) => {
    e.preventDefault();
    let email = data.email;
    let userName = data.userName;
    let token = localStorage.getItem("token");
    let pass1 = newPass1.current.value;
    let pass2 = newPass2.current.value;
    if (pass1 !== pass2) {
      setError("passwords aren't identical");
    } else if (pass1.length < 6 || pass1.length > 30) {
      setError("password must be between 6 & 30 characters");
    } else {
      setError(null);

      axios
        .put(
          "http://localhost:5000/auth/edit",
          { userName, email, password: pass1 },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((ss) => {
          if (ss.data.status === "ok") {
            setSuccess("Password Changed");
          } else {
            setError(ss.data.msg);
          }
        })
        .catch((err) => {
          setError(err.response.data.msg);
          localStorage.clear();
          redirectTo("/auth/login");
        });
    }
  };
  const handelError = (err) => {
    if (err != null) {
      return (
        <div className="center mt-2 ">
          <Alert key={"danger"} variant="danger">
            {error}
          </Alert>
        </div>
      );
    }
  };
  const handelSuccess = (suc) => {
    if (suc != null) {
      return (
        <div className="center mt-2">
          <Alert key={"success"} variant="success">
            {suc}
          </Alert>
        </div>
      );
    }
  };
  return (
    <>
      <div className="container">
        {handelError(error)}
        {handelSuccess(success)}
        <Form className="mt-3 main" onSubmit={sendRequset}>
          <Form.Group className="mb-3 col-3">
            <Form.Label htmlFor="username" className="label">
              Username
            </Form.Label>
            <Form.Control
              id="username"
              type="text"
              value={data.userName}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3 col-3">
            <Form.Label htmlFor="email" className="label">
              Email
            </Form.Label>
            <Form.Control id="email" type="email" value={data.email} disabled />
          </Form.Group>
          <Form.Group className="mb-4 col-3">
            <Form.Label htmlFor="password" className="label">
              New password
            </Form.Label>
            <Form.Control
              id="password"
              type="password"
              placeholder="Password"
              ref={newPass1}
            />
          </Form.Group>
          <Form.Group className="mb-4 col-3">
            <Form.Label htmlFor="conPassword" className="label">
              Confirm new password
            </Form.Label>
            <Form.Control
              id="conPassword"
              type="password"
              placeholder="Confirm Password"
              ref={newPass2}
            />
          </Form.Group>
          <Button type="submit" variant="outline-success" className="col-3">
            Save
          </Button>
        </Form>
      </div>
    </>
  );
};

export default UserForm;
