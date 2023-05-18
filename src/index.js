import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Edit from './components/Edit/Edit';
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import Logout from './components/Logout/Logout';
import Users from './components/Admin/Users';
import CreateUser from './components/Admin/CreateUser';
import App from './App'

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/auth/login",
        element: <Login/>,
      },
      {
        path: "/auth/signup",
        element: <SignUp />,
      },
      {
        path:"/auth/edit",
        element:<Edit />
      },
      {
        path:"/auth/logout",
        element:<Logout />
      },
      {
        path:"/admin/users",
        element:<Users />
      },
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
     {/* <RouterProvider router={router} /> */}
     <App />
  </>
);

