import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useMyContext } from '../usecontext/Mycontext';

const Ticket = () => {
    // get alert function from context api
    const { setAlertData } = useMyContext();

    const [data, setData] = useState(null);

    // useffect
    useEffect(() => {
        const { _id } = JSON.parse(localStorage.getItem('user')).data;
        const { token } = JSON.parse(localStorage.getItem('user')); 
        const url = "http://localhost:8080/last-booking/" + _id;
        axios.get(url, {
            headers: {
                Authorization: token
            }
        })
            .then((res) => { 
                if (!res.data) {
                    const obj = {
                        alert: true,
                        message: "You can book now!",
                        h1: "Welcome!",
                        status: 401
                    }
                    setAlertData((e) => ({ ...e, ...obj }));
                } else {
                    // exclude last booking ticket data
                    const { ticket_Data } = res.data;
                    // update data variable with old ticket data
                    setData(ticket_Data); 
                }
            })
            .catch((err) => {
                console.log("err: ", err);
                const obj = {
                    alert: true,
                    message: "Failed to get last booking data!",
                    h1: "Failed!",
                    status: 401
                }
                setAlertData((e) => ({ ...e, ...obj }));
            })
    }, []);

    return (
        <div id='ticket__container'>
            <h2 id='last_d_heading'>Last Booking Details</h2>
            {data &&
                <div id='tkt__inner_container'>
                    <div>
                        <h3 className='bold_800'>Seats: </h3>
                        {data.seats && Object.entries(data.seats).map((item, ind) => (
                            <p key={ind}>
                                <span className='bold_800'> {item[0]} </span>
                                <span className='color_primary'>{item[1]}</span>
                            </p>
                        ))}
                    </div>
                    <div>
                        <span className='bold_800'>Slot: </span>
                        <span className='color_primary'>{data.time}</span>
                    </div>
                    <div>
                        <span className='bold_800'>Movie: </span>
                        <span className='color_primary'>{data.name}</span>
                    </div>
                </div>
            }
        </div>
    )
}

export default Ticket