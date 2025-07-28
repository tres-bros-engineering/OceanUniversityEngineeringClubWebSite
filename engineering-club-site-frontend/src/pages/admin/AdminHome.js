import { Container, Row } from "react-bootstrap";
import UseTitleName from "../../utils/UseTitleName";
import PostGrid from "../../components/admin/post grid/PostGrid";
import { useData } from "../../utils/DataContext";
import Search from "../../components/admin/search/Search";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PostGrid2 from "../../components/admin/post grid/PostGrid2";

const AdminHome = () => {
  UseTitleName("Home | OCU Engineering Club");
  const { articles, news } = useData();

  const location = useLocation();
  const { searchResult } = location.state || {};
  const [postResults, setPostResults] = useState([]);

  // Filter posts
  const latestNewsPosts = news.filter(post => post.publish).sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const latestArticlePosts = articles.filter(post => post.publish).sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Filter posts by search result
  useEffect(() => {
    if (!searchResult) {
      setPostResults(
        [...articles, ...news].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )
      );
    } else {
      const lowerSearch = searchResult.toLowerCase().trim();

      let results = [];

      if (["article", "articles"].includes(lowerSearch)) {
        results = articles.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (lowerSearch === "news") {
        results = news.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else {
        results = [...articles, ...news]
          .filter((post) =>
            `${post.title} ${post.category}`.toLowerCase().includes(lowerSearch)
          )
          .sort((a, b) => new Date(b.date) - new Date(a.date));
      }

      setPostResults(results);
    }
  }, [searchResult]);

  return (
    <>
      <Container fluid className="p-0 m-0 px-lg-5" data-aos="fade-up">
        <Row className="p-0 m-0 mt-4 ms-2">
          <h1>Welcome Admin!</h1>
        </Row>
        <div className="ms-4 ms-lg-0 mt-2 d-lg-flex justify-content-end me-4">
          <Search url={"/admin/home"} />
        </div>
        {!searchResult ? (
          <Row className="p-0 m-0 my-4">
            <div className="col-lg-6" data-aos="fade-left">
              <PostGrid posts={latestArticlePosts} category="Latest Article" />
            </div>
            <div className="col-lg-6" data-aos="fade-right">
              <PostGrid posts={latestNewsPosts} category="Latest News" />
            </div>
          </Row>
        ) : (
          <Row className="p-0 m-0 mb-4 mt-2">
            <div data-aos="fade-up">
              <h2>
                <div className="text-white">
                  Search Results for: {searchResult}
                </div>
                <div className="divider pt-1 bg-white rounded-end"></div>
              </h2>
              {postResults.length > 0 && (
                <div className="text-white">
                  {postResults.length === 1
                    ? "1 result found"
                    : `${postResults.length} results found`}
                </div>
              )}
              <div className="my-3" data-aos="fade-up">
                <PostGrid2 posts={postResults} />
              </div>
            </div>
          </Row>
        )}
      </Container>
    </>
  );
};

export default AdminHome;
