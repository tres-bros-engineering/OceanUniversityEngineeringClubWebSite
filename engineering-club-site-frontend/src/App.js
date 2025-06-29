import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./pages/enduser/Home";
import News from "./pages/enduser/News";
import Pumps from "./pages/enduser/Pumps";
import ShipConstructions from "./pages/enduser/ShipConstructions";
import ShipStability from "./pages/enduser/ShipStability";
import ShipType from "./pages/enduser/ShipType";
import Other from "./pages/enduser/Other";
import NotFound from "./pages/enduser/NotFound";
import { useEffect } from "react";
import ScrollAnimation from "./utils/ScrollAnimation";
import ArticleLayout from "./layout/article layout/ArticleLayout";
import EndUserLayout from "./layout/EndUserLayout";
import Post from "./pages/enduser/Post";
import { DataProvider } from "./utils/DataContext";

const App = () => {
  // Scroll Animation
  useEffect(() => {
    ScrollAnimation();
  }, []);

  return (
    <>
      <DataProvider>
        <Routes>
          {/* Enduser Routes */}
          <Route element={<EndUserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />

            {/* Nested Inside Article Layout */}
            <Route element={<ArticleLayout />}>
              <Route path="/article/pumps" element={<Pumps />} />
              <Route
                path="/article/ship-constructions"
                element={<ShipConstructions />}
              />
              <Route path="/article/ship-stability" element={<ShipStability />} />
              <Route path="/article/ship-type" element={<ShipType />} />
              <Route path="/article/other" element={<Other />} />
            </Route>

            <Route path="/news/:titleSlug" element={<Post />} />
            <Route path="/article/:categorySlug/:titleSlug" element={<Post />} />

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </DataProvider>
    </>
  );
};

export default App;
