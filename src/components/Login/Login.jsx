import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "./Login.css";
import AuthNavBar from "../NavBar/AuthNavBar";
const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const redirectTo = useNavigate();
  const submitBtnRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const sendRequest = async (e) => {
    setError(null);
    e.preventDefault();
    const defaultClass = submitBtnRef.current.className;
    submitBtnRef.current.className = `${defaultClass} disabled`;

    let email = emailRef.current.value;
    let password = passwordRef.current.value;

    if (!email || !password) {
      submitBtnRef.current.className = defaultClass;
      setError("Please enter your email and password");
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
      await axios
        .post(
          "http://localhost:5000/auth/login",
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((ss) => {
          submitBtnRef.current.className = defaultClass;
          if (ss.data.status === "ok") {
            localStorage.setItem("token", ss.data.msg.token);
            redirectTo("/auth/edit");
          } else {
            setError(ss.data.msg.toString);
          }
        })
        .catch((err) => {
          submitBtnRef.current.className = defaultClass;
          console.log(err);
          setError(err.response.data.msg);
        });
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      redirectTo("/auth/edit");
    }
  }, []);
  const handelError = (err) => {
    if (err != null) {
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
      <AuthNavBar page={"Login"} />
      <div className="container">
        <div className="text-center mt-5">
          <h1 className="display-5 mb-5 label">
            <strong>Login</strong>
          </h1>
        </div>
        {handelError(error)}
        <Form className="mt-3 main" onSubmit={sendRequest}>
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
            type="submit"
            ref={submitBtnRef}
            variant="outline-primary"
            className="col-3 mb-2"
          >
            Login
          </Button>
          <p className="white">
            You don't have an account? <a href="/auth/signup">Signup</a>
          </p>
        </Form>
      </div>
    </>
  );
};

export default Login;
