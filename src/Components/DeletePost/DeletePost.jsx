import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BDDService from "../../Services/BDDService";

import "./DeletePost.scss";

function DeletePost({ id }) {
    const navigate = useNavigate();
    const [deleteMessage, setDeleteMessage] = useState("");

    async function deletePost() {
        const deletePost = await fetch(BDDService.localPost + "/deletepost/" + id, {
            method: "DELETE",
        });
        const resDeletePost = await deletePost.json();
        setDeleteMessage(resDeletePost.message);
    }

    function cancel(e) {
        e.preventDefault();
        window.location.reload();
    }

    return (
        <div className="DeletePopup">
            <h2>Êtes-vous sur de vouloir supprimer cette publication ?</h2>
            <div className="Delete_Cancel">
                <button
                    className="Delete Universal"
                    onClick={() => {
                        deletePost();
                        setTimeout(() => {
                            setDeleteMessage("");
                            navigate("/");
                        }, 2000);
                    }}
                >
                    Oui
                </button>
                <button className="Cancel Universal" onClick={cancel}>
                    Non
                </button>
            </div>
            {deleteMessage ? (
                <p className="Delete_Message">
                    ✅ {deleteMessage} <br /> <br /> Vous allez être redirigé dans quelques secondes...
                </p>
            ) : (
                ""
            )}
        </div>
    );
}

export default DeletePost;
