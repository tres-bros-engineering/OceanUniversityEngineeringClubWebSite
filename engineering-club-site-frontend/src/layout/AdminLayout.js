import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/admin/footer/Footer";
import Header from "../components/admin/header/Header";
import "./Layout.css";
import LoaderAnimation from "../utils/animation/LoaderAnimation"
import ErrorAnimation from "../utils/animation/ErrorAnimation";
import { useData } from "../utils/DataContext";

const AdminLayout = () => {
  const { isPendingArticles, isPendingNews, isPendingComments, errorArticles, errorNews, errorComments } = useData();
  
  // To hide the header area
  const location = useLocation();
  const hideHeaderPaths = ["/admin", "/admin/forgot-password"];
  const hideHeader = hideHeaderPaths.includes(location.pathname);

  return (
    <div className="Admin-App">
      {/* Header */}
      {!hideHeader && (
        <header>
          <Header />
        </header>
      )}

      {/* The animation shown after an error occurs */}
      {(errorArticles || errorNews || errorComments) && (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
          <ErrorAnimation />
          <h4>Something went wrong!</h4>
        </div>
      )}

      {/* The animation shown before fetching data */}
      {(isPendingArticles || isPendingNews || isPendingComments) && (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
          <LoaderAnimation />
          <h4 className="mt-3">Loading...</h4>
        </div>
      )}

      {/* page */}
      {!errorArticles &&
        !errorNews &&
        !errorComments &&
        !isPendingArticles &&
        !isPendingNews &&
        !isPendingComments && (
          <main className="min-vh-100">
            <Outlet />
          </main>
        )}

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default AdminLayout;