import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../usecontext/Mycontext';
import spin from '../spinner/spin.gif';


const BookBtn = () => {

    // context variable's state handler
    const { setAlertData } = useMyContext();

    // spinner handler variable
    const [spinner, setSpinner] = useState(false);

    // navigater hook 
    const navigate = useNavigate();

    // movies show book handler 
    const showBookHandler = () => {
        const user = localStorage.getItem('user');

        // check user authentication
        if (user) {
            // spinner handler
            setSpinner((e) => !e)
            // exclude token
            let { token } = JSON.parse(user);
            // exclude id
            let { _id } = JSON.parse(user).data;
            // url
            let url = 'https://kusaram-book-myshow.onrender.com/last-booking/' + _id;
            // send get request
            axios.get(url, {
                headers: {
                    Authorization: token
                }
            })
                .then(res => {
                    // Handle the response here
                    console.log("resp toke: ", res.data);
                    setSpinner((e) => !e)
                    navigate('booknow');
                    // !user ? navigate('signup') : navigate('booknow');
                })
                .catch(err => {
                    // Handle any errors
                    const obj = {
                        alert: true,
                        message: err.response ? err.response.data.message : "Something is wrong!",
                        h1: "Alert!",
                        status: 401
                    }
                    console.log(err)
                    setAlertData((e) => ({ ...e, ...obj }))
                    setSpinner((e) => !e)
                    // console.log("token err: ", err.response.data.message);
                });
        } else {
            navigate('login');
        }
    }
    // console.log("spN", spinner)
    return (
        <div className='booknow_btn_container'>
            <div>
                <h2>Today's Show</h2>
                <button
                    onClick={showBookHandler}
                    id='bookBtn'>
                    {spinner && <img src={spin} width='40px' alt='spinner' />}
                    Book Now
                </button>
            </div>
        </div>
    )
}

export default BookBtn;