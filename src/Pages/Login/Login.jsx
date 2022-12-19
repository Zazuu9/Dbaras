import Cookies from "js-cookie";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BDDService from "../../Services/BDDService";

import "./Login.scss";

function Login() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [errorLogin, setErrorLogin] = useState(false);

    useEffect(() => {
        if (Cookies.get("Deblog") === "63739c056cd31aad2a9145d4") {
            navigate("/dashboard");
        }
    }, []);

    async function loginUser(e) {
        e.preventDefault();

        const userInfo = {};
        userInfo.email = document.getElementById("email").value;
        userInfo.password = document.getElementById("password").value;

        const res = await fetch(BDDService.siteAuth + "/login", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            credentials: "include",
            body: JSON.stringify(userInfo),
        });

        const data = await res.json();

        if (data.token) {
            setErrorLogin(false);
            Cookies.set("Deblog", "63739c056cd31aad2a9145d4");
            navigate("/dashboard");
        }

        if (res.status === 404 || 401) {
            setErrorMessage(data.message);
            setErrorLogin(true);
        }
    }

    return (
        <div className="Login">
            <form action="post" onSubmit={loginUser}>
                <label htmlFor="email">
                    Email:
                    <input type="text" id="email" name="email" placeholder="Entrez votre email" />
                </label>
                <label htmlFor="password">
                    Mot de passe:
                    <input type="text" id="password" name="password" placeholder="Entrez votre mot de passe " />
                </label>
                <input type="submit" id="login" className="Signup_btn" value="Connexion" />
                <Link to="/signup">
                    <button>S'inscrire</button>
                </Link>
            </form>

            {errorLogin ? <h1>{errorMessage}</h1> : ""}
        </div>
    );
}

export default Login;
