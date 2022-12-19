import React, { useState } from "react";
import BDDService from "../../Services/BDDService";

import "./Signup.scss";

function Signup() {
    const [emailSucces, setEmailSucces] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const createUser = (e) => {
        e.preventDefault();

        const userInfo = {};
        userInfo.email = document.getElementById("email").value;
        userInfo.password = document.getElementById("password").value;

        fetch(BDDService.siteAuth + "/signup", {
            method: "POST",
            body: JSON.stringify(userInfo),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.status === 201) {
                setEmailSucces(true);
                setEmailError(false);
            } else {
                setEmailSucces(false);
                setEmailError(true);
            }
        });
    };

    return (
        <div className="App">
            <header className="App-header">
                <form method="post" onSubmit={createUser}>
                    <label htmlFor="email" className="label">
                        Email:
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Entrez votre email"
                            className="input"
                        ></input>
                    </label>
                    <label htmlFor="password" className="label">
                        Mot de passe:
                        <input
                            type="text"
                            id="password"
                            name="password"
                            placeholder="Entrez votre mot de passe "
                            className="input"
                        ></input>
                    </label>
                    <input type="submit" id="login" className="Signup_btn" value="Inscription" />
                    {emailSucces ? <h2 style={{ color: "#4BB543 " }}>Compte créé avec succes !</h2> : ""}
                    {emailError ? <h2 style={{ color: "#FF9494 " }}>Compte déja existant.</h2> : ""}
                </form>
            </header>
        </div>
    );
}

export default Signup;
