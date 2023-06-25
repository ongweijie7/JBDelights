import "./Navbar.css"; 
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {

    return (
        <div className="Navbar">
            <Link to="/" className="Title">JB Delights ❤️ </Link>
             <div className="Pages">
                <ul>
                    <li><Link to="/food">Local Delights</Link></li>
                    <li><Link to="/fineDining">Fine Dining</Link></li>
                    <li><Link to="/adventures">Adventures</Link></li>
                </ul>
            </div>
        </div>
        
    ) 
}

export default Navbar;