import Menu from "./Menu";
import { Link, useLocation } from "react-router-dom";
import { BsFillChatHeartFill } from "react-icons/bs";

import "./navbar.css";

const Navbar = () => {
    const location  = useLocation()
    
    if (location.pathname == "/login") {
        return (<></>);
    } else {
        return (
            <div className="Navbar">
                <Link to="/" className="Title">JB Delights <BsFillChatHeartFill/> </Link>
                 <div className="Pages">
                    {location.pathname == "/"
                    ? <Menu/>
                    : <>
                    <ul>
                        <li><Link to="/food">Local Delights</Link></li>
                        <li><Link to="/fineDining">Fine Dining</Link></li>
                        <li><Link to="/adventures">Adventures</Link></li>
                    </ul>
                    <Menu /></>
                
                    }
                    
                </div>
            </div>
            
        ) 
    }
    
}

export default Navbar;