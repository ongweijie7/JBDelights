import UserContext from "../UserContext";
import { useContext } from "react";

import DisplayPost from "../components/DisplayPost";

import "./favourites.css";

const Favourites = () => {
    const { username } = useContext(UserContext);

    return (
        <section className="view-favourites-container">
            {username && <p className="Your liked posts">Your favourites</p>}
            <DisplayPost className="view-submissions"  
            routeUrl="/food/" apiUrl="http://localhost:3000/login/favourites"
            isFavourites={true}/>
        </section>
    )
}

export default Favourites;