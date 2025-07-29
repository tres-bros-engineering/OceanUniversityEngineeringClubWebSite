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
import SearchResults from "./pages/enduser/SearchResults";
import { DataProvider } from "./utils/DataContext";
import AdminLayout from "./layout/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import ArticleManage from "./pages/admin/ArticleManage";
import NewsManage from "./pages/admin/NewsManage";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminForgotPassword from "./pages/admin/AdminForgotPassword";
import CreateArticle from "./pages/admin/CreateArticle";
import EditArticle from "./pages/admin/EditArticle";
import CreateNews from "./pages/admin/CreateNews";
import EditNews from "./pages/admin/EditNews";
import CommentManage from "./pages/admin/CommentManage";

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
              <Route
                path="/article/ship-stability"
                element={<ShipStability />}
              />
              <Route path="/article/ship-type" element={<ShipType />} />
              <Route path="/article/other" element={<Other />} />
            </Route>

            <Route path="/news/:titleSlug" element={<Post />} />
            <Route
              path="/article/:categorySlug/:titleSlug"
              element={<Post />}
            />

            <Route path="/search-results" element={<SearchResults />} />

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
            <Route path="/admin/home" element={<AdminHome />} />
            <Route path="/admin/article-manage" element={<ArticleManage />} />
            <Route path="/admin/news-manage" element={<NewsManage />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/create-article" element={<CreateArticle />} />
            <Route path="/admin/article-manage/:idSlug" element={<EditArticle />} />
            <Route path="/admin/create-news" element={<CreateNews />} />
            <Route path="/admin/news-manage/:idSlug" element={<EditNews />} />
            <Route path="/admin/comment-manage" element={<CommentManage />} />
          </Route>
        </Routes>
      </DataProvider>
    </>
  );
};

export default App;
