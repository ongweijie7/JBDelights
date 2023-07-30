import "./viewSubmissions.css";
import DisplayPost from "../../components/DisplayPost";


const ViewSubmissions = () => {
    return (
        <section className="view-submissions-container">
            <DisplayPost className="view-submissions"  
            routeUrl="/admin/" apiUrl="http://localhost:3000/admin/submissions"/>
        </section>
    )
}

export default ViewSubmissions;