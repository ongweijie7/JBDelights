import "./Post.css";
import { Link } from "react-router-dom";

const Post = ({ index, title, image, hook }) => {
    console.log(image);
    return (
        <div className="post-container">
            <Link to={`/food/${index}`}>
            <img className="image" src={image} alt="notfound"/>
            <p className="title">{title}</p>
            </Link>   
            <p className="hook">{hook}</p>
        </div>
    )

}

export default Post;