import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useMyContext } from '../usecontext/Mycontext';
import spin from '../spinner/spin.gif';

const pfl_dp_upl = {
    marginBottom: '30px',
    display: "inline-block",
    cursor: "pointer"
}

const Signup = () => {

    // loader icon handler
    const [spinner, setSpinner] = useState(false);

    // form data handler
    const [formData, setFormData] = useState({});

    // context state manager
    const { setAlertData, setNavContext } = useMyContext();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // check file
        if (file) {
            // file compressor
            const reader = new FileReader();
            reader.onload = async (event) => {
                const originalImageDataURL = event.target.result;

                // create img element
                const img = new Image();
                img.src = originalImageDataURL;

                // On load
                img.onload = () => {
                    // creat canvas to compress file
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const maxWidth = 800; // Adjust the maximum width as needed

                    // set image sizing
                    if (img.width > maxWidth) {
                        const scaleFactor = maxWidth / img.width;
                        canvas.width = maxWidth;
                        canvas.height = img.height * scaleFactor;
                        ctx.drawImage(img, 0, 0, maxWidth, img.height * scaleFactor);
                    } else {
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0);
                    }

                    // compresstion will start here
                    canvas.toBlob((blob) => {
                        // return compressed file
                        const compressedImage = new File([blob], 'compressed.jpg', { type: 'image/jpeg' }); 

                        // conveting file into the url to store databse
                        const compReader = new FileReader();
                        compReader.readAsDataURL(compressedImage);
                        compReader.onload = () => { 
                            setFormData((obj) => ({ ...obj, image: compReader.result }));
                        }
                        compReader.onerror = error => {
                            alert("Unable to select file!");
                        }
                    }, 'image/jpeg', 0.2); // Adjust the quality as needed
                };

            };

            reader.readAsDataURL(file);

        }
    };

    // onchange handler
    const onchangeHandler = (e) => {
        const { name } = e.target 
        setFormData((obj) => ({ ...obj, [name]: e.target.value }));
    }

    // onsubmit form handler
    const formHandler = (e) => {
        e.preventDefault();
        // start loading
        setSpinner(v => !v);
        // define url
        const url = 'https://kusaram-book-myshow.onrender.com/register';
        axios.post(url, formData)
            .then((res) => { 
                const obj = {
                    alert: true,
                    message: res.data.data.message,
                    h1: "Success!",
                    status: 200
                }
                // set alert
                setAlertData((e) => ({ ...e, ...obj }))
                // updata data of setnavcontext
                setNavContext([res.data.data])
                // save user authentication to localstorage.
                localStorage.setItem('user', JSON.stringify(res.data));
                // clear form data
                setFormData({})
                // start loading
                setSpinner(v => !v);
            })
            .catch((err) => {
                console.log("err: ", err)
                const obj = {
                    alert: true,
                    message: err?.response ? err.response.data.message : "Something is wrong!",
                    h1: "Alert!",
                    status: 401,
                } 
                setAlertData((e) => ({ ...e, ...obj }));
                // start loading
                setSpinner(v => !v);
            });
    }

    return (
        <div className="showcase">
            <div className="showcase-content">
                <div className="formm">
                    <form onSubmit={formHandler}>
                        <h1>Sign Up</h1>
                        <div className="info">
                            <input
                                className="email"
                                name='firstname'
                                type="text"
                                placeholder="First name"
                                required
                                onChange={onchangeHandler}
                                value={formData.firstname ? formData.firstname : ""} /> <br />
                            <input
                                className="email"
                                name='lastname'
                                type="text"
                                placeholder="Last name"
                                required
                                onChange={onchangeHandler}
                                value={formData.lastname ? formData.lastname : ""} /> <br />
                            <input
                                className="email"
                                name='email'
                                type="email"
                                required
                                onChange={onchangeHandler}
                                placeholder="Email id"
                                value={formData.email ? formData.email : ""} /> <br />
                            <input
                                className="email"
                                name='password'
                                type="password"
                                required
                                onChange={onchangeHandler}
                                placeholder="Password"
                                value={formData.password ? formData.password : ""} />
                        </div>
                        <div
                            style={pfl_dp_upl}>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="fileInput"
                                onChange={handleFileChange}
                            />
                            <label htmlFor='fileInput'>
                                <img
                                    src={`${formData.image ? formData.image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Circle-icons-image.svg/768px-Circle-icons-image.svg.png'}`}
                                    width='50'
                                    height='50' />
                            </label>
                        </div>
                        <div className="btn">
                            <button
                                className="btn-primary"
                                type="submit">
                                {spinner && <img src={spin} width='40px' alt="loading..." />}
                                Sign Up
                            </button>
                        </div>
                        <div className="help">
                            <div>
                                <input value="true" type="checkbox" /><label>Remember me</label>
                            </div>

                            <Link to="/">Need Help ?</Link>

                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup