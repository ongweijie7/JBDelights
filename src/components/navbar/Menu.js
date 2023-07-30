import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { ImMenu } from "react-icons/im";

import UserContext from '../../UserContext';

import "./menu.css";

const Menu = () => {
    const { user, successfulLogin } = useContext(UserContext);

    const [isMenuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const handleMenuItemClick = (item) => {
        // Add logic for handling individual menu item clicks here
        console.log(`Clicked on ${item}`);
    };

    const logout = () => {
        localStorage.removeItem("token");
        successfulLogin(null);
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
            <div onClick={() => handleMenuItemClick('Button 1')}>Likes</div>
            <div onClick={ user ? logout : login }>{user ? "Log Out" : "Log in" }</div>
            </div>
            )}
        </div>
    
  );
};

export default Menu;
