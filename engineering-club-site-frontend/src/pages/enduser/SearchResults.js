import "../../components/header/Header.css";
import UseTitleName from "../../utils/UseTitleName";
import Sidebar from "../../components/sidebar/Sidebar";
import PaginationPostGrid from "../../components/post grid/PaginationPostGrid";
import { useLocation } from "react-router-dom";
import Search from "../../components/search/EndUserSearch";
import { useEffect, useState } from "react";
import { useData } from "../../utils/DataContext";

const SearchResults = () => {
  const { articles, news } = useData();

  const location = useLocation();
  const { searchResult } = location.state || {};
  const [postResults, setPostResults] = useState([]);

  searchResult
    ? UseTitleName("'" + searchResult + "'")
    : UseTitleName("Search Results");

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
        results = articles
          .filter((post) => post.publish)
          .sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (lowerSearch === "news") {
        results = news
          .filter((post) => post.publish)
          .sort((a, b) => new Date(b.date) - new Date(a.date));
      } else {
        results = [...articles, ...news]
          .filter(
            (post) =>
              `${post.title} ${post.category}`
                .toLowerCase()
                .includes(lowerSearch) && post.publish
          )
          .sort((a, b) => new Date(b.date) - new Date(a.date));
      }

      setPostResults(results);
    }
  }, [searchResult]);

  return (
    <div className="container">
      <div className="row">
        {/* Search Function */}
        <div className="my-4" data-aos="fade-up">
          <Search />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8" data-aos="fade-up">
          <h2>
            <div className="text-white">Search Results for: {searchResult}</div>
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
            <PaginationPostGrid posts={postResults} styleType={"post-grid"} />
          </div>
        </div>
        <div className="mb-4 col-lg-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
