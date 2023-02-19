import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import DeletePost from "../../Components/DeletePost/DeletePost";
import ModifyPost from "../../Components/ModifyPost/ModifyPost";
import BDDService from "../../Services/BDDService";
import { Link } from "react-router-dom";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import { Helmet } from "react-helmet";

import "./PostInfo.scss";

function PostInfo() {
    const url = window.location;
    const urlId = url.pathname.split("/")[2];

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
        const postInfo = await fetch(BDDService.sitePost + "/" + urlId);
        const resPostInfo = await postInfo.json();
        setPost(resPostInfo);
        setIsLoading(true);
    }

    if (post !== undefined) {
        var number = post.price;
        var priceModified = new Intl.NumberFormat().format(number).split(",").join(".");
    }

    return (
        <>
            {isLoading ? (
                <div className="test11">
                    <Helmet>
                        <title>{post.title} || Nom du site</title>
                    </Helmet>
                    <Link to="/">Accueil</Link>
                    <AliceCarousel>
                        {post.images.map((image) => (
                            <img
                                src={image.split("http://127.0.0.1:8000").join("https://api.groupomania.kgouaille.fr")}
                                alt=""
                                key={image.split("/")[4]}
                                className="sliderimg"
                            />
                        ))}
                    </AliceCarousel>
                    <section className="Postinfo">
                        <div>
                            <h2 className="Post_title">{post.title}</h2>
                            <h3 className="Post_message">{post.message}</h3>
                            <h3 className="Post_categories">
                                Catégorie: <span className="Categorie">{post.categories}</span>{" "}
                            </h3>
                            <h3 className="Post_price">
                                Prix: <span className="Price">{priceModified} €</span>
                            </h3>
                            <h3 className="Post_etat">
                                Etat: <span className="Etat">{post.etat}</span>
                            </h3>
                        </div>
                    </section>
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
