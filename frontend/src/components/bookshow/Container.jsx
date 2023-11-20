import React, { useState } from 'react'
import Names from './Names'
import Timeslots from './Timeslots'
import Seats from './Seats'
import Ticket from './Ticket'
import BookBtn from './BookBtn';
import { movies } from './data'
import { seats } from './data'
import { slots } from './data'


const Container = () => {
    // const [movieData, setMovieData] = useState();
    
    


    return (
        <div id='book_nw_inr_container'>
            <div id='left__side'>
                <Names movies={movies} />
                <Timeslots slots={slots} />
                <Seats seats={seats} />
                <BookBtn/>
            </div>
            <div id='right__side'>
                <Ticket />
            </div>
        </div>
    )
}

export default Container