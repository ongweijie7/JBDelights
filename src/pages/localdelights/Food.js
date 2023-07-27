import { motion } from "framer-motion";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import DisplayPost from "../../components/DisplayPost";
import Form from "../../components/Form";

import "./Food.css";

const Food = () => {

    const ScrollToTop = () => {
        const { pathname } = useLocation();
      
        useEffect(() => {
          window.scrollTo(0, 0);
        }, [pathname]);
      
        return null;
      };


    return (
        <motion.section className="food-page"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        >
            <ScrollToTop/>
            <DisplayPost className="display-post" apiUrl="http://localhost:3000/food" routeUrl="/food/"/>
            <Form className="form" createUrl={"http://localhost:3000/food/create"}/>
        </motion.section>
    )
}

export default Food;



