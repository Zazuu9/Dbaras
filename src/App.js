import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Home from "./Pages/Home/Home";
import PostInfo from "./Pages/PostInfo/PostInfo";
import Error from "./Pages/Error/Error";

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/post/:id" element={<PostInfo />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/dashboard/post/:id" element={<PostInfo />} />
            <Route exact path="*" element={<Error />} />
        </Routes>
    );
}

export default App;
