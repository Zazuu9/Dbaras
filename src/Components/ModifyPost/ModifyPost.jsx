import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BDDService from "../../Services/BDDService";

import "./ModifyPost.scss";

function ModifyPost({ id }) {
    const [cookie, setCookie] = useState(undefined);
    const navigate = useNavigate();
    const [postInfo, setPostInfo] = useState();

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState("");
    const [price, setPrice] = useState("");
    const [etat, setEtat] = useState("");
    const [reserved, setReserved] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const getCookie = Cookies.get("Deblog");
        setCookie(getCookie);
        getPostInfo();
        getPostInfo();
    }, []);

    async function getPostInfo() {
        const resPost = await fetch(BDDService.sitePost + "/" + id);

        const dataPost = await resPost.json();
        setPostInfo(dataPost);
        setReserved(dataPost.reserved);
    }

    function test(e) {
        e.preventDefault();
    }

    const ModifyPostSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData();

        if (title === "") {
            formData.append("title", postInfo.title);
        } else {
            formData.append("title", title);
        }
        if (message === "") {
            formData.append("message", postInfo.message);
        } else {
            formData.append("message", message);
        }
        if (image === null) {
            formData.append("image", postInfo.images);
        } else {
            formData.append("image", image);
        }
        if (categories === "") {
            formData.append("categories", postInfo.categories);
        } else {
            formData.append("categories", categories);
        }
        if (price === "") {
            formData.append("price", postInfo.price);
        } else {
            formData.append("price", price);
        }
        if (etat === "") {
            formData.append("etat", postInfo.etat);
        } else {
            formData.append("etat", etat);
        }
        if (reserved === "") {
            formData.append("reserved", postInfo.reserved);
        } else {
            formData.append("reserved", reserved);
        }

        fetch(BDDService.localPost + "/modifypost/" + id, {
            method: "PUT",
            credentials: "include",
            body: formData,
        })
            .then((res) => {
                res.json();
                if (res.status !== 200) {
                    setErrorMessage("❌ Impossible de modifié.");
                } else {
                    setErrorMessage("✅ Publication modifée !");
                    setTimeout(() => {
                        document.forms["form_modifypost"].reset();
                        // window.location.reload();
                        setErrorMessage("");
                    }, 1000);
                }
            })
            .then((res) => {
                setMessage("");
            })
            .catch((error) => console.error(error));
    };

    function cancel(e) {
        e.preventDefault();
        window.location.reload();
    }

    return (
        <>
            {cookie === "63739c056cd31aad2a9145d4" && postInfo !== undefined ? (
                <div className="ModifyPopup">
                    <form action="put" className="form_modifypost" name="form_modifypost">
                        <label htmlFor="title">
                            Titre de l'annonce :
                            <input
                                type="text"
                                id="title"
                                name="title"
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={postInfo.title}
                            />
                        </label>
                        <label htmlFor="message">
                            Message de l'annonce :
                            <input
                                type="text"
                                id="message"
                                name="message"
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder={postInfo.message}
                            />
                        </label>
                        <label htmlFor="image">
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={(e) => setImage(e.target.files[0])}
                                accept="image/png; image/jpeg, image/jpg"
                                multiple="multiple"
                            />
                        </label>
                        <label htmlFor="image">
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={(e) => setImage(e.target.files[0])}
                                accept="image/png; image/jpeg, image/jpg"
                                multiple="multiple"
                            />
                        </label>
                        <label htmlFor="categories">
                            Catégorie :
                            <input
                                list="data_categorie"
                                onChange={(e) => setCategories(e.target.value)}
                                placeholder={postInfo.categories}
                            />
                            <datalist id="data_categorie">
                                <option value="Meuble" />
                            </datalist>
                        </label>
                        <label htmlFor="price">
                            Prix de l'objet :
                            <input
                                type="number"
                                id="price"
                                name="price"
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder={postInfo.price}
                            />
                        </label>
                        <label htmlFor="etat">
                            Etat :
                            <input
                                list="data_etat"
                                onChange={(e) => setEtat(e.target.value)}
                                placeholder={postInfo.etat}
                            />
                            <datalist id="data_etat">
                                <option value="État neuf" />
                                <option value="Très bon état" />
                                <option value="Bon état" />
                                <option value="État moyen" />
                                <option value="Mauvais état" />
                            </datalist>
                        </label>
                        <div className="vendu_true_false">
                            <label>Vendu ?</label>
                            <div className="true_false">
                                <label htmlFor="reserved" className="radio_label">
                                    Oui
                                    <input
                                        type="radio"
                                        id="radio_true "
                                        className="radio"
                                        name="vendu"
                                        value="true"
                                        onChange={(e) => setReserved(e.target.value)}
                                    />
                                </label>

                                <label htmlFor="reserved" className="radio_label">
                                    Non
                                    <input
                                        type="radio"
                                        id="radio_false"
                                        className="radio"
                                        name="vendu"
                                        value="false"
                                        onChange={(e) => setReserved(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="Modify_Cancel">
                            <input
                                type="submit"
                                value="Modifier"
                                className="Modify Universal"
                                onClick={ModifyPostSubmit}
                            />
                            <button className="Cancel Universal" onClick={cancel}>
                                Annuler
                            </button>
                        </div>
                        <button onClick={test}>Test</button>
                        {errorMessage !== "" ? <div className="mesasge_succes_error">{errorMessage}</div> : ""}
                    </form>
                </div>
            ) : (
                ""
            )}
        </>
    );
}

export default ModifyPost;
