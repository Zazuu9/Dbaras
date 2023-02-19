import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import BDDService from "../../Services/BDDService";
import illustrtionVendu from "../../Assets/Vendu.webp";

import "./PostCard.scss";

function PostCard({ id }) {
    const [post, setPost] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getPostInfo();
    }, []);

    async function getPostInfo() {
        const postInfo = await fetch(BDDService.sitePost + "/" + id);
        const resPostInfo = await postInfo.json();
        setPost(resPostInfo);
        setIsLoading(true);
    }

    if (post !== undefined) {
        var number = post.price;
        var priceModified = new Intl.NumberFormat().format(number).split(",").join(".");
    }

    return (
        <div className="Post">
            {isLoading ? (
                <>
                    <img
                        src={post.images[0].split("http://127.0.0.1:8000").join("https://api.groupomania.kgouaille.fr")}
                        alt=""
                        className="Post_image"
                    />
                    <div className="Post_title_message">
                        <h2 className="Post_title" title={post.title}>
                            {post.title}
                        </h2>
                        <p className="Post_message">{post.message}</p>
                        <div className="Post_categories_price">
                            <p className="Post_categories">
                                Catégorie : <span className="bold">{post.categories}</span>
                            </p>
                            <div className="Post_etat_price">
                                <p className="Post_etat">
                                    État : <span className="bold">{post.etat}</span>
                                </p>
                                <p className="Post_price">
                                    Prix : <span className="bold">{priceModified}</span> €
                                </p>
                            </div>
                        </div>
                        <Link to={`/post/${id}`}>
                            <button className="Link_to_post" title={`En savoir plus sur "${post.title}"`}>
                                Plus d'infos...
                            </button>
                        </Link>
                    </div>

                    {post.reserved === "true" ? (
                        <img src={illustrtionVendu} alt="" className="Vendu" title="Article vendu !" />
                    ) : (
                        ""
                    )}
                </>
            ) : (
                ""
            )}
        </div>
    );
}

export default PostCard;
