import { useEffect, useState, useContext } from "react";

import Loading from "./Loading";
import Post from "./Post";

import UserContext from "../UserContext";
import "./DisplayPost.css"


const DisplayPost = ({ apiUrl, routeUrl, isFavourites, toggletitle }) => {
    const { username } = useContext(UserContext);
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        if (isFavourites && (localStorage.getItem("token") == null)) {
            return;
        }
        const getData = async () => {
            try {
                const url = apiUrl;
                const res = await fetch(url, {
                    headers: {
                        "authorisation" : "bring " + localStorage.getItem("token")
                      },
                });
                const data = await res.json();
                if (isFavourites && data.posts.length != 0) {
                    toggletitle(true);
                }
                setPosts(data.posts);
                return data
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, []);
    if (isFavourites && username == null) {
        return (
            <div className="not-logged-in-favourites">
                Log in or create an account to view your liked posts here!
            </div>
        )
    } else if (posts != null && posts.length == 0) {
        return (
            <div className="empty-favourites">
                The posts you have liked will show up here!
            </div>
        )
    }

    return (
        <>
        {!posts && <Loading/>}
        {posts && <div className="display-post">
            {posts.map((post) => {
                return (  
                    <Post routeUrl={routeUrl} index={post._id} title={post.title} image = {post.images.image1}
                        hook={post.hook} openingHours={post.details.openingHours} introduction={post.details.introduction}/>
                )
            })
            }
        </div>}
        </>
        
    );
}


export default DisplayPost;