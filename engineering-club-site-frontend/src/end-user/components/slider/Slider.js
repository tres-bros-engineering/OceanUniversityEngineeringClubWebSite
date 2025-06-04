import { Container } from "react-bootstrap";
import "./Slider.css";
import FormatDate from "../../../components/FormatDate";

const Slider = () => {
  const posts = [
    {
      id: 1,
      title: "First Post",
      img: "https://wallpaperset.com/w/full/2/f/a/311285.jpg",
      date: "2025-06-04"
    },
    {
      id: 2,
      title: "Second Post",
      img: "https://static.vecteezy.com/system/resources/previews/023/847/162/non_2x/the-panoramic-view-of-a-generic-military-aircraft-carrier-ship-with-ai-generated-free-photo.jpg",
      date: "2025-06-03",
    },
    {
      id: 3,
      title: "Third Post",
      img: "https://wallpapers.com/images/hd/navy-background-d4k44xj51v6u22et.jpg",
      date: "2025-06-02"
    },
  ];

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
          {posts.map((post, index) => (
            <div
              key={post.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img src={post.img} className="d-block" alt="..." />
              <div className="carousel-caption text-start pb-5">
                <h2>{post.title}</h2>
                <h6>
                  <span class="bi bi-clock"></span>
                  <span className="ms-2">{FormatDate(post.date)}</span>
                </h6>
              </div>
            </div>
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
            style={{ fontSize: "3rem" }}
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
            style={{ fontSize: "3rem" }}
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </Container>
  );
};

export default Slider;
