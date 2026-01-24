import UseTitleName from "../../utils/UseTitleName";
import Slider from "../../components/slider/Slider";
import PaginationPostGrid from "../../components/post grid/PaginationPostGrid";
import Sidebar from "../../components/sidebar/Sidebar";
import { useData } from "../../utils/DataContext";

const News = () => {
  UseTitleName("News");
  const { news } = useData();

  // Filter posts by category
  const newsPosts = news
    .filter((post) => post.publish)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="container">
      <div className="row">
        <div className="my-3 p-0" data-aos="fade-up">
          <Slider posts={newsPosts} />
        </div>
      </div>
      <div className="row my-4">
        <div className="col-lg-8" data-aos="fade-up">
          <PaginationPostGrid posts={newsPosts} styleType={"post-grid"} />
        </div>
        <div className="col-lg-4 mt-4 mt-lg-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default News;
