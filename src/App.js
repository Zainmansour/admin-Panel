import React from "react";
import SignUp from "./components/SignUp/SignUp";
import Edit from './components/Edit/Edit';
import Login from './components/Login/Login'
import Logout from './components/Logout/Logout';
import Users from './components/Admin/Users';
import Error from './components/Error'
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
const App=()=>{
    return (
        <Router>
            <Routes> 
                <Route  path="/auth/signup" element={<SignUp/>}  /> 
                <Route  path="/auth/login" element={<Login/>}  /> 
                <Route  path="/auth/edit" element={<Edit/>}  /> 
                <Route  path="/auth/logout" element={<Logout/>}  /> 
                <Route  path="/admin/users" element={<Users/>}  /> 
                <Route  path="/*" element={<Error/>}  /> 
            </Routes>
        </Router>
    )
}

export default App