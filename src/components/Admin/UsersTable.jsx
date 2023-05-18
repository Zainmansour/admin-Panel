import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);
  const usersList = [];
  const redirectTo = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      redirectTo("/auth/login");
    } else {
      let token = localStorage.getItem("token");
      axios
        .get("http://localhost:5000/admin/check/permissions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((ss) => {
          if (ss.data.status !== "ok") {
            localStorage.clear();
            redirectTo("/auth/login");
          }
          axios
            .get("http://localhost:5000/admin/users", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((ss) => {
              if (ss.data.status === "ok") {
                setUsers(ss.data.msg);
              } else {
                setMsg(ss.data.msg);
              }
            })
            .catch((err) => {
              setMsg(err.response.data.msg);
            });
        })
        .catch((err) => {
          setError(err.response.data.msg);
          setTimeout(() => {
            localStorage.clear();
            redirectTo("/auth/login");
          }, 5000);
        });
    }
  }, []);
  const deleteUser = (cur) => {
    console.log(cur);
    const email = cur.email;
    const token = localStorage.getItem("token");
    if (!token) {
      redirectTo("/auth/login");
    }
    axios
      .post(
        "http://localhost:5000/admin/users/delete",
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((ss) => {
        let newUsersList = users;
        newUsersList = newUsersList.filter((item) => item !== cur);
        setUsers(newUsersList);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  };
  const content = () => {
    let data = users.map((cur, ind) => {
      return (
        <tr>
          <td>{ind + 1}</td>
          <td>{cur.userName}</td>
          <td>{cur.email}</td>
          <td>{cur.password}</td>
          <td>{cur.role}</td>
          <td>
            <Button
              variant="outline-danger"
              onClick={() => {
                deleteUser(cur);
              }}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
    //console.log(users)
    if (error !== null) {
      return (
        <h1 className="color-white">
          <strong>Permission Denied</strong>
        </h1>
      );
    } else if (users !== []) {
      return (
        <Table striped bordered hover variant="dark" className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </Table>
      );
    } else {
      return (
        <div className="center mt-2 ">
          <Alert key={"danger"} variant="danger">
            {msg}
          </Alert>
        </div>
      );
    }
  };

  return (
    <div>
      {msg && 1}
      {console.log("sui")}
      <div className="countainer">{content()}</div>
    </div>
  );
}

export default Users;
