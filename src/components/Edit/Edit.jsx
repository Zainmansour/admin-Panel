import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./Edit.css";
import UserForm from "../User/UserForm";

const Edit = () => {
  const [data, setData] = useState({ userName: "", email: "", role: "user" });
  const redirectTo = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      redirectTo("/auth/login");
    } else {
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:5000/auth/edit", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((ss) => {
          const newData = {
            userName: ss.data.msg.userName,
            email: ss.data.msg.email,
            role: ss.data.msg.role,
          };
          setData(newData);
        })
        .catch((err) => {
          console.log(err);
          localStorage.clear();
          redirectTo("/auth/login");
        });
    }
  }, []);
  return (
    <>
      <NavBar role={data.role} />
      <UserForm data={data} />
    </>
  );
};

export default Edit;
