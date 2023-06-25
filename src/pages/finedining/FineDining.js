import "./fineDining.css";
import DisplayPost from "../../components/DisplayPost";
import Form from "../../components/Form";

const FineDining = () => {
    
    return (
        <div className="fine-dining-container">
            <DisplayPost className="fine-dining-post" routeUrl="/fineDining/" apiUrl="http://localhost:3000/fineDining"/>
            <Form className="form" createUrl={"http://localhost:3000/fineDining/create"}/>
        </div>
    )
}

export default FineDining;