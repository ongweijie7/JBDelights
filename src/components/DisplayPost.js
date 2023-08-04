import { useEffect, useState } from "react";

import Loading from "./Loading";
import Post from "./Post";

import "./DisplayPost.css"

const DisplayPost = ({ apiUrl, routeUrl }) => {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const url = apiUrl;
                const res = await fetch(url, {
                    headers: {
                        "authorisation" : "bring " + localStorage.getItem("token")
                      },
                });
                const data = await res.json();
                
                setPosts(data);
            } catch (error) {
                console.log(error);
            }
        }
        getData();
        setTimeout(() => console.log(posts), 1000);
    }, [])
    

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