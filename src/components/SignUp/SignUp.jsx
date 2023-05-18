import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "./SignUp.css";
import AuthNavBar from "../NavBar/AuthNavBar";
const SignUp = () => {
  const submitBtnRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const redirectTo = useNavigate();
  const sendRequest = (e) => {
    e.preventDefault();
    setError(null);
    const defaultClass = submitBtnRef.current.className;
    submitBtnRef.current.className = `${defaultClass} disabled`;
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    let userName = userNameRef.current.value;

    if (!email || !password || !userName) {
      submitBtnRef.current.className = defaultClass;
      setError("Please enter your email and password");
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
    } else {
      setError(null);
      axios
        .post(
          "http://localhost:5000/auth/signup",
          { userName, email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((ss) => {
          submitBtnRef.current.className = defaultClass;
          redirectTo("/auth/login");
        })
        .catch((err) => {
          submitBtnRef.current.className = defaultClass;
          setError(err.response.data.msg);
          console.log(err);
        });
      // submitBtnRef.current.className=defaultClass
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      redirectTo("/auth/edit");
    }
  }, []);
  const handelError = (err) => {
    if (err != null && err) {
      return (
        <div className="center">
          <Alert key={"danger"} variant="danger">
            {error}
          </Alert>
        </div>
      );
    }
  };
  return (
    <>
      <AuthNavBar page={"Signup"} />
      <div className="container">
        <div className="text-center mt-5">
          <h1 className="display-5 mb-5 label">
            <strong>Signup</strong>
          </h1>
        </div>
        {handelError(error)}
        <Form className="mt-3 main" onSubmit={sendRequest}>
          <Form.Group className="mb-3 col-3">
            <Form.Label htmlFor="username" className="label">
              Username
            </Form.Label>
            <Form.Control
              id="username"
              type="username"
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
          <Form.Group className="mb-4 col-3">
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
          <Button
            ref={submitBtnRef}
            type="submit"
            variant="outline-primary"
            className="col-3  mb-2"
          >
            Signup
          </Button>
          <p className="white">
            Already have an account? <a href="/auth/login">Login</a>
          </p>
        </Form>
      </div>
    </>
  );
};

export default SignUp;
