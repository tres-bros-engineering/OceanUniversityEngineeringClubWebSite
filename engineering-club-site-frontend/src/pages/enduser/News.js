import { Container, Row } from "react-bootstrap";
import UseTitleName from "../../utils/UseTitleName";
import Slider from "../../components/enduser/slider/Slider";
import PostGrid2 from "../../components/enduser/post grid/PostGrid2";
import Sidebar from "../../components/enduser/sidebar/Sidebar";
import { useData } from "../../utils/DataContext";

const News = () => {
  UseTitleName("News | OCU Engineering Club");
  const { news } = useData();

  // Filter posts by category
  const newsPosts = news.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <Container fluid className="p-0 m-0">
        <Row className="p-0 m-0">
          <div className="my-3 p-0" data-aos="fade-up">
            <Slider posts={newsPosts} />
          </div>
        </Row>
        <Row className="p-0 m-0 my-4">
          <div className="col-lg-8" data-aos="fade-up">
            <PostGrid2 posts={newsPosts} />
          </div>
          <div className="col-lg-4">
            <Sidebar />
          </div>
        </Row>
      </Container>
    </>
  );
}

export default News;
