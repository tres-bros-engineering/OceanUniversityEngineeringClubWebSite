import { Container, Row } from "react-bootstrap";
import UseTitleName from "../../utils/UseTitleName";
import Slider from "../../components/enduser/slider/Slider";
import PostGrid from "../../components/enduser/post grid/PostGrid";
import posts from "../../data/db.json";

const Home = () => {
  UseTitleName("OCU Engineering Club");

  // Filter posts by category
  const sliderPosts = [...posts.article, ...posts.news].sort((a, b) => new Date(b.date) - new Date(a.date));
  const newsPosts = posts.news.sort((a, b) => new Date(b.date) - new Date(a.date));
  const pumpsPosts = posts.article.filter(post => post.category === "Pumps").sort((a, b) => new Date(b.date) - new Date(a.date));
  const shipConstructionsPosts = posts.article.filter(post => post.category === "Ship Constructions").sort((a, b) => new Date(b.date) - new Date(a.date));
  const shipStabilityPosts = posts.article.filter(post => post.category === "Ship Stability").sort((a, b) => new Date(b.date) - new Date(a.date));
  const shipTypePosts = posts.article.filter(post => post.category === "Ship Type").sort((a, b) => new Date(b.date) - new Date(a.date));
  const otherPosts = posts.article.filter(post => post.category === "Other").sort((a, b) => new Date(b.date) - new Date(a.date));
  const latestArticlePosts = posts.article.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <Container fluid className="p-0 m-0">
        <Row className="p-0 m-0">
          <div className="my-3 p-0" data-aos="fade-up">
            <Slider posts={sliderPosts} />
          </div>
        </Row>
        <Row className="p-0 m-0 mt-4">
          <div className="col-lg-6" data-aos="fade-left">
            <PostGrid posts={newsPosts} category="News" />
          </div>
          <div className="col-lg-6" data-aos="fade-right">
            <PostGrid posts={latestArticlePosts} category="Latest Article" />
          </div>
        </Row>
        <Row className="p-0 m-0 mt-4" data-aos="fade-up">
          <div>
            <PostGrid posts={pumpsPosts} category="Pumps" />
          </div>
        </Row>
        <Row className="p-0 m-0 mt-4" data-aos="fade-up">
          <div>
            <PostGrid posts={shipConstructionsPosts} category="Ship Constructions" />
          </div>
        </Row>
        <Row className="p-0 m-0 mt-4">
          <div className="col-lg-6" data-aos="fade-left">
            <PostGrid posts={shipStabilityPosts} category="Ship Stability" />
          </div>
          <div className="col-lg-6" data-aos="fade-right">
            <PostGrid posts={shipTypePosts} category="Ship Type" />
          </div>
        </Row>
        <Row className="p-0 m-0 my-4" data-aos="fade-up">
          <div>
            <PostGrid posts={otherPosts} category="Other" />
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Home;
