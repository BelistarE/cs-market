import React, { useRef } from "react";
import Slider from "react-slick";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import one from "../assets/slideshow/1carousel.jpg";
import two from "../assets/slideshow/2carousel.webp";
import three from "../assets/slideshow/3carousel.webp";
import styles from "./css_modules/home.module.css"; // Assuming this is where your CSS is

const images = [one, two, three];

const PrevArrow = ({ onClick }) => (
  <div
    className={`${styles.customArrow} ${styles.prevArrow}`}
    onClick={onClick}
  >
    <IoIosArrowBack />
  </div>
);

const NextArrow = ({ onClick }) => (
  <div
    className={`${styles.customArrow} ${styles.nextArrow}`}
    onClick={onClick}
  >
    <IoIosArrowForward />
  </div>
);

const Home = () => {
  const slider = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 100000,
    pauseOnHover: false,
    arrows: false, // Disable default arrows
  };

  return (
    <div className={styles.carouselContainer}>
      <Slider ref={slider} {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Slide ${index}`}
              className={styles.carouselImage}
            />
          </div>
        ))}
      </Slider>
      {/* Manually render custom arrows */}
      <PrevArrow onClick={() => slider.current.slickPrev()} />
      <NextArrow onClick={() => slider.current.slickNext()} />
    </div>
  );
};

export default Home;
