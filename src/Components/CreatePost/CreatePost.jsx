import React, { useState } from "react";
import BDDService from "../../Services/BDDService";
import axios from "axios";
import { MenuItem, Select } from "@mui/material";

import "./CreatePost.scss";

function CreatePost() {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [categories, setCategories] = useState("");
    const [price, setPrice] = useState("");
    const [reserved, setReserved] = useState("");
    const [etat, setEtat] = useState("");
    const [image, setImage] = useState([]);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleCategoriesChange = (event) => {
        setCategories(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleReservedChange = (event) => {
        setReserved(event.target.value);
    };

    const handleEtatChange = (event) => {
        setEtat(event.target.value);
    };

    const handleImageChange = (event) => {
        setImage(event.target.files);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("message", message);
        formData.append("categories", categories);
        formData.append("price", price);
        formData.append("reserved", reserved);
        formData.append("etat", etat);
        for (let i = 0; i < image.length; i++) {
            formData.append("image", image[i]);
        }

        axios
            .post(BDDService.sitePost + "/createpost", formData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    console.log(etat);
    return (
        <div className="Create_post">
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={handleTitleChange} />
                </label>
                <br />
                <label>
                    Message:
                    <input type="text" value={message} onChange={handleMessageChange} />
                </label>
                <br />
                <label>
                    Categories:
                    <input type="text" value={categories} onChange={handleCategoriesChange} />
                </label>
                <br />
                <label>
                    Price:
                    <input type="number" value={price} onChange={handlePriceChange} />
                </label>
                <br />
                <label>
                    Reserved:
                    <Select value={reserved} onChange={handleReservedChange}>
                        <MenuItem value={"true"}>Oui</MenuItem>
                        <MenuItem value={"false"}>Non</MenuItem>
                    </Select>
                </label>
                <br />
                <label>
                    État:
                    <Select value={etat} onChange={handleEtatChange}>
                        <MenuItem value={"État neuf"}>État neuf</MenuItem>
                        <MenuItem value={"Très bon état"}>Très bon état</MenuItem>
                        <MenuItem value={"Bon état"}>Bon état</MenuItem>
                        <MenuItem value={"État satisfaisant"}>État satisfaisant</MenuItem>
                        <MenuItem value={"Pour pièces"}>Pour pièces</MenuItem>
                    </Select>
                </label>
                <br />
                <label>
                    Image:
                    <input type="file" multiple onChange={handleImageChange} />
                </label>
                <br />

                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
}

export default CreatePost;
