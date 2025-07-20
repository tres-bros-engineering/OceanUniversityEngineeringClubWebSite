import "../../components/enduser/header/Header.css";
import { Container, Row } from "react-bootstrap";
import UseTitleName from "../../utils/UseTitleName";
import Sidebar from "../../components/enduser/sidebar/Sidebar";
import PostGrid2 from "../../components/enduser/post grid/PostGrid2";
import { useData } from "../../utils/DataContext";
import { useLocation } from "react-router-dom";
import Search from "../../components/enduser/search/Search";
import { useEffect, useState } from "react";

const SearchResults = () => {
  UseTitleName("Search Results | OCU Engineering Club");
  const { articles, news } = useData();

  const location = useLocation();
  const { searchResult } = location.state || {};
  const [postResults, setPostResults] = useState([]);

  // Filter posts by search result
  useEffect(() => {
    if (!searchResult) {
      setPostResults([]);
      return;
    }

    const lowerSearch = searchResult.toLowerCase().trim();

    let results = [];

    if (["article", "articles"].includes(lowerSearch)) {
      results = articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (lowerSearch === "news") {
      results = news.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      results = [...articles, ...news]
        .filter((post) =>
          `${post.title} ${post.category}`
            .toLowerCase()
            .includes(lowerSearch)
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setPostResults(results);
  }, [searchResult, articles, news]);

  return (
    <>
      <Container fluid className="p-0 m-0">
        <Row className="p-0 m-0">
          {/* Search Function */}
          <div className="my-4" data-aos="fade-up">
            <Search />
          </div>
        </Row>
        <Row className="p-0 m-0">
          <div className="col-lg-8" data-aos="fade-up">
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
            <div className="my-3">
              <PostGrid2 posts={postResults} />
            </div>
          </div>
          <div className="col-lg-4">
            <Sidebar />
          </div>
        </Row>
      </Container>
    </>
  );
};

export default SearchResults;
