import React, { useState, useEffect } from 'react';
import '../styles/slider.css';
import slider1 from '../assets/slider/slider1.png';
import slider2 from '../assets/slider/slider2.png';
import slider3 from '../assets/slider/slider3.png';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { id: 1, title: 'title image 1', image: slider1 },
    { id: 2, title: 'title image 2', image: slider2 },
    { id: 3, title: 'title image 3', image: slider3 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [currentSlide]);

  const goToNextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  return (
    <div className="slider">
      <div className="slide">
        <img src={slides[currentSlide].image} alt={slides[currentSlide].title} />
        <h3>{slides[currentSlide].title}</h3>
      </div>
    </div>
  );
};

export default Slider;
