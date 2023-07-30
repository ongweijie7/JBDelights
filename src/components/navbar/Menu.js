import UserContext from '../../UserContext';
import { useContext, useState } from 'react';
import { ImMenu } from "react-icons/im";
import { useNavigate } from 'react-router';

import "./menu.css";

const Menu = () => {
    const { user, isAdmin, isLoggedIn, logOutUser} = useContext(UserContext);

    const [isMenuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const viewFavourites = () => {
       
    };

    const logout = () => {
        localStorage.removeItem("token");
        logOutUser();
        console.log(isLoggedIn);
    }

    const login = () => {
        navigate("/login");
    }

    return (
        <div className="menu-container" >
            <ImMenu className="menu-button" onClick={toggleMenu}/>
            {isMenuOpen && (
            <div className="dropdown">
                {user ? <p>{user}</p> : <p>You are not logged in</p>}
            {isAdmin && <div onClick={() => {}}>View Submissions</div>}
            <div onClick={viewFavourites}>Likes</div>
            <div onClick={ user ? logout : login }>{user ? "Log Out" : "Log in" }</div>
            </div>
            )}
        </div>
    
  );
};

export default Menu;
