import "./Post.css";
import { Link } from "react-router-dom";

const Post = ({ index, title, image, hook }) => {
    console.log(image);
    return (
        <div className="post-container">
            <Link to={`/food/${index}`}>
            <img className="post-image" src={image}/>
            <p className="post-title">{title}</p>
            </Link>   
            <p className="post-hook">{hook}</p>
        </div>
    )

}

export default Post;