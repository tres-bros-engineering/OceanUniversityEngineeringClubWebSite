// This is a page layout for all article pages
import "./ArticleLayout.css";
import Slider from "../../components/slider/Slider";
import Sidebar from "../../components/sidebar/Sidebar";
import { Outlet, NavLink } from "react-router-dom";
import { useData } from "../../utils/DataContext";

const Article = () => {
  const { articles } = useData();

  // Filter posts by category
  const articlePosts = articles
    .filter((post) => post.publish)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="container article-layout">
      <div className="row">
        <div className="my-3 p-0" data-aos="fade-up">
          <Slider posts={articlePosts} />
        </div>
      </div>
      <div className="row my-4">
        <div className="col-lg-8" data-aos="fade-up">
          {/* Tab Menu */}
          <nav className="d-none d-lg-block">
            <div
              className="nav nav-tabs fs-5 tab-menu-divider"
              id="nav-tab"
              role="tablist"
            >
              <NavLink
                to="/article/pumps"
                className={({ isActive }) =>
                  `nav-link fw-bold ${isActive ? "active" : "text-white"}`
                }
              >
                Pumps
              </NavLink>
              <NavLink
                to="/article/ship-constructions"
                className={({ isActive }) =>
                  `nav-link fw-bold ${isActive ? "active" : "text-white"}`
                }
              >
                Ship Constructions
              </NavLink>
              <NavLink
                to="/article/ship-stability"
                className={({ isActive }) =>
                  `nav-link fw-bold ${isActive ? "active" : "text-white"}`
                }
              >
                Ship Stability
              </NavLink>
              <NavLink
                to="/article/ship-type"
                className={({ isActive }) =>
                  `nav-link fw-bold ${isActive ? "active" : "text-white"}`
                }
              >
                Ship Type
              </NavLink>
              <NavLink
                to="/article/other"
                className={({ isActive }) =>
                  `nav-link fw-bold ${isActive ? "active" : "text-white"}`
                }
              >
                Other
              </NavLink>
            </div>
            <div className="divider pt-1 bg-white rounded-end"></div>
          </nav>
          <div className="my-lg-4">
            <Outlet />
          </div>
        </div>
        <div className="col-lg-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Article;
