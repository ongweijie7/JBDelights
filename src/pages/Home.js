import { motion } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import "./Home.css";

export default function Home() {
    const navSection = useRef(null);

    const scrollDown = (elementRef) => {
        window.scrollTo({
            top:elementRef.current.offsetTop,
            behavior: "smooth",
        })
    }

    const fadeInVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      };
      

    return (
        
        <div className="home-container">
            <div className="welcome-section">
                <motion.div className="introduction" initial="hidden" animate="visible" variants={fadeInVariants} transition={{ duration: 1.5, delay: 0.1 }}>
                    <p>Experience the enchantment of Johor Bahru, Malaysia's vibrant city. 
                    Discover its rich heritage, iconic landmarks, and tantalizing cuisine. 
                    From family fun to natural beauty, uncover the allure of this captivating destination.
                    </p>
                    <div className="explore-button" onClick={() => scrollDown(navSection)}>
                            Click To Begin Exploring
                    </div> 
                </motion.div>
                
            </div>
            <div className="nav-section" ref={navSection}>
                <Link to="food">
                    <div className="card">
                            <img src="/hawkerfood2.jpeg" alt="not"/>
                            <div className="intro">
                                <h4>Local Delights</h4>
                                <p>Find out more about the local delicacies of JB!</p>
                            </div>
                    </div>
                </Link>
                <Link to="fineDining">
                    <div className="card">
                        <img src="/fine-dining.jpg" alt="not"/>
                        <div className="intro">
                            <h4>Fine Dining</h4>
                            <p>Feeling exquisite? Well we have just the recommendations</p>
                        </div>
                        
                    </div>
                </Link>
                <Link to="adventures">
                    <div className="card">
                        <img src="/adventures.jpeg" alt="not"/>
                        <div className="intro">
                            <h4>Adventures</h4>
                            <p>Look no further for a day of fun and adrenaline!</p>
                        </div>
                    </div>
                </Link>
                
            </div>
        </div>
        
    )
}

