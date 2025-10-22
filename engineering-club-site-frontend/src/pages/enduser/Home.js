import UseTitleName from "../../utils/UseTitleName";
import PostGrid from "../../components/post grid/EndUserPostGrid";
import { useData } from "../../utils/DataContext";
import ShipModel from "../../utils/model/ShipModel";
import Slider from "../../components/slider/Slider";
import "./EndUser.css";

const Home = () => {
  UseTitleName("OCU Engineering Club");
  const { articles, news } = useData();

  // Filter posts by category
  const sliderPosts = [...articles, ...news]
    .filter((post) => post.publish)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const newsPosts = news
    .filter((post) => post.publish)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const pumpsPosts = articles
    .filter((post) => post.category === "Pumps" && post.publish)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const shipConstructionsPosts = articles
    .filter((post) => post.category === "Ship Constructions" && post.publish)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const shipStabilityPosts = articles
    .filter((post) => post.category === "Ship Stability" && post.publish)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const shipTypePosts = articles
    .filter((post) => post.category === "Ship Type" && post.publish)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const otherPosts = articles
    .filter((post) => post.category === "Other" && post.publish)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const latestArticlePosts = articles
    .filter((post) => post.publish)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      {/* Ship 3D Model with Overlay Text */}
      <div data-aos="fade-up">
        <div className="overlay-text">
          <div className="d-inline-block">
            <h1 className="typing-animation-line1">Welcome to the OCU</h1>
          </div>
          <br></br>
          <div className="d-inline-block">
            <h1 className="typing-animation-line2">Engineering Club.</h1>
          </div>
          <p className="fs-3">Explore the Waves, Discover New Horizons.</p>
        </div>
        <div className="shipmodel">
          <ShipModel />
        </div>
      </div>

      <div className="container pb-3">
        <div className="row">
          <div className="my-3 p-0" data-aos="fade-up">
            <Slider posts={sliderPosts} />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-lg-6" data-aos="fade-up">
            <PostGrid posts={newsPosts} category="News" />
          </div>
          <div className="col-lg-6 mt-4 mt-lg-0" data-aos="fade-up">
            <PostGrid posts={latestArticlePosts} category="Latest Article" />
          </div>
        </div>

        <div className="row mt-4">
          <div data-aos="fade-up">
            <PostGrid posts={pumpsPosts} category="Pumps" />
          </div>
        </div>

        <div className="row mt-4">
          <div data-aos="fade-up">
            <PostGrid
              posts={shipConstructionsPosts}
              category="Ship Constructions"
            />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-6" data-aos="fade-up">
            <PostGrid posts={shipStabilityPosts} category="Ship Stability" />
          </div>
          <div className="col-lg-6 mt-4 mt-lg-0" data-aos="fade-up">
            <PostGrid posts={shipTypePosts} category="Ship Type" />
          </div>
        </div>

        <div className="row my-4">
          <div data-aos="fade-up">
            <PostGrid posts={otherPosts} category="Other" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
