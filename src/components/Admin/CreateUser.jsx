import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
const usersChange = 0;
const CreateUser = () => {
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  let permission = true;
  let redirectTo = useNavigate();
  const submitBtnRef = useRef();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      redirectTo("/auth/login");
    }
  }, []);
  const sendRequset = (e) => {
    e.preventDefault();
    const defaultClass = submitBtnRef.current.className;
    submitBtnRef.current.className = `${defaultClass} disabled`;
    let email = emailRef.current.value;
    let userName = userNameRef.current.value;
    let password = passwordRef.current.value;
    let role = roleRef.current.value;
    let token = localStorage.getItem("token");
    if (!token) {
      redirectTo("/auth/login");
    }
    if (!email || !password || !userName) {
      submitBtnRef.current.className = defaultClass;
      setError("Please enter an username , email and password");
    } else if (userName.length < 4) {
      submitBtnRef.current.className = defaultClass;
      setError("username must be between 4 & 10 characters");
    } else if (
      !email
        .toLowerCase()
        .match(
          /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        )
    ) {
      submitBtnRef.current.className = defaultClass;
      setError("invalid email");
    } else if (password.length < 6 || password.length > 30) {
      submitBtnRef.current.className = defaultClass;
      setError("password must be between 6 & 30 characters");
    } else if (role === "") {
      submitBtnRef.current.className = defaultClass;
      setError("please select the role");
    } else {
      axios
        .get("http://localhost:5000/admin/check/permissions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((ss) => {
          if (ss.data.status !== "ok") {
            setTimeout(() => {
              localStorage.clear();
              redirectTo("/auth/login");
            }, 5000);
          } else {
            axios
              .post(
                "http://localhost:5000/admin/users/new",
                { userName, email, password, role },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then((ss) => {
                if (ss.data.status !== "ok") {
                  submitBtnRef.current.className = defaultClass;
                  setError(ss.data.msg);
                } else {
                  setError(null);
                  submitBtnRef.current.className = defaultClass;
                  setSuccess("Done!");
                }
              })
              .catch((err) => {
                submitBtnRef.current.className = defaultClass;
                setError(err.response.data.msg);
              });
          }
        })
        .catch((err) => {
          permission = false;
          setTimeout(() => {
            localStorage.clear();
            redirectTo("/auth/login");
          }, 5000);
        });
    }
  };
  const handelError = () => {
    if (permission === false) {
      return (
        <h1 className="white">
          <strong>Permission Denied</strong>
        </h1>
      );
    } else {
      if (error !== null) {
        return (
          <div className="center  ">
            <Alert key={"danger"} variant="danger">
              {error}
            </Alert>
          </div>
        );
      } else if (success != null) {
        return (
          <div className="center ">
            <Alert key={"success"} variant="success">
              {success}
            </Alert>
            {setTimeout(() => {
              window.location.reload(true);
            }, 1500)}
          </div>
        );
      }
    }
  };
  return (
    <>
      <div className="text-center mt-3">
        <h1 className="display-5 mb-2 label">
          <strong>Add User</strong>
        </h1>
      </div>
      <div className="container">
        {handelError()}
        <Form className="main" onSubmit={sendRequset}>
          <Form.Group className="mb-3 col-3">
            <Form.Label htmlFor="username" className="label">
              Username
            </Form.Label>
            <Form.Control
              id="username"
              type="text"
              placeholder="Username"
              ref={userNameRef}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-3">
            <Form.Label htmlFor="email" className="label">
              Email
            </Form.Label>
            <Form.Control
              id="email"
              type="email"
              placeholder="Email"
              ref={emailRef}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-3">
            <Form.Label htmlFor="password" className="label">
              Password
            </Form.Label>
            <Form.Control
              id="password"
              type="password"
              placeholder="Password"
              ref={passwordRef}
            />
          </Form.Group>
          <Form.Group className="mb-4 col-3">
            <Form.Label htmlFor="password" className="label">
              Role
            </Form.Label>
            <Form.Select ref={roleRef}>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Select>
          </Form.Group>
          <Button
            type="submit"
            variant="outline-success"
            className="col-3"
            ref={submitBtnRef}
          >
            Save
          </Button>
        </Form>
      </div>
    </>
  );
};

export { CreateUser, usersChange };
