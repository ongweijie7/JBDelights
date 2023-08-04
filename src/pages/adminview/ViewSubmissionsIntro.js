import ContentIntro from "../../components/ContentIntro"

const ViewSubmissionsIntro = () => {
    return (
        <ContentIntro apiUrl="http://localhost:3000/admin/" isSubmission={true}/>
    )
    
}

export default ViewSubmissionsIntro;