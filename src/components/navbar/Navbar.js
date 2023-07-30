import Menu from "./Menu";
import { Link, useLocation } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
    const location  = useLocation()
    
    if (location.pathname == "/login") {
        return (<></>);
    } else {
        return (
            <div className="Navbar">
                <Link to="/" className="Title">JB Delights ❤️ </Link>
                 <div className="Pages">
                    <ul>
                        <li><Link to="/food">Local Delights</Link></li>
                        <li><Link to="/fineDining">Fine Dining</Link></li>
                        <li><Link to="/adventures">Adventures</Link></li>
                        <Menu/>
                    </ul>
                </div>
            </div>
            
        ) 
    }
    
}

export default Navbar;