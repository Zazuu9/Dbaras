import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreatePost from "../../Components/CreatePost/CreatePost";
import Home from "../Home/Home";

import "./Dashboard.scss";

function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get("Deblog") !== "63739c056cd31aad2a9145d4") {
            navigate("/");
        }
    });

    const logout = () => {
        Cookies.remove("Deblog");
        navigate("/");
    };

    return (
        <div className="Dashboard">
            <h1>Loged</h1>
            <button onClick={logout}>Deconnexion</button>
            <CreatePost />
            <Home />
        </div>
    );
}

export default Dashboard;
