import UseTitleName from "../../components/UseTitleName";
import Slider from "../components/slider/Slider";

function Home() {
  UseTitleName("OCU Engineering Club");

  return (
    <>
      <div className="my-3 shadow-lg">
        <Slider />
      </div>
      <h1>Welcome to The Home Page</h1>
    </>
  );
}

export default Home;
