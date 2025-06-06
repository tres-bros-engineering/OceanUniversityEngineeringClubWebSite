import { Container, Row } from "react-bootstrap";
import PostGrid3 from "../post grid/PostGrid3";

const Sidebar = () => {
  // The Sample Posts
  const posts = [
    {
      id: 1,
      title:
        "Royal Navy Flagship Sails Into Indian Ocean For Next Stage Of Global Mission",
      img: "https://wallpaperset.com/w/full/2/f/a/311285.jpg",
      date: "2025-06-04",
      body: "The Carrier Strike Group sailed through the Suez Canal last week, moving from the Mediterranean Sea to the Red Sea, with the desert landscape of Egypt flanking both sides.",
    },
    {
      id: 2,
      title:
        "South Africa Invites Shipping Companies To Join Steering Committee For National Shipping Line",
      img: "https://static.vecteezy.com/system/resources/previews/023/847/162/non_2x/the-panoramic-view-of-a-generic-military-aircraft-carrier-ship-with-ai-generated-free-photo.jpg",
      date: "2025-06-03",
      body: "South Africa has officially started the process of creating a new national shipping line for the first time in more than 25 years.",
    },
    {
      id: 3,
      title: "Port Of Amsterdam Powers Up Shore Connection For Cruise Ships",
      img: "https://wallpapers.com/images/hd/navy-background-d4k44xj51v6u22et.jpg",
      date: "2025-06-02",
      body: "Cruise ships docking at the Passenger Terminal Amsterdam (PTA) can now connect to shore power instead of using their onboard generators, helping reduce both air pollution and noise in the city.",
    },
    {
      id: 4,
      title: "Port Of Amsterdam Powers Up Shore Connection For Cruise Ships",
      img: "https://wallpapers.com/images/hd/navy-background-d4k44xj51v6u22et.jpg",
      date: "2025-06-02",
      body: "Cruise ships docking at the Passenger Terminal Amsterdam (PTA) can now connect to shore power instead of using their onboard generators, helping reduce both air pollution and noise in the city.",
    },
  ];

  return (
    <Container fluid className="p-0 m-0 d-none d-lg-block">
      <div data-aos="fade-up">
        <PostGrid3 posts={posts} category={"Popular Post"} />
      </div>
      <div className="mt-5" data-aos="fade-up">
        <PostGrid3 posts={posts} category={"Latest Post"} />
      </div>
      <div className="mt-5 container-fluid" data-aos="fade-up">
        <h2 className="mb-0 px-2 text-black bg-white rounded-top d-inline-block">
          Follow Us
        </h2>
        <div className="divider pt-1 bg-white rounded-end"></div>
        <div className="text-center mt-3">
          <a
            href="https://www.facebook.com/p/Engineering-Innovation-Club-Ocean-University-of-Sri-Lanka-100054277611108/"
            target="_blank"
          >
            <i className="bi bi-facebook fs-1 text-white me-4"></i>
          </a>
          <a href="https://www.instagram.com/eic_ocu/" target="_blank">
            <i className="bi bi-instagram fs-1 text-white mx-4"></i>
          </a>
          <a
            href="https://lk.linkedin.com/company/engineering-innovation-club-ocean-university-of-sri-lanka"
            target="_blank"
          >
            <i className="bi bi-linkedin fs-1 text-white ms-4"></i>
          </a>
        </div>
      </div>
    </Container>
  );
};

export default Sidebar;
