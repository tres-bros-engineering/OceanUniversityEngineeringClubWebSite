import UseTitleName from "../../utils/UseTitleName";
import posts from "../../data/PostData.json";
import PostGrid2 from "../../components/enduser/post grid/PostGrid2";

const ShipConstructions = () => {
  UseTitleName("Ship Constructions | OCU Engineering Club");

  // Filter posts by category
  const shipConstructionsPosts = posts.filter(post => post.category === "Ship Constructions");

  return (
    <div>
      <PostGrid2 posts={shipConstructionsPosts} />
    </div>
  );
}

export default ShipConstructions;