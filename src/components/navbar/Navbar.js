import "./Navbar.css"; 
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
    // const { pathname }= useLocation();

    // useEffect(() => {
    //     const viewportHeight = window.innerHeight;
    //     window.addEventListener("scroll", () => {
    //         if ((pathname === "/") && (window.scrollY > viewportHeight - (1/4*viewportHeight))) {
    //             setNavPages(true);
    //         } else if (pathname !== "/") {
    //             setNavPages(true);
    //         } else {
    //             setNavPages(false);
    //         }
    //     });
    // }, [pathname]);

    return (
        <div className="Navbar">
            <Link to="/" className="Title">JB Delights ❤️ </Link>
             <div className="Pages">
                <ul>
                    <li><Link to="/food">Local Delights</Link></li>
                    <li><Link to="/thrift">Fine Dining</Link></li>
                    <li><Link to="/fun-things-to-do">Adventures</Link></li>
                </ul>
            </div>
        </div>
        
    ) 
}

export default Navbar;