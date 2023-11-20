import React, { useState } from 'react';
import { useMyContext } from '../usecontext/Mycontext';

const Timeslots = ({ slots }) => {

    // exclude context set function
    const { setMovieData } = useMyContext();

    const [selectedSlot, setSelectedSlot] = useState(null);

    const slotClickHandler = (slot) => {
        setSelectedSlot(slot);
        setMovieData(v => ({ ...v, time: slot }));
    };

    return (
        <div className='mv_names_container'>
            <h2>Select A Time Slot</h2>
            <div className='movies__names'>
                {slots.length && slots.map((item, ind) => (
                    <span
                        key={ind}
                        onClick={() => slotClickHandler(item)}
                        style={selectedSlot === item ?
                            { background: "#4dbf00", color: 'white' } : {}}   >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default Timeslots;
