import "./Form.css";
import React, { useState } from 'react';


const Form = ( { createUrl } ) => {
    const [isLoading, setIsLoading] = useState(false);


    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [hook, setHook] = useState('');
    const [openingHours, setOpeningHours] = useState('');
    const [introduction, setIntroduction] = useState('');
    

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleImage1 = (e) => {
        setImage1(e.target.value);
    };

    const handleImage2 = (e) => {
        setImage2(e.target.value);
    };

    const handleOpeningHours = (e) => {
        setOpeningHours(e.target.value);
    };

    const handleIntroduction = (e) => {
        setIntroduction(e.target.value);
    };

    const handleAddress = (e) => {
        setAddress(e.target.value);
    };

    const handleHook = (e) => {
        setHook(e.target.value);
    };

    // const handleAtmosphere = (e) => {
    //     setAtmosphere(e.target.value);
    // };

    const handleSubmit = (event) => {
        setIsLoading(true);
        event.preventDefault();

        const images = { image1, image2};
        const details = { openingHours, introduction };
        const blogPost = { title, address, images, details, hook };
        const jsonString = JSON.stringify(blogPost);
        
        const createPost = async (post) => {
            try {
                const createPost= await fetch(createUrl, {
                    method: "POST",
                    headers: {
                      "Content-Type" : "application/json"
                    },
                    body: post
                });
                const response = await createPost;
                const reply = await response.text();
            } catch (error) {
                console.log(error);
            }
        }
        createPost(jsonString);

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

    };

    return (
    <div className="form-container">
        <h2>Have something to share?</h2>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Title of the dish"
            value={title}
            onChange={handleTitleChange}
        />
        <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={handleAddress}
        />
        <input
            type="text"
            placeholder="Image1"
            value={image1}
            onChange={handleImage1}
        />
        {/* <input
            type="text"
            placeholder="image2"
            value={image2}
            onChange={handleImage2}
        /> */}
        <input
            placeholder="Hook"
            value={hook}
            onChange={handleHook}
        />
        <input
            placeholder="Opening hours"
            value={openingHours}
            onChange={handleOpeningHours}
        />
        <textarea
            placeholder="Introduction"
            value={introduction}
            onChange={handleIntroduction}
        />
        {/* <textarea
            placeholder="cost"
            value={cost}
            onChange={handleCost}
        />
        <textarea
            placeholder="atmosphere"
            value={atmosphere}
            onChange={handleAtmosphere}
        /> */}
        <button type="submit" onSubmit={handleSubmit} disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Post"}
        </button>
        </form>
    </div>
    );
};

export default Form;
