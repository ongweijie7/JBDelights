import "./adventures.css";
import DisplayPost from "../../components/DisplayPost";
import Form from "../../components/Form";

const Adventures = () => {
    
    return (
        <div className="adventures-container">
            <DisplayPost className="adventures-post" routeUrl="/adventures/" apiUrl="http://localhost:3000/adventures"/>
            <Form className="form" createUrl={"http://localhost:3000/adventures/create"}/>
        </div>
    )
}

export default Adventures;