import React, { useState } from "react";
import BDDService from "../../Services/BDDService";

import "./CreatePost.scss";

function CreatePost() {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState("");
    const [price, setPrice] = useState("");
    const [etat, setEtat] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const CreatePostSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData();
        if (message === "" && title === "") {
            formData.append("title", title);
            formData.append("message", message);
            formData.append("image", image);
            formData.append("categories", categories);
            formData.append("price", price);
            formData.append("price", price);
            formData.append("etat", etat);
        } else {
            formData.append("title", title);
            formData.append("message", message);
            formData.append("image", image);
            formData.append("categories", categories);
            formData.append("price", price);
            formData.append("etat", etat);
        }

        fetch(BDDService.sitePost + "/createpost", {
            method: "POST",
            credentials: "include",
            body: formData,
        })
            .then((res) => {
                res.json();
                if (res.status !== 201) {
                    console.log("impossible");
                    setErrorMessage("Impossible de publier.");
                } else {
                    console.log("Publication créé");
                    setErrorMessage("Publication créé !");
                    setTimeout(() => {
                        setErrorMessage("");
                        document.forms["form_createpost"].reset();
                        window.location.reload();
                    }, 1000);
                }
            })
            .then((res) => {
                setImage(null);
                setMessage("");
            })
            .catch((error) => console.error(error));
    };
    return (
        <div className="Create_post">
            <form action="post" className="form_createpost" name="form_createpost">
                <label htmlFor="title">
                    Titre de l'annonce :
                    <input type="text" id="title" name="title" onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label htmlFor="message">
                    Message de l'annonce :
                    <input type="text" id="message" name="message" onChange={(e) => setMessage(e.target.value)} />
                </label>
                <label htmlFor="image">
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={(e) => setImage(e.target.files[0])}
                        accept="image/png; image/jpeg, image/jpg"
                    />
                </label>
                <label htmlFor="categories">
                    Catégorie :
                    <input list="data_categorie" onChange={(e) => setCategories(e.target.value)} />
                    <datalist id="data_categorie">
                        <option value="Meuble" />
                    </datalist>
                </label>
                <label htmlFor="price">
                    Prix de l'objet :
                    <input type="number" id="price" name="price" onChange={(e) => setPrice(e.target.value)} />
                </label>
                <label htmlFor="etat">
                    Etat :
                    <input list="data_etat" onChange={(e) => setEtat(e.target.value)} />
                    <datalist id="data_etat">
                        <option value="État neuf" />
                        <option value="Très bon état" />
                        <option value="Bon état" />
                        <option value="État moyen" />
                        <option value="Mauvais état" />
                    </datalist>
                </label>
                <input type="submit" id="login" className="publish_btn" value="Publier" onClick={CreatePostSubmit} />
                {errorMessage !== "" ? <div className="signin_error">{errorMessage}</div> : ""}
            </form>
        </div>
    );
}

export default CreatePost;
