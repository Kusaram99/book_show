import React, { useState } from "react";
import './login.css';
import { Link } from "react-router-dom";
import axios from 'axios'
import { useMyContext } from "../usecontext/Mycontext";
import spin from '../spinner/spin.gif';

const Login = () => {

    // loader icon handler
    const [spinner, setSpinner] = useState(false);

    // form handler variable
    const [formData, setFormData] = useState({});

    // context state variable
    const { setAlertData, setNavContext } = useMyContext();


    // onchange handler
    const onchangeHandler = (e) => {
        const { name } = e.target
        setFormData((obj) => ({ ...obj, [name]: e.target.value }));
    }

    // onsubmit handler
    const formHandler = (e) => {
        e.preventDefault();
        // start loading
        setSpinner(v => !v);
        // post request
        const url = 'https://kusaram-book-myshow.onrender.com/login';
        axios.post(url, formData)
            .then((res) => {
                console.log("resp: ", res.data)
                const obj = {
                    alert: true,
                    message: res.data.data.message,
                    h1: "Success!",
                    status: 200
                }

                setAlertData((e) => ({ ...e, ...obj }))
                setNavContext([res.data.data])
                // save user authentication to localstorage.
                localStorage.setItem('user', JSON.stringify(res.data));
                setFormData({})
                setSpinner(v => !v)
            })
            .catch((err) => {
                console.log(err);
                const obj = {
                    alert: true,
                    // message: "Opps! Something is wrong please check your Email and Password",
                    message: err?.response ? err.response.data.message : "Something is wrong!",
                    h1: "Alert!",
                    status: 401,
                }
                setAlertData((e) => ({ ...e, ...obj }))
                setSpinner(v => !v)
            });

    }

    return (
        <div className="showcase">
            {/* <Alert /> */}
            <div className="showcase-content">
                <div className="formm">
                    <form onSubmit={formHandler}>
                        <h1>Log In</h1>
                        <div className="info">
                            <input
                                className="email"
                                type="email"
                                name="email"
                                placeholder="Email or phone number"
                                required
                                onChange={onchangeHandler}
                                value={formData.email ? formData.email : ""} /> <br />
                            <input
                                className="email"
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                                onChange={onchangeHandler}
                                value={formData.password ? formData.password : ""} />
                        </div>
                        <div className="btn">
                            <button
                                className="btn-primary"
                                type="submit">
                                {spinner && <img src={spin} width='40px' alt="loading..." />}
                                Log In
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

                <div className="fcbk">
                    <Link to="https://facebook.com" target="_blanck">
                        <img src="https://i.ibb.co/LrVMXNR/social-fb.png" alt="Facebook" />
                    </Link>
                    <p>Login with Facebook</p>
                </div>
                <div className="signup">
                    <p>New to Netflix ?</p>
                    <Link to="/signup">Sign up now</Link>
                </div>
                <div className="more">
                    <p>
                        This page is protected by Google reCAPTCHA to ensure you're not a bot. <Link to="/">Learn more.</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login;