import { Container } from "react-bootstrap";
import "./Slider.css";

const Slider = () => {
  return (
    <Container fluid>
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://wallpaperset.com/w/full/2/f/a/311285.jpg"
              className="d-block"
              alt="..."
            />
            <div className="carousel-caption text-start pb-5">
              <h2>First slide label</h2>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://static.vecteezy.com/system/resources/previews/023/847/162/non_2x/the-panoramic-view-of-a-generic-military-aircraft-carrier-ship-with-ai-generated-free-photo.jpg"
              className="d-block"
              alt="..."
            />
            <div className="carousel-caption text-start pb-5">
              <h2>Second slide label</h2>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://wallpapers.com/images/hd/navy-background-d4k44xj51v6u22et.jpg"
              className="d-block"
              alt="..."
            />
            <div className="carousel-caption text-start pb-5">
              <h2>Third slide label</h2>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
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
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </Container>
  );
};

export default Slider;
