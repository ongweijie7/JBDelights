import React, { useState } from 'react';

import "./Form.css";

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

    const handleSubmit = (event) => {
        setIsLoading(true);
        event.preventDefault();

        const images = { image1, image2 };
        const details = { openingHours: "", introduction };
        const blogPost = { title, address, images, details, hook: "" };
        createSubmission(blogPost);

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

    };

    /* API calls */
    const createSubmission = async (post) => {
        try {
            const createPost= await fetch(createUrl, {
                method: "POST",
                headers: {
                  "Content-Type" : "application/json"
                },
                body: JSON.stringify(post)
            });
            const response = await createPost.json();
            const reply = await response.text;
            if (!createPost.ok) {
                alert("You have not filled in all the required fields");
            }
            console.log(reply);
        } catch (error) {
            alert("Error when submitting your review");
        }
    }
    /* ************** */

    return (
    <div className="form-container">
        <h2>Have a place to share?</h2>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Title of the place"
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
            placeholder="Image"
            value={image1}
            onChange={handleImage1}
        />
        {/* <input
            placeholder="Hook"
            value={hook}
            onChange={handleHook}
        /> */}
        {/* <input
            placeholder="Opening hours"
            value={openingHours}
            onChange={handleOpeningHours}
        /> */}
        <textarea
            placeholder="Introduction"
            value={introduction}
            onChange={handleIntroduction}
        />
        <button type="submit" onSubmit={handleSubmit} disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Post"}
        </button>
        </form>
    </div>
    );
};

export default Form;
