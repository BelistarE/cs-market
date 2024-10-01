import React, { useRef } from "react";
import { useState } from "react";
import Slider from "react-slick";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import one from "../assets/slideshow/1carousel.jpg";
import two from "../assets/slideshow/2carousel.webp";
import seven from "../assets/slideshow/7carousel.webp";
import six from "../assets/slideshow/6carousel.webp";
import styles from "./css_modules/home.module.css";

const images = [one, seven, six];
const captions = [
  "From Battle Scarred to Factory New,",
  "Create your dream inventory",
  "View current market prices",
];
const subCaptions = [
  "we've got them all!",
  "*not all items available",
  "*not in real time (rip)",
];

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    arrows: false,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex); // Update current slide index
    },
  };

  return (
    <div className={styles.home}>
      <div className={styles.carouselContainer}>
        <Slider ref={slider} {...settings}>
          {images.map((image, index) => (
            <div key={index} className={styles.carouselSlide}>
              <img
                src={image}
                alt={`Slide ${index}`}
                className={styles.carouselImage}
              />
              {/* Apply animation only to the current slide */}
              <div
                className={`${styles.carouselText} ${
                  currentSlide === index ? styles.animatedText : "" // Apply animation class if current slide index matches the index of the slide
                }`}
              >
                <h2>{captions[index]}</h2>
                <h3>{subCaptions[index]}</h3>
              </div>
            </div>
          ))}
        </Slider>
        <PrevArrow onClick={() => slider.current.slickPrev()} />
        <NextArrow onClick={() => slider.current.slickNext()} />
      </div>
      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <div className={styles.footerleft}>
            <a>About us</a>
            <a>Affiliate</a>
            <a>Blog</a>
            <a>Screenshot Tool</a>
            <a href="https://github.com/ByMykel/CSGO-API">API</a>
          </div>
          <div className={styles.footerright}>
            <a>FAQ</a>
            <a>Support</a>
            <a>Jobs</a>
            <a>Privacy</a>
            <a>Imprint</a>
            <a>Terms of Service</a>
          </div>
        </div>
        <div className={styles.footercontact}>
          <p>info@nyaport.com</p>
          <p>© 2024 Isabeli Estefano</p>
          <p>Powered by Steam. Not affiliated with Valve Corp.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
