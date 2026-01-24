import UseTitleName from "../../utils/UseTitleName";
import PostGrid from "../../components/post grid/AdminPostGrid";
import { useData } from "../../utils/DataContext";
import Search from "../../components/search/AdminSearch";
import { useEffect, useState } from "react";
import PaginationPostGrid from "../../components/post grid/PaginationPostGrid";
import { useAuth } from "../../utils/AuthContext";
import "./Admin.css";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();
  const { articles, news, admin } = useData();
  const auth = useAuth();

  // Get admin attributes
  const user = admin?.find(
    (a) =>
      a.email === auth.getLocalStorageWithExpiry("admin")?.[2] ||
      a.email === auth.user
  );

  useEffect(() => {
    if (!user) {
      navigate("/admin");
    }
  }, [user, navigate]);

  const [postResults, setPostResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Title name
  searchTerm.trim() === "" ? UseTitleName("Home") : UseTitleName("'" + searchTerm + "'");

  // Filter posts
  const latestNewsPosts = news.filter(post => post.publish && post.admin_id === user?.id).sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const latestArticlePosts = articles.filter(post => post.publish && post.admin_id === user?.id).sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Filter posts by search result
  useEffect(() => {
    if (["article", "articles"].includes(searchTerm.toLowerCase())) {
      setPostResults(articles.filter((article) => article.admin_id === user?.id).sort((a, b) => new Date(b.date) - new Date(a.date)));
    } else if (searchTerm.toLowerCase() === "news") {
      setPostResults(news.filter((n) => n.admin_id === user?.id).sort((a, b) => new Date(b.date) - new Date(a.date)));
    } else {
      setPostResults([...articles, ...news]
        .filter((post) => post.admin_id === user?.id)
        .filter((post) =>
          `${post.title} ${post.category}`.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date)));
    }
  }, [searchTerm]);

  return (
    <div className="container">
      <div className="row mt-4" data-aos="fade-up">
        <h1>Welcome {user?.name}!</h1>
      </div>
      <div className="mt-2 d-lg-flex justify-content-end" data-aos="fade-up">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} styleType={"search-component-admin"} />
      </div>
      {searchTerm.trim() === "" ? (
        <div className="row my-4">
          <div className="col-lg-6" data-aos="fade-up">
            <PostGrid posts={latestArticlePosts} category="Latest Article" styleType={"post-grid-admin"} />
          </div>
          <div className="col-lg-6 mt-4 mt-lg-0" data-aos="fade-up">
            <PostGrid posts={latestNewsPosts} category="Latest News" styleType={"post-grid-admin"} />
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
              <PaginationPostGrid posts={postResults} styleType={"post-grid-admin"} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
