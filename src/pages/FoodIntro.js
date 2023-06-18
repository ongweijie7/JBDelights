import "./FoodIntro.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const FoodIntro = () => {
    const { id } = useParams() /*retrieves the parameter from the url*/
    const [imgUrl1, setImgUrl1] = useState(null);
    const [imgUrl2, setImgUrl2] = useState(null);
    const [title, setTitle] = useState(null);
    const [openingHours, setOpeningHours] = useState(null);
    const [intro, setIntro] = useState(null);
    let formattedText = intro;
    if (formattedText) {
        const paragraphs = intro.split("\n\n");
        formattedText = paragraphs.map((paragraph, index) => (
            <p key={index}> <br/> {paragraph}</p>
          ));
    } else {
        formattedText = "";
    }
    


    useEffect(() => {
        const fetchData = async (id) => {
            try {
                const url = `http://localhost:3000/food/${id}`;
                const res = await fetch(url);
                const data = await res.json();
                setImgUrl1(data.images.image1);
                setImgUrl2(data.images.image2);
                setTitle(data.title);
                setOpeningHours(data.details.openingHours);
                setIntro(data.details.introduction);

                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData(id);
    }, [title]);

    return (
        <div className="page">
            <div className="content-container">
                <div className="main-content">
                    <img className="post-picture" src={imgUrl1}/>
                    <div className="intro">
                        <p className="food-title">{title}</p>
                        <p>{openingHours}</p>
                        <p>Written June 9 2023 by batman</p>
                    </div>
                    <div className="review">

                        {formattedText}
                        <img className="food-picture2" src={imgUrl2}/>
                        
                    </div>
                </div>
                <div className="side-content">
                    <p className="about-us">Hi there, we created this blog to make it easy for
                        travellers to JB to quickly plan your iterneries!!
                        Our blog posts would include location and expected 
                        expenditure so that you do not have to bother with 
                        the cumbersome research!! If you do have any reviews 
                        you would like to contribute and assist other travellers
                        , do feel free to add to the blog!! Enjoy exploring!!
                    </p>  
                </div>
            </div>
            
        </div>
        
    )
}

export default FoodIntro;

