import "./Navbar.css"; 
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
    const [navPages, setNavPages] = useState(false);
    const location = useLocation();

    //useEffect doesn't re-render the entire NavBar function I believe tbc
    useEffect(() => {
        
        const viewportHeight = window.innerHeight;
        window.addEventListener("scroll", () => {
            if ((location.pathname === "/") && (window.scrollY > viewportHeight - (1/4*viewportHeight))) {
                setNavPages(true);
            } else if (location.pathname !== "/") {
                setNavPages(true);
            } else {
                setNavPages(false);
            }
        });
    }, [location.pathname]);

    return (
        <div className="Navbar">
            <Link to="/" className="Title">JB Delights ❤️ </Link>
            {navPages && <div className="Pages">
                <ul>
                    <li><Link to="/food">Local Delights</Link></li>
                    <li><Link to="/thrift">Fine Dining</Link></li>
                    <li><Link to="/fun-things-to-do">Adventures</Link></li>
                </ul>
            </div>}
        </div>
        
    ) 
}

export default Navbar;