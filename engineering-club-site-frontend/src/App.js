import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "./end-user/components/header/Header";
import Footer from "./end-user/components/footer/Footer";
import Home from "./end-user/pages/Home";
import News from "./end-user/pages/News";
import Pumps from "./end-user/pages/Pumps";
import ShipConstructions from "./end-user/pages/ShipConstructions";
import ShipStability from "./end-user/pages/ShipStability";
import ShipType from "./end-user/pages/ShipType";
import Other from "./end-user/pages/Other";
import NotFound from "./end-user/pages/NotFound";
import { useEffect } from "react";
import ScrollAnimation from "./end-user/components/scroll animation/ScrollAnimation";

// Define page groups by CSS Class style
const enduser = ["/", "/news", "/article/pumps", "/article/ship-constructions", "/article/ship-stability", "/article/ship-type", "/article/other"];
const admin = [];
const superadmin = [];

// Get CSS Class Style based on current path
function getClassStyle(pathname) {
  if (enduser.includes(pathname)) return "Enduser-App";
  if (admin.includes(pathname)) return "Admin-App";
  if (superadmin.includes(pathname)) return "Superadmin-App";
  return "Enduser-App";
}

function App() {
  const ClassStyle = getClassStyle(useLocation().pathname);

  // Scroll Animation
  useEffect(() => {
    ScrollAnimation();
  }, []);

  return (
    <>
      {/* Header Area */}
      <Routes>
        {/* Enduser Header */}
        {["/", "/news", "/article/pumps", "/article/ship-constructions", "/article/ship-stability", "/article/ship-type", "/article/other", "*"].map((path) => (
          <Route key={path} path={path} element={<Header />} />
        ))}
      </Routes>

      {/* Body Content */}
      <div className={ClassStyle}>
        <Routes>
          {/* Enduser Body Content */}
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/article/pumps" element={<Pumps />} />
          <Route path="/article/ship-constructions" element={<ShipConstructions />} />
          <Route path="/article/ship-stability" element={<ShipStability />} />
          <Route path="/article/ship-type" element={<ShipType />} />
          <Route path="/article/other" element={<Other />} />

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* Footer Area */}
      <Routes>
        {/* Enduser Footer */}
        {["/", "/news", "/article/pumps", "/article/ship-constructions", "/article/ship-stability", "/article/ship-type", "/article/other", "*"].map((path) => (
          <Route key={path} path={path} element={<Footer />} />
        ))}
      </Routes>
    </>
  );
}

export default App;
