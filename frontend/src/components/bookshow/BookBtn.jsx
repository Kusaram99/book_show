import React from 'react'
import { useMyContext } from '../usecontext/Mycontext'
import axios from 'axios';

const BookBtn = () => {
    // exclude data from context api for book movie
    const { movieData, setMovieData, setAlertData } = useMyContext();
    const clickHandler = () => {
        // check all details are selected or not
        if (!movieData.name || !movieData.seats || !movieData.time) {
            const obj = {
                alert: true,
                message: "Please select all details!",
                h1: "Alert!",
                status: 401
            } 
            setAlertData((e) => ({ ...e, ...obj }))
        } else {
            // check seats are selected or not
            if (movieData.seats) {
                let isSelected = false;
                for (let val in movieData.seats) {
                    // check all seats are greater that 1  
                    if (movieData.seats[val] >= 1) {
                        isSelected = true;
                    }
                }
                // check user is selected seasts or not
                if (isSelected) {
                    // get user id
                    const { _id } = JSON.parse(localStorage.getItem('user')).data;
                    // store in body 
                    const body = { ticket_Data: movieData, user_id: _id }
                    // url
                    let url = "https://kusaram-book-myshow.onrender.com/storeTicket";
                    // post request
                    axios.post(url, body)
                        .then((res) => {
                            const obj = {
                                alert: true,
                                message: "Successfully completed😍",
                                h1: "Success!",
                                status: 200
                            }
                            setAlertData((e) => ({ ...e, ...obj }));
                            setMovieData({});
                        })
                        .catch((err) => {
                            const obj = {
                                alert: true,
                                message: "Server Error😥!",
                                h1: "Failed!",
                                status: 401
                            }
                            setAlertData((e) => ({ ...e, ...obj }))
                            console.log("err: ", err);
                        })
                } else {
                    const obj = {
                        alert: true,
                        message: "Seats are not selected!",
                        h1: "Alert!",
                        status: 401
                    } 
                    setAlertData((e) => ({ ...e, ...obj }))
                }
            }

        }
    }

    return (
        <button
            id='book__btn'
            onClick={clickHandler}>
            Book now
        </button>
    )
}

export default BookBtn;