import "./Post.css";
import { Link } from "react-router-dom";
import { BsHeartFill, BsHeart } from "react-icons/bs"
import { useState, useContext, useEffect } from "react";

import UserContext from "../UserContext";

const Post = ({ routeUrl, index, title, image, hook }) => {
    const { favouritesMap } = useContext(UserContext);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (favouritesMap != null && favouritesMap.get(index) != null) {
            setIsLiked(true);
        }
    }, [favouritesMap]);

  

    /* API calls */
    const addPostToFavourites = async (post) => {
        try {
            const url = "http://localhost:3000/food/like";
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    "authorisation" : "bring " + localStorage.getItem("token")
                  },
                body: JSON.stringify(post)
            });
            if (res.status == 402) {
                alert("Please log in again. Your session has expired");
            }
            const parsedRes = await res.json();
            console.log(parsedRes.message);
        } catch (error) {
            console.log(error);
        }
    }

    const removePostFromFavourites = async (post) => {
        try {
            const url = "http://localhost:3000/login/unlike";
            const res = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type" : "application/json",
                    "authorisation" : "bring " + localStorage.getItem("token")
                  },
                body: JSON.stringify(post)
            });
            if (res.status == 402) {
                alert("Please log in again. Your session has expired");
            }
        } catch (error) {
            console.log(error);
        }
    }
    /* ************** */

    /* onClick functions */
    const likePost = () => {
        setIsLiked(true);
        const post = { _id: index, category: "FOOD" };
        addPostToFavourites(post);
    }

    const unlikePost = () => {
        setIsLiked(false);
        removePostFromFavourites({ _id: index });
    }

    return (
        <div className="post-container">
            
            <img className="post-image" src={image} loading="lazy"/>
            <div className="post-title">
                <Link to={routeUrl + index}>
                    <p >{title}</p>
                </Link>
                {!isLiked 
                ? <BsHeart onClick={likePost} className="unlike heart"/> 
                : <BsHeartFill onClick={unlikePost} className="like heart"/> }
            </div>
        
            <p className="post-hook">{hook}</p>
        </div>
    )

}

export default Post;