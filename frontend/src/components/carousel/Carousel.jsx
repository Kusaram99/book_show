import React, { useEffect, useState } from 'react'; 
import './carousel.css';
import BookBtn from './BookBtn';
import img1 from '../assets/marvel2.jpeg';
import img2 from '../assets/marvel3.jpg';
import img3 from '../assets/marvel4.jpg';


const defaultPropes = {
    data: [
        {
            id: 1,
            url: img1
        },
        {
            id: 2,
            url: img2
        },
        {
            id: 3,
            url: img3
        }
    ]
}



const Carousel = ({ data = defaultPropes.data }) => {
    const [counter, setCounter] = useState(0);


    useEffect(() => {
        const carouselHandler = () => {
            const dom = document.querySelectorAll('.img');
            dom.forEach((elem, ind) => {
                elem.style.zIndex = 0;
                elem.style.opacity = 0;
            });

            setCounter((prevCounter) => {
                if (prevCounter === data.length - 1) {
                    return 0;
                } else {
                    return prevCounter + 1;
                }
            });
        };

        const interval = setInterval(carouselHandler, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section id='carousel__main_container'>
            <div id="carousel_container">
                {data.map((elem, ind) => (
                    <img
                        key={elem.id}
                        src={elem.url}
                        alt="movie-banner"
                        className='img'
                        style={{
                            zIndex: ind === counter ? 1 : 0,
                            opacity: ind === counter ? 1 : 0
                        }} />
                ))}
            </div>
            <BookBtn />
        </section>
    );
};

export default Carousel;