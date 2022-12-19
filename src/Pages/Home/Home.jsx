import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import BDDService from "../../Services/BDDService";
import PostCard from "../../Components/PostCard/PostCard";

import "./Home.scss";

function Home() {
    const [posts, setPosts] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getPost();
    }, []);

    async function getPost() {
        const resPost = await fetch(BDDService.sitePost);

        const dataPost = await resPost.json();

        setPosts(dataPost);
        setIsLoading(true);
    }

    if (isLoading === true) {
        if (posts.length === 0) {
            setIsLoading(false);
        }
    }

    return (
        <div className="Posts">
            {isLoading ? (
                posts.map((post) => {
                    return <PostCard key={post._id} id={post._id} />;
                })
            ) : (
                <div className="Post">
                    <h1>Aucune publication trouvée.</h1>
                </div>
            )}
        </div>
    );
}

export default Home;
