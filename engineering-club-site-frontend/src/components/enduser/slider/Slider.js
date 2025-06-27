import { Container } from "react-bootstrap";
import "./Slider.css";
import FormatDate from "../../../utils/FormatDate";
import { NavLink } from "react-router-dom";

const Slider = ({ posts }) => {
  return (
    <Container fluid>
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
        data-bs-pause="hover"
      >
        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {posts.slice(0, 10).map((post, index) => (
            <button
              key={post.id}
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
          {posts.slice(0, 10).map((post, index) => (
            <NavLink
              to={formatUrlPath(post.category, post.title)}
              state={{ id: post.id }}
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
                    <span class="bi bi-clock"></span>
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
            className="bi bi-arrow-left-short"
            style={{ fontSize: "5rem" }}
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
            className="bi bi-arrow-right-short"
            style={{ fontSize: "5rem" }}
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </Container>
  );

  // To Format the title and category as Pathname
  function formatUrlPath(category, title) {
    if (!category) {
      return "/news/" + title.toLowerCase().replace(/\s+/g, "-");
    } else {
      return (
        "/article/" +
        category.toLowerCase().replace(/\s+/g, "-") +
        "/" +
        title.toLowerCase().replace(/\s+/g, "-")
      );
    }
  }
};

export default Slider;
