import UseTitleName from "../../components/UseTitleName";
import posts from "../../PostData.json";
import PostGrid2 from "../components/post grid/PostGrid2";

function ShipStability() {
  UseTitleName("Ship Stability | OCU Engineering Club");

  return (
    <div>
      <PostGrid2 posts={posts} />
    </div>
  );
}

export default ShipStability;
