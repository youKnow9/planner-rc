import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Carousel.scss'

const Carousel = ({ event }) => {
    if (!event.photos || event.photos.length === 0) {
        return null;
      }
    
      const SampleNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
           <div
            className={className + " customNextBtn"}
            style={{ ...style, display: "block"}}
            onClick={onClick}
            />
        );
    }
            
    const SamplePrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
            className={className + " customPrevBtn"}
            style={{ ...style, display: "block"}}
            onClick={onClick}
            />
        );
    }

    const photo = event.photos; 
    let slidesToShow = photo.length < 3 ? photo.length : 3;
    let slidesToScroll = photo.length < 3 ? photo.length : 3;

    const settings = {
    dots: true,
    infinite: true,
    speed: 0,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />
    };

    return (
        <div>
            <h3>Галерея</h3>
            <Slider {...settings}>
                {photo.map((item, index) => (
                <div className='img-wrapper' key={index} > 
                    <img src={item.src} alt={`Slide ${index + 1}`} className="slider-image"/>
                </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;