import { useEffect, useState } from "react";
import { useParams } from "react-router";

import "./contentIntro.css";

const ContentIntro = ( { apiUrl, isSubmission } ) => {
    const { id } = useParams() /*retrieves the parameter from the url*/

    /* Post information */
    const [postObject, setPostObject] = useState(null);
    const [imgUrl1, setImgUrl1] = useState(null);
    const [imgUrl2, setImgUrl2] = useState(null);
    const [title, setTitle] = useState(null);
    const [address, setAddress] = useState(null);
    const [openingHours, setOpeningHours] = useState(null);
    const [intro, setIntro] = useState(null);
    const [tag, setTag] = useState(null);

    let formattedText = intro;
    if (formattedText) {
        const paragraphs = intro.split("\n\n");
        formattedText = paragraphs.map((paragraph, index) => (
            <p key={index}> <br/> {paragraph}</p>
          ));
    } else {
        formattedText = "";
    }

    /* Buttons */
    const approveSubmission = () => {
        uploadSubmission(id).then(() => deleteSubmission(id));
    }
    const rejectSubmission = () => {
        deleteSubmission(id);
    }

    useEffect(() => {
        fetchData(id);
    }, [title]);

    /* API calls for admin to approve the submissions*/
    const uploadSubmission = async (id) => {
        const url = apiUrl + id;
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "authorisation" : "bring " + localStorage.getItem("token"),
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(postObject)
        });
        const message = await res.json();
        console.log(message);
    }
    const deleteSubmission = async (id) => {
        const url = apiUrl + id;
        const res = await fetch(url, {
            method: "DELETE",
            headers: {
                "authorisation" : "bearer " + localStorage.getItem("token"),
                "Content-Type" : "application/json"
            },
        });
        const message = await res.json();
        console.log(message);
    }
    /* ****************** */

    /* Fetching the post data initially */
    const fetchData = async (id) => {
        try {
            const url = apiUrl + id;
            const res = await fetch(url);
            
            const jsonResponse = await res.json();
            const data = jsonResponse.data;
            if (res.ok) {
                setPostObject(data);
                setImgUrl1(data.images.image1);
                setImgUrl2(data.images.image2);
                setTitle(data.title);
                setAddress(data.address);
                setOpeningHours(data.details.openingHours);
                setIntro(data.details.introduction);
                setTag(data.tag);
            } else {
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    /* ****************** */

    return (
        <div className="page">
            <div className="content-container">
                <div className="main-content">
                    <img className="post-picture" src={imgUrl1}/>
                    <div className="food-intro">
                        <p className="food-title">{title}</p>
                        <p>{address}</p>
                        <p>{openingHours}</p>
                        <p>Written June 9 2023 by batman</p>
                        {tag && <div className="tag">{tag}</div>}
                    </div>

                    {isSubmission && 
                    <div className="approval">
                        <div className="approve" onClick={approveSubmission}>Approve</div>
                        <div className="reject" onClick={rejectSubmission}>Reject</div>
                    </div>}

                    <div className="review">
                        {formattedText}
                    </div>
                </div>
                <div className="side-content">
                    <p className="about-us">Hi there our team has filtered and 
                        researched reviews of JB iterneries so that you do not have to!! 
                        If you do have any reviews you would like to contribute and assist other travellers
                        , do feel free to add to the blog!! Enjoy exploring!!
                    </p>  
                </div>
            </div>
        </div>  
    )
}

export default ContentIntro;

