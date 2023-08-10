import UserContext from '../../UserContext';
import { useContext, useState } from 'react';
import { ImMenu } from "react-icons/im";
import { Link, useNavigate } from 'react-router-dom';

import "./menu.css";

const Menu = () => {
    const { user, isAdmin, isLoggedIn, logOutUser} = useContext(UserContext);

    const [isMenuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("favourites");
        logOutUser();
    }

    const login = () => {
        navigate("/login");
    }

    const viewFavourites = () => {
       navigate("/favourites")
    };

    const viewSubmissions = () => {
        navigate("/admin/submissions")
    }

    return (
        <div className="menu-container" >
            <ImMenu className="menu-button" onClick={toggleMenu}/>
            {isMenuOpen && (
            <div className="dropdown">
                {user ? <p>Hi {user}</p> : <p>You are not logged in</p>}
            {isAdmin && <div onClick={viewSubmissions}>View Submissions</div>}
            <div onClick={viewFavourites}>Likes</div>
            <div onClick={ user ? logout : login }>{user ? "Log Out" : "Log in" }</div>
            </div>
            )}
        </div>
    
  );
};

export default Menu;
