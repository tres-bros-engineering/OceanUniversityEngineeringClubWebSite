import { Container, Row } from "react-bootstrap";
import UseTitleName from "../../utils/UseTitleName";
import Slider from "../../components/enduser/slider/Slider";
import PostGrid from "../../components/enduser/post grid/PostGrid";
import { useData } from "../../utils/DataContext";

const Home = () => {
  UseTitleName("OCU Engineering Club");
  const { articles, news } = useData();

  // Filter posts by category
  const sliderPosts = [...articles, ...news].sort((a, b) => new Date(b.date) - new Date(a.date));
  const newsPosts = news.sort((a, b) => new Date(b.date) - new Date(a.date));
  const pumpsPosts = articles.filter(post => post.category === "Pumps").sort((a, b) => new Date(b.date) - new Date(a.date));
  const shipConstructionsPosts = articles.filter(post => post.category === "Ship Constructions").sort((a, b) => new Date(b.date) - new Date(a.date));
  const shipStabilityPosts = articles.filter(post => post.category === "Ship Stability").sort((a, b) => new Date(b.date) - new Date(a.date));
  const shipTypePosts = articles.filter(post => post.category === "Ship Type").sort((a, b) => new Date(b.date) - new Date(a.date));
  const otherPosts = articles.filter(post => post.category === "Other").sort((a, b) => new Date(b.date) - new Date(a.date));
  const latestArticlePosts = articles.sort((a, b) => new Date(b.date) - new Date(a.date));

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
