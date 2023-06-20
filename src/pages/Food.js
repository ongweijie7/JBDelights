import "./Food.css";
import DisplayPost from "../components/FoodComponents/DisplayPost";
import Form from "../components/FoodComponents/Form";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Food = () => {

    const ScrollToTop = () => {
        const { pathname } = useLocation();
      
        useEffect(() => {
          window.scrollTo(0, 0);
        }, [pathname]);
      
        return null;
      };


    return (
        <div className="food-page">
            <ScrollToTop/>
            <DisplayPost className="display-post"/>
            <Form className="form"/>
        </div>
    )
}

export default Food;



