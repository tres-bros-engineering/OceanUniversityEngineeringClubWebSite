// This is a page layout for all article pages
import { Container, Row } from "react-bootstrap";
import "./ArticleLayout.css";
import Slider from "../../components/enduser/slider/Slider";
import Sidebar from "../../components/enduser/sidebar/Sidebar";
import posts from "../../data/PostData.json";
import { Outlet, NavLink } from "react-router-dom";

const Article = () => {
  // Filter posts by category
  const articlePosts = posts.filter(post => post.category);

  return (
    <>
      <Container fluid className="p-0 m-0">
        <Row className="p-0 m-0">
          <div className="my-3 p-0" data-aos="fade-up">
            <Slider posts={articlePosts} />
          </div>
        </Row>
        <Row className="p-0 m-0 my-4">
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
        </Row>
      </Container>
    </>
  );
}

export default Article;
