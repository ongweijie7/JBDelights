import "./Post.css";
import { Link } from "react-router-dom";

const Post = ({ routeUrl, index, title, image, hook }) => {
    return (
        <div className="post-container">
            <Link to={routeUrl + index}>
                <img className="post-image" src={image} loading="lazy"/>
                <p className="post-title">{title}</p>
            </Link>   
            <p className="post-hook">{hook}</p>
        </div>
    )

}

export default Post;