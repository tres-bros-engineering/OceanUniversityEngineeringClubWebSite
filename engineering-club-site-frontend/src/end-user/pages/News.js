import { Container, Row } from "react-bootstrap";
import UseTitleName from "../../components/UseTitleName";
import Slider from "../components/slider/Slider";
import PostGrid2 from "../components/post grid/PostGrid2";
import Sidebar from "../components/sidebar/Sidebar";

function News() {
  UseTitleName("News | OCU Engineering Club");

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
      title:
        "Royal Navy Flagship Sails Into Indian Ocean For Next Stage Of Global Mission",
      img: "https://wallpaperset.com/w/full/2/f/a/311285.jpg",
      date: "2025-06-04",
      body: "The Carrier Strike Group sailed through the Suez Canal last week, moving from the Mediterranean Sea to the Red Sea, with the desert landscape of Egypt flanking both sides.",
    },
    {
      id: 5,
      title:
        "South Africa Invites Shipping Companies To Join Steering Committee For National Shipping Line",
      img: "https://static.vecteezy.com/system/resources/previews/023/847/162/non_2x/the-panoramic-view-of-a-generic-military-aircraft-carrier-ship-with-ai-generated-free-photo.jpg",
      date: "2025-06-03",
      body: "South Africa has officially started the process of creating a new national shipping line for the first time in more than 25 years.",
    },
    {
      id: 6,
      title: "Port Of Amsterdam Powers Up Shore Connection For Cruise Ships",
      img: "https://wallpapers.com/images/hd/navy-background-d4k44xj51v6u22et.jpg",
      date: "2025-06-02",
      body: "Cruise ships docking at the Passenger Terminal Amsterdam (PTA) can now connect to shore power instead of using their onboard generators, helping reduce both air pollution and noise in the city.",
    },
    {
      id: 7,
      title:
        "Royal Navy Flagship Sails Into Indian Ocean For Next Stage Of Global Mission",
      img: "https://wallpaperset.com/w/full/2/f/a/311285.jpg",
      date: "2025-06-04",
      body: "The Carrier Strike Group sailed through the Suez Canal last week, moving from the Mediterranean Sea to the Red Sea, with the desert landscape of Egypt flanking both sides.",
    },
    {
      id: 8,
      title:
        "South Africa Invites Shipping Companies To Join Steering Committee For National Shipping Line",
      img: "https://static.vecteezy.com/system/resources/previews/023/847/162/non_2x/the-panoramic-view-of-a-generic-military-aircraft-carrier-ship-with-ai-generated-free-photo.jpg",
      date: "2025-06-03",
      body: "South Africa has officially started the process of creating a new national shipping line for the first time in more than 25 years.",
    },
    {
      id: 9,
      title: "Port Of Amsterdam Powers Up Shore Connection For Cruise Ships",
      img: "https://wallpapers.com/images/hd/navy-background-d4k44xj51v6u22et.jpg",
      date: "2025-06-02",
      body: "Cruise ships docking at the Passenger Terminal Amsterdam (PTA) can now connect to shore power instead of using their onboard generators, helping reduce both air pollution and noise in the city.",
    },
    {
      id: 10,
      title:
        "Royal Navy Flagship Sails Into Indian Ocean For Next Stage Of Global Mission",
      img: "https://wallpaperset.com/w/full/2/f/a/311285.jpg",
      date: "2025-06-04",
      body: "The Carrier Strike Group sailed through the Suez Canal last week, moving from the Mediterranean Sea to the Red Sea, with the desert landscape of Egypt flanking both sides.",
    },
    {
      id: 11,
      title:
        "South Africa Invites Shipping Companies To Join Steering Committee For National Shipping Line",
      img: "https://static.vecteezy.com/system/resources/previews/023/847/162/non_2x/the-panoramic-view-of-a-generic-military-aircraft-carrier-ship-with-ai-generated-free-photo.jpg",
      date: "2025-06-03",
      body: "South Africa has officially started the process of creating a new national shipping line for the first time in more than 25 years.",
    },
    {
      id: 12,
      title: "Port Of Amsterdam Powers Up Shore Connection For Cruise Ships",
      img: "https://wallpapers.com/images/hd/navy-background-d4k44xj51v6u22et.jpg",
      date: "2025-06-02",
      body: "Cruise ships docking at the Passenger Terminal Amsterdam (PTA) can now connect to shore power instead of using their onboard generators, helping reduce both air pollution and noise in the city.",
    },
    {
      id: 13,
      title: "Port Of Amsterdam Powers Up Shore Connection For Cruise Ships",
      img: "https://wallpapers.com/images/hd/navy-background-d4k44xj51v6u22et.jpg",
      date: "2025-06-02",
      body: "Cruise ships docking at the Passenger Terminal Amsterdam (PTA) can now connect to shore power instead of using their onboard generators, helping reduce both air pollution and noise in the city.",
    },
    {
      id: 14,
      title: "Port Of Amsterdam Powers Up Shore Connection For Cruise Ships",
      img: "https://wallpapers.com/images/hd/navy-background-d4k44xj51v6u22et.jpg",
      date: "2025-06-02",
      body: "Cruise ships docking at the Passenger Terminal Amsterdam (PTA) can now connect to shore power instead of using their onboard generators, helping reduce both air pollution and noise in the city.",
    },
    {
      id: 15,
      title: "Port Of Amsterdam Powers Up Shore Connection For Cruise Ships",
      img: "https://wallpapers.com/images/hd/navy-background-d4k44xj51v6u22et.jpg",
      date: "2025-06-02",
      body: "Cruise ships docking at the Passenger Terminal Amsterdam (PTA) can now connect to shore power instead of using their onboard generators, helping reduce both air pollution and noise in the city.",
    },
  ];

  return (
    <>
      <Container fluid className="p-0 m-0">
        <Row className="p-0 m-0">
          <div className="my-3 p-0" data-aos="fade-up">
            <Slider posts={posts} />
          </div>
        </Row>
        <Row className="p-0 m-0 my-4">
          <div className="col-lg-8" data-aos="fade-up">
            <PostGrid2 posts={posts} />
          </div>
          <div className="col-lg-4">
            <Sidebar />
          </div>
        </Row>
      </Container>
    </>
  );
}

export default News;
