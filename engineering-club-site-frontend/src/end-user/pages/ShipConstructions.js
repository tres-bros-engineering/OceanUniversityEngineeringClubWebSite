import UseTitleName from "../../components/UseTitleName";
import posts from "../../PostData.json";
import PostGrid2 from "../components/post grid/PostGrid2";

function ShipConstructions() {
  UseTitleName("Ship Constructions | OCU Engineering Club")

  return (
    <div>
      <PostGrid2 posts={posts} />
    </div>
  );
}

export default ShipConstructions;