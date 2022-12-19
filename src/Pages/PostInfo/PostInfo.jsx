import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import DeletePost from "../../Components/DeletePost/DeletePost";
import ModifyPost from "../../Components/ModifyPost/ModifyPost";
import BDDService from "../../Services/BDDService";

import "./PostInfo.scss";

function PostInfo() {
    const url = window.location;
    const urlId = url.pathname.split("/")[2];
    // console.log(urlId);

    const [cookie, setCookie] = useState(undefined);
    const [post, setPost] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [openModifyPopup, setOpenModifyPopup] = useState(false);
    const [openDeletePopup, setOpenDeletePopup] = useState(false);

    useEffect(() => {
        getPostInfo();
        const getCookie = Cookies.get("Deblog");
        setCookie(getCookie);
    }, []);

    async function getPostInfo() {
        const postInfo = await fetch(BDDService.localPost + "/" + urlId);
        const resPostInfo = await postInfo.json();
        setPost(resPostInfo);
        setIsLoading(true);
        console.log(resPostInfo);
    }

    if (post !== undefined) {
        var number = post.price;
        var priceModified = new Intl.NumberFormat().format(number).split(",").join(".");
    }

    return (
        <>
            {isLoading ? (
                <div className="test11">
                    <div className="Postinfo">
                        {post.images.map((image) => (
                            <img
                                src={image}
                                alt=""
                                title={image.split("/")[4].split(".")[0]}
                                key={image.split("/")[4]}
                                className="Post_image"
                            />
                        ))}
                        <h2 className="Post_title">{post.title}</h2>
                        <h3 className="Post_message">{post.message}</h3>
                        <h3 className="Post_categories">Catégorie: {post.categories}</h3>
                        <h3 className="Post_price">Prix: {priceModified} €</h3>
                        <h3 className="Post_etat">Etat: {post.etat}</h3>
                    </div>
                    {cookie === "63739c056cd31aad2a9145d4" ? (
                        <div className="Modify_Delete">
                            <button
                                className="modify_btn modify_delete_btn"
                                onClick={() => {
                                    setOpenModifyPopup(true);
                                }}
                            >
                                Modifier
                            </button>
                            <button
                                className="delete_btn modify_delete_btn"
                                onClick={() => {
                                    setOpenDeletePopup(true);
                                }}
                            >
                                Supprimer
                            </button>
                        </div>
                    ) : (
                        ""
                    )}

                    {openModifyPopup ? (
                        <div className="Popup">
                            <ModifyPost key={post._id} id={post._id} />
                        </div>
                    ) : (
                        ""
                    )}

                    {openDeletePopup ? (
                        <div className="Popup">
                            <DeletePost key={post._id} id={post._id} />
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            ) : (
                ""
            )}
        </>
    );
}

export default PostInfo;
