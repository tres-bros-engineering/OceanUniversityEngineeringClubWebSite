import { Container, Row } from "react-bootstrap";
import UseTitleName from "../../utils/UseTitleName";
import PostGrid from "../../components/admin/post grid/PostGrid";
import { useData } from "../../utils/DataContext";
import Search from "../../components/admin/search/Search";
import { useEffect, useState } from "react";
import PostGrid2 from "../../components/admin/post grid/PostGrid2";
import { useAuth } from "../../utils/AuthContext";

const AdminHome = () => {
  const { articles, news } = useData();
  const auth = useAuth();

  const [postResults, setPostResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Title name
  searchTerm.trim() === "" ? UseTitleName("Home | OCU Engineering Club") : UseTitleName("'" + searchTerm + "'" + " | OCU Engineering Club");

  // Filter posts
  const latestNewsPosts = news.filter(post => post.publish && post.author === auth.user).sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const latestArticlePosts = articles.filter(post => post.publish && post.author === auth.user).sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Filter posts by search result
  useEffect(() => {
    if (["article", "articles"].includes(searchTerm.toLowerCase())) {
      setPostResults(articles.filter((article) => article.author === auth.user).sort((a, b) => new Date(b.date) - new Date(a.date)));
    } else if (searchTerm.toLowerCase() === "news") {
      setPostResults(news.filter((n) => n.author === auth.user).sort((a, b) => new Date(b.date) - new Date(a.date)));
    } else {
      setPostResults([...articles, ...news]
        .filter((post) => post.author === auth.user)
        .filter((post) =>
          `${post.title} ${post.category}`.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date)));
    }
  },[searchTerm]);

  return (
    <div className="container">
      <div className="row mt-4">
        <h1>Welcome {auth.user}!</h1>
      </div>
      <div className="mt-2 d-lg-flex justify-content-end">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      {searchTerm.trim() === "" ? (
        <div className="row my-4">
          <div className="col-lg-6" data-aos="fade-up">
            <PostGrid posts={latestArticlePosts} category="Latest Article" />
          </div>
          <div className="col-lg-6 mt-4 mt-lg-0" data-aos="fade-up">
            <PostGrid posts={latestNewsPosts} category="Latest News" />
          </div>
        </div>
      ) : (
        <div className="row mb-4 mt-2">
          <div data-aos="fade-up">
            <h2>
              <div className="text-white">Search Results for: {searchTerm}</div>
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
        </div>
      )}
    </div>
  );
};

export default AdminHome;
