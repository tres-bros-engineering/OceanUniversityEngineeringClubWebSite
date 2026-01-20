import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
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
import AuthAdminLayout from "./layout/AuthAdminLayout";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./utils/AuthContext";
import SuperAdminLayout from "./layout/SuperAdminLayout";
import SuperAdminHome from "./pages/super admin/SuperAdminHome";
import SuperAdminArticleManage from "./pages/super admin/SuperAdminArticleManage";
import AuthSuperAdminLayout from "./layout/AuthSuperAdminLayout";
import SuperAdminLogin from "./pages/super admin/SuperAdminLogin";
import SuperAdminForgotPassword from "./pages/super admin/SuperAdminForgotPassword";
import SuperAdminNewsManage from "./pages/super admin/SuperAdminNewsManage";
import AdminManage from "./pages/super admin/AdminManage";
import CreateAdmin from "./pages/super admin/CreateAdmin";
import EditAdmin from "./pages/super admin/EditAdmin";
import SuperAdminProfile from "./pages/super admin/SuperAdminProfile";

const App = () => {
  // Scroll Animation
  useEffect(() => {
    ScrollAnimation();
  }, []);

  return (
    <>
      <AuthProvider>
        <DataProvider>
          <Routes>
            {/* Enduser Routes */}
            <Route element={<EndUserLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/news" element={<News />} />

              {/* Nested Inside Article Layout */}
              <Route element={<ArticleLayout />}>
                <Route path="/article/pumps" element={<Pumps />} />
                <Route path="/article/ship-constructions" element={<ShipConstructions />} />
                <Route path="/article/ship-stability" element={<ShipStability />} />
                <Route path="/article/ship-type" element={<ShipType />} />
                <Route path="/article/other" element={<Other />} />
              </Route>

              <Route path="/news/:titleSlug" element={<Post />} />
              <Route path="/article/:categorySlug/:titleSlug" element={<Post />} />

              <Route path="/search-results" element={<SearchResults />} />

              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin Routes */}
            {/* Routes before login  */}
            
            <Route element={<AuthAdminLayout />}>
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
            </Route>
            {/* Routes after login */}
            <Route element={<PrivateRoutes navigate={"/admin"} /> }>
              <Route element={<AdminLayout /> }>
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
            </Route>

            {/* Super Admin Routes */}
            {/* Routes before login  */}
            <Route element={<AuthSuperAdminLayout />}>
              <Route path="/superadmin" element={<SuperAdminLogin />} />
              <Route path="/superadmin/forgot-password" element={<SuperAdminForgotPassword />} />
            </Route>
            {/* Routes after login */}
            <Route element={<PrivateRoutes navigate={"/superadmin"} /> }>
              <Route element={<SuperAdminLayout />}>
                <Route path="/superadmin/home" element={<SuperAdminHome />} />
                <Route path="/superadmin/article-manage" element={<SuperAdminArticleManage />} />
                <Route path="/superadmin/news-manage" element={<SuperAdminNewsManage />} />
                <Route path="/superadmin/admin-manage" element={<AdminManage />} />
                <Route path="/superadmin/create-admin" element={<CreateAdmin />} />
                <Route path="/superadmin/admin-manage/:idSlug" element={<EditAdmin />} />
                <Route path="/superadmin/profile" element={<SuperAdminProfile />} />
              </Route>
            </Route>
          </Routes>
        </DataProvider>
      </AuthProvider>
    </>
  );
};

export default App;
