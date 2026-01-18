// This is the end user slider component 
import { Container } from "react-bootstrap";
import "./Slider.css";
import FormatDate from "../../utils/FormatDate";
import { NavLink } from "react-router-dom";
import PostUrlFormat from "../../utils/PostUrlFormat";
import { useEffect } from "react";
import { Carousel } from 'bootstrap';

const Slider = ({ posts }) => {
  useEffect(() => {
    const sliderElement = document.getElementById("carouselExampleCaptions");
    if (sliderElement) {
      new Carousel(sliderElement, {
        ride: "carousel"
      });
    }
  }, []);

  return (
    <>
      {posts.length > 0 && (
        <Container fluid className="slider">
          <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-bs-interval="5000"
            data-bs-pause="hover"
          >
            {/* Carousel Indicators */}
            <div className="carousel-indicators">
              {posts?.slice(0, 10).map((post, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : undefined}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
            {/* Carousel Items */}
            <div className="carousel-inner bg-black">
              {posts?.slice(0, 10).map((post, index) => (
                <NavLink
                  to={PostUrlFormat(post.category, post.title)}
                  className="carousel-item-link"
                >
                  <div
                    key={post.id}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <img src={post.img} className="d-block rounded" alt="..." />
                    <div className="carousel-caption text-start pb-5">
                      <h2>{post.title}</h2>
                      <h6>
                        <span className="bi bi-clock-fill"></span>
                        <span className="ms-2">{FormatDate(post.date)}</span>
                      </h6>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                className="bi bi-chevron-left"
                style={{ fontSize: "4rem" }}
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                className="bi bi-chevron-right"
                style={{ fontSize: "4rem" }}
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>{" "}
          </div>
        </Container>
      )}
    </>
  );
};

export default Slider;
