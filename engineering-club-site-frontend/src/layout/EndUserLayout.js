import { Outlet } from "react-router-dom";
import Footer from "../components/enduser/footer/Footer";
import Header from "../components/enduser/header/Header";
import "./Layout.css";

const EndUserLayout = () => {
  return (
    <div className="Enduser-App">
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default EndUserLayout;
