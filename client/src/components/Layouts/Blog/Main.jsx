import React, { useState } from "react";
import {
  Heart,
  ShoppingCart,
  User,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import BProducts from "../../screens/Blog/BProducts";
import NavBar from "./NavBar";

const HomePage = () => {


  
  const [showNewsletter, setShowNewsletter] = useState(true);

  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      title: "Welcome",
      mainTitle: " To Solarvast,  Your Trusted Source for Premium Solar Accessories.",
      description:
        "Security and sustainability come together with SolarVast Solar Security Cameras, providing a reliable, energy-efficient, and wire-free surveillance solution. Whether for homes, businesses, or remote locations, SolarVast ensures round-the-clock protection with solar-powered technology that eliminates the need for electrical wiring.",
      bgImage: "/blog/assets/images/hero_1.jpeg",
    },
    {
      title: "Become a Distributor",
      mainTitle: "Join the Solar Security Revolution!",
      description:
        "Are you looking for a profitable business opportunity in the fast-growing solar security industry? Partner with SolarVast as an authorized distributor and unlock the potential of renewable energy surveillance.",
      bgImage: "/blog/assets/images/hero_2.jpeg",
    },
  ];
  const categories = [
    {
      id: 1,
      name: "Impact Wrench",
      image:    "https://images.pexels.com/photos/3184424/pexels-photo-3184424.jpeg?w=1920&h=600&fit=crop",
      price: "$199.00",
    }
  ];
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollAmount = 300; // Adjust this value based on your needs

  const handlePrevClick = () => {
    const container = document.querySelector('.slider-container');
    if (container) {
      const newPosition = Math.max(scrollPosition - scrollAmount, 0);
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };

  const handleNextClick = () => {
    const container = document.querySelector('.slider-container');
    if (container) {
      const maxScroll = container.scrollWidth - container.clientWidth;
      const newPosition = Math.min(scrollPosition + scrollAmount, maxScroll);
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };
  return (
    <div>
      <div
        id="heroCarousel"
        className="carousel slide position-relative"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to={index}
              className={activeSlide === index ? "active" : ""}
              onClick={() => setActiveSlide(index)}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item ${
                activeSlide === index ? "active" : ""
              }`}
              style={{
                backgroundImage: `url(${slide.bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "600px",
              }}
            >
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-10"></div>
              <div
                className="container position-relative"
                style={{ minHeight: "600px" }}
              >
                <div className="row h-100 align-items-center pt-5">
                  <div className="col-lg-6">
                    <h2 className="h4 mb-2" style={{ color: "#0CB8F7" }}>
                      {slide.title}
                    </h2>
                    <h1 className="display-4 fw-bold text-warning mb-4">
                      {slide.mainTitle}
                    </h1>
                    <p className="mb-4 text-light">{slide.description}</p>
                  </div>
                  {(index === 0 || index === 1) && (
                    <div
                      className="col-lg-6 position-relative"
                      style={{ marginTop: 70 }}
                    >
                      <img
                        src="/blog/assets/images/main-slider-banner/31.png"
                        alt="Solar CCTV Camera"
                        className="position-absolute end-0 top-50 translate-middle-y"
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.15))",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
          onClick={() =>
            setActiveSlide((prev) =>
              prev === 0 ? heroSlides.length - 1 : prev - 1
            )
          }
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
          onClick={() =>
            setActiveSlide((prev) =>
              prev === heroSlides.length - 1 ? 0 : prev + 1
            )
          }
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Tools Feature Section */}
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 position-relative">
            <img
              src="/blog/assets/images/cm.jpg"
              // src="https://images.pexels.com/photos/6186817/pexels-photo-6186817.jpeg?w=600&h=400&fit=crop"
              alt="Tools collection"
              className="img-fluid rounded"
            />
            <div className="position-absolute top-0 start-0 w-100 h-100  opacity-10 rounded"></div>
          </div>
          <div className="col-md-6">
            <h2 className="display-6 fw-bold mb-4">
              ENHANCE SECURITY WITH SOLARVAST SOLAR SECURITY CAMERA.
            </h2>
            <p className="text-muted">
              The SolarVast Solar Security Camera provides 24/7 surveillance
              with cutting-edge solar technology, ensuring uninterrupted
              protection.
            </p>
            <p className="text-muted">
              Designed for efficiency, it harnesses solar energy to operate
              independently, eliminating the need for external power sources.
            </p>
            <p className="text-muted mb-4">
              With advanced motion detection, night vision, and real-time
              alerts, you can monitor your property anytime, anywhere.
            </p>
            {/*  <button className="btn btn-dark px-4 mt-4" id="BuyNOW">
              Buy Now
            </button> */}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container py-5">
        {/*  <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="h3 mb-2">BROWSE BY CATEGORIES</h2>
            <p className="text-muted">Check out our feature products.</p>
          </div>
          <button className="btn btn-outline-secondary">
            VIEW ALL CATEGORIES
          </button>
        </div>
 */}
        <div className="position-relative">
      <div className="slider-container overflow-hidden">
        <div className="row g-4 flex-nowrap">
          <BProducts />
        </div>
      </div>

      {/* <button 
        className="btn btn-light position-absolute start-0 top-50 translate-middle-y rounded-circle shadow-sm z-10"
        onClick={handlePrevClick}
        style={{ transform: 'translateY(-50%)' }}
      >
        <ChevronLeft size={20} />
      </button> */}
      
      {/* <button 
        className="btn btn-light position-absolute end-0 top-50 translate-middle-y rounded-circle shadow-sm z-10"
        onClick={handleNextClick}
        style={{ transform: 'translateY(-50%)' }}
      >
        <ChevronRight size={20} />
      </button> */}
    </div>
      </div>

      {/* Newsletter Popup */}
   {/*    {showNewsletter && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4">
              <button
                className="btn-close position-absolute top-0 end-0 m-3"
                onClick={() => setShowNewsletter(false)}
              ></button>
              <div className="text-center mb-4">
                <h2 className="h3 mb-3">SUBSCRIBE NEWSLETTER</h2>
                <p className="text-muted">
                  Lorem ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                />
                <button className="btn btn-dark">SUBSCRIBE</button>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default HomePage;
