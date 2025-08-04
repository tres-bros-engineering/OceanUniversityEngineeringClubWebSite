import { Outlet } from "react-router-dom";
import Footer from "../components/enduser/footer/Footer";
import Header from "../components/enduser/header/Header";
import "./Layout.css";
import LoaderAnimation from "../utils/animation/LoaderAnimation"
import ErrorAnimation from "../utils/animation/ErrorAnimation";
import { useData } from "../utils/DataContext";

const EndUserLayout = () => {
  const { isPendingAdmin, isPendingArticles, isPendingNews, isPendingComments, errorAdmin, errorArticles, errorNews, errorComments } = useData();

  return (
    <div className="Enduser-App">
      {/* Header */}
      <header>
        <Header />
      </header>

      {/* The animation shown after an error occurs */}
      {(errorAdmin || errorArticles || errorNews || errorComments) && (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
          <ErrorAnimation />
          <h4>Something went wrong!</h4>
        </div>
      )}

      {/* The animation shown before fetching data */}
      {(isPendingAdmin || isPendingArticles || isPendingNews || isPendingComments) && (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
          <LoaderAnimation />
          <h4 className="mt-3">Loading...</h4>
        </div>
      )}

      {/* page */}
      {(!errorAdmin && !errorArticles && !errorNews && !errorComments) && (!isPendingAdmin && !isPendingArticles && !isPendingNews && !isPendingComments) && (
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

export default EndUserLayout;
