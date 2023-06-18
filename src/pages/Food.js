import DisplayPost from "../components/FoodComponents/DisplayPost";
import Form from "../components/FoodComponents/Form";
import "./Food.css";

const Food = () => {
    return (
        <div className="food-page">
            <DisplayPost className="display-post"/>
            <Form className="form"/>
        </div>
    )
}

export default Food;



