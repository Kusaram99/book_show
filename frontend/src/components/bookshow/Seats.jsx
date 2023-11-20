import React, { useEffect, useState } from 'react'
import { useMyContext } from '../usecontext/Mycontext'

const active = {
    background: '#4dbf00',
    color: '#ffffff24'
}

const initial = {
    background: 'field',
    color: '#4dbf00'
}

const Seats = ({ seats }) => {
    // context state variable
    const { setMovieData } = useMyContext(); 
    // seat data handler variable
    const [seatNum, setSeatNum] = useState(null);

    // onchange seat handler
    const onchageSeatHandler = (e) => {
        // update seats value
        setSeatNum((x) => ({ ...x, [e.target.name]: Number(e.target.value) }));

        // Manage seats number
        setMovieData((v) => ({ ...v, seats: !v.seats ? {} : { ...seatNum, ...v.seats, [e.target.name]: Number(e.target.value) } }));

        if (e.target.value > 0) {
            e.target.style.background = '#4dbf00';
            e.target.style.color = 'rgb(255 255 255)';
        } else {
            e.target.style.background = 'field';
            e.target.style.color = '#4dbf00';
        }
    }

    useEffect(() => {
        const tempObj = {};
        for (const val of seats) {
            tempObj[val] = 0;
        }
        setSeatNum({ ...tempObj });
    }, [])

    return (
        <div className='mv_names_container'>
            <h2>Select the Seats</h2>
            <div id='seat__container'>
                {seatNum && seats.map((item, ind) => (
                    <div key={ind} className="seat__btn">
                        <h4>{item}</h4>
                        <input
                            // className={`${seatNum.num===0?'active__btn':''}`}
                            type="number"
                            name={item}
                            min="0"
                            max="10"
                            defaultValue='0'
                            value={seatNum.item}
                            onChange={(e) => onchageSeatHandler(e)} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Seats