import UserContext from '../../UserContext';
import { useContext, useState, useRef } from 'react';
import { BiLogOut, BiLike } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";

import "./menu.css";

const Menu = () => {
    const { username, isAdmin, isLoggedIn, logOutUser} = useContext(UserContext);
    console.log(username);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef();

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("favourites");
        logOutUser();
        window.location.reload();
    }

    const login = (event) => {
        navigate("/login");
    }

    const viewFavourites = (event) => {
        navigate("/favourites")
    };

    const viewSubmissions = (event) => {
        navigate("/admin/submissions")
    }

    return (
        <div className="menu-container" onClick={toggleMenu} ref={menuRef}>
            <FaUser className="icon"/>
            {isMenuOpen && (
            <div className="dropdown" >
                {username 
                ? <div className="profile" onClick={(event) => event.stopPropagation()}>
                    <div className="profile-pic">
                        <FaUser className="icon-2"/>    
                    </div>
                    Hi {username}!
                </div> 
                : <div className="profile" onClick={(event) => event.stopPropagation()}>
                    <div className="profile-pic">
                        <FaUser className="icon-2"/>    
                    </div>
                    You are not logged in
                </div>}
                {isAdmin && <div className="user-buttons" onClick={viewSubmissions}>View Submissions</div>}
                <div className="user-buttons" onClick={viewFavourites}>
                    <p>Your favourites</p>
                    <BiLike className="icon-1"/>
                </div>
                <div className="user-buttons" onClick={ username ? logout : login }>
                    {username ? <p>Log out</p>: <p>Log in</p> }
                   <BiLogOut className="icon-2"/>
                </div>
            </div>
            )}
        </div>
    
  );
};

export default Menu;
