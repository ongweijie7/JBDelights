import "./DisplayPost.css"
import Post from "./Post";
import { useEffect, useState } from "react";


const DisplayPost = () => {
    const [foodPosts, setFoodPosts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const url = "http://localhost:3000/food";
                const res = await fetch(url);
                const data = await res.json();
                setIsLoading(false);
                setFoodPosts(data);
            } catch (error) {
                console.log(error);
            }
            
        }
        getData();
    }, [])

    return (
        <div className="display-post">
            {/* {isLoading && <div>Loading Posts</div>} */}
            {foodPosts &&
                foodPosts.map((post) => {
                    return (  
                        <Post index={post._id} title={post.title} image = {post.images.image1} 
                            hook={post.details.hook} openingHours={post.details.openingHours} introduction={post.details.introduction}
                            cost={post.details.cost} atmosphere={post.details.atmosphere}/>
                    )
                })
            }
        </div>
    );
}


export default DisplayPost;