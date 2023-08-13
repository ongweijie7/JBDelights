import UserContext from "../UserContext";
import { useContext, useState } from "react";

import DisplayPost from "../components/DisplayPost";

import "./favourites.css";

const Favourites = () => {
    const { username } = useContext(UserContext);
    const [show, setShow] = useState(false);

    return (
        <section className="view-favourites-container">
            {show && <p className="Your liked posts">Your favourites</p>}
            <DisplayPost className="view-submissions"  
            routeUrl="/food/" apiUrl="http://localhost:3000/login/favourites"
            isFavourites={true} toggletitle={setShow}/>
        </section>
    )
}

export default Favourites;