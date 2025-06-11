import UseTitleName from "../../utils/UseTitleName";
import posts from "../../data/PostData.json";
import PostGrid2 from "../../components/enduser/post grid/PostGrid2";

const ShipType = () => {
  UseTitleName("Ship Type | OCU Engineering Club");

  // Filter posts by category
  const shipTypePosts = posts.filter(post => post.category === "Ship Type");

  return (
    <div>
      <PostGrid2 posts={shipTypePosts} />
    </div>
  );
}

export default ShipType;