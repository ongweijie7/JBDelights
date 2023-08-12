import { useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import "./Home.css";

const Button = styled.button ` 
    font-family: 'cursive', sans-sarif;
    font-size: 50px;
    font-style: italic;
    font-weight: bolder;
    background-color : #eeeeee;
    padding: 15px 20px;
    border-radius: 15px;
    border-width: 3px;
    outline: 0;
    font-weight: 100;
    font-size: 25px;
    margin: 50px auto;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    transition: transform 0.5s ease;

    &:hover {
        background-color: #87CEEB;
        
        transform: translateY(-10px);
    }
    
` 

export default function Home() {
    const navSection = useRef(null);

    const scrollDown = (elementRef) => {
        window.scrollTo({
            top:elementRef.current.offsetTop,
            behavior: "smooth",
        })
    }

    return (
        
        <div className="home-container">
            <div className="welcome-section">
                <div className="introduction">
                    <p>Experience the enchantment of Johor Bahru, Malaysia's vibrant city. 
                    Discover its rich heritage, iconic landmarks, and tantalizing cuisine. 
                    From family fun to natural beauty, uncover the allure of this captivating destination.
                    </p>
                    <div className="explore-button" onClick={() => scrollDown(navSection)}>
                            Click To Begin Exploring
                    </div> 
                </div>
                
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

