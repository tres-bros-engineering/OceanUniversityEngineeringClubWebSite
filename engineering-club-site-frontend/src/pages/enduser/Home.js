import UseTitleName from "../../utils/UseTitleName";
import PostGrid from "../../components/post grid/EndUserPostGrid";
import { useData } from "../../utils/DataContext";
import Slider from "../../components/slider/Slider";
import "./EndUser.css";

const Home = () => {
  const { articles, news, category } = useData();

  // Filter posts by category
  const sliderPosts = [...articles, ...news]
    .filter((post) => post.publish)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const newsPosts = news
    .filter((post) => post.publish)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const latestArticlePosts = articles
    .filter((post) => post.publish)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="container">
      <div className="row">
        <div className="my-3 p-0" data-aos="fade-up">
          <Slider posts={sliderPosts} />
        </div>
      </div>
      <div className="row my-4">
        <div className="col-lg-6" data-aos="fade-up">
          <PostGrid posts={newsPosts} category="News" />
        </div>
        <div className="col-lg-6 mt-4 mt-lg-0" data-aos="fade-up">
          <PostGrid posts={latestArticlePosts} category="Latest Article" />
        </div>
      </div>

      <div className="row mb-4">
        {category.map((c, index) => {
          const filteredPosts = articles
            .filter((post) => post.category === c.name && post.publish)
            .sort((a, b) => new Date(b.date) - new Date(a.date));

          // Only render if there are posts
          if (filteredPosts.length === 0) return null;

          return (
            <div className="mb-4" data-aos="fade-up" key={index}>
              <PostGrid posts={filteredPosts} category={c.name} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
