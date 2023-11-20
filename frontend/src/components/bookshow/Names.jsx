import React, { useState } from 'react';
import { useMyContext } from '../usecontext/Mycontext';

const Names = ({ movies }) => {

    // exclude context's set function
    const { setMovieData } = useMyContext();

    const [selectedName, setSelectedName] = useState(null);

    const nameClickHandler = (e) => {
        const clickedName = e.target.textContent;
        setSelectedName(clickedName);
        setMovieData((v) => ({ ...v, name: clickedName }));
    }

    return (
        <div className='mv_names_container'>
            <h2>Select A Movie</h2>
            <div className='movies__names'>
                {movies.length !== 0 ? movies.map((item, ind) => (
                    <span
                        key={ind}
                        onClick={nameClickHandler}
                        style={selectedName === item ?
                            { background: "#4dbf00", color: 'white' } : {}}  >
                        {item}
                    </span>
                )) : ""}
            </div>
        </div>
    );
}

export default Names; 