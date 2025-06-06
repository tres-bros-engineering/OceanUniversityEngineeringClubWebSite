import { Container, Row } from "react-bootstrap";
import UseTitleName from "../../components/UseTitleName";
import Slider from "../components/slider/Slider";
import PostGrid from "../components/post grid/PostGrid";

function Home() {
  UseTitleName("OCU Engineering Club");

  // The Sample Posts
  const posts = [
    {
      id: 1,
      title: "Royal Navy Flagship Sails Into Indian Ocean For Next Stage Of Global Mission",
      img: "https://wallpaperset.com/w/full/2/f/a/311285.jpg",
      date: "2025-06-04",
      body: "The Carrier Strike Group sailed through the Suez Canal last week, moving from the Mediterranean Sea to the Red Sea, with the desert landscape of Egypt flanking both sides."
    },
    {
      id: 2,
      title: "South Africa Invites Shipping Companies To Join Steering Committee For National Shipping Line",
      img: "https://static.vecteezy.com/system/resources/previews/023/847/162/non_2x/the-panoramic-view-of-a-generic-military-aircraft-carrier-ship-with-ai-generated-free-photo.jpg",
      date: "2025-06-03",
      body: "South Africa has officially started the process of creating a new national shipping line for the first time in more than 25 years."
    },
    {
      id: 3,
      title: "Port Of Amsterdam Powers Up Shore Connection For Cruise Ships",
      img: "https://wallpapers.com/images/hd/navy-background-d4k44xj51v6u22et.jpg",
      date: "2025-06-02",
      body: "Cruise ships docking at the Passenger Terminal Amsterdam (PTA) can now connect to shore power instead of using their onboard generators, helping reduce both air pollution and noise in the city."
    }
  ];

  return (
    <>
      <Container fluid className="p-0 m-0" data-aos="fade-up">
        <Row className="p-0 m-0">
          <div className="my-3 p-0">
            <Slider posts={posts} />
          </div>
        </Row>
        <Row className="p-0 m-0 mt-4">
          <div className="col-lg-6" data-aos="fade-left"><PostGrid posts={posts} category="Popular Post" /></div>
          <div className="col-lg-6" data-aos="fade-right"><PostGrid posts={posts} category="Latest Article" /></div>
        </Row>
        <Row className="p-0 m-0 mt-4" data-aos="fade-up">
          <div><PostGrid posts={posts} category="Pumps" /></div>
        </Row>
        <Row className="p-0 m-0 mt-4" data-aos="fade-up">
          <div><PostGrid posts={posts} category="Ship Constructions" /></div>
        </Row>
        <Row className="p-0 m-0 mt-4">
          <div className="col-lg-6" data-aos="fade-left"><PostGrid posts={posts} category="Ship Stability" /></div>
          <div className="col-lg-6" data-aos="fade-right"><PostGrid posts={posts} category="News" /></div>
        </Row>
        <Row className="p-0 m-0 mt-4" data-aos="fade-up">
          <div><PostGrid posts={posts} category="Ship Type" /></div>
        </Row>
        <Row className="p-0 m-0 my-4" data-aos="fade-up">
          <div><PostGrid posts={posts} category="Other" /></div>
        </Row>
      </Container>
    </>
  );
}

export default Home;
