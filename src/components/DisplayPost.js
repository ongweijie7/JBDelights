import "./DisplayPost.css"
import Post from "./Post";
import Loading from "./Loading";
import { useEffect, useState } from "react";


const DisplayPost = ({ apiUrl, routeUrl }) => {
    const [foodPosts, setFoodPosts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const url = apiUrl;
                const res = await fetch(url);
                const data = await res.json();
                
                setFoodPosts(data);
            } catch (error) {
                console.log(error);
            }
            
        }
        getData();
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [])

    return (
        <>
        {isLoading && <Loading/>}
        {!isLoading && <div className="display-post">
            {foodPosts.map((post) => {
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