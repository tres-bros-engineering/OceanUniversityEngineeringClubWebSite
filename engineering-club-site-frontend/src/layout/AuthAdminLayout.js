import { Outlet } from "react-router-dom";
import Footer from "../components/admin/footer/Footer";
import "./Layout.css";
import LoaderAnimation from "../utils/animation/LoaderAnimation"
import ErrorAnimation from "../utils/animation/ErrorAnimation";
import { useData } from "../utils/DataContext";

const AuthAdminLayout = () => {
  const { isPendingArticles, isPendingNews, isPendingComments, errorArticles, errorNews, errorComments } = useData();

  return (
    <div className="Admin-App">
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
          <main className="min-vh-100 px-lg-5">
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

export default AuthAdminLayout;