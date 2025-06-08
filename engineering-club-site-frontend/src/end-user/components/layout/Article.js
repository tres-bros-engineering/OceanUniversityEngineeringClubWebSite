// This is a page layout for all article pages

import { Container, Row } from "react-bootstrap";
import "./Article.css";
import UseTitleName from "../../../components/UseTitleName";
import Slider from "../slider/Slider";
import Sidebar from "../sidebar/Sidebar";
import posts from "../../../PostData.json";
import { Outlet, NavLink } from "react-router-dom";

function Article() {
  UseTitleName("Article | OCU Engineering Club");

  return (
    <>
      <Container fluid className="p-0 m-0">
        <Row className="p-0 m-0">
          <div className="my-3 p-0" data-aos="fade-up">
            <Slider posts={posts} />
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
