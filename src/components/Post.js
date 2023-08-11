import "./Post.css";
import { Link } from "react-router-dom";
import { BsHeartFill, BsHeart } from "react-icons/bs"
import { useState, useEffect } from "react";
import { refreshFavouritesAPI } from "../App.js";

const Post = ({ routeUrl, index, title, image, hook }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isChanged, setisChanged] = useState(false);

    useEffect(() => {
        refreshFavouritesAPI().then(fav => localStorage.setItem("favourites", fav));
        const favourites = localStorage.getItem("favourites");
        const parsedFavourites = JSON.parse(favourites);
        const favouritesMap = new Map(parsedFavourites.map(obj => [obj.key, obj.value]));
        if (favouritesMap != null && favouritesMap.get(index) != null) {
            setIsLiked(true);
        }
    }, []);

    useEffect(() => {
        refreshFavouritesAPI().then(fav => localStorage.setItem("favourites", fav));
    }, [isChanged]);

  

    /* API calls */
    const addPostToFavourites = async (post) => {
        try {
            const url = "http://localhost:3000/login/like";
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
            setisChanged(true);
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
            const parsedRes = await res.json();
            console.log(parsedRes.message);
            setisChanged(false);
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